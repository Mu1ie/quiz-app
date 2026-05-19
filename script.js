// ==============================
// 1. بيانات الأسئلة
// ==============================
const questions = [
  {
    text: "ما هي عاصمة فرنسا؟",
    options: ["برلين", "مدريد", "باريس", "روما"],
    correct: 2,
  },
  {
    text: "كم عدد أضلاع المثلث؟",
    options: ["2", "3", "4", "5"],
    correct: 1,
  },
  {
    text: "ما هو أكبر كوكب في المجموعة الشمسية؟",
    options: ["زحل", "الأرض", "المريخ", "المشتري"],
    correct: 3,
  },
  {
    text: "من كتب رواية 'موبي ديك'؟",
    options: ["هيمنغواي", "ميلفيل", "ديكنز", "تولستوي"],
    correct: 1,
  },
  {
    text: "ما هي أسرع حيوان بري في العالم؟",
    options: ["الأسد", "النمر", "الفهد", "الذئب"],
    correct: 2,
  },
  {
    text: "كم عدد ثواني الدقيقة الواحدة؟",
    options: ["30", "60", "90", "120"],
    correct: 1,
  },
  {
    text: "أي من هذه العناصر رمزه 'O'؟",
    options: ["ذهب", "أوزون", "أكسجين", "أوسميوم"],
    correct: 2,
  },
  {
    text: "في أي قارة تقع مصر؟",
    options: ["آسيا", "أوروبا", "أمريكا", "أفريقيا"],
    correct: 3,
  },
  {
    text: "ما هو الرقم الناتج من 8 × 7؟",
    options: ["54", "56", "58", "64"],
    correct: 1,
  },
  {
    text: "ما هي لغة البرمجة المستخدمة في هذا التطبيق؟",
    options: ["Python", "Java", "JavaScript", "C++"],
    correct: 2,
  },
];

// ==============================
// 2. المتغيرات
// ==============================
let currentIndex = 0;
let score = 0;
let timerInterval = null;
let timeLeft = 30;
let answered = false;

// ==============================
// 3. العناصر من HTML
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
// 4. بدء الاختبار
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
// 5. عرض السؤال
// ==============================
function showQuestion() {
  answered = false;
  const q = questions[currentIndex];

  questionCounter.textContent = `سؤال ${currentIndex + 1} / ${questions.length}`;
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
// 6. المؤقت
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
// 7. اختيار الإجابة
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
// 8. السؤال التالي أو النهاية
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
// 9. عرض النتيجة
// ==============================
function showResult() {
  questionScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  const percentage = (score / questions.length) * 100;

  if (percentage >= 80) {
    resultTitle.textContent = "🏆 ممتاز!";
  } else if (percentage >= 50) {
    resultTitle.textContent = "👍 جيد!";
  } else {
    resultTitle.textContent = "📚 تحتاج مراجعة";
  }

  resultScore.textContent = `أجبت صح على ${score} من ${questions.length} أسئلة`;
}

// ==============================
// 10. إعادة الاختبار
// ==============================
function restartQuiz() {
  resultScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
}