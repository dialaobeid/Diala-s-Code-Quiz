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
    var selectedAnswer = event.target.textContent.slice(3); // gets the answer from the button text
    var currentQuestion = questions[currentQuestionIndex];  // adding this var into this fx as wells

    if (selectedAnswer === currentQuestion.correctAnswer) {
        // then we have correct answer
    } else {
        // incorrect answer, time is deducted
        startTime -= 10;                                    // Deducts 10s for each incorrect answer
    }

    currentQuestionIndex++;                                 // Moving onto the next ques or quiz ends
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
}