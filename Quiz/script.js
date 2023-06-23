const quizData = [
  {
    question: "What is the capital of France?",
    image: "paris.jpg",
    choices: ["London", "Paris", "Rome", "Berlin"],
    selectedChoice: -1,
    correctAnswer: 1
  },
  {
    question: "Which planet is known as the \"Red Planet\"?",
    image: "mars.jpg",
    choices: ["Venus", "Mars", "Jupiter", "Saturn"],
    selectedChoice: -1,
    correctAnswer: 1
  },
  {
    question: "What is the largest ocean in the world?",
    image: "pacific.jpg",
    choices: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    selectedChoice: -1,
    correctAnswer: 3
  },
  {
    question: "Which is the tallest mountain in the world?",
    image: "everest.jpg",
    choices: ["K2", "Kilimanjaro", "Mount Everest", "Matterhorn"],
    selectedChoice: -1,
    correctAnswer: 2
  }
];

let answeredQuestions = 0;
let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const imageEl = document.getElementById("image");
const choicesEl = document.getElementById("choices");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const submitBtn = document.getElementById("submit");
const counterEl = document.getElementById("counter");
const scoreScreenEl = document.getElementById("score-screen");
const restartBtn = document.getElementById("restart");

function updateCounter() {
  const selectedAnswers = quizData.filter(question => question.selectedChoice !== -1).length;
  counterEl.textContent = `Questions Answered: ${selectedAnswers} / ${quizData.length}`;

  if (selectedAnswers === quizData.length) {
    submitBtn.style.display = "block";
  } else {
    submitBtn.style.display = "none";
  }
}

function loadQuestion() {
  const currentQuizData = quizData[currentQuestion];

  const questionNumber = currentQuestion + 1; // Add 1 to display the current question number
  const questionText = `Question ${questionNumber}: ${currentQuizData.question}`;
  questionEl.innerHTML = questionText;
  imageEl.src = currentQuizData.image;

  choicesEl.innerHTML = "";

  currentQuizData.choices.forEach((choice, index) => {
    const choiceBtn = document.createElement("button");
    choiceBtn.className = "choice";
    choiceBtn.textContent = choice;
    choiceBtn.addEventListener("click", () => {
      selectAnswer(index);
    });
    choicesEl.appendChild(choiceBtn);
  });

  updateSelectedChoice();
  updateNavigationButtons();
}

function selectAnswer(choiceIndex) {
  const currentQuizData = quizData[currentQuestion];
  currentQuizData.selectedChoice = choiceIndex;
  updateSelectedChoice();
  updateCounter();
}

function updateSelectedChoice() {
  const currentQuizData = quizData[currentQuestion];
  const choiceBtns = choicesEl.querySelectorAll(".choice");
  choiceBtns.forEach((choiceBtn, index) => {
    if (index === currentQuizData.selectedChoice) {
      choiceBtn.classList.add("selected");
    } else {
      choiceBtn.classList.remove("selected");
    }
  });
}

function checkAnswer(choiceIndex) {
  const currentQuizData = quizData[currentQuestion];

  if (choiceIndex === currentQuizData.correctAnswer) {
    score++;
  }

  currentQuizData.selectedChoice = choiceIndex;
  answeredQuestions++;

  updateSelectedChoice();
  updateCounter();
  updateNavigationButtons();
}

function updateNavigationButtons() {
  prevBtn.disabled = currentQuestion === 0;
  nextBtn.disabled = currentQuestion === quizData.length - 1;
}

function showScoreScreen() {
  questionEl.textContent = `Quiz completed! Your score is: ${score} out of ${quizData.length}.`;
  imageEl.src = "";
  choicesEl.innerHTML = "";
  prevBtn.disabled = true;
  nextBtn.disabled = true;
  submitBtn.style.display = "none";
  scoreScreenEl.style.display = "block";
  scoreScreenEl.appendChild(restartBtn);
}

function restartQuiz() {
  answeredQuestions = 0;
  currentQuestion = 0;
  score = 0;

  quizData.forEach((question) => {
    question.selectedChoice = -1;
  });

  updateCounter();
  loadQuestion();
  scoreScreenEl.style.display = "none";
}

function slideQuiz(direction) {
  const quizSlide = document.querySelector(".quiz-slide");

  if (direction === "next") {
    quizSlide.classList.add("slide-from-right");
  } else if (direction === "prev") {
    quizSlide.classList.add("slide-from-left");
  }

  setTimeout(() => {
    quizSlide.classList.remove("slide-from-left", "slide-from-right");
    loadQuestion();
  }, 300);
}

prevBtn.addEventListener("click", () => {
  currentQuestion--;
  slideQuiz("prev");
});

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  slideQuiz("next");
});

submitBtn.addEventListener("click", showScoreScreen);

restartBtn.addEventListener("click", restartQuiz);

loadQuestion();
