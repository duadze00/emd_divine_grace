const codeEl = document.getElementById("code");
const verifyInput = document.getElementById("verify");
const timeLeftEl = document.getElementById("time-left");
const timerBar = document.getElementById("timer-bar");
const statusMsg = document.getElementById("status-message");
const resendBtn = document.getElementById("resend-btn");

const DURATION_SECONDS = 60;
let verifyCode = null;
let expiresAt = null;
let intervalID = null;

const startVerificationFlow = () => {
  // Reset state & UI
  clearInterval(intervalID);
  verifyInput.disabled = false;
  verifyInput.value = "";
  verifyInput.focus();
  statusMsg.textContent = "";
  statusMsg.className = "status-message";
  resendBtn.disabled = true;

  // Generate code & expiration timestamp
  verifyCode = Math.floor(10000 + Math.random() * 90000);
  codeEl.textContent = verifyCode;
  expiresAt = Date.now() + DURATION_SECONDS * 1000;

  // Run initial tick
  updateTimer();

  // Start 1-second interval loop for live UI countdown
  intervalID = setInterval(updateTimer, 1000);
};

const updateTimer = () => {
  const remainingMs = expiresAt - Date.now();
  const remainingSec = Math.ceil(remainingMs / 1000);

  if (remainingSec <= 0) {
    handleExpiration();
    return;
  }

  // Update timer display & visual progress bar
  timeLeftEl.textContent = remainingSec;
  const progressPercent = (remainingSec / DURATION_SECONDS) * 100;
  timerBar.style.width = `${progressPercent}%`;

  if (remainingSec <= 10) {
    timerBar.style.backgroundColor = "#f87171";
  } else {
    timerBar.style.backgroundColor = "#38bdf8";
  }
};

const handleExpiration = () => {
  clearInterval(intervalID);
  codeEl.textContent = "-----";
  timeLeftEl.textContent = "0";
  timerBar.style.width = "0%";
  verifyInput.disabled = true;
  resendBtn.disabled = false;
  statusMsg.textContent = "Code expired. Please request a new one.";
  statusMsg.className = "status-message error";
};

// Input validation event
verifyInput.addEventListener("input", () => {
  const userCode = Number(verifyInput.value.trim());

  if (verifyInput.value.trim().length === 5) {
    if (userCode === verifyCode && Date.now() < expiresAt) {
      clearInterval(intervalID);
      statusMsg.textContent = "Verification successful! Redirecting...";
      statusMsg.className = "status-message success";
      verifyInput.disabled = true;

      setTimeout(() => {
        window.location.href = "next-page.html";
      }, 1200);
    } else if (Date.now() < expiresAt) {
      statusMsg.textContent = "Invalid code. Please check and try again.";
      statusMsg.className = "status-message error";
    }
  } else {
    statusMsg.textContent = "";
  }
});

resendBtn.addEventListener("click", startVerificationFlow);

// Initialize on load
startVerificationFlow();
