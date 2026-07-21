// Grab our DOM elements
const imageInput = document.getElementById("imageInput");
const imageName = document.getElementById("imageName");
const imagePreview = document.getElementById("imagePreview");
const previewContainer = document.getElementById("previewContainer");
const uploadForm = document.getElementById("uploadForm");

// Listen for when a file is selected
imageInput.addEventListener("change", function (event) {
  // Check if a file was actually selected
  if (event.target.files && event.target.files[0]) {
    const file = event.target.files[0];

    // 1. Automatically set the value of the image name input
    imageName.value = file.name;

    // 2. Optional: Show a live preview of the image
    const reader = new FileReader();
    reader.onload = function (e) {
      imagePreview.src = e.target.result;
      previewContainer.style.display = "block";
    };
    reader.readAsDataURL(file);
  } else {
    // Clear fields if user cancels selection
    imageName.value = "";
    previewContainer.style.display = "none";
  }
});

// Handle form submission
uploadForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Create a FormData object to send to a server
  const formData = new FormData();
  formData.append("imageFile", imageInput.files[0]);
  formData.append("explicitImageName", imageName.value);

  console.log("Ready to send to server:", {
    fileName: imageName.value,
    fileObject: imageInput.files[0],
  });

  // Example fetch request to your backend:
  /*
  fetch('/upload-endpoint', {
    method: 'POST',
    body: formData
  })
  .then(res => res.json())
  .then(data => console.log(data));
  */
});
