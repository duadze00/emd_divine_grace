const nameInput = document.getElementById("username");
const copyBtn = document.getElementById("copy");
const pasteBtn = document.getElementById("paste");
const para = document.getElementById("para");

copyBtn.addEventListener("click", async () => {
  const content = nameInput.value.trim();
  await navigator.clipboard.writeText(content);
});

pasteBtn.addEventListener("click", async () => {
  const content = await navigator.clipboard.readText();
  para.textContent = content;
});

// Copy text
navigator.clipboard.writeText("Hello");

// Read text
navigator.clipboard.readText();

// Copy complex data (images, files)
// This is when write() is used.
navigator.clipboard.write([
  new ClipboardItem({
    "text/plain": new Blob(["Hello"], {
      type: "text/plain",
    }),
  }),
]);

// ================ REAL WORLD USAGE ================
// Copy referral code:
copyBtn.addEventListener("click", async () => {
  const content = nameInput.value.trim();
  await navigator.clipboard.writeText(content);
  alert("Copied!");
});

// Copy URL:
copyBtn.addEventListener("click", async () => {
  await navigator.clipboard.writeText(window.location.href);
});

// Read clipboard after user clicks Paste button:
pasteBtn.addEventListener("click", async () => {
  const text = await navigator.clipboard.readText();
  para.textContent = text;
});
