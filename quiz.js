//Declare constants through 'get elements' from the html
    const start = document.getElementById("start");
    const quiz = document.getElementById("quiz");
    const question = document.getElementById("question");
    const choiceA = document.getElementById("A");
    const choiceB = document.getElementById("B");
    const choiceC = document.getElementById("C");
    const scoreDiv = document.getElementById("scoreDiv");
//Declare additional variables
    const timespan = document.getElementById("timespan");
    const initialQuizTime = 75;    
    let quizTime = initialQuizTime; 
    const counter = document.getElementById("counter");
    let runningQuestionIndex = 0;
    const wrongAnswer = 15;
    let TIMER = null;
    const yourscore = document.getElementById("yourscore");
    let scores = [];
    const highscoresDiv = document.getElementById("highscoresDiv");
    const highscores = document.getElementById("highscores");
    const correctDiv = document.getElementById("yes");
    const wrongDiv = document.getElementById("wrong");
    

//Set the questions through an array
let questions = [
    {
        question    :   "What is 2 + 2?",
        choiceA     :   "4",
        choiceB     :   "2",
        choiceC     :   "Whatever you want it to be?",
        correct     :   "A"
    },{
        question    :   "What is 40 * 40?",
        choiceA     :   "160",
        choiceB     :   "1,600",
        choiceC     :   "16,000",
        correct     :   "B"
    },{
        question    :   "What is 4.64 + 3.21?",
        choiceA     :   "7.24",
        choiceB     :   "7.85",
        choiceC     :   "7.92",
        correct     :   "B"
    },{
        question    :   "What is 64 ÷ 8?",
        choiceA     :   "6",
        choiceB     :   "56",
        choiceC     :   "8",
        correct     :   "C"
    },{
        question    :   "What is 1000 + 40 + 1000 + 30 + 1000 + 20 + 1000 + 10?",
        choiceA     :   "4,130",
        choiceB     :   "4,310",
        choiceC     :   "4,100",
        correct     :   "C"
    }
];

const lastQuestionIndex = questions.length -1;

//Render question
function renderQuestion(){
    let q = questions[runningQuestionIndex];
    question.innerHTML = "<p>" + q.question + "</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

//Quiz Time counter
function counterRender(){
    if(quizTime > 0) {
        quizTime = quizTime - 1;
        timespan.innerHTML = quizTime;
    }else{ 
        clearInterval(TIMER);
        scoreRender();
         }
    }
//Checking the answers
function checkAnswer(answers){
        console.log(answers,questions[runningQuestionIndex].correct);
    if(questions[runningQuestionIndex].correct == answers){
        correctDiv.style.display = "block";
        setTimeout (function(){correctDiv.style.display = "none";
        },500);

    }else{
        quizTime = quizTime - wrongAnswer;
        wrongDiv.style.display = "block";
        setTimeout (function(){wrongDiv.style.display = "none";
        },500);
    }
    if(runningQuestionIndex < lastQuestionIndex){
        count = 0;
        runningQuestionIndex++;
        renderQuestion();
    }else{
        timespan.innerHTML = quizTime;
        clearInterval(TIMER);
        quiz.style.display = "none";
        scoreDiv.style.display = "block";
        yourscore.innerHTML = quizTime;
    }
}

//Start the quiz
start.addEventListener("click",startQuiz);
function startQuiz(){
    question.style.display = "block";
    quizTime = initialQuizTime;
    runningQuestionIndex = 0;
    scoreDiv.style.display ="none";
    start.style.display = "none";
    timespan.innerHTML = quizTime;
    renderQuestion();
    quiz.style.display = "block";
    TIMER = setInterval(counterRender,1000); //1000ms = 1 second
    highscoresDiv.style.display = 'none';
}

function storeScore(){
    let initials = document.getElementById("initials").value;
    console.log (initials);
    localStorage.setItem("initials",quizTime);
    const score = {
        initials: initials,
        yourscore: quizTime,
      };
    scores.push(score);
    localStorage.setItem("highscores", JSON.stringify(scores));
    //console.log (localStorage.getItem("highscores"));
    scoreDiv.style.display = "none";
    start.style.display = "block";
    timespan.innerHTML = initialQuizTime;
}

function viewHighScores(){
    scores.sort(function(a,b){
        if(a.yourscore > b.yourscore)
        {return -1;

        }else {
        return 1;
        }
        //return a.yourscore - b.yourscore;
    });
    highscoresDiv.style.display = "block";
    let wildlist = "";
    for (var i=0; i<scores.length; i++){
        wildlist = wildlist + scores[i].initials + " : " + scores[i].yourscore + "<br>";
        console.log(scores[i]);
    }
    highscores.innerHTML = wildlist;
    question.style.display = "none";
}