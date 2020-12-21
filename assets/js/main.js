//These are variables related to HTML elements which are manipulated by javascript
let questionBlock = document.querySelector("#block-question");
let levelBlock = document.querySelector("#level-block");
let gameBlock = document.querySelector("#gameBlock");


//These are game related variables which change during the quiz's course
let score = 0;
let level = 1;

//Time to answer each question
let questionDuration = 14;
//This variable is used to calculate the time left and the points earned on each questions 
let secondsElapsed = 0;
let gameInterval;

//Array where the current selcted question will be pushed to display
let levelQuestion = [];

//This adjusts levelBlock's width to fit with the divs created via JS functions
$(document).ready(function(){
    let fullWidth = $("#gameBlock").width();
    let levelBlock = $("#level-block").width();
    $("#block-question").width(fullWidth - levelBlock);
    randomQuotes(quotes);
});

init();

//This function selects the question object to access depending on the level
function questionSelector(level) {
    if (level === 1) {
        levelQuestion = questionsLevel1;
    } else if (level === 2) {
        levelQuestion = questionsLevel2;
    } else if (level === 3) {
        levelQuestion = questionsLevel3;
    } else if (level === 4) {
        levelQuestion = questionsLevel4;
    } else if (level === 5) {
        levelQuestion = questionsLevel5;
    } else if (level === 6) {
        levelQuestion = questionsLevel6;
    } else if (level === 7) {
        levelQuestion = questionsLevel7;
    } else if (level === 8) {
        levelQuestion = questionsLevel8;
    } else if (level === 9) {
        levelQuestion = questionsLevel9;
    } else if (level === 10) {
        levelQuestion = questionsLevel10;
    } else if (level === 11) {
        levelQuestion = questionsLevel11;
    } else if (level === 12) {
        levelQuestion = questionsLevel12;
    } else if (level === 13) {
        levelQuestion = questionsLevel13;
    } else if (level === 14) {
        levelQuestion = questionsLevel14;
    } else if (level === 15) {
        levelQuestion = questionsLevel15;
    } else if (level === 16) {
        levelQuestion = questionsLevel16;
    } else if (level === 17) {
        levelQuestion = questionsLevel17;
    } else if (level === 18) {
        levelQuestion = questionsLevel18;
    } else if (level === 19) {
        levelQuestion = questionsLevel19;
    } else if (level === 20) {
        levelQuestion = questionsLevel20;
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
    description.textContent = `Do you consider yourself a true Simpsons fan? Then this quiz is for you! \r\n 
    You have 15 seconds the answer correctly all 20 question about this world wide famous show. However I wouldn't take too long to select your answer because the remaining seconds are the amount of points earned on each round! \r\n 
    Go ahead and start the game by clicking the button bellow! `;
    questionBlock.appendChild(description);

    let introImage = document.createElement("img");
    introImage.setAttribute("src", "assets/images/family_couch.png");
    introImage.setAttribute("id", "introImage");
    questionBlock.appendChild(introImage);

    let startButton = document.createElement("button");
    startButton.setAttribute("class", "btn");
    startButton.textContent = `Ay Caramba!`;
    questionBlock.appendChild(startButton);

    startButton.addEventListener("click", function() {
        questionSelector(level);
        startQuiz(levelQuestion);
        displayScoreTime();
        displayLevel();
        randomQuotes(quotes);
    });
}

//This function starts the game and calls the necessary functions for it
function startQuiz(question) {
    clearBlock(); 

    startTimer();

    displayQuestions(question);
}

//This function clears all elements children of the main block
function clearBlock() {
    questionBlock.innerHTML="";
}

//This function starts the timer and set action when it reaches zero
function startTimer() {
    gameInterval = setInterval(function() {
        document.getElementById('timer').textContent = questionDuration;
        questionDuration--;
        secondsElapsed++;
        if (questionDuration < 0) {
            finalScore();
            stopTimer();
            clearInterval(gameInterval);
        }
    }, 1000);
}

//This function stops the question timer
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

            if (selectedItem === answerSelected.answer && level < 20) {
                e.setAttribute("style", "background-color: green");
                setTimeout(function() {
                    removeElement("level-block");
                    questionSelector(level)
                    displayQuestions(levelQuestion);
                    questionDuration = 15;
                    secondsElapsed = 0;
                    displayLevel();
                    updateScore(); 
                    randomQuotes(quotes);                 
                }, 500);   
                level++;
            } else if (selectedItem === answerSelected.answer && level === 20) {
                e.setAttribute("style", "background-color: green");    
                setTimeout(function() {                    
                    endOfGame();                
                }, 500); 
                stopTimer();             
            } else {
                e.setAttribute("style", "background-color: red");
                setTimeout(function() {
                    finalScore();
                }, 500);
                stopTimer();
            }
        }
}

//Function that runs once the game ends (user chooses wrong answer or time runs out) and displays the final score
function finalScore() {
    removeElement("level-block");
    questionBlock.removeAttribute("style", "margin-left: 30px;");
    clearBlock(); 

    randomQuotes(quotes); 

    removeElement("scoreAndTime");

    questionBlock.setAttribute("style", "display: flex;")
    questionBlock.setAttribute("style", "flex-direction: row;")

    let finalScore = document.createElement("h1");
    finalScore.setAttribute("class", "final-results");
    finalScore.textContent = `LEVEL: ${level}`;
    questionBlock.insertBefore(finalScore, questionBlock.firstChild);

    let finalLevel = document.createElement("h1");
    finalLevel.setAttribute("class", "final-results");
    finalLevel.textContent = `SCORE: ${score}`;
    questionBlock.insertBefore(finalLevel, questionBlock.firstChild);

    let deadCat = document.createElement("img");
    deadCat.setAttribute("src", "assets/images/dead.png");
    deadCat.setAttribute("class", "image-left");
    questionBlock.insertBefore(deadCat, questionBlock.firstChild);

    let finalBart = document.createElement("img");
    finalBart.setAttribute("src", "assets/images/bart.png");
    finalBart.setAttribute("class", "image-right");
    questionBlock.insertBefore(finalBart, questionBlock.firstChild);
    
    let finalHeading = document.createElement("h1");
    finalHeading.setAttribute("class", "result-title");
    finalHeading.textContent = `Just like the Simpsons many pets...you are done!`;
    questionBlock.insertBefore(finalHeading, questionBlock.firstChild);

    let startButton = document.createElement("button");
    startButton.setAttribute("class", "btn");
    startButton.textContent = `Play Again`;
    questionBlock.appendChild(startButton);

    startButton.addEventListener("click", function() {
        displayScoreTime();
        questionDuration = 14;
        secondsElapsed = 0;
        resetScore();
        resetLevel();
        questionSelector(level);
        startQuiz(levelQuestion);
        randomQuotes(quotes);
    });
}

//This function runs once the 20th question has been correctly answered and the quiz completed
function endOfGame() {
    removeElement("level-block");
    questionBlock.removeAttribute("style", "margin-left: 30px;");
    clearBlock(); 

    randomQuotes(quotes); 

    removeElement("scoreAndTime");

    questionBlock.setAttribute("style", "display: flex;")
    questionBlock.setAttribute("style", "flex-direction: row;")

    let finalLevel = document.createElement("h1");
    finalLevel.setAttribute("class", "final-results");
    finalLevel.textContent = `SCORE: ${score}`;
    questionBlock.insertBefore(finalLevel, questionBlock.firstChild);

    let deadCat = document.createElement("img");
    deadCat.setAttribute("src", "assets/images/homer_end.png");
    deadCat.setAttribute("class", "image-left");
    questionBlock.insertBefore(deadCat, questionBlock.firstChild);

    let finalBart = document.createElement("img");
    finalBart.setAttribute("src", "assets/images/otto_end.png");
    finalBart.setAttribute("class", "image-right");
    questionBlock.insertBefore(finalBart, questionBlock.firstChild);
    
    let finalSubHeading = document.createElement("h1");
    finalSubHeading.setAttribute("class", "result-title");
    finalSubHeading.textContent = `You answered correctly all the questions without even a D'oh!`;
    questionBlock.insertBefore(finalSubHeading, questionBlock.firstChild);

    let finalHeading = document.createElement("h1");
    finalHeading.setAttribute("class", "result-title");
    finalHeading.setAttribute("id", "congratulations");
    finalHeading.textContent = `CONGRATULATIONS!`;
    questionBlock.insertBefore(finalHeading, questionBlock.firstChild);

    let startButton = document.createElement("button");
    startButton.setAttribute("class", "btn");
    startButton.textContent = `Play Again`;
    questionBlock.appendChild(startButton);

    startButton.addEventListener("click", function() {
        displayScoreTime();
        questionDuration = 14;
        secondsElapsed = 0;
        resetScore();
        resetLevel();
        questionSelector(level);
        startQuiz(levelQuestion);
        randomQuotes(quotes);
    });
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

function resetScore() {
    score = 0;
    document.getElementById("score").textContent = score;
}

function resetLevel() {
    level = 1;
    displayLevel()
}