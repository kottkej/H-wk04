//Declare constants through 'get elements' from the html
    const start = document.getElementById("start");
    const quiz = document.getElementById("quiz");
    const qImage = document.getElementById("qImage");
    const question = document.getElementById("question");
//    const timer = document.getElementById("timer");
//    const timeGauge = document.getElementById("timeGauge");
    const choiceA = document.getElementById("A");
    const choiceB = document.getElementById("B");
    const choiceC = document.getElementById("C");
//    const progress = document.getElementById("progress");
    const scoreDiv = document.getElementById("scoreContainer");
//Declare additional variables
    const timeDiv = document.getElementById("timeDiv");
    let quizTime = 75; 
    //    const gaugeWidth = 150; // This will be 150 pix
    let count = 0;
    //    const gaugeProgressUnit = gaugeWidth / questionTime;
    const counter = document.getElementById("counter");
    let runningQuestionIndex = 0;
    const wrongAnswer = 15;
    let score = 0;
    let TIMER = 0;


//Set the questions through an array
let questions = [
    {
        question    :   "What is 2 + 2?",
        imgSrc      :   "img/1.png",
        choiceA     :   "4",
        choiceB     :   "2",
        choiceC     :   "Whatever you want it to be?",
        correct     :   "A"
    },{
        question    :   "What is 150/5?",
        imgSrc      :   "img/2.png",
        choiceA     :   "10",
        choiceB     :   "30",
        choiceC     :   "3",
        correct     :   "B"
    },{
        question    :   "q3",
        imgSrc      :   "img/2.png",
        choiceA     :   "1",
        choiceB     :   "2",
        choiceC     :   "3",
        correct     :   "B"
    }
];

const lastQuestionIndex = questions.length -1;

//Render question
function renderQuestion(){
    let q = questions[runningQuestionIndex];
    //qImage.innerHTML = "<img src=" + q.imgSrc + ">";
    question.innerHTML = "<p>" + q.question + "</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

//Hide the button
//start.style.display ="none";
//renderQuestion();
//quiz.style.display = "block";
//progressRender();

//Progress bar
/* function progressRender(){
    for(let qIndex =0; qIndex <= lastQuestionIndex; qIndex++){
        progress.innerHTML += "<div class='prog' id=" +qIndex + "> </div>";
    }
}*/
/* function answerIsCorrect(){
    document.getElementById(runningQuestionIndex).style.backgroundColor = "green";
}
function answerIsWrong(){
    document.getElementById(runningQuestionIndex).style.backgroundColor = "red";

} */

//Quiz Time counter
function counterRender(){
    if(quizTime > 0) {
        quizTime = quizTime - 1;
        timeDiv.innerHTML = quizTime;
    }else{ 
        clearInterval(TIMER);
        scoreRender();
         }
    }
//Checking the answers
function checkAnswer(answers){
        console.log(answers,questions[runningQuestionIndex].correct);
    if(questions[runningQuestionIndex].correct == answers){
        // mark correct answer
        // answerIsCorrect(); 

    }else{
        //answerIsWrong();
        quizTime = quizTime - wrongAnswer;
    }
    if(runningQuestionIndex < lastQuestionIndex){
        count = 0;
        runningQuestionIndex++;
        renderQuestion();
    }else{
        timeDiv.innerHTML = quizTime;
        clearInterval(TIMER);
        scoreRender();
    }
}
//Start the quiz
start.addEventListener("click",startQuiz);
function startQuiz(){
    start.style.display = "none";
    timeDiv.innerHTML = quizTime;
    renderQuestion();
    quiz.style.display = "block";
//   counterRender();
    TIMER = setInterval(counterRender,1000); //1000ms = 1 second
//    progressRender();
    
    
}
//Selecting the image for the corresponding score
/* function scoreRender(){
    scoreDiv.style.display="block";
    let scorePerCent = math.round(100 * score / questions.length);
    let img =   (scorePerCent >= 80) ? "img/5.png":
                (scorePerCent >= 60) ? "img/4.png":
                (scorePerCent >= 40) ? "img/3.png":
                (scorePerCent >= 20) ? "img/2.png": "img/1.png";
    scoreDiv.innerHTML = "<img src=" + img + "><p>" + scorePerCent + "%</p>";
    scoreDiv.innerHTML += "<p>" + scorePerCent + "</p>";
} */
