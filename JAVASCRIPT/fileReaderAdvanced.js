/*
 * ============================================================================
 * MODERN JAVASCRIPT FILEREADER
 * ============================================================================
 */

//* STEPS FOR USING FILEREADER
/**
Create FileReader
       ↓
Tell it what to read
       ↓
Wait until it finishes
       ↓
Use the result
 */

//* 1. CORE UTILITY: THE ASYNC/AWAIT FILEREADER WRAPPERS
// By default, FileReader uses old-school event listeners (onload, onerror).
// Wrapping them in Promises allows us to use modern 'async/await' syntax.

/**
 * Reads a file as a Base64 Data URL (Perfect for images, audio, small files)
 * @param {File} file - The file object from the HTML input
 * @returns {Promise<string>} - Resolves with the Base64 string
 */
function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    // Step 1: Instantiate the FileReader object
    const reader = new FileReader();

    // Step 2: Set up success event handler
    reader.onload = () => resolve(reader.result);

    // Step 3: Set up error event handler
    reader.onerror = () =>
      reject(new Error(`Failed to read file: ${file.name}`));

    // Step 4: (Optional) Track progress
    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentage = Math.round((event.loaded / event.total) * 100);
        console.log(`Reading ${file.name}: ${percentage}% complete`);
      }
    };

    // Step 5: Trigger the read process
    reader.readAsDataURL(file);
  });
}

/**
 * Reads a file as plain text (Perfect for .txt, .csv, .json, .svg)
 * @param {File} file
 * @returns {Promise<string>}
 */
function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Error reading text file."));
    reader.readAsText(file); // Triggers text-based reading
  });
}

//* 2. ADVANCED FILE VALIDATOR
// Never trust user input. Always validate file type and size *before* reading it into memory.
function validateFile(file, allowedTypes, maxSizeInMB) {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

  // Check File Existence
  if (!file) {
    throw new Error("No file selected.");
  }

  // Check File Size
  if (file.size > maxSizeInBytes) {
    throw new Error(
      `File "${file.name}" is too large! Maximum allowed is ${maxSizeInMB}MB.`,
    );
  }

  // Check File Type (MIME type)
  if (!allowedTypes.includes(file.type)) {
    throw new Error(
      `Invalid file type for "${file.name}". Allowed types: ${allowedTypes.join(", ")}`,
    );
  }

  return true; // File passed all security checks
}

//* REAL-WORLD APPLICATION IMPLEMENTATION

// Select your DOM elements
const singleInput = document.querySelector("#singleFileInput");
const multipleInput = document.querySelector("#multipleFileInput");
const imagePreview = document.querySelector("#previewImage");
const textDisplay = document.querySelector("#textDisplay");

/*
 * SCENARIO A: Single Image Upload with Persistent LocalStorage Caching
 */
singleInput.addEventListener("change", async (event) => {
  // 1. Safely extract the file
  const file = event.target.files[0];

  // Guard clause: Exit if the user clicks cancel
  if (!file) return;

  try {
    // 2. Validate the file (Must be JPEG/PNG and under 2MB)
    validateFile(file, ["image/jpeg", "image/png"], 2);

    console.log("Starting to read image file...");

    // 3. Await the modern promise wrapper instead of using callbacks
    const base64String = await readFileAsDataURL(file);

    // 4. Update the UI DOM element directly
    imagePreview.src = base64String;
    imagePreview.style.display = "block";

    // 5. Cache permanently in localStorage (Note: Keep files small! Limit is ~5MB total)
    localStorage.setItem("cached_profile_pic", base64String);
    console.log("Image successfully saved to LocalStorage!");
  } catch (error) {
    // Centralized error handling
    console.error("Upload Error:", error.message);
    alert(error.message);
  }
});

/*
 * SCENARIO B: Processing Multiple Files Simultaneously (Parallel execution)
 */
multipleInput.addEventListener("change", async (event) => {
  const files = Array.from(event.target.files); // Convert FileList map to an iterable Array
  if (files.length === 0) return;

  console.log(`Processing ${files.length} files concurrently...`);

  try {
    // Use Promise.all to read ALL files at the exact same time dynamically
    const readingPromises = files.map(async (file) => {
      // If it's an image, read as Data URL, if it's text, read as text
      if (file.type.startsWith("image/")) {
        const dataUrl = await readFileAsDataURL(file);
        return `[Image Content Generated for ${file.name}]`;
      } else if (file.type === "text/plain") {
        const textContent = await readFileAsText(file);
        return `[Text Content from ${file.name}]: ${textContent}`;
      }
      return `[Skipped file: ${file.name}]`;
    });

    // Wait for all file reads to finish executing
    const results = await Promise.all(readingPromises);

    // Output all results at once
    textDisplay.textContent = results.join("\n\n");
  } catch (error) {
    console.error("Batch Processing Error:", error);
  }
});

// 4. ADVANCED: READING MASSIVE FILES IN CHUNKS (SLICING)
/**
 * Reads a massive file chunk-by-chunk to prevent browser crashes.
 * @param {File} file
 */
async function readLargeFileInChunks(file) {
  const CHUNK_SIZE = 1024 * 1024; // 1MB per chunk
  let offset = 0;
  const reader = new FileReader();

  // Loop through the file until the offset reaches the end of the total file size
  while (offset < file.size) {
    // Slice out a 1MB piece of the file
    const chunk = file.slice(offset, offset + CHUNK_SIZE);

    // Wrap the standard FileReader event in a one-time promise for this chunk
    const chunkText = await new Promise((resolve) => {
      reader.onload = () => resolve(reader.result);
      reader.readAsText(chunk); // Read just this 1MB slice
    });

    // Process the chunk (e.g., append to a database, parse rows, etc.)
    console.log(
      `Processed chunk from byte ${offset} to ${offset + CHUNK_SIZE}`,
    );
    // doSomethingWithData(chunkText);

    // Move the pointer forward to the next chunk
    offset += CHUNK_SIZE;
  }

  console.log("Entire large file processed successfully!");
}

/*
 * ============================================================================
 * JAVASCRIPT MEMORY ARCHITECTURE: FILEREADER VS. OBJECT URL
 * ============================================================================
 */

const FILE_HANDLING_DIFFERENCES = [
  {
    Feature: "How it works",
    FileReader_DataURL:
      "Reads the entire file into a massive Base64 string in RAM.",
    URL_createObjectURL:
      "Creates a temporary, tiny pointer string pointing directly to the file in browser memory.",
  },
  {
    Feature: "Performance",
    FileReader_DataURL:
      "Slow for large files (causes UI lag due to main thread blocking).",
    URL_createObjectURL:
      "Blazing Fast (Instantaneous execution, regardless of file size).",
  },
  {
    Feature: "Memory Cost",
    FileReader_DataURL:
      "High (Increases the original file size by roughly 33% in RAM).",
    URL_createObjectURL:
      "Near Zero (It is just a text reference pointer to the existing Blob).",
  },
  {
    Feature: "Best Use Case",
    FileReader_DataURL:
      "When you need to SAVE the file to localStorage or transmit it as a string.",
    URL_createObjectURL:
      "When you just need a TEMPORARY preview on the screen (e.g., image upload preview).",
  },
  {
    Feature: "Lifecycle / Cleanup",
    FileReader_DataURL:
      "Garbage collected naturally when the variable goes out of scope.",
    URL_createObjectURL:
      "Requires manual memory management via 'URL.revokeObjectURL(url)' to avoid leaks.",
  },
];
