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

  // Check if the current website is fuq.com
  const currentHostname = window.location.hostname;
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
  const isBadWebsite = userData?.badWebsites.includes(currentHostname) || false;
  console.log("isBadWebsite", isBadWebsite);
  // Determine the correct image URL
  const expression = isBadWebsite ? "sad" : "happy";
  const momAssetUrl = productData?.assetUrl;
  console.log("momAssetUrl", momAssetUrl);
  // Log raw URL for debugging
  const rawImageUrl = momAssetUrl ? createMomUrl(momAssetUrl, expression) : "";
  console.log("Raw image URL:", rawImageUrl);

  const imageUrl = momAssetUrl ? `url('${rawImageUrl}')` : "";

  console.log("imageUrl", imageUrl);
  // Notify background service about mom state for potential tracking
  chrome.runtime.sendMessage({ type: "UPDATE_MOM_STATE", state: expression });

  yourMomDraggable.style.backgroundImage = imageUrl;
  yourMomDraggable.style.backgroundSize = "100% 100%"; // Scale the image to fill the container
  yourMomDraggable.style.backgroundRepeat = "no-repeat";
  yourMomDraggable.style.backgroundPosition = "center";
  yourMomDraggable.style.width = "48px"; // Half of original size
  yourMomDraggable.style.height = "48px"; // Half of original size

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
    yourMomDraggable.classList.add("sad");
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
