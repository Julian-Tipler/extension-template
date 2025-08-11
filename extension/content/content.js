import "./content.css";
console.log("content 1");

window.addEventListener("load", () => {
  init();
});

async function init() {
  // Create the draggable div
  const draggableDiv = document.createElement("div");
  draggableDiv.id = "your-mom-draggable";

  // Check if the current website is fuq.com
  const currentHostname = window.location.hostname;
  const isExampleWebsite =
    currentHostname === "example.com" ||
    currentHostname === "www.example.com" ||
    currentHostname.endsWith(".example.com");

  // Set the appropriate image based on the website
  const imageUrl = isExampleWebsite
    ? "url('https://opzgshmkqzcakfxroxnq.supabase.co/storage/v1/object/public/mom-sprites/mom-sad.png')"
    : "url('https://opzgshmkqzcakfxroxnq.supabase.co/storage/v1/object/public/mom-sprites/mom-happy.png')";

  draggableDiv.style.backgroundImage = imageUrl;
  draggableDiv.style.backgroundSize = "contain";
  draggableDiv.style.backgroundRepeat = "no-repeat";
  draggableDiv.style.width = "94px"; // Match image width
  draggableDiv.style.height = "96px"; // Match image height

  // Ensure no default positioning
  draggableDiv.style.top = "";
  draggableDiv.style.right = "";
  draggableDiv.style.bottom = "";
  draggableDiv.style.left = "";

  // Create quadrant overlays
  createQuadrantOverlays();

  // Add the div to the page
  document.body.appendChild(draggableDiv);

  // Get saved position or default to top-right
  chrome.storage.local.get(["corner"], function(result) {
    const corner = result.corner || "top-right";
    positionDivAtCorner(corner);
  });

  // Make the div draggable
  makeDivDraggable(draggableDiv);
}

// Create quadrant overlays to highlight snap zones
function createQuadrantOverlays() {
  // Remove any existing overlays first to avoid duplicates
  document.querySelectorAll(".quadrant-overlay").forEach((el) => el.remove());

  // Create each quadrant overlay
  const quadrants = ["top-left", "top-right", "bottom-left", "bottom-right"];

  quadrants.forEach((quadrant) => {
    const overlay = document.createElement("div");
    overlay.id = `quadrant-${quadrant}`;
    overlay.className = "quadrant-overlay";
    overlay.setAttribute("data-quadrant", quadrant);

    // Ensure they exist in the DOM but are hidden initially
    overlay.style.visibility = "hidden";
    overlay.style.display = "none";
    overlay.style.opacity = "0";
    overlay.style.backgroundColor = "transparent";

    // Let CSS handle positioning - we don't need to set position here
    // The CSS rules for #quadrant-top-left, etc. will handle positioning

    document.body.appendChild(overlay);
  });

  // Hide all overlays initially
  hideAllQuadrants();
}

// Show the active quadrant overlay
function showActiveQuadrant(quadrant) {
  // Hide all quadrants first
  hideAllQuadrants();

  // Show only the active quadrant
  const activeOverlay = document.getElementById(`quadrant-${quadrant}`);
  if (activeOverlay) {
    console.log("Showing quadrant:", quadrant); // Debug log
    activeOverlay.classList.add("active");
    activeOverlay.style.visibility = "visible";
    activeOverlay.style.display = "block";
    activeOverlay.style.opacity = "1";
    activeOverlay.style.backgroundColor = "rgba(128, 128, 128, 0.2)";
  }
}

// Hide all quadrant overlays
function hideAllQuadrants() {
  const overlays = document.querySelectorAll(".quadrant-overlay");
  overlays.forEach((overlay) => {
    overlay.classList.remove("active");
    overlay.style.visibility = "hidden";
    overlay.style.display = "none";
    overlay.style.opacity = "0";
    overlay.style.backgroundColor = "transparent";
  });
}

function positionDivAtCorner(corner) {
  const draggableDiv = document.getElementById("your-mom-draggable");
  const offset = 10; // 10px from the edge

  // Reset all positions
  draggableDiv.style.top = "";
  draggableDiv.style.right = "";
  draggableDiv.style.bottom = "";
  draggableDiv.style.left = "";

  // Position based on corner
  switch (corner) {
    case "top-right":
      draggableDiv.style.top = offset + "px";
      draggableDiv.style.right = offset + "px";
      break;
    case "top-left":
      draggableDiv.style.top = offset + "px";
      draggableDiv.style.left = offset + "px";
      break;
    case "bottom-right":
      draggableDiv.style.bottom = offset + "px";
      draggableDiv.style.right = offset + "px";
      break;
    case "bottom-left":
      draggableDiv.style.bottom = offset + "px";
      draggableDiv.style.left = offset + "px";
      break;
  }

  // Save the position to storage
  chrome.storage.local.set({ corner: corner });
}

// Helper function to determine which corner the element is positioned at
function getCurrentCorner(element) {
  if (element.style.top && element.style.left) return "top-left";
  if (element.style.top && element.style.right) return "top-right";
  if (element.style.bottom && element.style.left) return "bottom-left";
  if (element.style.bottom && element.style.right) return "bottom-right";

  // Default to top-right if unable to determine
  return "top-right";
}

function makeDivDraggable(element) {
  let isDragging = false;
  let startX, startY, initialX, initialY;
  const offset = { x: 0, y: 0 };

  element.addEventListener("mousedown", startDrag);
  element.addEventListener("touchstart", startDrag, { passive: false });

  function startDrag(e) {
    e.preventDefault();

    // Store the current corner before starting drag
    const currentCorner = getCurrentCorner(element);
    element.setAttribute("data-original-corner", currentCorner);

    // Get accurate position using getBoundingClientRect
    const rect = element.getBoundingClientRect();

    if (e.type === "touchstart") {
      initialX = e.touches[0].clientX;
      initialY = e.touches[0].clientY;
    } else {
      initialX = e.clientX;
      initialY = e.clientY;
    }

    isDragging = true;
    startX = rect.left;
    startY = rect.top;

    // Important: Keep a reference to the original element
    // and add a class to indicate it's being dragged
    element.classList.add("dragging");

    // Temporarily switch to top/left positioning for drag
    element.style.top = startY + "px";
    element.style.left = startX + "px";
    element.style.right = "";
    element.style.bottom = "";

    // Show the current quadrant
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    let initialQuadrant;
    if (centerY < windowHeight / 2) {
      if (centerX < windowWidth / 2) {
        initialQuadrant = "top-left";
      } else {
        initialQuadrant = "top-right";
      }
    } else {
      if (centerX < windowWidth / 2) {
        initialQuadrant = "bottom-left";
      } else {
        initialQuadrant = "bottom-right";
      }
    }

    // Force show all quadrants first to ensure they're in the DOM
    document.querySelectorAll(".quadrant-overlay").forEach((overlay) => {
      overlay.style.display = "block";
      overlay.style.visibility = "visible";
      overlay.style.opacity = "0"; // Still transparent
    });

    // Then highlight the active one
    const activeOverlay = document.getElementById(
      `quadrant-${initialQuadrant}`
    );
    if (activeOverlay) {
      activeOverlay.classList.add("active");
      activeOverlay.style.visibility = "visible";
      activeOverlay.style.display = "block";
      activeOverlay.style.opacity = "1";
      activeOverlay.style.backgroundColor = "rgba(128, 128, 128, 0.2)";
    }
    document.addEventListener("mousemove", drag);
    document.addEventListener("touchmove", drag, { passive: false });
    document.addEventListener("mouseup", stopDrag);
    document.addEventListener("touchend", stopDrag);
  }

  function drag(e) {
    if (!isDragging) return;
    e.preventDefault();

    let currentMouseX, currentMouseY;

    if (e.type === "touchmove") {
      currentMouseX = e.touches[0].clientX;
      currentMouseY = e.touches[0].clientY;
    } else {
      currentMouseX = e.clientX;
      currentMouseY = e.clientY;
    }

    // Calculate movement delta
    const deltaX = currentMouseX - initialX;
    const deltaY = currentMouseY - initialY;

    // Calculate new position
    let newX = startX + deltaX;
    let newY = startY + deltaY;

    // Keep element within the viewport bounds with a margin
    const margin = 5;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const elementWidth = element.offsetWidth;
    const elementHeight = element.offsetHeight;

    newX = Math.max(
      margin,
      Math.min(newX, windowWidth - elementWidth - margin)
    );
    newY = Math.max(
      margin,
      Math.min(newY, windowHeight - elementHeight - margin)
    );

    // Apply positioning - always use top and left during dragging
    element.style.top = newY + "px";
    element.style.left = newX + "px";
    element.style.right = ""; // Clear right positioning
    element.style.bottom = ""; // Clear bottom positioning

    // Determine which quadrant we're in and highlight it
    const centerX = newX + elementWidth / 2;
    const centerY = newY + elementHeight / 2;

    let currentQuadrant;
    if (centerY < windowHeight / 2) {
      // Top half
      if (centerX < windowWidth / 2) {
        currentQuadrant = "top-left";
      } else {
        currentQuadrant = "top-right";
      }
    } else {
      // Bottom half
      if (centerX < windowWidth / 2) {
        currentQuadrant = "bottom-left";
      } else {
        currentQuadrant = "bottom-right";
      }
    }

    // Show the active quadrant overlay with direct DOM manipulation
    hideAllQuadrants(); // Hide all first

    // Force-show the current quadrant
    const activeOverlay = document.getElementById(
      `quadrant-${currentQuadrant}`
    );
    if (activeOverlay) {
      activeOverlay.classList.add("active");
      activeOverlay.style.visibility = "visible";
      activeOverlay.style.display = "block";
      activeOverlay.style.opacity = "1";
      activeOverlay.style.backgroundColor = "rgba(128, 128, 128, 0.2)";
    }
  }

  function stopDrag() {
    if (!isDragging) return;

    isDragging = false;
    document.removeEventListener("mousemove", drag);
    document.removeEventListener("touchmove", drag);
    document.removeEventListener("mouseup", stopDrag);
    document.removeEventListener("touchend", stopDrag);

    // Remove dragging class
    element.classList.remove("dragging");

    // Hide all quadrant overlays
    hideAllQuadrants();

    // Ensure the element is visible before snapping
    element.style.display = "block";
    element.style.visibility = "visible";

    // Determine closest corner and snap to it
    snapToClosestCorner();

    // Reset offset to avoid accumulating errors
    offset.x = 0;
    offset.y = 0;
  }

  function snapToClosestCorner() {
    const rect = element.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Get center coordinates of the div
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Determine which quadrant the div is in based on center position
    // Using simple quadrant logic: divide the screen into 4 parts
    if (centerY < windowHeight / 2) {
      // Top half
      if (centerX < windowWidth / 2) {
        // Top-left quadrant
        positionDivAtCorner("top-left");
      } else {
        // Top-right quadrant
        positionDivAtCorner("top-right");
      }
    } else {
      // Bottom half
      if (centerX < windowWidth / 2) {
        // Bottom-left quadrant
        positionDivAtCorner("bottom-left");
      } else {
        // Bottom-right quadrant
        positionDivAtCorner("bottom-right");
      }
    }
  }
}
