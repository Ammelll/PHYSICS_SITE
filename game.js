const question = document.getElementById("question");
const questionImage = document.getElementById("question-image");
const choices = Array.from(document.getElementsByClassName("choice-text"));
// const progressText = document.getElementById('progress-text');
// const scoreText = document.getElementById('score');
// const progressBarFullText = document.getElementById("progress-bar-full");
const answerVideo = document.getElementById("answer-video");
const answerVideoText = document.getElementById("answer-video-text");
const answerImage = document.getElementById("answer-image");
const answerImageText = document.getElementById("answer-image-text");

console.log(answerVideo)
const NUMBER = new Date().getDate() % 25;
const QUESTION = `2019_${NUMBER}`
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 1;

startGame = () => {
    questionCounter = 0;
    score = 0;
    getNewQuestion();
};

getNewQuestion = () => {
    questionImage.src=`/problems/images/${QUESTION}.png`
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        fetch(`/answers/${QUESTION.slice(0,4)}/answers.json`)
        .then((res) => res.text())
        .then((text) => {
            var problem = JSON.parse(text).problems.filter(obj => {return obj.number == NUMBER})[0];
            console.log(problem)
            
            const classToApply =
            selectedAnswer == problem.answer ? "correct" : "incorrect";
    
            
            selectedChoice.parentElement.classList.add(classToApply);
    
            displayAnswer(problem.url);
         })
        .catch((e) => console.error(e));
    });    
});

displayAnswer = (url) => {
    answerImage.src = `/answers/images/${QUESTION}.png`
    answerVideoText.innerText = "Solution Video";
    answerVideo.src=url;
    answerVideo.style.height="45rem";
    answerImageText.innerText = "Solution Text";
}

startGame()

