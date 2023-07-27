var buttonColours = ["red", "blue", "green", "yellow"]
var gamePattern = [];
var userClickedPattern = [];
var level =0;

started = false;


$("#start-btn").click(function() {
   if (!started) {
       $("#level-title").text("Level " + level);
       nextSequence();
       started = true;
   }
});


$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
     }
})



$('.btn').click(function(){
   var userChosencolour = $(this).attr("id") ;
   userClickedPattern.push(userChosencolour);

   playSound(userChosencolour);
   animatePress(userChosencolour);

   checkAnswer(userClickedPattern.length-1) 
});

function checkAnswer(currentLevel){
   if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
      console.log("success")

      if(userClickedPattern.length===gamePattern.length){

         setTimeout(function(){nextSequence()}, 1000);
      }
   }
   else{
      console.log('wrong')
      $("body").addClass("game-over")
      setTimeout(function(){
         $("body").removeClass("game-over")
      }, 200)

      audio = new Audio("sounds/wrong.mp3");
      audio.play();

      $("#level-title").text("Game Over, Press Any key to Restart")

      restart();
   }
}

function nextSequence(){

   userClickedPattern = [];

   level+=1;
   $('#level-title').html("Level "+ level)

   randomNumber = Math.floor(Math.random() * 4) ;
   var randomChosenColour = buttonColours[randomNumber];
   gamePattern.push(randomChosenColour);

   $("#"+randomChosenColour).fadeOut(200, function() {
      $(this).fadeIn(200);
   });

   playSound(randomChosenColour);
}

function playSound(colour){
   var audio = new Audio('sounds/'+colour+'.mp3');
   audio.play();
}

function animatePress(currentColour){
   $("."+currentColour).addClass("pressed")
   setTimeout(function(){
      $("."+currentColour).removeClass("pressed")
   }, 100)
}

function restart(){
   level = 0;
   gamePattern=[];
   started = false;
}