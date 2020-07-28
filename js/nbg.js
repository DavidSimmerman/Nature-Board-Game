var spcArray = ["spcStart", "spc1", "spc2", "spc3", "spc4", "spc5", "spc6", "spc7", "spc8", "spc9", "spc10", 
				"spc11", "spc12", "spc13", "spc14", "spc15", "spc16", "spc17", "spc18", "spc19",
				"spc20", "spc21", "spc22", "spc23", "spcFinish"];
				
var currentDie = 1;

window.onload = function() {start();};

function start()
{
	
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
				moveBackward(spaces);
			}
		}
	}, 500);
}

function askQuestion()
{
	
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
			document.getElementById("die").src = "style/images/Dice1.png";
			break;
		case 2:
			document.getElementById("die").src = "style/images/Dice2.png";
			break;
		case 3:
			document.getElementById("die").src = "style/images/Dice3.png";
			break;
		case 4:
			document.getElementById("die").src = "style/images/Dice4.png";
			break;
		case 5:
			document.getElementById("die").src = "style/images/Dice5.png";
			break;
		case 6:
			document.getElementById("die").src = "style/images/Dice6.png";
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


function winGame()
{
	
}


