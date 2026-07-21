// =================================================================
// QUESTIONS IMPORT OR MODULE
// =================================================================
import { questions } from "./questions.js";

// =================================================================
// DOM ELEMENTS
// =================================================================
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-quiz");
const startScreen = document.getElementById("start-screen");
const resultScreen = document.getElementById("result-screen");
const quizScreen = document.getElementById("quiz-screen");
const question = document.getElementById("question");
const answersContainer = document.getElementById("answer-container");
const currentQuestionEl = document.getElementById("current-question");
const totalQuestionEl = document.getElementById("total-question");
const scoreEl = document.getElementById("score");
const totalScore = document.getElementById("total-score");
const total = document.getElementById("total");
const progressBar = document.getElementById("progress");

// =================================================================
// STATE VARIABLES
// =================================================================
let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;

totalQuestionEl.textContent = questions.length;
total.textContent = questions.length;

// =================================================================
// EVENT LISTENERS
// =================================================================
startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", restartQuiz);

// =================================================================
// FUNCTIONS
// =================================================================
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreEl.textContent = score;

  startScreen.classList.remove("active");
  resultScreen.classList.remove("active"); // CORRECTION: Explicitly remove result screen if restarting
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  answerDisabled = false;

  const currentQuestion = questions[currentQuestionIndex];

  currentQuestionEl.textContent = currentQuestionIndex + 1;

  const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  question.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  // CORRECTION: Added the secondary 'index' argument to the forEach loop
  currentQuestion.options.forEach((answer, index) => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.classList.add("answer-btn");

    // CORRECTION: Store the INDEX number (0, 1, 2, 3) as data instead of the text string.
    // This perfectly aligns with your questions.js data setup.
    button.dataset.index = index;

    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  if (answerDisabled) return;
  answerDisabled = true;

  const selectedButton = event.target;

  // CORRECTION: Grab the numerical correct answer index from your question object
  const correctIndex = questions[currentQuestionIndex].answer;

  // CORRECTION: Dataset values are stored as strings. We use parseInt to make it a number for clean matching.
  const selectedIndex = parseInt(selectedButton.dataset.index);
  const isCorrect = selectedIndex === correctIndex;

  // CORRECTION: Refactored the class assignment loop to match against the option indices
  Array.from(answersContainer.children).forEach((button) => {
    const currentBtnIndex = parseInt(button.dataset.index);

    if (currentBtnIndex === correctIndex) {
      // Always highlight the correct answer in magenta
      button.classList.add("correct");
    } else if (button === selectedButton && !isCorrect) {
      // Highlight the selected button only if it was wrong
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreEl.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 1500);
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  startQuiz();
}

function showResult() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  totalScore.textContent = score;
  const percentage = (score / questions.length) * 100;
}
