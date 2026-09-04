function test(event) {
  event.preventDefault();

  console.log("event:", event);
  console.log("type:", event.type);
  console.log("key:", event.key);
  console.log("code:", event.code);
  console.log("ctrl:", event.ctrlKey);
  console.log("shift:", event.shiftKey);
  console.log("alt:", event.altKey);
  console.log("meta:", event.metaKey);

  if (event.key === "Enter") {
    console.log(`${event.key} was pressed`);
  }

  if (event.key === "Escape") {
    console.log(`${event.key} was pressed`);
  }

  if ((event.ctrlKey || event.metaKey) && event.key === "s") {
    console.log("Save in progress");
  }
}

window.addEventListener("keydown", test);
