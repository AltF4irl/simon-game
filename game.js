var buttonColors = ["red", "blue", "green", "yellow"];
var lvl = 0;
var gamePattern = [];
var userClickedPattern = [];
var randomChosenColor;
var i = 0;


startOver();

$(".btn").click(function(){
	var userChosenColor = $(this).attr("id");
	userClickedPattern.push(userChosenColor);

	$("#" + userChosenColor).addClass("pressed");
	setTimeout(function(){ $("#" + userChosenColor).removeClass("pressed"); }, 150);
	colorSound(userChosenColor);

	if( i === (lvl -1) & checkAnswer(i) === 1 ){
		setTimeout(function(){ randomChosenColor = buttonColors[nextSequence()];
		gamePattern.push(randomChosenColor);
		$("#" + randomChosenColor).addClass("pressed");			// selecting the random color's box
		setTimeout(function(){ $("#" + randomChosenColor).removeClass("pressed"); }, 150); // flash animation
		colorSound(randomChosenColor); }, 1050);
	} else if( checkAnswer(i) === 1 ){
		i++;
	} else {
		$("body").addClass("game-over");
		setTimeout(function(){ $("body").removeClass("game-over"); }, 200);
		$("h1").text("Game Over, Press Any Key to Restart");
		var error = new Audio("sounds/wrong.mp3");
		error.play();
		startOver();
	}		
});


//FUNCTIONS
function startOver(){
	lvl = 0;
	gamePattern = [];
	userClickedPattern = [];
	i = 0;

	$(document).one("keypress", function(){
	randomChosenColor = buttonColors[nextSequence()]; 		// choose a random color from buttonColors
	gamePattern.push(randomChosenColor);					// pus in the random color into gamePattern			
	$("#" + randomChosenColor).addClass("pressed");			// selecting the random color's box
	setTimeout(function(){ $("#" + randomChosenColor).removeClass("pressed"); }, 150); // flash animation
	colorSound(randomChosenColor);
	});
}
// function that plays sound according to the color conserned
function colorSound(key){
	switch(key){
		case "red":
			var redAudio = new Audio("sounds/red.mp3");
			redAudio.play();
		break;

		case "blue":
			var blueAudio = new Audio("sounds/blue.mp3");
			blueAudio.play();
		break;

		case "green":
			var greenAudio = new Audio("sounds/green.mp3");
			greenAudio.play();
		break;

		case "yellow":
			var yellowAudio = new Audio("sounds/yellow.mp3");
			yellowAudio.play();
		break;

		default:
	}
}
// Random number (color) picker and h1 changer
function nextSequence(){
	userClickedPattern = [];
	i = 0;
	lvl++;
	$("h1").text("Level " + lvl);
	return Math.floor(Math.random() * 4);
}

function checkAnswer(n){
		if(gamePattern[n] === userClickedPattern[n]){
			console.log("succes!");	
			return 1;
		} else {
			console.log("fail!");
			return 0;
		}
}
