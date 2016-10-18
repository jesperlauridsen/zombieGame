function initiateMissions(missionArray,environmentalPoints) {
    var missionDistance = 2000; // +500 each loop variable
	var missionQuads = [0,120,240,270,120,240]; //120 variable
    var randomAngle = "";
    var randomMissionDistance = "";
    var missionPointX = "";
    var missionPointY = "";
    for(y=0;y<Object.keys(environmentalPoints).length-1;y++) {
        var randomNumber = Math.round(Math.random() * (missionQuads.length-1) - 0 ) + 0;
        //console.log(randomNumber);
        //Math.floor(Math.random() * 6) + 1 ///////////// 1 is start number, 6 is number of options.
        randomAngle = (Math.round(Math.random() * 120)) + missionQuads[randomNumber];
        randomMissionDistance = (Math.round(Math.random() * (500 - 0 + 1) + 0)) + missionDistance;
        missionQuads.splice(randomNumber-1, 1);
        //console.log("Angle: " +  randomAngle + " | Randomnumber: " + randomNumber + " | Mission distance: " + randomMissionDistance + " | Array: " + missionQuads.length);
        //Calculate points;
        //X = Math.round(Math.cos(angle * Math.PI / 180) * distance + x);
        //Y = Math.round(Math.sin(angle * Math.PI / 180) * distance + y);
        missionPointX = Math.round(Math.cos(randomAngle * TO_RADIANS) * randomMissionDistance + 400);
        missionPointY = Math.round(Math.sin(randomAngle * TO_RADIANS) * randomMissionDistance + 300);
        //console.log("Ny X = " + missionPointX + "| Ny Y = " + missionPointY);
        //ctx.beginPath();
        //ctx.moveTo(400, 300);
        //ctx.lineTo(missionPointX, missionPointY);
        //ctx.stroke();

        //Set points;
        var name = (Object.keys(environmentalPoints)[y]);
        //console.log(name);
        environmentalPoints[name].indexX = Math.round(missionPointX/800);
        environmentalPoints[name].indexY = Math.round(missionPointY/600);
        environmentalPoints[name].x = missionPointX;
        environmentalPoints[name].y = missionPointY;
        missionDistance = missionDistance + 500;
         }
	//Index er Math.round(X/800)
	//	   Math.round(Y/600)
	//set values in missionArray;
	missionArray[0][0].indexX = environmentalPoints.basecampPosition.indexX;
	missionArray[0][0].indexY = environmentalPoints.basecampPosition.indexY;
    missionArray[0][0].x = environmentalPoints.basecampPosition.x;
	missionArray[0][0].y = environmentalPoints.basecampPosition.y;

	missionArray[1][0].indexX = environmentalPoints.cityPosition.indexX;
	missionArray[1][0].indexY = environmentalPoints.cityPosition.indexY;
    missionArray[1][0].x = environmentalPoints.cityPosition.x;
	missionArray[1][0].y = environmentalPoints.cityPosition.y;

	missionArray[3][0].indexX = environmentalPoints.basecampPosition.indexX;
	missionArray[3][0].indexY = environmentalPoints.basecampPosition.indexY;
    missionArray[3][0].x = environmentalPoints.basecampPosition.x;
	missionArray[3][0].y = environmentalPoints.basecampPosition.y;

	missionArray[5][0].indexX = environmentalPoints.groundZeroPosition.indexX;
	missionArray[5][0].indexY = environmentalPoints.groundZeroPosition.indexY;
    missionArray[5][0].x = environmentalPoints.groundZeroPosition.x;
	missionArray[5][0].y = environmentalPoints.groundZeroPosition.y;

	missionArray[7][0].indexX = environmentalPoints.basecampPosition.indexX;
	missionArray[7][0].indexY = environmentalPoints.basecampPosition.indexY;
    missionArray[7][0].x = environmentalPoints.basecampPosition.x;
	missionArray[7][0].y = environmentalPoints.basecampPosition.y;

	missionArray[9][0].indexX = environmentalPoints.forestPosition.indexX;
	missionArray[9][0].indexY = environmentalPoints.forestPosition.indexY;
    missionArray[9][0].x = environmentalPoints.forestPosition.x;
	missionArray[9][0].y = environmentalPoints.forestPosition.y;
    //console.log(environmentalPoints.forestPosition.indexX + " " + environmentalPoints.forestPosition.indexY);

	missionArray[10][0].indexX = environmentalPoints.basecampPosition.indexX;
	missionArray[10][0].indexY = environmentalPoints.basecampPosition.indexY;
    missionArray[10][0].x = environmentalPoints.basecampPosition.x;
	missionArray[10][0].y = environmentalPoints.basecampPosition.y;

	missionArray[11][0].indexX = environmentalPoints.zombiePlayground.indexX;
	missionArray[11][0].indexY = environmentalPoints.zombiePlayground.indexY;
    missionArray[11][0].x = environmentalPoints.zombiePlayground.x;
	missionArray[11][0].y = environmentalPoints.zombiePlayground.y;
    console.log(missionArray[0][0].indexX + "," + missionArray[0][0].indexX)
}

function validateMission(missionArray,hero,timeControler,gameDisplay) {
	var missionCompleted = false;
	for(h=0;h<missionArray[hero.currentMission].length;h++) {
		if(missionArray[hero.currentMission][h].type === "get") {
			if(missionArray[hero.currentMission][h].gathered >= missionArray[hero.currentMission][h].amount) {
				missionArray[hero.currentMission][h].completionTime = timeControler.getTime();
				missionArray[hero.currentMission][h].completed = "yes";
                missionCompleted = true;
			}
			else {
				missionCompleted = false;
			}
		}
		else if(missionArray[hero.currentMission][h].type === "find") {
            //console.log(missionArray[hero.currentMission][h].indexX + "," + missionArray[hero.currentMission][h].indexY + " -- " + gameDisplay.indexX + "," + gameDisplay.indexY);
			if(missionArray[hero.currentMission][h].indexX === gameDisplay.indexX && missionArray[hero.currentMission][h].indexY === gameDisplay.indexY) {
				missionArray[hero.currentMission][h].completionTime = timeControler.getTime();
				missionArray[hero.currentMission][h].completed = "yes";
                missionCompleted = true;
			}
			else {
				missionCompleted = false;
			}
		}
		else if(missionArray[hero.currentMission][h].type === "kill") {
			if(missionArray[hero.currentMission][h].gathered >= missionArray[hero.currentMission][h].amount) {
				missionArray[hero.currentMission][h].completionTime = timeControler.getTime();
				missionArray[hero.currentMission][h].completed = "yes";
                missionCompleted = true;
			}
			else {
				missionCompleted = false;
			}
		}
		else if(missionArray[hero.currentMission][h].type === "interact") {
			if(missionArray[hero.currentMission][h].interacted === 1) {
				missionArray[hero.currentMission][h].completionTime = timeControler.getTime();
				missionArray[hero.currentMission][h].completed = "yes";
                missionCompleted = true;
			}
			else {
				missionCompleted = false;
			}
		}
		else if(missionArray[hero.currentMission][h].type === "win") {
			if(missionArray[hero.currentMission][h].won === "yes") {
				missionArray[hero.currentMission][h].completionTime = timeControler.getTime();
				missionArray[hero.currentMission][h].completed = "yes";
                missionCompleted = true;
			}
			else {
				missionCompleted = false;
			}
		}
	}
    if(missionCompleted === true) {
        console.log("next mission!");
        if(hero.currentMission < 13);
        hero.currentMission = hero.currentMission + 1;
        hero.missionProgress = hero.missionProgress + 1;
        hero.missionPresented = 0;
        console.log(hero.currentMission);
    }
}
