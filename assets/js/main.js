let questionBlock = document.querySelector("#block-question");
let levelBlock = document.querySelector("#level-block");
let gameBlock = document.querySelector("#gameBlock");


let score = 0;
let level = 1;

let questionDuration = 15;
let secondsElapsed = 0;
let secondsIncrement;


//Call API Simpsons' quotes
ajaxCall();
$(document).ready(function(){
    let fullWidth = $("#gameBlock").width();
    let levelBlock = $("#level-block").width();
    $("#block-question").width(fullWidth - levelBlock);
})

init();

// This function outputs the introduction screen with a button to start the game.
function init() {
    clearBlock();
    reset();

    let heading = document.createElement("h1");
    heading.setAttribute("class", "simpsonsFont");
    heading.setAttribute("id", "introTitle");
    heading.textContent = "Welcome to The Simpsons Quiz!";
    questionBlock.appendChild(heading);

    let description = document.createElement("p");
    description.setAttribute("class", "descrText");
    description.textContent = `This quiz will test your knowledge about the amazing TV show THE SIMPSONS. \r\n 
    There are 20 levels to go through, each of them is based of different aspects of the show. \r\n 
    You will have 15 seconds to answer each question and once the answer is answered correctly, the remaining seconds will be added as points to your score. There are now second chances so let's see if you are a real Simpsons Fan!\r\n
    Whenever you are ready just press the button below to start the game!`;
    questionBlock.appendChild(description);

    let startButton = document.createElement("button");
    startButton.setAttribute("class", "btn");
    startButton.textContent = `Ay Caramba!`;
    questionBlock.appendChild(startButton);

    startButton.addEventListener("click", function() {
        startQuiz();
        displayLevel();
    })
}

//This function clears all elements children of the main block
function clearBlock() {
    questionBlock.innerHTML="";
}

//This function resets all counts
function reset() {
    score = 0;
    level = 1;

    questionDuration = 15;
    secondsElapsed = 0;
    secondsIncrement;
}

//This function starts the game by displaying the question and answer options
function startQuiz() {
    clearBlock(); 





}

//This function will display a block on the left of the screen with the current level. The current level will be displayed with an image (Images Source: https://fanart.tv/series/71663/the-simpsons/).
function displayLevel() {
    let levelBlock = document.createElement("div");
    levelBlock.setAttribute("class", "block");
    levelBlock.setAttribute("id", "level-block");
    gameBlock.insertBefore(levelBlock, gameBlock.firstChild);

    questionBlock.setAttribute("style", "margin-left: 30px;");

    let levelImage = document.createElement("img");
    levelImage.setAttribute("id", "level-img");
    levelImage.setAttribute("alt", "level-image");
    levelImage.setAttribute("src", "assets/images/1.jpg");
    levelBlock.appendChild(levelImage);
}


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