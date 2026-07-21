// URL.createObjectURL() is a static method that takes a File, Blob (Binary Large Object), or MediaSource object and generates a unique, temporary URL string (starting with blob:). This URL represents the specific object in memory and allows you to use it just like a regular web URL (e.g., as the src of an <img> tag or the href of an <a> tag) without needing to upload the file to a server first.

// ==========================================
// 1. BASIC USAGE OF URL.createObjectURL()
// ==========================================

// Assume 'fileFromInput' is a File object obtained from an <input type="file">
function handleFileSelection(fileFromInput) {
  // URL.createObjectURL() takes a Blob or File and creates a DOMString.
  // The string looks like: "blob:http://localhost:3000/d39543f2-1b12-4212-b9b2-290bb35bf1c1"
  const objectURL = URL.createObjectURL(fileFromInput);

  console.log("Generated Temporary URL:", objectURL);

  // You can now assign this directly to an image element to preview it immediately!
  // myImageElement.src = objectURL;

  return objectURL;
}

// ==========================================
// 2. CRITICAL CONCEPT: MEMORY MANAGEMENT (URL.revokeObjectURL)
// ==========================================

function cleanupObjectURL(objectURL) {
  /**
   * RELATED CONCEPT 1: URL.revokeObjectURL()
   * * Why is this important?
   * Every time you call URL.createObjectURL(), the browser keeps that file/blob mapped
   * in memory so the URL stays valid. It will NOT be garbage-collected automatically
   * until the document is closed (page unload).
   * * To prevent massive memory leaks (especially with large videos or many images),
   * you must explicitly tell the browser to release the reference once you are done using it.
   */
  URL.revokeObjectURL(objectURL);
  console.log("Memory freed for URL:", objectURL);
}

// ==========================================
// 3. RELATED CONCEPTS & ALTERNATIVES
// ==========================================

/**
 * RELATED CONCEPT 2: Blobs and Files
 * - A 'Blob' (Binary Large Object) represents immutable, raw data.
 * - A 'File' is a specific type of Blob that has a name, last modified date, and system metadata.
 * URL.createObjectURL exclusively works with Blobs, Files, or MediaSource streams.
 */
const sampleBlob = new Blob(["Hello, World!"], { type: "text/plain" });
const blobURL = URL.createObjectURL(sampleBlob);

/**
 * RELATED CONCEPT 3: FileReader API (The main alternative)
 * While URL.createObjectURL() creates a direct synchronous pointer to a memory object,
 * the FileReader API asynchronously reads the actual file data into different formats.
 * * When to use which?
 * - Use URL.createObjectURL() for performance and speed (it is instantaneous because it doesn't read data).
 * - Use FileReader if you need to manipulate the actual bytes or send the raw base64 string to a database.
 */
function alternativeWithFileReader(fileFromInput) {
  const reader = new FileReader();

  reader.onload = function (event) {
    // This generates a long Base64 Data URL: "data:image/png;base64,iVBORw0KGgoAAA..."
    const dataURL = event.target.result;
    console.log("Base64 Data URL generated asynchronously");
  };

  reader.readAsDataURL(fileFromInput); // Un-comment to read as base64
  reader.readAsText(fileFromInput); // Un-comment to read plain text files
}
