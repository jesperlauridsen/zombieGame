function initiateMissions(missionArray,environmentalPoints,objectArray,survivorImage,gameVariables,elderweedImage,zombieExcrementImage,ButterflyEggsImage) {
    var missionDistance = 1500; // +500 each loop variable
	var missionQuads = [0,120,240,270,120,240]; //120 variable
    var randomAngle = "";
    var randomMissionDistance = "";
    var missionPointX = "";
    var missionPointY = "";
    var missionIndexX = "";
    var missionIndexY = "";
    for(y=0;y<Object.keys(environmentalPoints).length;y++) {
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
        missionPointX = Math.round(Math.cos(randomAngle * TO_RADIANS) * randomMissionDistance);
        missionPointY = Math.round(Math.sin(randomAngle * TO_RADIANS) * randomMissionDistance);
        missionPointX = Math.floor(missionPointX/800);
        missionPointY = Math.floor(missionPointY/600);
        missionIndexX = missionPointX;
        missionIndexY = missionPointY;
        //console.log(missionPointX + "," + missionPointY);
        missionPointX = missionPointX * 800 + 400;
        missionPointY = missionPointY * 600 + 300;
        //console.log(missionPointX + "," + missionPointY);
        console.log("Ny X = " + missionPointX + "| Ny Y = " + missionPointY + " " + environmentalPoints[Object.keys(environmentalPoints)[y]].name);
        //ctx.beginPath();
        //ctx.moveTo(400, 300);
        //ctx.lineTo(missionPointX, missionPointY);
        //ctx.stroke();

        //Set points;
        var name = (Object.keys(environmentalPoints)[y]);
        //console.log(name);
        environmentalPoints[name].indexX = missionIndexX;
        environmentalPoints[name].indexY = missionIndexY;
        environmentalPoints[name].x = missionPointX;
        environmentalPoints[name].y = missionPointY;
        missionDistance = missionDistance + 1000;
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

    missionArray[2][0].indexX = environmentalPoints.cityPosition.indexX;
	missionArray[2][0].indexY = environmentalPoints.cityPosition.indexY;
    missionArray[2][0].x = environmentalPoints.cityPosition.x;
	missionArray[2][0].y = environmentalPoints.cityPosition.y;

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
    //console.log(missionArray[3][0].x + "," + missionArray[3][0].y);
    var survivor = {
        itemType:"survivor",
        name:"survivor",
        x:missionArray[2][0].x,
        y:missionArray[2][0].y,
        image: survivorImage,
        solid:1
    }
    objectArray.push(survivor);
    //create 3x4 objects with names & positions in the forest area.
    var itemNames = ["Elderweed","Zombie excrement","Butterfly eggs"];
    var imageSrc = "";
    var questDropName = "";
    for(y=0;y<=16;y++) {
        if(y >= 0 && y < 5) {
            questDropName = itemNames[0];
            imagSrc = elderweedImage;
        }
        else if(y >= 5 && y < 11) {
            questDropName = itemNames[1];
            imageSrc = zombieExcrementImage;
        }
        else if(y >=11 && y < 17) {
            questDropName = itemNames[2];
            imageSrc = ButterflyEggsImage;
        }
        var dropObject = {
            number:0,
            name:questDropName,
            itemType:"questItem",
            x:(Math.round(Math.random() * 2400 - 1) - 800) + (missionArray[9][0].indexX * 800),//Random
            y:(Math.round(Math.random() * 1800 - 1) - 600) + (missionArray[9][0].indexY * 600),//Random
            imageSource:imageSrc,
            amount:1,
            offset:25,
            dropTime:gameVariables.timeControler.getTime(),
            pickUpTime:0,
            solid:0
        };
        //console.log("Drop [" + dropObject.name + "] at: " + dropObject.x + "," + dropObject.y);
        objectArray.push(dropObject);
        }
    //console.log(objectArray);
    //console.log(missionArray);
}

function validateMission(missionArray,hero,timeControler,gameDisplay) {
	var missionCompleted = undefined;
	for(h=0;h<missionArray[hero.currentMission].length;h++) {
		if(missionArray[hero.currentMission][h].type === "get" && missionArray[hero.currentMission][h].func === "primary") {
			if(missionArray[hero.currentMission][h].gathered >= missionArray[hero.currentMission][h].amount) {
				missionArray[hero.currentMission][h].completionTime = timeControler.getTime();
				missionArray[hero.currentMission][h].completed = "yes";
                if(missionCompleted === undefined || missionCompleted === true) {
                    missionCompleted = true;
                }
			}
			else {
				missionCompleted = false;
			}
		}
		else if(missionArray[hero.currentMission][h].type === "find" && missionArray[hero.currentMission][h].func === "primary") {
            if(hero.currentMission === 9) {
                if(missionArray[hero.currentMission][h].indexX === gameDisplay.indexX && missionArray[hero.currentMission][h].indexY === gameDisplay.indexY ||
                   missionArray[hero.currentMission][h].indexX === gameDisplay.indexX-1 && missionArray[hero.currentMission][h].indexY === gameDisplay.indexY-1 ||
                   missionArray[hero.currentMission][h].indexX === gameDisplay.indexX-1 && missionArray[hero.currentMission][h].indexY === gameDisplay.indexY ||
                   missionArray[hero.currentMission][h].indexX === gameDisplay.indexX-1 && missionArray[hero.currentMission][h].indexY === gameDisplay.indexY+1 ||
                   missionArray[hero.currentMission][h].indexX === gameDisplay.indexX && missionArray[hero.currentMission][h].indexY === gameDisplay.indexY-1 ||
                   missionArray[hero.currentMission][h].indexX === gameDisplay.indexX && missionArray[hero.currentMission][h].indexY === gameDisplay.indexY+1 ||
                   missionArray[hero.currentMission][h].indexX === gameDisplay.indexX+1 && missionArray[hero.currentMission][h].indexY === gameDisplay.indexY-1 ||
                   missionArray[hero.currentMission][h].indexX === gameDisplay.indexX+1 && missionArray[hero.currentMission][h].indexY === gameDisplay.indexY ||
                   missionArray[hero.currentMission][h].indexX === gameDisplay.indexX+1 && missionArray[hero.currentMission][h].indexY === gameDisplay.indexY+1) {
                //console.log("completed!");
				missionArray[hero.currentMission][h].completionTime = timeControler.getTime();
				missionArray[hero.currentMission][h].completed = "yes";
                hero.missionPresented = 0;
                if(missionCompleted === undefined || missionCompleted === true) {
                    missionCompleted = true;
                }
			}
			else {
				missionCompleted = false;
			}

            }
            else {
            //console.log(missionArray[hero.currentMission][h].indexX + "," + missionArray[hero.currentMission][h].indexY + " -- " + gameDisplay.indexX + "," + gameDisplay.indexY);
			if(missionArray[hero.currentMission][h].indexX === gameDisplay.indexX && missionArray[hero.currentMission][h].indexY === gameDisplay.indexY) {
                //console.log("completed!");
				missionArray[hero.currentMission][h].completionTime = timeControler.getTime();
				missionArray[hero.currentMission][h].completed = "yes";
                hero.missionPresented = 0;
                if(missionCompleted === undefined || missionCompleted === true) {
                    missionCompleted = true;
                }
			}
			else {
				missionCompleted = false;
			}
          }
		}
		else if(missionArray[hero.currentMission][h].type === "kill" && missionArray[hero.currentMission][h].func === "primary") {
			if(missionArray[hero.currentMission][h].gathered >= missionArray[hero.currentMission][h].amount) {
				missionArray[hero.currentMission][h].completionTime = timeControler.getTime();
				missionArray[hero.currentMission][h].completed = "yes";
                hero.missionPresented = 0;
                if(missionCompleted === undefined || missionCompleted === true) {
                    missionCompleted = true;
                }
			}
			else {
				missionCompleted = false;
			}
		}
		else if(missionArray[hero.currentMission][h].type === "interact" && missionArray[hero.currentMission][h].func === "primary") {
			if(missionArray[hero.currentMission][h].interacted === 1) {
				missionArray[hero.currentMission][h].completionTime = timeControler.getTime();
				missionArray[hero.currentMission][h].completed = "yes";
                hero.missionPresented = 0;
                if(missionCompleted === undefined || missionCompleted === true) {
                    missionCompleted = true;
                }
			}
			else {
				missionCompleted = false;
			}
		}
		else if(missionArray[hero.currentMission][h].type === "win" && missionArray[hero.currentMission][h].func === "primary") {
			if(missionArray[hero.currentMission][h].won === "yes") {
				missionArray[hero.currentMission][h].completionTime = timeControler.getTime();
				missionArray[hero.currentMission][h].completed = "yes";
                hero.missionPresented = 0;
                if(missionCompleted === undefined || missionCompleted === true) {
                    missionCompleted = true;
                }
			}
			else {
				missionCompleted = false;
			}
		}
	}
    //console.log(missionCompleted);
    if(missionCompleted === true) {
        console.log("next mission!");
        if(hero.currentMission < 13);
        hero.currentMission = hero.currentMission + 1;
        hero.missionProgress = hero.missionProgress + 1;
        hero.missionPresented = 0;
        console.log(hero.currentMission);
    }
}

function ambushMissionSpawn(hero,objectArray,timeControler,missionArray,monsterArray) {
    if(hero.currentMission === 6) {
        //console.log(missionArray[5][0].completionTime + (missionArray[6][0].wave * 3000) + ">" + timeControler.getTime());
        if(missionArray[5][0].completionTime + (missionArray[6][0].wave * 7000) < timeControler.getTime() && missionArray[6][0].wave < 7) {
            //new wave
            console.log("new wave of small zombies! (wave " + missionArray[6][0].wave + ")");
            for(x=0;x<4;x++) {
                var randomAngle = (Math.round(Math.random() * 360 + 0));
                var  xPoint = Math.round(400 + Math.cos(randomAngle) * Math.round(Math.random() * 900 + 600));
                var  yPoint = Math.round(400 + Math.sin(randomAngle) * Math.round(Math.random() * 900 + 600));
                spawnMonster(xPoint,yPoint,20,500,100,100,1,monsterArray,"desperate");
                //console.log("spawned mob");
            }
            //spawnMonster(0,canvas.height,20,500,100,100,1,monsterArray,"idle");
            //spawnMonster(xStart, yStart,damage,damageInterval,health,fullHealth,category,monsterArray,state)
            missionArray[6][0].wave = missionArray[6][0].wave + 1;
        }
        if(missionArray[5][0].completionTime + (missionArray[6][1].wave * 12000) < timeControler.getTime() && missionArray[6][1].wave < 4) {
            //new wave
            console.log("new wave of medium zombies! (wave " + missionArray[6][1].wave + ")");
            for(x=0;x<2;x++) {
                var randomAngle = (Math.round(Math.random() * 360 + 0));
                var  xPoint = Math.round(400 + Math.cos(randomAngle) * Math.round(Math.random() * 1000 + 600));
                var  yPoint = Math.round(400 + Math.sin(randomAngle) * Math.round(Math.random() * 1000 + 600));
                spawnMonster(xPoint,yPoint,35,1000,200,200,2,monsterArray,"desperate");
                //console.log("spawned semileader");
            }
            missionArray[6][1].wave = missionArray[6][1].wave + 1;
        }
        if(missionArray[5][0].completionTime + (missionArray[6][2].wave * 17000) < timeControler.getTime() && missionArray[6][2].wave < 4) {
            //new wave
            console.log("new wave of large zombies! (wave " + missionArray[6][2].wave + ")");
            for(x=0;x<1;x++) {
                var randomAngle = (Math.round(Math.random() * 360 + 0));
                var  xPoint = Math.round(400 + Math.cos(randomAngle) * Math.round(Math.random() * 1200 + 1000));
                var  yPoint = Math.round(400 + Math.sin(randomAngle) * Math.round(Math.random() * 1200 + 1000));
                spawnMonster(xPoint,yPoint,40,500,250,250,3,monsterArray,"desperate");
                console.log("spawned leader");
            }
            missionArray[6][2].wave = missionArray[6][2].wave + 1;
        }
    }
    if(hero.currentMission === 8) {
       if(missionArray[7][0].completionTime + (missionArray[8][0].wave * 6000) < timeControler.getTime() && missionArray[8][0].wave < 13) {
            //new wave
            console.log("new wave of zombies to repel! (wave " + missionArray[8][0].wave + ")");
            for(x=0;x<2;x++) {
                var randomAngle = (Math.round(Math.random() * 360 + 0));
                var  xPoint = Math.round(400 + Math.cos(randomAngle) * Math.round(Math.random() * 1000 + 800));
                var  yPoint = Math.round(300 + Math.sin(randomAngle) * Math.round(Math.random() * 1000 + 800));
                // spawnMonster(xStart, yStart,damage,damageInterval,health,fullHealth,category,monsterArray,state) {
                spawnMonster(xPoint,yPoint,20,300,120,120,1,monsterArray,"desperate");
            }
            missionArray[8][0].wave = missionArray[8][0].wave + 1;
        }

    }
    if(hero.currentMission === 13) {
        if(missionArray[12][0].completionTime + (missionArray[13][0].wave * 3000) < timeControler.getTime() && missionArray[13][0].wave < 13) {
            //new wave
            if(missionArray[13][0].wave === 3) {
                var randomAngle = (Math.round(Math.random() * 360 + 0));
                var  xPoint = Math.round(400 + Math.cos(randomAngle) * Math.round(Math.random() * 1000 + 800));
                var  yPoint = Math.round(300 + Math.sin(randomAngle) * Math.round(Math.random() * 1000 + 800));
                spawnMonster(xPoint,yPoint,20,300,400,400,4,monsterArray,"boss");
            }
            else {
            for(x=0;x<3;x++) {
                var randomAngle = (Math.round(Math.random() * 360 + 0));
                var  xPoint = Math.round(400 + Math.cos(randomAngle) * Math.round(Math.random() * 1000 + 800));
                var  yPoint = Math.round(300 + Math.sin(randomAngle) * Math.round(Math.random() * 1000 + 800));
                // spawnMonster(xStart, yStart,damage,damageInterval,health,fullHealth,category,monsterArray,state) {
                spawnMonster(xPoint,yPoint,20,300,120,120,1,monsterArray,"desperate");
            }
            missionArray[8][0].wave = missionArray[8][0].wave + 1;
            }
        }

    }
}

function missionKillCounter(missionArray,monster,hero) {
    if(hero.currentMission === 2) {
        missionArray[2][1].gathered = missionArray[2][1].gathered + 1;
        hero.missionPresented = 0;
    }
    else if(hero.currentMission === 6) {
        if(monster.category === 1) {
            missionArray[6][0].gathered = missionArray[6][0].gathered + 1;
            hero.missionPresented = 0;
        }
        else if(monster.category === 2) {
            missionArray[6][1].gathered = missionArray[6][1].gathered + 1;
            hero.missionPresented = 0;
        }
        else if(monster.category === 3) {
            missionArray[6][2].gathered = missionArray[6][2].gathered + 1;
            hero.missionPresented = 0;
        }
        else {
        }

    }
    else if(hero.currentMission === 8) {
        missionArray[8][0].gathered = missionArray[8][0].gathered + 1;
        hero.missionPresented = 0;

    }
    else if(hero.currentMission === 12) {
        if(monster.category === 4) {
            missionArray[12][0].gathered = missionArray[12][0].gathered + 1;
            hero.missionPresented = 0;
        }
        else {

        }
    }
    else {

    }
}
