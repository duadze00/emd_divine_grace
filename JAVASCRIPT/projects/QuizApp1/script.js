import { questions } from "../quizApp/questions.js";

// DOM Elements
const startScreen = document.getElementById("start-screen");
const resultScreen = document.getElementById("result-screen");
const quizScreen = document.getElementById("quiz-screen");
const questionEl = document.getElementById("question");
const answersContainer = document.getElementById("answer-btn-container");
const progressBarContainer = document.getElementById("progress-bar");
const progress = document.getElementById("progress");
const startQuizBtn = document.getElementById("start-quiz");
const restartQuizBtn = document.getElementById("restart-quiz");
const startEl = document.getElementById("start");
const endEl = document.getElementById("end");
const scoreEl = document.getElementById("score");
const totalScoreEl = document.getElementById("total-score");
const totalQuestionsEl = document.getElementById("total-question");
const percentageEl = document.getElementById("percent");

// Quiz State
let currentQuestion = 0;
let score = 0;
const totalQuestions = questions.length;

// EVENT LISTENERS
startQuizBtn.addEventListener("click", startQuiz);
restartQuizBtn.addEventListener("click", restartQuiz);
answersContainer.addEventListener("click", selectedAnswer);

// FUNCTIONS
function startQuiz() {
  currentQuestion = 0;
  score = 0;

  startScreen.classList.remove("active");
  resultScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function restartQuiz() {
  startQuiz();
}

function showQuestion() {
  // Clear previous options
  answersContainer.innerHTML = "";

  // Update Progress Bar & A11y Attributes
  const progressWidth = ((currentQuestion + 1) / totalQuestions) * 100;
  progress.style.width = `${progressWidth}%`;
  if (progressBarContainer) {
    progressBarContainer.setAttribute(
      "aria-valuenow",
      Math.round(progressWidth),
    );
  }

  // Update Tracker Info
  scoreEl.textContent = score;
  startEl.textContent = currentQuestion + 1;
  endEl.textContent = totalQuestions;

  // Render Question Text
  questionEl.textContent = questions[currentQuestion].question;

  // Render Option Buttons
  questions[currentQuestion].options.forEach((answer, index) => {
    const answerBtn = document.createElement("button");
    answerBtn.className = "answer-btn";
    answerBtn.dataset.index = index;
    answerBtn.textContent = answer;

    answersContainer.appendChild(answerBtn);
  });
}

function selectedAnswer(event) {
  const selectedButton = event.target;

  // Safeguard: Ignore clicks on the container background/padding
  if (!selectedButton.classList.contains("answer-btn")) return;

  const buttons = answersContainer.querySelectorAll(".answer-btn");

  // Disable all buttons immediately to prevent multiple clicks
  buttons.forEach((btn) => (btn.disabled = true));

  const correctAnswerIndex = questions[currentQuestion].answer;
  const selectedIndex = Number(selectedButton.dataset.index);

  if (selectedIndex === correctAnswerIndex) {
    // User selected correctly
    selectedButton.classList.add("correct");
    score += 1;
    scoreEl.textContent = score;
  } else {
    // User selected incorrectly -> mark clicked button red...
    selectedButton.classList.add("incorrect");

    // ...AND find & highlight the actual correct button in green!
    buttons.forEach((btn) => {
      if (Number(btn.dataset.index) === correctAnswerIndex) {
        btn.classList.add("correct");
      }
    });
  }

  // Transition to next question or results screen after 1.5s
  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < totalQuestions) {
      showQuestion();
    } else {
      showResult();
    }
  }, 1500);
}

function showResult() {
  startScreen.classList.remove("active");
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  totalScoreEl.textContent = score;
  totalQuestionsEl.textContent = totalQuestions;

  const percentage = Math.round((score / totalQuestions) * 100);
  percentageEl.textContent = `${percentage}%`;
}
