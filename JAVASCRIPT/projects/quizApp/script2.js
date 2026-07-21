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
const questionText = document.getElementById("question");
const answerContainer = document.getElementById("answer-container");
const currentQuestionElement = document.getElementById("current-question");
const totalQuestionElement = document.getElementById("total-question");
const scoreElement = document.getElementById("score");
const totalScoreElement = document.getElementById("total-score");
const totalElement = document.getElementById("total");
const progressBar = document.getElementById("progress");

// =================================================================
// QUIZ STATE
// =================================================================
// Instead of creating many loose global variables, we keep
// everything related to the live quiz state tracked in one object.
const quizState = {
  currentQuestionIndex: 0,
  score: 0,
  answerDisabled: false,
  questionsList: [],
};

// =================================================================
// INITIAL VALUES
// =================================================================
// Reads from original questions array during initial load before startBtn is clicked
totalQuestionElement.textContent = questions.length;
totalElement.textContent = questions.length;

// =================================================================
// EVENT LISTENERS
// =================================================================

// Start quiz button click action
startBtn.addEventListener("click", startQuiz);

// Restart quiz button click action
restartBtn.addEventListener("click", restartQuiz);

// =================================================================
// EVENT DELEGATION
// =================================================================
// Instead of adding a click listener to every single answer button,
// we add ONE listener to the parent container.
// This is because answer buttons are created and destroyed dynamically.
answerContainer.addEventListener("click", selectAnswer);

// =================================================================
// START QUIZ FUNCTION
// =================================================================
function startQuiz() {
  // Shuffles the IMPORTED questions and saves them to our live state
  quizState.questionsList = shuffleArray(questions);

  // Reset runtime quiz state data
  quizState.currentQuestionIndex = 0;
  quizState.score = 0;
  quizState.answerDisabled = false;

  // Sync initial score display with UI
  scoreElement.textContent = quizState.score;

  // Handle CSS screen transitions
  startScreen.classList.remove("active");
  resultScreen.classList.remove("active");
  quizScreen.classList.add("active");

  // Load first question view
  showQuestion();
}

// =================================================================
// SHOW QUESTION FUNCTION
// =================================================================
function showQuestion() {
  // Allow answering inputs again
  quizState.answerDisabled = false;

  // Get current active question data object
  const currentQuestion =
    quizState.questionsList[quizState.currentQuestionIndex];

  // Update question index number counter
  currentQuestionElement.textContent = quizState.currentQuestionIndex + 1;

  // Re-calculate visual progress bar width
  updateProgress();

  // Display active question string text
  questionText.textContent = currentQuestion.question;

  // Flush previous question option buttons out of DOM container
  answerContainer.innerHTML = "";

  // Dynamic builder loop for answer buttons
  createAnswerButtons(currentQuestion);
}

// =================================================================
// CREATE ANSWER BUTTONS
// =================================================================
function createAnswerButtons(questionObject) {
  // OPTIONAL BONUS FIX: This maps and shuffles individual button options internally
  // so that choices (A, B, C, D) bounce around without breaking index tracking labels.
  const pairedOptions = questionObject.options.map((option, index) => {
    return { text: option, originalIndex: index };
  });

  const shuffledPairs = shuffleArray(pairedOptions);

  shuffledPairs.forEach((pair) => {
    const button = document.createElement("button");
    button.textContent = pair.text;
    button.className = "answer-btn";

    // Store correct answer truth states natively inside the element datasets.
    if (pair.originalIndex === questionObject.answer) {
      button.dataset.correct = "true";
    }

    // Append configured node element into the parent view block
    answerContainer.appendChild(button);
  });
}

// =================================================================
// SELECT ANSWER FUNCTION
// =================================================================
// This function handles every answer button click.
// Because we used event delegation, the event comes from answerContainer, not directly from the button.
function selectAnswer(event) {
  // Check if the clicked element is an answer button.
  // If the user clicks the empty space inside the container, ignore it.
  if (!event.target.matches(".answer-btn")) {
    return;
  }

  // Prevent selecting multiple answers during transition delays
  if (quizState.answerDisabled) return;

  // Freeze target interface input interactions immediately
  quizState.answerDisabled = true;

  // The clicked answer button node reference
  const selectedButton = event.target;

  // Check data attribute boolean string evaluations
  const isCorrect = selectedButton.dataset.correct === "true";

  // Advance state tally score if matching correct flags
  if (isCorrect) {
    quizState.score++;
    scoreElement.textContent = quizState.score;
  }

  // Trigger DOM CSS updates for answer layouts
  showAnswerResult(selectedButton);

  // Intentional visual timeout block before stepping forward to next target view indices
  setTimeout(() => {
    quizState.currentQuestionIndex++;

    // Conditional path checking for array sequence length exhaustion thresholds
    if (quizState.currentQuestionIndex < quizState.questionsList.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 1500);
}

// =================================================================
// SHOW ANSWER RESULT
// =================================================================
// Adds the correct/incorrect classes after the user selects an answer.
function showAnswerResult(selectedButton) {
  const allButtons = answerContainer.children;

  Array.from(allButtons).forEach((button) => {
    // Reveal correct answer position regardless of user selection choice
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    // Highlight wrong selection instances only when actively targeting them
    else if (button === selectedButton) {
      button.classList.add("incorrect");
    }

    // Explicitly lock elements against standard browser focus or pointer event routines
    button.disabled = true;
  });
}

// =================================================================
// UPDATE PROGRESS BAR
// =================================================================
function updateProgress() {
  const currentNumber = quizState.currentQuestionIndex + 1;
  // FIX: Quantifies calculations against live state array length bounds
  const percentage = (currentNumber / quizState.questionsList.length) * 100;
  progressBar.style.width = `${percentage}%`;
}

// =================================================================
// SHOW RESULT FUNCTION
// =================================================================
function showResult() {
  // Hide active quiz module screen layout
  quizScreen.classList.remove("active");

  // Reveal summary final overview score presentation window
  resultScreen.classList.add("active");

  // Render score integer targets
  totalScoreElement.textContent = quizState.score;

  // Quantify percentage metrics mathematically for metrics review
  // FIX: Evaluates metrics against live state array length bounds
  const percentage = Math.round(
    (quizState.score / quizState.questionsList.length) * 100,
  );

  // Console output tracker for testing debug tasks
  console.log(`Your score is ${percentage}%`);
}

// =================================================================
// RESTART QUIZ FUNCTION
// =================================================================
function restartQuiz() {
  // Reset state variables back to clean runtime baseline points
  startQuiz();
}

// =================================================================
// OPTIONAL: SHUFFLE ARRAY FUNCTION
// =================================================================
// This uses the Fisher-Yates shuffle algorithm.
// It randomly changes the order of items in an array.
// Example:
// Before: ["A", "B", "C", "D"]
// After:  ["C", "A", "D", "B"]
function shuffleArray(array) {
  const shuffledArray = [...array];

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[i],
    ];
  }

  return shuffledArray;
}

// =================================================================
// OPTIONAL: START QUIZ WITH RANDOM QUESTIONS
// =================================================================
// Instead of always showing questions in the same order.
// Usage: questions = randomizeQuestions()
function randomizeQuestions() {
  return shuffleArray(quizState.questionsList);
}

// =================================================================
// OPTIONAL: QUIZ TIMER
// =================================================================
// These variables and functions can be used if you want each question
// to have an active time limit.
let timer;
let timeLeft;

function startTimer(seconds) {
  timeLeft = seconds;

  timer = setInterval(() => {
    timeLeft--;
    console.log(`Time left: ${timeLeft}`);

    if (timeLeft <= 0) {
      clearInterval(timer);
      moveToNextQuestion();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

// =================================================================
// MOVE TO NEXT QUESTION FUNCTION
// =================================================================
// Separating this logic keeps things modular if timers or alternate skips
// jump ahead outside click triggers.
function moveToNextQuestion() {
  quizState.currentQuestionIndex++;

  if (quizState.currentQuestionIndex < quizState.questionsList.length) {
    showQuestion();
  } else {
    showResult();
  }
}

// =================================================================
// VALIDATE QUESTIONS DATA
// =================================================================
// In production applications, data formats can be missing or incorrect.
// This handles schema error alerts to prevent core engine system failure.
function validateQuestions() {
  // FIX: Runs sanity validations directly on imported resource module array bounds
  if (!Array.isArray(questions)) {
    console.error("Questions must be an array");
    return false;
  }

  let isValid = true;
  questions.forEach((question, index) => {
    // Note: checking for undefined values accurately ensures '0' indexed numerical items stay true
    if (
      !question.question ||
      !question.options ||
      question.answer === undefined
    ) {
      console.error(`Question ${index + 1} is invalid`);
      isValid = false;
    }
  });

  return isValid;
}

// =================================================================
// INITIALIZE QUIZ
// =================================================================
// Safe setup entry point wrapper to verify application sanity before setting content defaults
function initializeQuiz() {
  if (!validateQuestions()) {
    return;
  }

  totalQuestionElement.textContent = questions.length;
  totalElement.textContent = questions.length;
}

// Run quiz validation initialization
initializeQuiz();
