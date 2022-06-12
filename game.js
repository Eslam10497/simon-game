
/// Variables Section//

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0 ;
var started = false ; 
var gameOver = false;
var nextTurn = false;

// Functions Section//

// Frequently used functions // 

function playSound(color){ // plays the sound of the color name passed
   var audio = new Audio ('sounds/'+color+".mp3");
   audio.play();
 }

function animatePress (color){
   $("#"+color).addClass("pressed");
   setTimeout(function (){ $("#"+color).removeClass("pressed")}, 100);

}

// Game Functions // 

function nextSequence () { // Creates a random number between 0-3 to choose a button and then gives it to the user
    var randomNumber = Math.floor((Math.random()*4));
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    level++;
    $("h1").text("level "+level);
    
 }


 function animateSequence() {

   setTimeout(() => {
      var c = gamePattern.length - 1 ;
      $("#"+gamePattern[c]).fadeOut(100).fadeIn(100);
      playSound(gamePattern[c]);

   }, 1000);

 }


 function checkAnswer(currentLevel){
   var correct = true ;
   for (let i = 0; i < currentLevel  ; i++){
      if(gamePattern[i] !== userClickedPattern[i]){
         gameOver = true ;
         correct = false; 
      }
   }
  
   if (correct){
       goNext();
   }
   if(!correct){
      resetGame();
   }
  
   
 }

 function clearUser() {
   userClickedPattern = [] ;

 }

 function resetGame(){
   $("h1").text("Game Over !! Press A key to Start Playing Again!");
   $("body").addClass("game-over");
   setTimeout(function (){$("body").removeClass("game-over")}, 100);
   started = false;
   level = 0;
   for (let i = 0; i < gamePattern.length; i++) {
      gamePattern.pop();
   }
   clearUser();
 }
 
 function goNext() {
  
      nextTurn = false;
      clearUser();
      nextSequence();
      animateSequence();
   
   
 }

 // Main Section//

 // Waits for a key press to start the game 
 $(document).keydown(function () {   
   if(!started){
      $("h1").text("Level "+level);
      nextSequence();
      animateSequence();
      started = true ;

   }
 });

   $(".btn").click(function (e) { 
      var userChosenColour = $(this).attr("id");// why e doesn't work here ? 
      console.log("this is the user chosen color ",userChosenColour);
      userClickedPattern.push(userChosenColour);
      playSound(userChosenColour);
      animatePress(userChosenColour);
      console.log(userClickedPattern.length);
      console.log(gamePattern.length)
      if (userClickedPattern.length === gamePattern.length) {
         checkAnswer(level);
      }
   });

