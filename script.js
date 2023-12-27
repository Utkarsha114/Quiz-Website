const questions = [
    {
        question: "Javascript is an ___ language?",
        answers:[
            { text: "Object Oriented", correct: true},
            { text: "Object Based", correct: false},
            { text: "Procedural", correct: false},
            { text: "None of the Above", correct: false},
        ]
    },

    {
        question: "Upon encountering empty statements, what does the Javascript do?",
        answers:[
            { text: "Throws an error", correct: false},
            { text: "Ignores the statements", correct: true},
            { text: "Gives a Warning", correct: false},
            { text: "None of the Above", correct: false},
        ]
    },

    {
        question: "How can a datatype be declared to be a constant type?",
        answers:[
            { text: "var", correct: false},
            { text: "const", correct: true},
            { text: "let", correct: false},
            { text: "constant", correct: false},
        ]
    },

    {
        question: "Which methods can be used to display data in some from using Javascript?",
        answers:[
            { text: "document.write()", correct: false},
            { text: "console.log()", correct: false},
            { text: "window.alert", correct: false},
            { text: "All of the Above", correct: true},
        ]
    },

    {
        question: "What keyword is used to check whether a given property is valid or not?",
        answers:[
            { text: "in", correct: true},
            { text: "is in", correct: false},
            { text: "exists", correct: false},
            { text: "lies", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex =0;
let score = 0;

function startQuiz(){
    currentQuestionIndex =0;
    score =0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct= answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

}

function resetState(){
    nextButton.style.display ="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }

}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }
    else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct ==="true"){
            button.classList.add("correct");
            // check if answer is true then answer will be correct and background color will be green
        }
        button.disabled = true;
        // disable the button after it is selected
    });
    nextButton.style.display = "block";
    // show next button after any one answer button is selected 
}

function  showScore(){
    resetState();
    questionElement.innerHTML = `Total score is ${score} out of ${questions.length}`;
    nextButton.innerHTML= "Start Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex< questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});
startQuiz();
