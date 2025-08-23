import "./content.css";
import { createMomUrl } from "../utils/create-mom-url";
import {
  createQuadrantOverlays,
  makeDivDraggable,
  positionDivAtCorner,
} from "./utils/quadrants";
import { fetchUserFromSupabase } from "./utils/fetch-user-from-supabase";
console.log("content 9");

window.addEventListener("load", () => {
  init();
});

// Function to get user data from storage
async function getUserTokenFromStorage() {
  console.log("getUserTokenFromStorage called", { args: [] });
  try {
    // First try to get from local storage
    const yourMomSessionToken = await new Promise((resolve) => {
      chrome.storage.local.get(["yourMomSessionToken"], function(data) {
        resolve(data.yourMomSessionToken);
      });
    });
    if (yourMomSessionToken) {
      console.log("getUserTokenFromStorage finished");
      return yourMomSessionToken;
    }
  } catch (error) {
    console.error("getUserTokenFromStorage error:", error);
    return null;
  }
  return null;
}

async function init() {
  console.log("init called", { args: [] });
  // Create the draggable div
  const yourMomDraggable = document.createElement("div");
  yourMomDraggable.id = "your-mom-draggable";

  // Get the current hostname and normalize it by removing 'www.' if present
  let currentHostname = window.location.hostname;
  if (currentHostname.startsWith("www.")) {
    currentHostname = currentHostname.substring(4);
  }
  // Get the user's auth token from storage
  const authToken = await getUserTokenFromStorage();

  // If no cached profile or if we have an auth token but no profile, fetch from API
  let userData;
  let productData;
  if (authToken) {
    const result = await fetchUserFromSupabase(authToken);
    if (result) {
      userData = result.userData;
      productData = result.productData;
    }
  }
  console.log("userData", userData);
  console.log("productData", productData);
  console.log("currentHostname", currentHostname);
  console.log("badWebsites", userData?.badWebsites);
  // Check if the normalized hostname is in the bad websites list
  const isBadWebsite =
    userData?.badWebsites?.includes(currentHostname) || false;
  console.log("isBadWebsite", isBadWebsite, "comparing", currentHostname);
  // Determine the correct image URL
  const expression = isBadWebsite ? "sad" : "happy";
  const momAssetUrl = productData?.assetUrl;
  console.log("momAssetUrl", momAssetUrl);
  // Log raw URL for debugging
  const rawImageUrl = momAssetUrl ? createMomUrl(momAssetUrl, expression) : "";
  console.log("Raw image URL:", rawImageUrl);

  // Notify background service about mom state for potential tracking
  chrome.runtime.sendMessage({ type: "UPDATE_MOM_STATE", state: expression });

  // Set initial size for the draggable
  yourMomDraggable.style.width = "48px"; // Half of original size
  yourMomDraggable.style.height = "48px"; // Half of original size
  yourMomDraggable.style.borderRadius = "50%"; // Make the container round
  yourMomDraggable.style.overflow = "hidden"; // Prevent content from spilling outside
  yourMomDraggable.style.display = "flex"; // Use flexbox for centering
  yourMomDraggable.style.justifyContent = "center"; // Center horizontally
  yourMomDraggable.style.alignItems = "center"; // Center vertically

  // Fetch image through background script to bypass CSP
  if (rawImageUrl) {
    chrome.runtime.sendMessage(
      { type: "FETCH_IMAGE", url: rawImageUrl },
      (response) => {
        if (response.dataUrl) {
          console.log("Fetched image data URL:", response.dataUrl);

          // Create an img element and set its src to the data URL
          const imgElement = document.createElement("img");
          imgElement.src = response.dataUrl;
          imgElement.style.width = "100%";
          imgElement.style.height = "100%";
          imgElement.style.objectFit = "contain";
          imgElement.style.borderRadius = "50%"; // Make the image round
          imgElement.style.overflow = "hidden"; // Prevent content from spilling outside

          // Clear any existing content and append the image
          yourMomDraggable.innerHTML = "";
          yourMomDraggable.appendChild(imgElement);
        } else {
          console.error("Failed to fetch image:", response.error);
        }
      }
    );
  }

  // Listen for user data updates
  // chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  //   if (message.type === "USER_DATA_UPDATED" && message.userData) {
  //     userData = message.userData;

  //     // Update the mom image if needed
  //     if (userData?.selectedProduct?.assetUrl) {
  //       const newMomAssetUrl = userData.selectedProduct.assetUrl;
  //       const newExpression = isBadWebsite ? "sad" : "happy";

  //       // Create proper URL with expression
  //       const rawImageUrl = createMomUrl(newMomAssetUrl, newExpression);
  //       console.log("Updated raw image URL:", rawImageUrl);

  //       const newImageUrl = `url('${rawImageUrl}')`;
  //       yourMomDraggable.style.backgroundImage = newImageUrl;
  //     }
  //   }
  // });

  // Add 'sad' class to activate the blue pulse effect when on example.com
  if (isBadWebsite) {
    yourMomDraggable.classList.add("sad-mom");
  }

  // Ensure no default positioning
  if (yourMomDraggable !== null) {
    yourMomDraggable.style.top = "";
    yourMomDraggable.style.right = "";
    yourMomDraggable.style.bottom = "";
    yourMomDraggable.style.left = "";
  }

  // Create quadrant overlays
  createQuadrantOverlays();

  // Add the div to the page
  document.body.appendChild(yourMomDraggable);

  // Get saved position or default to top-right
  chrome.storage.local.get(["corner"], function(result) {
    const corner = result.corner || "top-right";
    positionDivAtCorner(corner);
  });

  // Make the div draggable
  makeDivDraggable(yourMomDraggable);
  console.log("init finished");
}

// // Show the active quadrant overlay
// function showActiveQuadrant(quadrant: string) {
//   // Hide all quadrants first
//   hideAllQuadrants();

//   // Show only the active quadrant
//   const activeOverlay = document.getElementById(`quadrant-${quadrant}`);
//   if (activeOverlay) {
//     console.log("Showing quadrant:", quadrant); // Debug log
//     activeOverlay.classList.add("active");
//     activeOverlay.style.visibility = "visible";
//     activeOverlay.style.display = "block";
//     activeOverlay.style.opacity = "1";
//     activeOverlay.style.backgroundColor = "rgba(128, 128, 128, 0.2)";
//   }
// }

// Hide all quadrant overlays
