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
var currentQuestionIndex = 0; // will keep track of the index of questions in the above array
var timer;
var startTime = 75; // Initial timer value

// Function to start the quiz
function startQuiz() {
    document.getElementById("start-quiz").classList.add("hidden");      // hides start-quiz section to display quiz-screen section
    document.getElementById("quiz-screen").classList.remove("hidden");
    displayQuestion();          // calls fx to display current ques
    startTimer();               // calls fx to start timer
}

// Function to display each quiz ques
function displayQuestion() {
    var currentQuestion = questions[currentQuestionIndex];  // this var pulls the current ques object from the questions array
    document.getElementById("quiz-question").textContent = currentQuestion.question; // adds ques text on html

    // creates answer choice buttons
    var choicesContainer = document.getElementById("answer-choices"); //
    choicesContainer.innerHTML = "";

    currentQuestion.choices.forEach(
        function (choice, index) {
        var button = document.createElement("button");
        button.textContent = (index + 1) + ". " + choice;     // sets answer choices in button text
        button.addEventListener("click", checkAnswer);        // when clicked, this event listener added to the button will trigger the checkAnswer function 
        choicesContainer.appendChild(button);                 // appends button 
    });
}

// Function to check the selected answer
function checkAnswer(event) {
}