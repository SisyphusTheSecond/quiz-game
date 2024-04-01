const questions = [
    {
        question: "Who made this Game: ",
        answers: [
            {text: "Application Program Interface", correct: true},
            {text: "Advanced Programming Interface", correct: false},
            {text: "Automated Protocol Integration", correct: false},
            {text: "Application Process Integration", correct: false},
        ]
    },
    {
        question: "What does the acronym 'API' stand for?",
        answers: [
            {text: "Application Program Interface", correct: true},
            {text: "Advanced Programming Interface", correct: false},
            {text: "Automated Protocol Integration", correct: false},
            {text: "Application Process Integration", correct: false},
        ]
    },
    {
        question: "What is the purpose of a version control system like Git?",
        answers: [
            {text: "To manage different versions of software code", correct: true},
            {text: "To optimize database performance", correct: false},
            {text: "To encrypt internet traffic", correct: false},
            {text: "To automate software testing", correct: false},
        ]
    },
    {
        question: "What does the acronym 'CSS' stand for?",
        answers: [
            {text: "Code Security Standard", correct: false},
            {text: "Computer Server System", correct: false},
            {text: "Content Sharing System", correct: false},
            {text: "Cascading Style Sheets", correct: true},
        ]
    }, 
    {
        question: "What is the purpose of a CAPTCHA?",
        answers: [
            {text: "To authenticate users", correct: false},
            {text: "To prevent automated bots from accessing a system", correct: true},
            {text: "To encrypt internet traffic", correct: false},
            {text: "To optimize website performance", correct: false},
        ]
    },
    {
        question: "Which of the following is NOT a programming language?",
        answers: [
            {text: "SQL", correct: false},
            {text: "XML", correct: false},
            {text: "TCP", correct: true},
            {text: "JSON", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons")
const nextButton = document.getElementById("next-btn")


let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
 
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }
    else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion()
    } 
    else {
        showScore();
    }
}

nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length) {
        handleNextButton()
    }
    else {
        startQuiz()
    }
})


startQuiz(); 

