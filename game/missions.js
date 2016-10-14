function initiateMissions(missionArray,environmentalPoints) {
    var missionDistance = 2000; // +500 each loop variable
	var missionQuads = [0,120,240,270,120,240]; //120 variable
    var randomAngle = "";
    for(y=1;y<Object.keys(environmentalPoints).length;y++) {
        var randomNumber = Math.round(Math.random() * (missionQuads.length-1) - 0 ) + 0;
        //console.log(randomNumber);
        randomAngle = (Math.round(Math.random() * (120 - 0 + 1) + 0)) + missionQuads[randomNumber];
        missionQuads.splice(randomNumber-1, 1);
        console.log("Angle: " +  randomAngle + " | Randomnumber: " + randomNumber + " | Array: " + missionQuads.length);
      //  console.log(environmentalPoints[Object.keys(environmentalPoints)[y]].name);
        missionDistance = missionDistance + 500;
         }
	//Index er Math.round(X/800)
	//	   Math.round(Y/600)
	//set basecamp
	missionArray[0].indexX = environmentalPoints.basecampPosition.indexX;
	missionArray[0].indexY = environmentalPoints.basecampPosition.indexY;

	missionArray[1].indexX = environmentalPoints.cityPosition.indexX;
	missionArray[1].indexY = environmentalPoints.cityPosition.indexY;

	missionArray[3].indexX = environmentalPoints.basecampPosition.indexX;
	missionArray[3].indexY = environmentalPoints.basecampPosition.indexY;

	missionArray[5].indexX = environmentalPoints.groundZeroPosition.indexX;
	missionArray[5].indexY = environmentalPoints.groundZeroPosition.indexY;

	missionArray[7].indexX = environmentalPoints.basecampPosition.indexX;
	missionArray[7].indexY = environmentalPoints.basecampPosition.indexY;

	missionArray[9].indexX = environmentalPoints.forestPosition.indexX;
	missionArray[9].indexY = environmentalPoints.forestPosition.indexY;

	missionArray[10].indexX = environmentalPoints.basecampPosition.indexX;
	missionArray[10].indexY =  environmentalPoints.basecampPosition.indexY;

	missionArray[11].indexX = environmentalPoints.zombiePlayground.indexX;
	missionArray[11].indexY = environmentalPoints.zombiePlayground.indexY;
}

function validateMission(missionArray,hero,timeControler,gameDisplay) {
	var missionCompleted = true;
	for(h=0;h<missionArray[hero.currentMission].length;h++) {
		if(missionArray[hero.currentMission][h].type === "get") {
			if(missionArray[hero.currentMission][h].gathered >= missionArray[hero.currentMission][h].amount) {
				missionArray[hero.currentMission][h].completionTime = timeControler.getTime();
				missionArray[hero.currentMission][h].completed = "yes";
			}
			else {
				missionCompleted = false;
			}
		}
		else if(missionArray[hero.currentMission][h].type === "find") {
			if(missionArray[hero.currentMission][h].indexX === gameDisplay.indexX && missionArray[hero.currentMission][h].indexY === gameDisplay.indexY) {
				missionArray[hero.currentMission][h].completionTime = timeControler.getTime();
				missionArray[hero.currentMission][h].completed = "yes";
			}
			else {
				missionCompleted = false;
			}
		}
		else if(missionArray[hero.currentMission][h].type === "kill") {
			if(missionArray[hero.currentMission][h].gathered >= missionArray[hero.currentMission][h].amount) {
				missionArray[hero.currentMission][h].completionTime = timeControler.getTime();
				missionArray[hero.currentMission][h].completed = "yes";
			}
			else {
				missionCompleted = false;
			}
		}
		else if(missionArray[hero.currentMission][h].type === "interact") {
			if(missionArray[hero.currentMission][h].interacted === 1) {
				missionArray[hero.currentMission][h].completionTime = timeControler.getTime();
				missionArray[hero.currentMission][h].completed = "yes";
			}
			else {
				missionCompleted = false;
			}
		}
		else if(missionArray[hero.currentMission][h].type === "win") {
			if(missionArray[hero.currentMission][h].won === "yes") {
				missionArray[hero.currentMission][h].completionTime = timeControler.getTime();
				missionArray[hero.currentMission][h].completed = "yes";
			}
			else {
				missionCompleted = false;
			}
		}
	}
}
