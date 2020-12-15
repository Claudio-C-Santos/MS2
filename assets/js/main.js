let questionBlock = document.querySelector("#block-question");
let levelBlock = document.querySelector("#level-block");
let gameBlock = document.querySelector("#gameBlock");

let score = 0;
let level = 1;

let questionDuration = 14;
let secondsElapsed = 0;
let gameInterval;

//Call API Simpsons' quotes
ajaxCall();

$(document).ready(function(){
    let fullWidth = $("#gameBlock").width();
    let levelBlock = $("#level-block").width();
    $("#block-question").width(fullWidth - levelBlock);
})

//API with The Simpsons random quotes and their author.
// https://github.com/jaridwarren/simpsons-quotes
function ajaxCall() {
  $.ajax({
    method: 'get',
    url: 'https://thesimpsonsquoteapi.glitch.me/quotes'
  })
    .done(function(data) {
      $('.quote').html(`"${data[0].quote}"`);
      $('.author').html(`&mdash; ${data[0].character}`);
      $('.character').attr('src', data[0].image);
    })
    .fail(function() {
      alert('Something went wrong.');
    });
}

init();

// This function outputs the introduction screen with a button to start the game.
function init() {
    clearBlock();

    let heading = document.createElement("h1");
    heading.setAttribute("class", "simpsonsFont");
    heading.setAttribute("id", "introTitle");
    heading.textContent = "Welcome to The Simpsons Quiz!";
    questionBlock.appendChild(heading);

    let description = document.createElement("p");
    description.setAttribute("class", "descrText");
    description.textContent = `This quiz will test your knowledge about the amazing TV show THE SIMPSONS. \r\n 
    There are 20 levels to go through, each of them is based of different aspects of the show. \r\n 
    You will have 15 seconds to answer each question and once you have done it correctly, the remaining seconds will be added as points to your score. There are no second chances so let's see if you are a real Simpsons Fan!\r\n
    Whenever you are ready just press the button below to start the game!`;
    questionBlock.appendChild(description);

    let startButton = document.createElement("button");
    startButton.setAttribute("class", "btn");
    startButton.textContent = `Ay Caramba!`;
    questionBlock.appendChild(startButton);

    startButton.addEventListener("click", function() {
        startQuiz(questionsLevel1);
        displayScoreTime();
        displayLevel();
    })
}

//This function clears all elements children of the main block
function clearBlock() {
    questionBlock.innerHTML="";
}

//This function resets all counts
function resetTimer() {
    questionDuration = 15;
    secondsElapsed = 0;
    clearInterval(gameInterval);
}

//This function starts the game by displaying the question and answer options
function startQuiz(question) {
    clearBlock(); 

    startTimer();

    displayQuestions(question);

}

function startTimer() {
    gameInterval = setInterval(function() {
        document.getElementById('timer').textContent = questionDuration;
        questionDuration--
        secondsElapsed++;
        if (questionDuration < 0) {
            questionDuration = 0;
            clearInterval(gameInterval);
            endOfGame();
        }
    },1000)
}

function displayQuestions(arr) {
                                        //Didn't include clearBlock()

    //This part of the function displays the question inside #questionBlock
    let randomIndex = Math.floor(Math.random() * arr.length);

    let objectQuestion = arr[randomIndex];

    let currentQuestion = arr[randomIndex].question;

    let question = document.createElement("h1");
    question.setAttribute("id", "questionText")
    question.textContent = currentQuestion;
    questionBlock.append(question);

    //This part of the function displays the answer options inside #questionBlock
    let answerBlock = document.createElement("ul");
    questionBlock.append(answerBlock);

    for (let i = 0; i < objectQuestion.options.length; i++) {
        let answerOptions = document.createElement("li");
        answerOptions.setAttribute("class", "answersList");
        answerOptions.setAttribute("choice-value", objectQuestion.options[i])
        answerOptions.setAttribute("id", "questionNum-"+i);        
        answerOptions.textContent = objectQuestion.options[i];
        answerBlock.append(answerOptions);
    }

    answerBlock.addEventListener("click", function() {
        scoreAnswer(objectQuestion);
    })
}

//This function shows if the selected answer is correct or not and acts accordingly. 
function scoreAnswer(answerSelected) {
        var e = event.target;

        if (e.matches("li")) {
            let selectedItem = e.textContent;

            if (selectedItem === answerSelected.answer) {
                e.setAttribute("style", "background-color: green");
                setTimeout(function() {
                    startQuiz(questionsLevel2);
                    removeElement("level-block")
                    displayLevel();
                    resetTimer();   
                    updateScore();                  
                }, 500);   
                level++;
               
            } else {
                e.setAttribute("style", "background-color: red");
                setTimeout(function() {
                endOfGame() 
                }, 500);
            }
        }
}

//Function that runs once the game ends (user chooses wrong answer) and displays the final score
function endOfGame() {
    clearBlock(); 

    let description = document.createElement("p");
    description.setAttribute("class", "descrText");
    description.textContent = `You suck!`;
    questionBlock.appendChild(description);

}

//Function used to remove elements from DOM
function removeElement(element) {
    let elem = document.getElementById(element);
    elem.remove()
}

//This function will display a block on the left of the screen with the current level. The current level will be displayed with an image (Images Source: https://fanart.tv/series/71663/the-simpsons/).
function displayLevel() {
    let levelBlock = document.createElement("div");
    levelBlock.setAttribute("class", "block");
    levelBlock.setAttribute("id", "level-block");
    gameBlock.insertBefore(levelBlock, gameBlock.firstChild);

    questionBlock.setAttribute("style", "margin-left: 30px;");
    
    let imgSrc =`assets/images/${level}.jpg`;

    let levelImage = document.createElement("img");
    levelImage.setAttribute("id", "level-img");
    levelImage.setAttribute("alt", "level-image");
    levelImage.setAttribute("src", imgSrc);
    levelBlock.appendChild(levelImage);


}

function displayScoreTime() {
    let scoreTimeBlock = document.createElement("div");
    scoreTimeBlock.setAttribute("class", "block");
    scoreTimeBlock.setAttribute("id", "scoreAndTime");
    gameBlock.append(scoreTimeBlock);

    scoreTimeBlock.setAttribute("style", "margin-left: 30px;");

    let scoreTitle = document.createElement("div");
    scoreTitle.textContent = "Time";
    scoreTitle.setAttribute("class", "scoreTimeTitles");
    scoreTimeBlock.appendChild(scoreTitle);

    let displayTime = document.createElement("span");
    displayTime.setAttribute("class", "scoreTime");
    displayTime.setAttribute("id", "timer")
    displayTime.textContent = 15;
    scoreTimeBlock.appendChild(displayTime);

    let timeTitle = document.createElement("div");
    timeTitle.textContent = "Score";
    timeTitle.setAttribute("class", "scoreTimeTitles")
    scoreTimeBlock.appendChild(timeTitle);

    let displayScore = document.createElement("div");
    displayScore.setAttribute("class", "scoreTime");
    displayScore.setAttribute("id", "score");
    displayScore.textContent = score;
    scoreTimeBlock.appendChild(displayScore);
}

function updateScore() {
    score += document.getElementById('timer').textContent - secondsElapsed;
    document.getElementById("score").textContent = score;
}














/*
function startTimer(duration, display) {
    let timer = duration, seconds;
    
    setInterval( function() {
        seconds = parseInt(timer % 60, 10);

        console.log(seconds)

        display = seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000)
}
*/