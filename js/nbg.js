var spcArray = ["spcStart", "spc1", "spc2", "spc3", "spc4", "spc5", "spc6", "spc7", "spc8", "spc9", "spc10", 
				"spc11", "spc12", "spc13", "spc14", "spc15", "spc16", "spc17", "spc18", "spc19",
				"spc20", "spc21", "spc22", "spc23", "spcFinish"];

window.onload = function() {start();};

function start()
{
	moveForward(4);
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
				WinGame();
			}
			else
			{
				moveForward(spaces);
			}
		}
		else
		{
			AskQuestion();
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

function AskQuestion()
{
	moveBackward(5);
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

function WinGame()
{
	
}


