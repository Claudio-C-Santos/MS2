# Bossa&Morna Webiste - Testing Details

[Main README.md file](README.md)

[Github repository](https://github.com/Claudio-C-Santos/MS2-The_Simpsons-Quizz)

## Code Validation

- [W3C HTML Validation Service](https://validator.w3.org/)

All HTML files were validated via Jigsaw's validation service and it showed no errors were found.

- [W3 CSS Validation Service](https://jigsaw.w3.org/css-validator/)

The style.css file was validated via Jigsaw's validation service and it showed no errors were found being certified by the icon below.

<p>
    <a href="http://jigsaw.w3.org/css-validator/check/referer">
        <img style="border:0;width:88px;height:31px"
            src="http://jigsaw.w3.org/css-validator/images/vcss"
            alt="Valid CSS!" />
    </a>
</p>

- [JSHint](https://jshint.com/)

All JavaScript files were validated no errors were found.

## Testing User Stories from UX section of README.md

For these tests please remit to "Features" section on [README.md](README.md). In that section, there are screenshots with demonstrations on how to use each feature.

## Manual testing of all elements and functionalities throughout the Website

The quiz has been played by several users from friends to family members. The tests were done using Chrome, Firefox and Edge.

### Game testing

1.  At the index page, the only interactive element is the "Ay Caramba!" button which starts the quiz. 
2.  None of the text is selectable.
3.  Once the quiz game starts, the timer starts a countdown of 15 seconds which is displayed on the right side of the screen. 
4.  The score is zero and the riht side of the screen displays an image showing the current level is level 1.
5.  Each possible answer gains a shadow when hovered over and the clicked answer will turn green if correct or red if incorrect. 
6.  If the answer is incorrect a new screen will be displayed with the total score and max level reached.
7.  If the correct answer is selected, a new question is displayed, the right image is updated, the timer is reset to zero and the score is also updated.
8.  Once all 20 questions are answered correctly, a new screen displays a congratulations message along with the score reached.
9.  Both screen in 7. and 8. have a "Play Again" button which restarts the quiz taking the user back to level 1.
10. The questions are succesfully reandomly selected according to the current level. The same happens with the image displayed on the left side of the screen, this one is not random but shows which is the current level.
  

