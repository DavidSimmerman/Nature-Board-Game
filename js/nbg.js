var spcArray = ["spcStart", "spc1", "spc2", "spc3", "spc4", "spc5", "spc6", "spc7", "spc8", "spc9", "spc10", 
				"spc11", "spc12", "spc13", "spc14", "spc15", "spc16", "spc17", "spc18", "spc19",
				"spc20", "spc21", "spc22", "spc23", "spcFinish"];
				
var spcQuestion = [
					" ",
					"1.) You find a cute turtle in the park that seems to like you.",
					"2.) You forget your reusable grocery bags in the car.",
					"3.) You see a piece of trash in the lake.",
					"4.) There are weeds in your garden.",
					"5.) You notice bugs eating your garden vegetables.",
					"6.) You see someone leave their trash on a picnic table.",
					"7.) A tree on the other side of your fence has a branch that hangs over and drops leaves into your yard, and you are tired of raking them.",
					"8.) You don't want your pet snake anymore.",
					"9.) Your family never recycles anything.",
					"10.) You read that outdoor cats kill hundreds of small animals every year.",
					"11.) You are packing for a road trip with your family.",
					"12.) While brushing your teeth,",
					"13.) There is no recycling can in sight.",
					"14.) You were invited to a friend's party and they ask you to bring utensils.",
					"15.) Your friend lives three blocks away (in a safe neighborhood).",
					"16.) Your cell phone is a couple years old, but it still works. You can afford to buy the newest model that just came out.",
					"17.) You and your friends agreed to meet at a restaurant for lunch.",
					"18.) You are working on homework when you mom tells you dinner is ready. As you leave your room, do you...",
					"19.) You have expired medicine that you need to get rid of.",
					"20.) You have a mouse problem at home, and you know mice can carry diseases.",
					"21.) It's a hot summer afternoon.",
					"22.) You just learned that noise pollution disturbs wildlife, especially baby animals. While repairing your car,",
					"23.) A baby deer has been alone in your yard for a few hours."
					];
					
var spcAnswer1 = [
					" ",
					"Keep it as a pet",
					"Go back out to get them",
					"Pick it up",
					"Use chemicals to kill them",
					"Purchase effective pesticides",
					"Ask them to throw it away",
					"Cut down the tree branch that keeps dropping leaves",
					"Release it into the wild and set it free",
					"Try to convince them to start recycling",
					"Allow your cat to go outside because it really wants to",
					"Buy a cheap case of plastic water bottles",
					"Turn off the faucet while you brush",
					"Throw your empty soda bottle in a nearby trash can",
					"Bring a box of plastic/disposable silverware",
					"Walk to their house",
					"Do you replace your phone with a new one",
					"Drive separately because they live on the other side of town",
					"Turn out the light to use less electricity",
					"Flush it down the toilet/throw it in the trash",
					"Use poison to kill them",
					"Open the windows",
					"Buy a part that makes your car quieter",
					"Put it in your car and drive it to a local wildlife rehabilitator"
					];
					
var spcAnswer2 = [
					" ",
					"Leave it where you found it",
					"Just use plastic ones at checkout",
					"Leave it there",
					"Spend time pulling them out every weekend",
					"Explore alternative methods",
					"Say nothing",
					"Leave it be and continue raking",
					"Find someone else who's willing to care for it",
					"Leave it up to them and not bring it up",
					"Force it to stay inside and learn to be happy indoors",
					"Buy each person a more expensive reusable water bottle",
					"Leave it on for only a couple minutes",
					"Hang onto it until you hopefully find a recycling can",
					"Bring silverware that you will have to wash after the party",
					"Ask someone to drive you",
					"Keep using the one that you have",
					"Carpool",
					"Leave it on because it is convenient and harmless",
					"Ask your doctor/local health deptartment",
					"Use spring traps, which require you to dispose of the dead mouse",
					"Turn on the air conditioning",
					"Buy a cheaper part that does not",
					"Leave it there, wait for mama to show up, and call a wildlife rehabber if you are still concerned"
					];
					
var spcCorrectAnswer = [0, 2, 1, 1, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 1, 1, 2];
				
var currentDie = 1;
var activeDie = false;
var canAnswer = false;
var hasWon = false;
var clickedSpace = 0;

window.onload = function() {start();};

function start()
{
	
}

function startGame(imageName)
{
	avatar = "style/images/" + imageName;
	for(i = 0; i <= 24; i++)
	{
		document.getElementById(spcArray[i]).src = avatar;
	}
	document.getElementById("boardTable").style.visibility = "visible";
	document.getElementById(spcArray[0]).style.visibility = "visible";
	document.getElementById("welcomeBox").style.visibility = "hidden";
	activeDie = true;
}

function moveForward(spaces) 
{
	setTimeout(function()
	{
		if(spaces > 0)
		{
			spaces--;
			var spcNumber = getCurrentSpace();
			var oldSpc = document.getElementById(spcArray[spcNumber]);
			oldSpc.style.visibility = "hidden";
			oldSpc.className = "emptySpc";
			spcNumber++;
			var newSpc = document.getElementById(spcArray[spcNumber]);
			newSpc.style.visibility = "visible";
			newSpc.className = "currentSpc";
			document.getElementById("moveSound").play()
			if(spcNumber == 24)
			{
				winGame();
			}
			else
			{
				moveForward(spaces);
			}
		}
		else
		{
			askQuestion();
		}
	}, 500);
}

function moveBackward(spaces) 
{
	setTimeout(function()
	{
		if(spaces > 0)
		{
			spaces--;
			var spcNumber = getCurrentSpace();
			if(spcNumber != 0)
			{
				var oldSpc = document.getElementById(spcArray[spcNumber]);
				oldSpc.style.visibility = "hidden";
				oldSpc.className = "emptySpc";
				spcNumber--;
				var newSpc = document.getElementById(spcArray[spcNumber]);
				newSpc.style.visibility = "visible";
				newSpc.className = "currentSpc";
				document.getElementById("moveSound").play()
				moveBackward(spaces);
			}
			else
			{
				resetQuestion();
			}
		}
		else if(getCurrentSpace() == 0)
		{
			resetQuestion();
		}
		else
		{
			askQuestion();
		}
	}, 500);
}

function askQuestion()
{
	document.getElementById("answer1").style.backgroundColor = "rgba(209, 172, 137, 1)";
	document.getElementById("answer2").style.backgroundColor = "rgba(209, 172, 137, 1)";
	document.getElementById("questionBox").style.visibility = "visible";
	document.getElementsByClassName("dieGuy")[0].id = "dieDisabled2";
	var currentSpc = getCurrentSpace();
	document.getElementById("question").innerHTML = spcQuestion[currentSpc];
	document.getElementById("answer1").innerHTML = spcAnswer1[currentSpc];
	document.getElementById("answer2").innerHTML = spcAnswer2[currentSpc];
	canAnswer = true;
}

function clickedAnswer(ans)
{
	if(!canAnswer) return;
	canAnswer = false;
	if(hasWon)
	{
		if(ans == 1)
		{
			if(ans == spcCorrectAnswer[clickedSpace])
			{
				document.getElementById("answer1").style.backgroundColor = "green";
				document.getElementById("rightSound").play();
				setTimeout(function() {
					document.getElementById("questionBox").style.visibility = "hidden";
				}, 1500);
			}
			else
			{
				document.getElementById("answer1").style.backgroundColor = "red";
				document.getElementById("wrongSound").play();
				setTimeout(function() {
					document.getElementById("questionBox").style.visibility = "hidden";
				}, 1500);
			}
		}
		if(ans == 2)
		{
			if(ans == spcCorrectAnswer[clickedSpace])
			{
				document.getElementById("answer2").style.backgroundColor = "green";
				document.getElementById("rightSound").play();
				setTimeout(function() {
					document.getElementById("questionBox").style.visibility = "hidden";
				}, 1500);
				
			}
			else
			{
				document.getElementById("wrongSound").play();
				document.getElementById("answer2").style.backgroundColor = "red";
				setTimeout(function() {
					document.getElementById("questionBox").style.visibility = "hidden";
				}, 1500);
			}
		}
	}
	else
	{
		if(ans == 1)
		{
			if(ans == spcCorrectAnswer[getCurrentSpace()])
			{
				document.getElementById("answer1").style.backgroundColor = "green";
				document.getElementById("rightSound").play();
				setTimeout(function() {
					resetQuestion();
					document.getElementById("questionBox").style.visibility = "hidden";
				}, 1500);
			}
			else
			{
				document.getElementById("answer1").style.backgroundColor = "red";
				document.getElementById("wrongSound").play();
				setTimeout(function() {
					moveBackward(5);
					document.getElementById("questionBox").style.visibility = "hidden";
				}, 1500);
			}
		}
		if(ans == 2)
		{
			if(ans == spcCorrectAnswer[getCurrentSpace()])
			{
				document.getElementById("answer2").style.backgroundColor = "green";
				document.getElementById("rightSound").play();
				setTimeout(function() {
					resetQuestion();
					document.getElementById("questionBox").style.visibility = "hidden";
				}, 1500);
				
			}
			else
			{
				document.getElementById("answer2").style.backgroundColor = "red";
				document.getElementById("wrongSound").play();
				setTimeout(function() {
					moveBackward(5);
					document.getElementById("questionBox").style.visibility = "hidden";
				}, 1500);
			}
		}
	}
}

function resetQuestion()
{
	console.log("reset");
	activeDie = true;
	document.getElementsByClassName("dieGuy")[0].id = "dieEnabled";
	document.getElementById("answer1").style.backgroundColor = "rgba(209, 172, 137, 1)";
	document.getElementById("answer2").style.backgroundColor = "rgba(209, 172, 137, 1)";	
}

function getCurrentSpace()
{
	for (var i = 0; i <= 24; i++)
	{
		if(document.getElementById(spcArray[i]).className == "currentSpc")
		{
			return i;
		}
	}
}

function rollDice(rolls)
{
	setTimeout(function()
	{
		do
		{
			var ranNum = Math.ceil(Math.random() * 6);
			console.log(ranNum);
		} while(ranNum == currentDie);
		rolls--;
		currentDie = ranNum;
		switch (currentDie)
		{
		case 1:
			document.getElementsByClassName("dieGuy")[0].src = "style/images/Dice1.png";
			break;
		case 2:
			document.getElementsByClassName("dieGuy")[0].src = "style/images/Dice2.png";
			break;
		case 3:
			document.getElementsByClassName("dieGuy")[0].src = "style/images/Dice3.png";
			break;
		case 4:
			document.getElementsByClassName("dieGuy")[0].src = "style/images/Dice4.png";
			break;
		case 5:
			document.getElementsByClassName("dieGuy")[0].src = "style/images/Dice5.png";
			break;
		case 6:
			document.getElementsByClassName("dieGuy")[0].src = "style/images/Dice6.png";
			break;
		}	
		if(rolls == 0)
		{
			moveForward(currentDie);
		}
		else
		{
			rollDice(rolls);
		}

	}, 300);
}

function dieClicked()
{
	if(activeDie)
	{
		activeDie = false;
		document.getElementsByClassName("dieGuy")[0].id = "dieDisabled1";
		document.getElementById("diceSound").play();
		rollDice(6);
	}	
}

function winGame()
{
	setTimeout(function() {
		document.getElementById("winBox").style.visibility = "visible";
		hasWon = true;
	}, 500)
	
}

function hideWinBox() 
{
	document.getElementById("winBox").style.visibility = "hidden";
}

function showQuestion(spc)
{
	if (!hasWon)
	{
		return;
	}
	clickedSpace = spc;
	document.getElementById("answer1").style.backgroundColor = "rgba(209, 172, 137, 1)";
	document.getElementById("answer2").style.backgroundColor = "rgba(209, 172, 137, 1)";
	document.getElementById("questionBox").style.visibility = "visible";
	document.getElementsByClassName("dieGuy")[0].id = "dieDisabled2";
	document.getElementById("question").innerHTML = spcQuestion[clickedSpace];
	document.getElementById("answer1").innerHTML = spcAnswer1[clickedSpace];
	document.getElementById("answer2").innerHTML = spcAnswer2[clickedSpace];
	canAnswer = true;
}

function debugMove(x)
{
	moveForward(x);
	document.getElementById("dieEnabled").id = "dieDisabled1";
}
