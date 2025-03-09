const quizData = [
    {
        question: "What is AI?",
        options: ["Artificial Intelligence", "Automated Input", "Advanced Internet"],
        answer: "Artificial Intelligence"
    },
    {
        question: "Which programming language is used for ML?",
        options: ["Python", "Java", "C++"],
        answer: "Python"
    },
    {
        question: "True or False: Neural networks mimic human brain structure.",
        options: ["True", "False"],
        answer: "True"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-btn");
const feedback = document.getElementById("feedback");
const progressFill = document.getElementById("progress-fill");
const progressText = document.getElementById("progress-text");
const scoreContainer = document.getElementById("score-container");
const finalScore = document.getElementById("final-score");
const totalQuestions = document.getElementById("total-questions");
const xpEarned = document.getElementById("xp-earned");

function loadQuestion() {
    if (currentQuestionIndex >= quizData.length) {
        showResults();
        return;
    }

    let currentQuestion = quizData[currentQuestionIndex];
    questionText.innerText = currentQuestion.question;
    optionsContainer.innerHTML = "";

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.addEventListener("click", () => checkAnswer(option));
        optionsContainer.appendChild(button);
    });

    updateProgress();
}

function checkAnswer(selectedAnswer) {
    let correctAnswer = quizData[currentQuestionIndex].answer;

    if (selectedAnswer === correctAnswer) {
        feedback.innerText = "✅ Correct!";
        feedback.style.color = "green";
        score++;
    } else {
        feedback.innerText = `❌ Wrong! Correct: ${correctAnswer}`;
        feedback.style.color = "red";
    }

    nextButton.classList.remove("hidden");
}

function nextQuestion() {
    currentQuestionIndex++;
    feedback.innerText = "";
    nextButton.classList.add("hidden");
    loadQuestion();
}

function updateProgress() {
    let progressPercent = ((currentQuestionIndex + 1) / quizData.length) * 100;
    progressFill.style.width = progressPercent + "%";
    progressText.innerText = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
}

function showResults() {
    document.querySelector(".quiz-container").innerHTML = "";
    scoreContainer.classList.remove("hidden");
    finalScore.innerText = score;
    totalQuestions.innerText = quizData.length;
    xpEarned.innerText = score * 10;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreContainer.classList.add("hidden");
    loadQuestion();
}

// Start quiz
loadQuestion();

nextButton.addEventListener("click", nextQuestion);
