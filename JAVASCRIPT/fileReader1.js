// ============================================================================
// CHAPTER 1
// Topics Covered
//
// 1. File Input
// 2. File Object
// 3. FileList
// 4. FileReader
// 5. readAsDataURL()
// 6. Image Preview
// 7. Video Preview
// 8. Multiple Images
// 9. File Information
// 10. Common Mistakes
// ============================================================================

// ============================================================================
// SECTION 1: Selecting HTML Elements
// ============================================================================
// Select the image file input
const imageInput = document.querySelector("#image");

// Select the video file input
const videoInput = document.querySelector("#video");

// Image preview element
const image = document.querySelector("#previewImage");

// Video preview element
const video = document.querySelector("#previewVideo");

// ============================================================================
// SECTION 2: What is input.files
// ============================================================================
// Every <input type="file"> has a "files" property.
// It returns a FileList.

// Example:
// input.files
// FileList(3)
// 0 -> cat.jpg
// 1 -> dog.jpg
// 2 -> house.png

console.log(imageInput.files);

// ============================================================================
// SECTION 3: Accessing One File
// ============================================================================
// files[0] means: Give me the FIRST selected file.

// DO NOT DO THIS BEFORE THE USER CHOOSES A FILE
const file = imageInput.files[0];

// ============================================================================
// SECTION 4: Waiting For User To Choose A File
// ============================================================================
imageInput.addEventListener("change", () => {
  console.log("User selected a file");
});

// ============================================================================
// SECTION 5: Getting The File Object
// ============================================================================
imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  console.log(file);
});

// ============================================================================
// SECTION 6: Exploring The File Object
// ============================================================================
imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  console.log(file.name);
  console.log(file.size);
  console.log(file.type);
  console.log(file.lastModified);
});

// ============================================================================
// SECTION 7: Creating A FileReader
// ============================================================================
// FileReader reads the CONTENTS of a file.
// It DOES NOT automatically read.
// You must tell it WHAT to read.

imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];

  const reader = new FileReader();
  console.log(reader);
});

// ============================================================================
// SECTION 8: readAsDataURL()
// ============================================================================
// Converts: picture.jpg into data:image/jpeg;base64,......
// This can be placed directly into: img.src or stored in localStorage.

imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];

  const reader = new FileReader();
  reader.readAsDataURL(file);
});

// ============================================================================
// SECTION 9: Why reader.onload ?
// ============================================================================
// Reading takes time.
// JavaScript DOES NOT wait.
// Therefore use: reader.onload

imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];

  const reader = new FileReader();

  reader.onload = () => {
    console.log("Finished Reading");
  };

  reader.readAsDataURL(file);
});

// ============================================================================
// SECTION 10: reader.result
// ============================================================================
// After reading finishes,the result contains the Base64 string.
// reader.result

imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];

  const reader = new FileReader();

  reader.onload = () => {
    console.log(reader.result);
  };

  reader.readAsDataURL(file);
});

// ============================================================================
// SECTION 11: Showing Image Preview
// ============================================================================
imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];

  const reader = new FileReader();

  reader.onload = () => {
    image.src = reader.result;
  };

  reader.readAsDataURL(file);
});

// ============================================================================
// SECTION 12: Saving Image In localStorage
// ============================================================================
imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];

  const reader = new FileReader();

  reader.onload = () => {
    image.src = reader.result;

    localStorage.setItem("image", reader.result);
  };

  reader.readAsDataURL(file);
});

// ============================================================================
// SECTION 13: Restoring Saved Image
// ============================================================================
window.addEventListener("DOMContentLoaded", () => {
  const savedImage = localStorage.getItem("image");

  if (savedImage) {
    image.src = savedImage;
  }
});

// ============================================================================
// SECTION 14: Previewing A Video
// ============================================================================
// Videos can also be converted into Data URLs.
// This works exactly like images.
// NOTE: Very large videos should NOT be stored inside localStorage.

videoInput.addEventListener("change", () => {
  const file = videoInput.files[0];

  const reader = new FileReader();

  reader.onload = () => {
    video.src = reader.result;
  };

  reader.readAsDataURL(file);
});

// ============================================================================
// SECTION 15: Reading Multiple Images
// ============================================================================
imageInput.addEventListener("change", () => {
  for (const file of imageInput.files) {
    console.log(file.name);
  }
});

// ============================================================================
// SECTION 16: Multiple Image Preview
// ============================================================================
imageInput.addEventListener("change", () => {
  for (const file of imageInput.files) {
    const reader = new FileReader();

    reader.onload = () => {
      const img = document.createElement("img");

      img.src = reader.result;
      img.width = 200;
      document.body.append(img);
    };

    reader.readAsDataURL(file);
  }
});

// ============================================================================
// SECTION 17: Checking File Type
// ============================================================================
imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];

  if (file.type.startsWith("image/")) {
    console.log("This is an image.");
  }
});

// ============================================================================
// SECTION 18: Checking File Size
// ============================================================================
imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];

  if (file.size > 5 * 1024 * 1024) {
    alert("File is larger than 5MB.");
  }
});

// ============================================================================
// SECTION 19: Common Mistake
// ============================================================================
// WRONG
const reader = new FileReader();
reader.readAsDataURL(file);
console.log(reader.result);
//
// Result: null
// because reading hasn't finished.

// ============================================================================
// SECTION 20: Correct
// ============================================================================
imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];

  const reader = new FileReader();

  reader.onload = () => {
    console.log(reader.result);
  };

  reader.readAsDataURL(file);
});

// ============================================================================
// CHAPTER 2
// readAsText()
//
// Topics Covered
//
// 1. readAsText()
// 2. Reading TXT files
// 3. Reading JSON files
// 4. Parsing JSON
// 5. Reading CSV files
// 6. Displaying text
// 7. File encoding
// 8. Common mistakes
// ============================================================================

// ============================================================================
// SECTION 1: HTML Needed
// ============================================================================
// HTML
<div>
  <input type="file" id="textFile" />
  <pre id="output"></pre>
</div>;

// JS
const input = document.querySelector("#textFile");
const output = document.querySelector("#output");

// ============================================================================
// SECTION 2: Reading Any Text File
// ============================================================================
input.addEventListener("change", () => {
  const file = input.files[0];

  const reader = new FileReader();

  reader.onload = () => {
    console.log(reader.result);
  };

  reader.readAsText(file);
});

// ============================================================================
// SECTION 3: Showing The File On The Page
// ============================================================================
input.addEventListener("change", () => {
  const file = input.files[0];

  const reader = new FileReader();

  reader.onload = () => {
    output.textContent = reader.result;
  };

  reader.readAsText(file);
});

// ============================================================================
// SECTION 4: What Does reader.result Contain?
// ============================================================================
// hello.txt
// Hello Eric
//
// reader.result
// "Hello Eric"

input.addEventListener("change", () => {
  const file = input.files[0];

  const reader = new FileReader();

  reader.onload = () => {
    console.log(typeof reader.result);

    console.log(reader.result);
  };

  reader.readAsText(file);
});

// ============================================================================
// SECTION 5: Reading HTML Files
// ============================================================================
input.addEventListener("change", () => {
  const file = input.files[0];

  const reader = new FileReader();

  reader.onload = () => {
    console.log(reader.result);
  };

  reader.readAsText(file);
});

// ============================================================================
// SECTION 6: Reading CSS Files
// ============================================================================
input.addEventListener("change", () => {
  const file = input.files[0];

  const reader = new FileReader();

  reader.onload = () => {
    console.log(reader.result);
  };

  reader.readAsText(file);
});

// ============================================================================
// SECTION 7: Reading JavaScript Files
// ============================================================================
input.addEventListener("change", () => {
  const file = input.files[0];

  const reader = new FileReader();

  reader.onload = () => {
    console.log(reader.result);
  };

  reader.readAsText(file);
});

// ============================================================================
// SECTION 8: Reading JSON Files
// ============================================================================
// person.json
// {
//     "name":"Eric",
//     "age":23
// }

input.addEventListener("change", () => {
  const file = input.files[0];

  const reader = new FileReader();

  reader.onload = () => {
    console.log(reader.result);
  };

  reader.readAsText(file);
});

// ============================================================================
// SECTION 9: Parsing JSON
// ============================================================================
// readAsText()
// returns TEXT.
//
// JSON.parse()
// converts it into an object.

input.addEventListener("change", () => {
  const file = input.files[0];

  const reader = new FileReader();

  reader.onload = () => {
    const person = JSON.parse(reader.result);
    console.log(person);
    console.log(person.name);
    console.log(person.age);
  };

  reader.readAsText(file);
});

// ============================================================================
// SECTION 10: Safe JSON Parsing
// ============================================================================
input.addEventListener("change", () => {
  const file = input.files[0];

  const reader = new FileReader();

  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);

      console.log(data);
    } catch {
      console.log("Invalid JSON");
    }
  };

  reader.readAsText(file);
});

// ============================================================================
// SECTION 11: Reading CSV Files
// ============================================================================
(name, age);
(Eric, 23);
(John, 30);

input.addEventListener("change", () => {
  const file = input.files[0];

  const reader = new FileReader();

  reader.onload = () => {
    console.log(reader.result);
  };

  reader.readAsText(file);
});

// ============================================================================
// SECTION 12: Splitting CSV Into Lines
// ============================================================================
input.addEventListener("change", () => {
  const file = input.files[0];

  const reader = new FileReader();

  reader.onload = () => {
    const rows = reader.result.split("\n");
    console.log(rows);
  };

  reader.readAsText(file);
});

// ============================================================================
// SECTION 13: Loop Through CSV Rows
// ============================================================================
input.addEventListener("change", () => {
  const file = input.files[0];

  const reader = new FileReader();

  reader.onload = () => {
    const rows = reader.result.split("\n");

    for (const row of rows) {
      console.log(row);
    }
  };

  reader.readAsText(file);
});

// ============================================================================
// SECTION 14: Reading UTF-8 (Default)
// ============================================================================
input.addEventListener("change", () => {
  const file = input.files[0];

  const reader = new FileReader();

  reader.onload = () => {
    console.log(reader.result);
  };

  reader.readAsText(file, "UTF-8");
});

// ============================================================================
// SECTION 15: Check If User Selected A File
// ============================================================================
input.addEventListener("change", () => {
  const file = input.files[0];

  if (!file) {
    console.log("No file selected.");
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    console.log(reader.result);
  };

  reader.readAsText(file);
});

// ============================================================================
// SECTION 16: Display File Information
// ============================================================================

input.addEventListener("change", () => {
  const file = input.files[0];
  console.log(file.name);
  console.log(file.type);
  console.log(file.size);
  console.log(file.lastModified);
});

// ============================================================================
// SECTION 17: Common Mistake
// ============================================================================
// WRONG
reader.result;
// before onload
const reader = new FileReader();
reader.readAsText(file);
console.log(reader.result);

// ============================================================================
// SECTION 18: Correct
// ============================================================================
input.addEventListener("change", () => {
  const file = input.files[0];

  const reader = new FileReader();

  reader.onload = () => {
    console.log(reader.result);
  };

  reader.readAsText(file);
});

// ============================================================================
// SECTION 19: Difference Between readAsText() and readAsDataURL()
// ============================================================================
// readAsText()
// Returns: "Hello World"
// Use For: TXT, JSON, CSV, HTML, CSS and JS

// readAsDataURL()
// Returns: data:image/png;base64,...
// Use For: Images, Videos and Audio

// ============================================================================
// SECTION 20: Mini Project
// ============================================================================
// Select a .txt file and display its contents.
input.addEventListener("change", () => {
  const file = input.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    output.textContent = reader.result;
  };

  reader.readAsText(file);
});

// ============================================================================
// CHAPTER 3
// readAsArrayBuffer()
//
// Topics
//
// 1. Reading binary files
// 2. ArrayBuffer
// 3. Uint8Array
// 4. Looping through bytes
// 5. Reading PDFs
// 6. Reading Images
// 7. Reading Videos
// 8. Reading Audio
// 9. File size
// 10. Common mistakes
// ============================================================================

// HTML
<input type="file" id="file" />;

const input = document.querySelector("#file");

// ============================================================================
// SECTION 1: Reading a file as an ArrayBuffer
// ============================================================================
input.addEventListener("change", () => {
  const file = input.files[0];

  const reader = new FileReader();

  reader.onload = () => {
    console.log(reader.result);
  };

  reader.readAsArrayBuffer(file);
});

// ============================================================================
// SECTION 2: reader.result is an ArrayBuffer
// ============================================================================
input.addEventListener("change", () => {
  const file = input.files[0];

  const reader = new FileReader();

  reader.onload = () => {
    console.log(reader.result instanceof ArrayBuffer);
  };

  reader.readAsArrayBuffer(file);
});

// ============================================================================
// SECTION 3: File size
// ============================================================================
input.addEventListener("change", () => {
  const file = input.files[0];

  console.log(file.size);
});

// ============================================================================
// SECTION 4: Convert ArrayBuffer into Uint8Array
// ============================================================================
// Uint8Array lets us see every byte.
input.addEventListener("change", () => {
  const file = input.files[0];

  const reader = new FileReader();

  reader.onload = () => {
    const bytes = new Uint8Array(reader.result);

    console.log(bytes);
  };

  reader.readAsArrayBuffer(file);
});

// ============================================================================
// SECTION 5: Accessing individual bytes
// ============================================================================
reader.onload = () => {
  const bytes = new Uint8Array(reader.result);

  console.log(bytes[0]);
  console.log(bytes[1]);
  console.log(bytes[2]);
};

// ============================================================================
// SECTION 6: Looping through bytes
// ============================================================================
reader.onload = () => {
  const bytes = new Uint8Array(reader.result);

  for (const byte of bytes) {
    console.log(byte);
  }
};

// ============================================================================
// SECTION 7: First 20 bytes
// ============================================================================
reader.onload = () => {
  const bytes = new Uint8Array(reader.result);

  console.log(bytes.slice(0, 20));
};

// ============================================================================
// SECTION 8: Reading a PDF
// ============================================================================
input.accept = ".pdf";

input.addEventListener("change", () => {
  const file = input.files[0];

  const reader = new FileReader();

  reader.onload = () => {
    console.log(new Uint8Array(reader.result));
  };

  reader.readAsArrayBuffer(file);
});

// ============================================================================
// SECTION 9: Reading an Image
// ============================================================================
input.accept = "image/*";

input.addEventListener("change", () => {
  const file = input.files[0];

  const reader = new FileReader();

  reader.onload = () => {
    const bytes = new Uint8Array(reader.result);
    console.log(bytes);
  };

  reader.readAsArrayBuffer(file);
});

// ============================================================================
// SECTION 10: Reading Audio
// ============================================================================
input.accept = "audio/*";

// ============================================================================
// SECTION 11: Reading Video
// ============================================================================
input.accept = "video/*";

// ============================================================================
// SECTION 12: Total number of bytes
// ============================================================================
reader.onload = () => {
  const bytes = new Uint8Array(reader.result);
  console.log(bytes.length);
};

// ============================================================================
// SECTION 13: Common mistake
// ============================================================================
// WRONG
console.log(reader.result);
// before reading finishes.

// ============================================================================
// SECTION 14: Correct
// ============================================================================
reader.onload = () => {
  console.log(reader.result);
};

// ============================================================================
// SECTION 15: Real-world use
// ============================================================================
// Upload PDF
// Read bytes
// Send bytes to server
// or
// Encrypt
// or
// Compress
// or
// Analyze binary data

// ============================================================================
// CHAPTER 4
// FileReader Events & Properties
//
// Topics
//
// 1. loadstart
// 2. progress
// 3. load
// 4. error
// 5. abort
// 6. loadend
// 7. readyState
// 8. result
// 9. error property
// 10. abort()
// ============================================================================

// HTML
<input type="file" id="file" />;

const input = document.querySelector("#file");

input.addEventListener("change", () => {
  const file = input.files[0];

  if (!file) return;

  const reader = new FileReader();

  // =========================================================================
  // loadstart
  // Fires once.
  // Reading has STARTED.
  // =========================================================================

  reader.onloadstart = () => {
    console.log("Reading started");
  };

  // =========================================================================
  // progress
  // Fires MANY TIMES while reading.
  // Useful for progress bars.
  // =========================================================================

  reader.onprogress = (event) => {
    console.log("Loaded:", event.loaded);
    console.log("Total :", event.total);
  };

  // =========================================================================
  // load
  // Reading completed successfully.
  // =========================================================================

  reader.onload = () => {
    console.log("Finished reading");
    console.log(reader.result);
  };

  // =========================================================================
  // error
  // Something failed.
  // =========================================================================

  reader.onerror = () => {
    console.log("Something went wrong.");
    console.log(reader.error);
  };

  // =========================================================================
  // abort
  // Fires if reading was cancelled.
  // =========================================================================

  reader.onabort = () => {
    console.log("Reading cancelled.");
  };

  // =========================================================================
  // loadend
  // Always runs LAST.
  // Whether success, failure or abort.
  // =========================================================================

  reader.onloadend = () => {
    console.log("Reader finished.");
  };

  // Read file

  reader.readAsDataURL(file);
});

// SECTION 3 - EVENT ORDER
/** 
* *  Whenever you read a file successfully, the events happen like this:
User selects file
    ↓
loadstart
    ↓
progress
    ↓
progress
    ↓
progress
    ↓
load
    ↓
loadend

* * If something goes wrong:
loadstart
    ↓
progress
    ↓
error
    ↓
loadend

* *  If you cancel it:
loadstart
    ↓
progress
    ↓
abort
    ↓
loadend
*/

// SECTION 3 — readyState
// FileReader has a property called
reader.readyState;

// It tells you the current state.
/** 
0 = EMPTY
    ↓
1 = LOADING
    ↓
2 = DONE
*/

// Example
const reader = new FileReader();
console.log(reader.readyState); // 0

// During reading
reader.onloadstart = () => {
  console.log(reader.readyState);
};

// After finishing
reader.onload = () => {
  console.log(reader.readyState);
};

// SECTION 4 — reader.result
// Before reading
console.log(reader.result); // null

// After reading
reader.onload = () => {
  console.log(reader.result);
};
// Now it contains: Text, Base64 and ArrayBuffer depending on which method you used.

// SECTION 5 — reader.error
// If reading fails
reader.onerror = () => {
  console.log(reader.error);
};
// reader.error contains the reason.

// SECTION 6 — abort()
// You can stop reading.
const reader = new FileReader();
reader.readAsDataURL(file);
reader.abort();

// This triggers
reader.onabort = () => {
  console.log("Cancelled");
};

// =================== READING PROGRESS BAR ===================
const progress = document.querySelector("progress");

reader.onprogress = (event) => {
  if (event.lengthComputable) {
    progress.max = event.total;

    progress.value = event.loaded;
  }
};
// HTML
<progress></progress>;
// Now the progress bar fills while the file is being read.

// =================== COMPLETE LIFECYCLE ===================
/**
Create FileReader
    ↓
Choose readAs...
    ↓
loadstart
    ↓
progress
    ↓
progress
    ↓
progress
    ↓
load
    ↓
loadend
 */

// =================== COMMON MISTAKES ===================
// Reading before the user selects a file
const file = input.files[0];

// Accessing reader.result too early
reader.readAsText(file);
console.log(reader.result);

// Forgetting to handle errors
reader.onerror = () => {
  console.log(reader.error);
};

// Calling abort() after reading has already finished
reader.onload = () => {
  reader.abort(); // Too late
};

/** 
=================== SUMMARY TABLE ===================
EVENT/PROPERTY               PURPOSE
onloadstart                  Reading has started
onprogress                   Reading is in progress
onload                       Reading completed successfully
onerror                      Reading failed
onabort                      Reading was cancelled
onloadend                    Always runs at the end
result                       The data that was read
error                        The error object if reading failed
readyState                   Current reading state (0, 1, 2)
abort()                      Cancel reading
*/

// ======================================================================================================================================
// REAL WORLD PROJECT
// ======================================================================================================================================

// ============================================================================
// PROJECT 1: Image Preview
// ============================================================================
// HTML
<div>
  <input type="file" id="image" accept="image/*" />
  <img id="preview" width="300"></img>
</div>;

// JS
const input = document.querySelector("#image");
const image = document.querySelector("#preview");

input.addEventListener("change", () => {
  const file = input.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    image.src = reader.result;
  };

  reader.readAsDataURL(file);
});

// ============================================================================
// PROJECT 2: Save image in localStorage
// ============================================================================
const input = document.querySelector("#image");
const image = document.querySelector("#preview");

window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("image");

  if (saved) {
    image.src = saved;
  }
});

input.addEventListener("change", () => {
  const file = input.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    image.src = reader.result;

    localStorage.setItem("image", reader.result);
  };

  reader.readAsDataURL(file);
});

// ============================================================================
// PROJECT 3: Multiple Image Gallery
// ============================================================================
// HTML
<div>
  <input type="file" multiple id="gallery" />
  <div id="images"></div>
</div>;

// JS
const gallery = document.querySelector("#gallery");
const container = document.querySelector("#images");

gallery.addEventListener("change", () => {
  container.innerHTML = "";
  for (const file of gallery.files) {
    const reader = new FileReader();

    reader.onload = () => {
      const img = document.createElement("img");
      img.src = reader.result;
      img.width = 200;
      container.append(img);
    };
    reader.readAsDataURL(file);
  }
});

// ============================================================================
// PROJECT 4: Read JSON File
// ============================================================================
// Suppose the file contains
const user = { name: "Eric", age: 23, country: "Ghana" };

// HTML
<div>
  <input type="file" id="json" />
</div>;

// JS
const input = document.querySelector("#json");

input.addEventListener("change", () => {
  const file = input.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    const user = JSON.parse(reader.result);
    console.log(user);
    console.log(user.name);
    console.log(user.age);
    console.log(user.country);
  };

  reader.readAsText(file);
});

// ============================================================================
// PROJECT 5: CSV Reader
// ============================================================================
// CSV
(Name, Age);
(Eric, 23);
(John, 30);
(Mike, 40);

// JS
const input = document.querySelector("input");

input.addEventListener("change", () => {
  const file = input.files[0];

  const reader = new FileReader();

  reader.onload = () => {
    const rows = reader.result.split("\n");
    rows.forEach((row) => {
      console.log(row.split(","));
    });
  };

  reader.readAsText(file);
});

// ============================================================================
// PROJECT 6: PDF Information
// ============================================================================
const input = document.querySelector("input");

input.addEventListener("change", () => {
  const file = input.files[0];
  console.log(file.name);
  console.log(file.size);
  console.log(file.type);
});

// ============================================================================
// PROJECT 7: Audio Preview
// ============================================================================
// HTML
<div>
  <input type="file" id="audio" />
  <audio controls id="player"></audio>
</div>;

// JS
const input = document.querySelector("#audio");
const player = document.querySelector("#player");

input.addEventListener("change", () => {
  const file = input.files[0];

  const reader = new FileReader();

  reader.onload = () => {
    player.src = reader.result;
  };

  reader.readAsDataURL(file);
});

// ============================================================================
// PROJECT 8: Video Preview
// ============================================================================
// HTML
<div>
  <input type="file" id="video" />
  <video controls width="500" id="player"></video>
</div>;

// JS
const input = document.querySelector("#video");
const player = document.querySelector("#player");

input.addEventListener("change", () => {
  const file = input.files[0];

  const reader = new FileReader();

  reader.onload = () => {
    player.src = reader.result;
  };

  reader.readAsDataURL(file);
});

// ============================================================================
// PROJECT 9: Validate File Type
// ============================================================================
const file = input.files[0];

if (!file.type.startsWith("image/")) {
  alert("Only images allowed.");

  return;
}

// ============================================================================
// PROJECT 10: Validate File Size
// ============================================================================
// Maximum 2 MB
const MAX_SIZE = 2 * 1024 * 1024;

if (file.size > MAX_SIZE) {
  alert("Image too large.");

  return;
}

// ============================================================================
// PROJECT 11: Upload to Server (Using FormData)
// ============================================================================
// This is how files are uploaded in real projects.
const input = document.querySelector("input");

input.addEventListener("change", async () => {
  const file = input.files[0];

  const formData = new FormData();

  formData.append("image", file);

  await fetch("/upload", {
    method: "POST",
    body: formData,
  });
});

// ============================================================================
// PROJECT 12: Upload Image + Preview
// ============================================================================
// This is the most common real-world pattern
const input = document.querySelector("input");
const image = document.querySelector("img");

input.addEventListener("change", async () => {
  const file = input.files[0];

  const reader = new FileReader();

  reader.onload = () => {
    image.src = reader.result;
  };

  reader.readAsDataURL(file);

  const formData = new FormData();
  formData.append("image", file);

  await fetch("/upload", {
    method: "POST",
    body: formData,
  });
});

// ======================================================================================================================================
// PROFESSIONAL DECISION GUIDE
// ======================================================================================================================================
// One of the biggest questions beginners have is "Which one should I use?"
/**
SITUATION                                        USE
Preview an image                                 FileReader.readAsDataURL()
Preview a video                                  FileReader.readAsDataURL() or URL.createObjectURL()
Read a text file                                 readAsText()
Read JSON                                        readAsText() + JSON.parse()
Read CSV                                         readAsText()
Read raw binary (PDF, ZIP, encryption)           readAsArrayBuffer()
Upload a file to a server                        FormData
Store an image in localStorage                   readAsDataURL()
Temporary preview only                           URL.createObjectURL()
 */
