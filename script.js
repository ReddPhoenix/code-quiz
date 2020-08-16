const startButton = document.getElementById("start-btn")
const nextButton = document.getElementById("next-btn")
const questionContainerEl = document.getElementById("question-container")
const questionEl = document.getElementById("question")
const answerButtonsEl = document.getElementById("answer-buttons")
const timerEl = document.getElementById("countdown")
const timeDisplayEl = document.getElementById("time-display")
const scoreTotalDisplayEl = document.getElementById("score-total")
const scoreDisplayEl = document.getElementById("score")
const highScoreEl = document.getElementById("high-score")
const initialsEl = document.getElementById("initials")

var correctAnswers = 0;
var calculatedScore = 0;
var gameActive = true;

var shuffledQuestions, currentQuestionIndex;

// EventListener will run startGame Function when Start button clicked
startButton.addEventListener("click", startGame)

// EventListener will change to next question when Next button is clicked
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    setNextQuestion()
})

// Start game function. Will hide start button, randomly select from 
// question/answers array and show questions container. Countdown timer
// will appear and begin 60 second countdown
function startGame() {
    startButton.classList.add("hide")
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerEl.classList.remove('hide')
    startTimer()
    setNextQuestion()
    timerEl.classList.remove("hide")
    timeDisplayEl.classList.remove("hide")
    scoreTotalDisplayEl.classList.remove("hide")
    scoreDisplayEl.classList.remove("hide")
    highScoreEl.classList.remove("hide")
    initialsEl.classList.remove("hide")
    highScoreEl.innerText = sessionStorage.getItem(hiScore);
    console.log(hiScore)
    var correctAnswers = 0;
}

// Function for 60 second timer
const countElement = document.getElementById("countdown")
var secondsLeft = 60;

function startTimer() {
    var timerInterval = setInterval(function () {
        secondsLeft--;
        countElement.textContent = secondsLeft;
        if (secondsLeft < 1) {
            clearInterval(timerInterval);
        }
    }, 1000)

}

// Function to run next question
function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

// Function to show question
function showQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerButtonsEl.appendChild(button)
    })
}

// Function to hide Next button 
function resetState() {
    // clearStatusClass(document.body)
    nextButton.classList.add("hide")
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild
            (answerButtonsEl.firstChild)
    }
}

// Function to select answers, if correct add 25 pts, else deduct 10 seconds from clock
function selectAnswer(event) {
    const selectedButton = event.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide")
    } else {
        startButton.innerText = "Restart"
        startButton.classList.remove("hide")
    
    }
    if (selectedButton.dataset = correct) {
        correctAnswers = correctAnswers + 1;
        calculatedScore = correctAnswers * 25;
    } else {
        secondsLeft = secondsLeft - 10
    };
    console.log(calculatedScore);
    scoreTotalDisplayEl.textContent = calculatedScore;
    if (secondsLeft <= 1) {
        var highScore = parseInt(sessionStorage.getItem("highScore"));
        console.log(highScore);
        questionContainerEl.classList.add('hide')
        nextButton.classList.remove("hide");
        startButton.innerText = "Restart"
        nextButton.innerText = "Restart"
        // setTimeout(location.reload(), 5000);
        nextButton.addEventListener("click", location.reload());
        
        highScoreEl.textContent = highScore || 0;

        if (highScore && scoreTotalDisplayEl > highScore) {
            sessionStorage.setItem("highScore", scoreTotalDisplayEl);
            alert("New High Score! " + scoreTotalDisplayEl);
        } else if (!highScore) sessionStorage.setItem("highScore", score);
    }
    
    sessionStorage.setItem("hiScore", calculatedScore);
    sessionStorage.getItem("hiScore", calculatedScore);
    highScoreEl.innerText = hiScore;

    }





// Function to set correct answer to green, wrong answer to red
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct")
    } else {
        element.classList.add("wrong")
    }
}

// Function to remove color
function clearStatusClass(element) {
    element.classList.remove("correct")
    element.classList.remove("wrong")
}

// Function to end game if timer ends
// function endgame() {
//     questionContainerEl.classList.add('hide')
//     if ()
//     let highScore = parseInt(sessionStorage.getItem("highScore"));
//     //     console.log(highScore);

//     //     highScoreEl.textContent = highScore || 0;

//     //     if (highScore && score > highScore) {
//     //         sessionStorage.setItem("highscore", score);
//     //     }
// }


// Question/answers array
const questions = [
    {
        question: "What tag is used to insert Javascript into the body of an HTML file?",
        answers: [
            { text: "<script></script>", correct: true },
            { text: "<meta>", correct: false },
            { text: "function()", correct: false },
            { text: "<javascript></javascript>", correct: false }
        ]
    },
    {
        question: "Javascript is not case sensitive.",
        answers: [
            { text: "True", correct: false },
            { text: "False", correct: true }
        ]
    },
    {
        question: "What is the method used to create a single line comment in Javascript?",
        answers: [
            { text: "<!-- -->", correct: false },
            { text: "Open a seperate text editor", correct: false },
            { text: "Create comment section in README.md" },
            { text: "//", correct: true }
        ]

    },
    {
        question: "What is the purpose of the isNaN() function?",
        answers: [
            { text: "To evaluate the weight of Sodium Nitrogen", correct: false },
            { text: "To determine if a value is a number or not", correct: true },
            { text: "Converts a number to a string", correct: false },
            { text: "To concatenate two different numbers together", correct: false }

        ]
    },
    {
        question: "Which document method would you use to select a specific ID?",
        answers: [
            { text: "getelementbyid() ", correct: false },
            { text: "GetElementById() ", correct: false },
            { text: "getElementByID() ", correct: false },
            { text: "getElementById() ", correct: true }

        ]
    },
    {
        question: "What is the default type for a button element when used in a form?",
        answers: [
            { text: "Prompt", correct: false },
            { text: "Submit", correct: true },
            { text: "Alert", correct: false },
            { text: "Confirm", correct: false }

        ]
    },
    {
        question: "Does simple JavaScript have a flavor?",
        answers: [
            { text: "Yes, vanilla", correct: true },
            { text: "No, cardboard doesn't have a flavor", correct: false }

        ]
    },
    {
        question: "What is the proper syntax for a jQuery Selector",
        answers: [
            { text: "$(     )", correct: true },
            { text: "(     )", correct: false },
            { text: "#(     )", correct: false },
            { text: "jQuery(     )", correct: false }

        ]
    },
    {
        question: "In jQuery, what does the removeClass() method do?",
        answers: [
            { text: "Removes classes from the .css file", correct: false },
            { text: "Replaces the class with an ID", correct: false },
            { text: "Removes loops from the selected class", correct: false },
            { text: "Removes one or more classes from the selected element", correct: true }

        ]
    },
    {
        question: "What does the jQuery click() method do?",
        answers: [
            { text: "Attaches a function to run when click occurs", correct: true },
            { text: "Creates a new class when click event occurs", correct: false },
            { text: "Removes the click function from a button", correct: false },
            { text: "Produces a butotn to click", correct: false }

        ]
    },
    {
        question: "Which is the correct way to determine the length of a string (array is assigned 'arr' as the variable name)?",
        answers: [
            { text: "array = length ", correct: false },
            { text: "length = array(arr) ", correct: false },
            { text: "arr.length", correct: true },
            { text: " length = array.arr", correct: false }

        ]
    },
    // {
    //     question: "",
    //     answers: [
    //         { text: " ", correct: false },
    //         { text: " ", correct: false },
    //         { text: " ", correct: false },
    //         { text: " ", correct: false }

    //     ]
    // },
    // {
    //     question: "",
    //     answers: [
    //         { text: " ", correct: false },
    //         { text: " ", correct: false },
    //         { text: " ", correct: false },
    //         { text: " ", correct: false }

    //     ]
    // },
    // {
    //     question: "",
    //     answers: [
    //         { text: " ", correct: false },
    //         { text: " ", correct: false },
    //         { text: " ", correct: false },
    //         { text: " ", correct: false }

    //     ]
    // },
    // {
    //     question: "",
    //     answers: [
    //         { text: " ", correct: false },
    //         { text: " ", correct: false },
    //         { text: " ", correct: false },
    //         { text: " ", correct: false }

    //     ]
    // },
    // {
    //     question: "",
    //     answers: [
    //         { text: " ", correct: false },
    //         { text: " ", correct: false },
    //         { text: " ", correct: false },
    //         { text: " ", correct: false }

    //     ]
    // }


]

