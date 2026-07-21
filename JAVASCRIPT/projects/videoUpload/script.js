const input = document.querySelector("input");
const button = document.querySelector("button");
const source = document.querySelector("p");
const video = document.querySelector("video");

// METHOD ONE
button.addEventListener("click", () => {
  const file = input.files[0];

  if (!file) {
    source.textContent = "Please select a video first";
    return;
  }

  const videoURL = URL.createObjectURL(file);
  source.textContent = videoURL;
  video.src = videoURL;
  video.play();
});

// METHOD TWO
input.addEventListener("change", () => {
  const file = input.files[0];

  if (!file) return;

  const videoURL = URL.createObjectURL(file);
  video.src = videoURL;
  video.play();
});

// METHOD THREE
input.addEventListener("change", (event) => {
  const file = event.target.files[0];

  if (!file) return;

  video.src = URL.createObjectURL(file);
});

// METHOD FOUR
input.addEventListener("change", () => {
  console.log(input.files);

  const file = input.files[0];

  if (!file) {
    console.log("No file selected");
    return;
  }

  console.log(file);
  const url = URL.createObjectURL(file);
  console.log(url);
  
  video.src = url;
  video.load();
});
