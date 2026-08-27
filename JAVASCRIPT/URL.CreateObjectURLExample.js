const fileInput = document.getElementById("fileInput");
const avatarPreview = document.getElementById("avatarPreview");
const placeholder = document.getElementById("placeholder");

// Track the current object URL so we can clean it up later
let currentImageURL = null;

// --- Use Case 1: Previewing a Local Image File ---
fileInput.addEventListener("change", function (event) {
  const file = event.target.files[0];

  if (file) {
    // IMPORTANT CLEANUP: If there's an existing object URL, revoke it to prevent memory leaks
    if (currentImageURL) {
      URL.revokeObjectURL(currentImageURL);
    }

    // Create a temporary local pointer/URL to the selected file
    currentImageURL = URL.createObjectURL(file);

    // Set the image source to this generated blob URL
    avatarPreview.src = currentImageURL;

    // Toggle UI elements visibility
    avatarPreview.style.display = "block";
    placeholder.style.display = "none";
  }
});

// --- Use Case 2: Generating a text file on-the-fly and forcing a download ---
const downloadBtn = document.getElementById("downloadBtn");

downloadBtn.addEventListener("click", function () {
  const textContent =
    "Thank you for trying out URL.createObjectURL()! This file was created entirely in your browser memory.";

  // 1. Wrap the string data in a standard modern Blob object
  const textBlob = new Blob([textContent], { type: "text/plain" });

  // 2. Turn that Blob into a temporary download link
  const downloadURL = URL.createObjectURL(textBlob);

  // 3. Programmatically create an off-screen anchor link tag
  const tempLink = document.createElement("a");
  tempLink.href = downloadURL;
  tempLink.download = "welcome-note.txt"; // Sets the default saved file name

  // 4. Trigger a virtual click to start the download browser prompt
  document.body.appendChild(tempLink);
  tempLink.click();

  // 5. Cleanup immediately after the link click event finishes
  document.body.removeChild(tempLink);
  URL.revokeObjectURL(downloadURL);
});
