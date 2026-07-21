// =================================================================
// QUESTIONS IMPORT
// =================================================================
import { questions } from "./questions.js";

// =================================================================
// DOM ELEMENTS
// =================================================================
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-quiz");

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const question = document.getElementById("question");
const answersContainer = document.getElementById("answer-container");

const currentQuestionEl = document.getElementById("current-question");
const totalQuestionEl = document.getElementById("total-question");

const scoreEl = document.getElementById("score");
const totalScore = document.getElementById("total-score");
const total = document.getElementById("total");

const progressBar = document.getElementById("progress");

// =================================================================
// QUIZ STATE
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

// ONE listener for ALL answer buttons
answersContainer.addEventListener("click", selectAnswer);

// =================================================================
// START QUIZ
// =================================================================
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  answerDisabled = false;

  scoreEl.textContent = score;

  startScreen.classList.remove("active");
  resultScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

// =================================================================
// SHOW QUESTION
// =================================================================
function showQuestion() {
  answerDisabled = false;

  const currentQuestion = questions[currentQuestionIndex];

  currentQuestionEl.textContent = currentQuestionIndex + 1;

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  progressBar.style.width = `${progress}%`;

  question.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  // CORRECTION: Added 'index' parameter to match your numerical answer indices (0, 1, 2, 3)
  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement("button");

    button.className = "answer-btn";
    button.textContent = option;

    // CORRECTION: Compare loop index against currentQuestion.answer (which is a number)
    if (index === currentQuestion.answer) {
      button.dataset.correct = "true";
    }

    answersContainer.appendChild(button);
  });
}

// =================================================================
// SELECT ANSWER (EVENT DELEGATION)
// =================================================================
function selectAnswer(e) {
  // Ignore clicks outside buttons
  if (!e.target.matches(".answer-btn")) return;

  if (answerDisabled) return;

  answerDisabled = true;
  const selectedButton = e.target;

  const isCorrect = selectedButton.dataset.correct === "true";

  if (isCorrect) {
    score++;
    scoreEl.textContent = score;
  }

  [...answersContainer.children].forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      // CORRECTION: Only mark the button as "incorrect" if it was the one the user clicked
      button.classList.add("incorrect");
    }

    button.disabled = true;
  });

  setTimeout(() => {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 1500);
}

// =================================================================
// SHOW RESULT
// =================================================================
function showResult() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  totalScore.textContent = score;

  const percentage = Math.round((score / questions.length) * 100);

  console.log(`You scored ${percentage}%`);
}

// =================================================================
// RESTART QUIZ
// =================================================================
function restartQuiz() {
  startQuiz();
}
