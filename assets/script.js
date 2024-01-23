// Creating the quiz questions and answers
var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["Strings", "Booleans", "Alerts", "Numbers"],
        answer: "Alerts"
    },
    {
        question: "The condition in an if / else statement is enclosed within ______.",
        choices: ["Quotes", "Curly brackets", "Parantheses", "Square brackets"],
        answer: "Parantheses"
    },
    {
        question: "Arrays in Javascript can be used to store ______.",
        choices: ["Numbers and strings", "Other arrays ", "Booleans", "All of the above"],
        answer: "All of the above"
    },
    {
        question: "String values must be enclosed within ______ when being assigned to variables.",
        choices: ["Commas", "Curly brackets", "Quotes", "Parantheses"],
        answer: "Quotes"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "Terminal/bash", "For loops", "Console log"],
        answer: "Javascript"
    }
];

// more variables
var currentQuestionIndex = 0;                                   // will keep track of the index of questions in the above array
var timer;
var startTime = 75; // Initial timer value
var countdownElement = document.getElementById("countdown");    // important variable to display countdown in html
var score = 0;      // starts at 0

// Function to start the quiz
function startQuiz() {
    document.getElementById("start-quiz").classList.add("hidden");      // hides start-quiz section to display quiz-screen section
    document.getElementById("quiz-screen").classList.remove("hidden");
    displayQuestion();          // calls fx to display current ques
    startTimer();               // calls fx to start timer
}

// Event listener for the start button to start the quiz
document.getElementById("start-btn").addEventListener("click", startQuiz);

// Function to display each quiz ques
function displayQuestion() {
    var currentQuestion = questions[currentQuestionIndex];  // this var pulls the current ques object from the questions array
    document.getElementById("quiz-question").textContent = currentQuestion.question; // adds ques text on html

    // creates answer choice buttons
    var choicesContainer = document.getElementById("answer-choices");
    choicesContainer.innerHTML = "";    // this container represents the html element answer-choices, will display and clear each set of answer choices per ques

    currentQuestion.choices.forEach(
        function (choice, index) {
            var button = document.createElement("button");        // creates a button for each answer choice
            button.textContent = (index + 1) + ". " + choice;     // sets answer choices in button text
            button.addEventListener("click", checkAnswer);        // when clicked, this event listener added to the button will trigger the checkAnswer function 
            choicesContainer.appendChild(button);                 // appends button to choicesContainer
        });
}

// Function to check the selected answer
function checkAnswer(event) {
    var selectedAnswer = event.target.textContent.slice(3); // extracts the selected answer from the button text
    var currentQuestion = questions[currentQuestionIndex];  // adding this var into this fx as wells

    if (selectedAnswer === currentQuestion.answer) { // checks if the selected answer matches the correct answer 
        // since total score is 100, each correct answer = 20 points
        score += 20;
    } else {
        // incorrect answer
        startTime -= 10;                                    // Deducts 10s for each incorrect answer
    }

    currentQuestionIndex++;                                 // Moving onto the next ques or quiz ends
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
}

// Function to end the quiz
function endQuiz() {
    clearInterval(timer);                                               // stops the timer
    countdownElement.textContent = "Time's up!";                        // adds text to countdown element in html
    document.getElementById("quiz-screen").classList.add("hidden");     // hides quiz-screen section to display end-screen section
    document.getElementById("end-screen").classList.remove("hidden");
    document.getElementById("final-score").textContent = score;         // final score displays here
}

// Modified the startQuiz and endQuiz functions to reset the score and timer before starting quiz
function startQuiz() {
    score = 0;            // resets the score to 0
    startTime = 75;       // resets timer to 75s
    document.getElementById("start-quiz").classList.add("hidden");
    document.getElementById("quiz-screen").classList.remove("hidden");
    displayQuestion();
    startTimer();
    updateTimer();        // its function mentioned below 

    document.getElementById("submit-score-btn").addEventListener("click", viewHighScores);
}

function endQuiz() {
    clearInterval(timer);                                               // stops the timer
    document.getElementById("quiz-screen").classList.add("hidden");     // repeat of screen display as shown above
    document.getElementById("end-screen").classList.remove("hidden");
    document.getElementById("final-score").textContent = score;         // text content of final score should display 
}

// Function to start the countdown
function startTimer() {
    timer = setInterval(
        function () {
            startTime--;
            updateTimer();          // updates timer display
            if (startTime <= 0) {   // ends quiz when timer hits 0
                endQuiz();
            }
        }, 1000);                   // timer countdown updates every second (1000ms = 1s)
}

//  Function that displays timer on quiz screen
function updateTimer() {
    countdownElement.textContent = startTime;
}

// All the code for accessing the scoreboard and displaying high scores 
// Event listener for the submit-btn to trigger viewHighScores fx
document.getElementById("submit-score-btn").addEventListener("click", viewHighScores);

// Function for link to high scores page to view scoreboard
function viewHighScores() {
    document.getElementById("end-screen").classList.add("hidden");      // hides end-screen section to display score-board section
    document.getElementById("score-board").classList.remove("hidden");

    // Extracting scores from storage to display them
    var highScores = getHighScores();                                   // this fx is mentioned below

    highScores.push({ initials: document.getElementById("initials").value, score: score }); // created lines 142-148 with help from internet, Xpert learning assitant 

    // displaying high scores on scoreboard 
    var highScoresContainer = document.getElementById("score-board").getElementsByTagName("p")[0]; // this container represents the html element score-board, will display and clear the score-board
    highScoresContainer.innerHTML = "";                                                            // to clear existing scores

    highScores.forEach(
        function (entry, index) {
            var scoreValue = document.createElement("div");
            scoreValue.textContent = (index + 1) + ". " + entry.initials + " - " + entry.score;    // format for score display "1. XY - score"
            scoreValue.classList.add("score-item");
            highScoresContainer.appendChild(scoreValue);
        });
}

// Function to get high scores 
function getHighScores() {
    // to retrieve saved scores from localStorage
    var storedScores = localStorage.getItem("highScores");
    return storedScores ? JSON.parse(storedScores) : [];
}

// Event listener for the go-back-btn to return to end screen
document.getElementById("go-back-btn").addEventListener("click", function () {
    document.getElementById("score-board").classList.add("hidden");      // hides score-board section to display end-screen 
    document.getElementById("end-screen").classList.remove("hidden");    // I set it to return to end quiz screen since I am not sure what it is supposed to go back to
});

// Event listener for the clear-board-btn to clear scoreboard
document.getElementById("clear-board-btn").addEventListener("click", function () {
    // clears the scoreboard
    localStorage.removeItem("highScores");

    // clears the displayed scores
    var scoresContainer = document.getElementById("score-board").getElementsByTagName("p")[0];
    scoresContainer.innerHTML = "";
});