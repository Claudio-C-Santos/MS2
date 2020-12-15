let questionBlock = document.querySelector("#block-question");
let levelBlock = document.querySelector("#level-block");
let gameBlock = document.querySelector("#gameBlock");

let score = 0;
let level = 1;

let questionDuration = 14;
let secondsElapsed = 0;
let gameInterval;

//This adjusts levelBlock's width to fit with the divs created via JS functions
$(document).ready(function(){
    let fullWidth = $("#gameBlock").width();
    let levelBlock = $("#level-block").width();
    $("#block-question").width(fullWidth - levelBlock);
    randomQuotes(quotes);
});

init();

function levelObject(input) {
    if (input === 1) {
        console.log(questionsLevel1);
    } else if (input === 2) {
        console.log(questionsLevel2);
    } else if (input === 3) {
        console.log(questionsLevel3);
    } else if (input === 4) {
        console.log(questionsLevel4);
    } else if (input === 5) {
        console.log(questionsLevel5);
    } else if (input === 6) {
        console.log(questionsLevel6);
}
}

//This function randomly selects a different quote to display
function randomQuotes(obj) {
    let randomSelection = Math.floor(Math.random() * obj.length);
    document.getElementById("quote").textContent = obj[randomSelection].quote;
    document.getElementById("author").textContent = obj[randomSelection].character;
}

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
        randomQuotes(quotes);
    });
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

//This function starts the game and calls the necessary functions for it
function startQuiz(question) {
    clearBlock(); 

    startTimer();

    displayQuestions(question);

}

//This function starts the timer and set action when it reaches zero
function startTimer() {
    gameInterval = setInterval(function() {
        document.getElementById('timer').textContent = questionDuration;
        questionDuration--;
        secondsElapsed++;
        if (questionDuration < 0) {
            endOfGame();
            stopTimer();
            clearInterval(gameInterval);
        }
    }, 1000);
}

function stopTimer() {
    clearTimeout(gameInterval);
}

//This function displays the questions and answers
function displayQuestions(arr) {
    clearBlock();

    //This part of the function displays the question inside #questionBlock
    let randomIndex = Math.floor(Math.random() * arr.length);

    let objectQuestion = arr[randomIndex];

    let currentQuestion = arr[randomIndex].question;

    let question = document.createElement("h1");
    question.setAttribute("id", "questionText");
    question.textContent = currentQuestion;
    questionBlock.append(question);

    //This part of the function displays the answer options inside #questionBlock
    let answerBlock = document.createElement("ul");
    questionBlock.append(answerBlock);

    for (let i = 0; i < objectQuestion.options.length; i++) {
        let answerOptions = document.createElement("li");
        answerOptions.setAttribute("class", "answersList");
        answerOptions.setAttribute("choice-value", objectQuestion.options[i]);
        answerOptions.setAttribute("id", "questionNum-"+i);        
        answerOptions.textContent = objectQuestion.options[i];
        answerBlock.append(answerOptions);
    }

    answerBlock.addEventListener("click", function() {
        scoreAnswer(objectQuestion);
    });
}

//This function shows if the selected answer is correct or not and acts accordingly. 
function scoreAnswer(answerSelected) {
        var e = event.target;

        if (e.matches("li")) {
            let selectedItem = e.textContent;

            if (selectedItem === answerSelected.answer) {
                e.setAttribute("style", "background-color: green");
                setTimeout(function() {
                    removeElement("level-block");
                    displayQuestions(questionsLevel1);
                    displayLevel(); 
                    updateScore(); 
                    randomQuotes(quotes);                 
                }, 500);   
                level++;
               
            } else {
                e.setAttribute("style", "background-color: red");
                setTimeout(function() {
                endOfGame();
                }, 500);
                stopTimer();
            }
        }
}

//Function that runs once the game ends (user chooses wrong answer or time runs out) and displays the final score
function endOfGame() {
    clearBlock(); 

    randomQuotes(quotes); 

    removeElement("scoreAndTime");

    let description = document.createElement("p");
    description.setAttribute("class", "descrText");
    description.textContent = `Your score was ${score}`;
    questionBlock.appendChild(description);

}

//Function used to remove elements from DOM
function removeElement(element) {
    let elem = document.getElementById(element);
    elem.remove();
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

//This function displays the block where time and score is displayed
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
    displayTime.setAttribute("id", "timer");
    displayTime.textContent = 15;
    scoreTimeBlock.appendChild(displayTime);

    let timeTitle = document.createElement("div");
    timeTitle.textContent = "Score";
    timeTitle.setAttribute("class", "scoreTimeTitles");
    scoreTimeBlock.appendChild(timeTitle);

    let displayScore = document.createElement("div");
    displayScore.setAttribute("class", "scoreTime");
    displayScore.setAttribute("id", "score");
    displayScore.textContent = score;
    scoreTimeBlock.appendChild(displayScore);
}

//This function updates the score by adding the remaining time left once the question is correctly answered
function updateScore() {
    score += document.getElementById('timer').textContent - secondsElapsed;
    document.getElementById("score").textContent = score;
}