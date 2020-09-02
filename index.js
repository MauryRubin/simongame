// initialize variables
var buttonColours = ["red", "blue", "green", "yellow"];
var gameStart = false;
var gamePattern = [];
var userClickedPattern = [];
var level = 0;


// when a button is clicked create a handler event and store the click
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1)
});

// generate a random number between 0 and 3 (4 number options 0123)
function nextSequence() {
  userClickedPattern = [];
  level += 1;
  $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    for (let i =0; i<gamePattern.length;i++ ){
      setTimeout(function(){
        $("#" + gamePattern[i]).fadeToggle(200).fadeToggle(200);
        playSound(gamePattern[i]);
      },i*800)

    }





}




// play the sound for the button selected . new Audio = new audio objeect
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


// function to animate a button when it gets pressed
function animatePress(currentColour) {
  $("#" + currentColour).toggleClass("pressed"); // toggle the press
  setTimeout(function() {
    $("#" + currentColour).toggleClass("pressed");
  }, 100);
} //time out toggles the class 100 ms later


// this keypress initiates the game. and sets the games start to true so it cant be activated again
$(document).keypress(function() {
  if (!gameStart) {
    userClickedPattern = [];
    $("#level-title").text("Level 0")
    nextSequence();
    gameStart = true;
  }
});


function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function() {
        nextSequence()
      }, 1000);
    }

  } else {
    var killScreen = new Audio("sounds/wrong.mp3");
    killScreen.play();
    $('body').toggleClass("game-over");
    setTimeout(function() {
      $('body').toggleClass("game-over");
    }, 200);
    $("#level-title").text("try again! Click a key");
    startOver();

  }

}

function startOver(){
  gameStart = false;
  gamePattern = [];
  userClickedPattern = [];
  level = 0;

}
