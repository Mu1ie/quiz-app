// ==============================
// 1. Questions Data
// ==============================
const questions = [
  {
    text: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correct: 2,
  },
  {
    text: "How many sides does a triangle have?",
    options: ["2", "3", "4", "5"],
    correct: 1,
  },
  {
    text: "What is the largest planet in the solar system?",
    options: ["Saturn", "Earth", "Mars", "Jupiter"],
    correct: 3,
  },
  {
    text: "Who wrote the novel 'Moby Dick'?",
    options: ["Hemingway", "Melville", "Dickens", "Tolstoy"],
    correct: 1,
  },
  {
    text: "What is the fastest land animal in the world?",
    options: ["Lion", "Tiger", "Cheetah", "Wolf"],
    correct: 2,
  },
  {
    text: "How many seconds are in one minute?",
    options: ["30", "60", "90", "120"],
    correct: 1,
  },
  {
    text: "Which of these elements has the symbol 'O'?",
    options: ["Gold", "Ozone", "Oxygen", "Osmium"],
    correct: 2,
  },
  {
    text: "On which continent is Egypt located?",
    options: ["Asia", "Europe", "America", "Africa"],
    correct: 3,
  },
  {
    text: "What is the result of 8 × 7?",
    options: ["54", "56", "58", "64"],
    correct: 1,
  },
  {
    text: "What programming language is used in this application?",
    options: ["Python", "Java", "JavaScript", "C++"],
    correct: 2,
  },
];

// ==============================
// 2. Variables
// ==============================
let currentIndex = 0;
let score = 0;
let timerInterval = null;
let timeLeft = 30;
let answered = false;

// ==============================
// 3. HTML Elements
// ==============================
const startScreen = document.getElementById("start-screen");
const questionScreen = document.getElementById("question-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");

const questionCounter = document.getElementById("question-counter");
const timerDisplay = document.getElementById("timer");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options");

const resultTitle = document.getElementById("result-title");
const resultScore = document.getElementById("result-score");

// ==============================
// 4. Start Quiz
// ==============================
startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", restartQuiz);

function startQuiz() {
  currentIndex = 0;
  score = 0;
  startScreen.classList.add("hidden");
  questionScreen.classList.remove("hidden");
  showQuestion();
}

// ==============================
// 5. Show Question
// ==============================
function showQuestion() {
  answered = false;
  const q = questions[currentIndex];

  questionCounter.textContent = `Question ${currentIndex + 1} / ${questions.length}`;
  questionText.textContent = q.text;
  optionsContainer.innerHTML = "";

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.classList.add("option-btn");
    btn.addEventListener("click", () => selectAnswer(index, btn));
    optionsContainer.appendChild(btn);
  });

  startTimer();
}

// ==============================
// 6. Timer
// ==============================
function startTimer() {
  timeLeft = 30;
  timerDisplay.textContent = `⏱ ${timeLeft}`;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `⏱ ${timeLeft}`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      if (!answered) {
        highlightCorrect();
        setTimeout(nextQuestion, 1200);
      }
    }
  }, 1000);
}

// ==============================
// 7. Select Answer
// ==============================
function selectAnswer(selectedIndex, btn) {
  if (answered) return;
  answered = true;
  clearInterval(timerInterval);

  const correct = questions[currentIndex].correct;

  if (selectedIndex === correct) {
    btn.classList.add("correct");
    score++;
  } else {
    btn.classList.add("wrong");
    highlightCorrect();
  }

  setTimeout(nextQuestion, 1200);
}

function highlightCorrect() {
  const correct = questions[currentIndex].correct;
  const allBtns = optionsContainer.querySelectorAll(".option-btn");
  allBtns[correct].classList.add("correct");
}

// ==============================
// 8. Next Question or End
// ==============================
function nextQuestion() {
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

// ==============================
// 9. Show Result
// ==============================
function showResult() {
  questionScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  const percentage = (score / questions.length) * 100;

  if (percentage >= 80) {
    resultTitle.textContent = "🏆 Excellent!";
  } else if (percentage >= 50) {
    resultTitle.textContent = "👍 Good!";
  } else {
    resultTitle.textContent = "📚 Needs Review";
  }

  resultScore.textContent = `You answered ${score} out of ${questions.length} questions correctly`;
}

// ==============================
// 10. Restart Quiz
// ==============================
function restartQuiz() {
  resultScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
}