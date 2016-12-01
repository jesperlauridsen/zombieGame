function initialNineTileGameboard(numberOfLampsOnScreen, monsterArray,environmentImagesLoaded,environmentArray,gameDisplay,objectArray) {
	//middle
	addLampToScreenArrayVersion2(0,0,0,0,300,numberOfLampsOnScreen);
    spawnRandomEnvironment(0, 0,environmentImagesLoaded,environmentArray,gameDisplay);
    spawnBoxInTile(objectArray,0,0);
	//top
	addLampToScreenArrayVersion2(0,-1,0,-canvas.height,300,numberOfLampsOnScreen);
    spawnRandomEnvironment(0,-1,environmentImagesLoaded,environmentArray,gameDisplay);
	randomStartNumber = Math.round(Math.random() * 1 + 2);
    spawnBoxInTile(objectArray,0,-1);
	for(x=0;x<randomStartNumber;x++) {
		spawnMonster(0, -canvas.height,20,500,100,100,1,monsterArray,"idle");
	}
	//bottom
	addLampToScreenArrayVersion2(0,1,0,canvas.height,300,numberOfLampsOnScreen);
    spawnRandomEnvironment(0,1,environmentImagesLoaded,environmentArray,gameDisplay);
	randomStartNumber = Math.round(Math.random() * 1 + 2);
    spawnBoxInTile(objectArray,0,1);
	for(x=0;x<randomStartNumber;x++) {
		spawnMonster(0,canvas.height,20,500,100,100,1,monsterArray,"idle");
	}
	//left
	addLampToScreenArrayVersion2(-1,0,-canvas.width,0,300,numberOfLampsOnScreen);
    spawnRandomEnvironment(-1,0,environmentImagesLoaded,environmentArray,gameDisplay);
	randomStartNumber = Math.round(Math.random() * 1 + 2);
    spawnBoxInTile(objectArray,-1,0);
	for(x=0;x<randomStartNumber;x++) {
		spawnMonster(-canvas.width,0,20,500,100,100,1,monsterArray,"idle");
	}
	//right
	addLampToScreenArrayVersion2(1,0,canvas.width,0,300,numberOfLampsOnScreen);
    spawnRandomEnvironment(1,0,environmentImagesLoaded,environmentArray,gameDisplay);
	randomStartNumber = Math.round(Math.random() * 1 + 2);
    spawnBoxInTile(objectArray,1,0);
	for(x=0;x<randomStartNumber;x++) {
		spawnMonster(canvas.width,0,20,500,100,100,1,monsterArray,"idle");
	}
	//top right
	addLampToScreenArrayVersion2(1,-1,canvas.width,-canvas.height,300,numberOfLampsOnScreen);
    spawnRandomEnvironment(1,-1,environmentImagesLoaded,environmentArray,gameDisplay);
	randomStartNumber = Math.round(Math.random() * 1 + 2);
    spawnBoxInTile(objectArray,1,-1);
	for(x=0;x<randomStartNumber;x++) {
		spawnMonster(canvas.width,-canvas.height,20,500,100,100,1,monsterArray,"idle");
	}
	//top left
	addLampToScreenArrayVersion2(-1,-1,-canvas.width,-canvas.height,300,numberOfLampsOnScreen);
    spawnRandomEnvironment(-1,-1,environmentImagesLoaded,environmentArray,gameDisplay);
	randomStartNumber = Math.round(Math.random() * 1 + 2);
    spawnBoxInTile(objectArray,-1,-1);
	for(x=0;x<randomStartNumber;x++) {
		spawnMonster(-canvas.width,-canvas.height,20,500,100,100,1,monsterArray,"idle");
	}
	//bottom right
	addLampToScreenArrayVersion2(1,1,canvas.width,canvas.height,300,numberOfLampsOnScreen);
    spawnRandomEnvironment(1,1,environmentImagesLoaded,environmentArray,gameDisplay);
	randomStartNumber = Math.round(Math.random() * 1 + 2);
    spawnBoxInTile(objectArray,1,1);
	for(x=0;x<randomStartNumber;x++) {
		spawnMonster(canvas.width,canvas.height,20,500,100,100,1,monsterArray,"idle");
	}
	//bottom left
	addLampToScreenArrayVersion2(-1,1,-canvas.width,canvas.height,300,numberOfLampsOnScreen);
    spawnRandomEnvironment(-1,1,environmentImagesLoaded,environmentArray,gameDisplay);
	randomStartNumber = Math.round(Math.random() * 1 + 2);
    spawnBoxInTile(objectArray,-1,1);
	for(x=0;x<randomStartNumber;x++) {
		spawnMonster(-canvas.width,canvas.height,20,500,100,100,1,monsterArray,"idle");
	}
}

function initiateBackground(backgroundArray, backgroundObjectArray, backgroundImage) {
	for(i=0;i<9;i++) {
		if(i===0){
			backgroundArray[i] = new Image();
			backgroundObjectArray[i] = new Object;
			backgroundObjectArray[i].x = -canvas.width;
			backgroundObjectArray[i].y = -canvas.height;
			backgroundArray[i].src = backgroundImage;
		}
		else if(i===1){
			backgroundArray[i] = new Image();
			backgroundObjectArray[i] = new Object;
			backgroundObjectArray[i].x = 0;
			backgroundObjectArray[i].y = -canvas.height;
			backgroundArray[i].src = backgroundImage;
		}
		else if(i===2){
			backgroundArray[i] = new Image();
			backgroundObjectArray[i] = new Object;
			backgroundObjectArray[i].x = canvas.width;
			backgroundObjectArray[i].y = -canvas.height;
			backgroundArray[i].src = backgroundImage;
		}
		else if(i===3){
			backgroundArray[i] = new Image();
			backgroundObjectArray[i] = new Object;
			backgroundObjectArray[i].x = -canvas.width;
			backgroundObjectArray[i].y = 0;
			backgroundArray[i].src = backgroundImage;
		}
		else if(i===4){
			backgroundArray[i] = new Image();
			backgroundObjectArray[i] = new Object;
			backgroundObjectArray[i].x = canvas.width;
			backgroundObjectArray[i].y = 0;
			backgroundArray[i].src = backgroundImage;
		}
		else if(i===5){
			backgroundArray[i] = new Image();
			backgroundObjectArray[i] = new Object;
			backgroundObjectArray[i].x = -canvas.width;
			backgroundObjectArray[i].y = canvas.height;
			backgroundArray[i].src = backgroundImage;
		}
		else if(i===6){
			backgroundArray[i] = new Image();
			backgroundObjectArray[i] = new Object;
			backgroundObjectArray[i].x = 0;
			backgroundObjectArray[i].y = canvas.height;
			backgroundArray[i].src = backgroundImage;
		}
		else if(i===7){
			backgroundArray[i] = new Image();
			backgroundObjectArray[i] = new Object;
			backgroundObjectArray[i].x = canvas.width;
			backgroundObjectArray[i].y = canvas.height;
			backgroundArray[i].src = backgroundImage;
		}
		else if(i===8){
			backgroundArray[i] = new Image();
			backgroundObjectArray[i] = new Object;
			backgroundObjectArray[i].x = 0;
			backgroundObjectArray[i].y = 0;
			backgroundArray[i].src = backgroundImage;
		}
	}
}

function mapControl(numberOfLampsOnScreen,backgroundObjectArray,tileDisplay,gameDisplay,monsterArray,objectArray,missionArray,environmentImagesLoaded,pgImagesLoaded,gzImagesLoaded,farmImagesLoaded,forestImagesLoaded,basecampImagesLoaded,environmentArray,objectArray) {
	var newTile = 0;
	if(backgroundObjectArray[8].y > canvas.height/2) {
		//new tile upwards!
		for(j=0;j<backgroundObjectArray.length;j++) {
			backgroundObjectArray[j].y = backgroundObjectArray[j].y - canvas.height;
			//document.getElementById("testdiv").innerHTML = "Ny tile op!";
		}
		tileDisplay.y = tileDisplay.y + canvas.height;
		newTile = 1;
		gameDisplay.indexY = gameDisplay.indexY - 1;
		generateEnvironment(gameDisplay.indexX,gameDisplay.indexY, numberOfLampsOnScreen,tileDisplay,monsterArray,missionArray,environmentImagesLoaded,pgImagesLoaded,gzImagesLoaded,farmImagesLoaded,forestImagesLoaded,basecampImagesLoaded,environmentArray,gameDisplay,objectArray);
	}
	if(backgroundObjectArray[8].y < -canvas.height/2) {
		//new tile downwards
		for(j=0;j<backgroundObjectArray.length;j++) {
			backgroundObjectArray[j].y = backgroundObjectArray[j].y + canvas.height;
			//document.getElementById("testdiv").innerHTML = "Ny tile ned!";
		}
		tileDisplay.y = tileDisplay.y - canvas.height;
		newTile = 1;
		gameDisplay.indexY = gameDisplay.indexY + 1;
		generateEnvironment(gameDisplay.indexX,gameDisplay.indexY, numberOfLampsOnScreen,tileDisplay,monsterArray,missionArray,environmentImagesLoaded,pgImagesLoaded,gzImagesLoaded,farmImagesLoaded,forestImagesLoaded,basecampImagesLoaded,environmentArray,gameDisplay,objectArray);
	}
	if(backgroundObjectArray[8].x > canvas.width/2) {
		//new tile rightside
		for(j=0;j<backgroundObjectArray.length;j++) {
			backgroundObjectArray[j].x = backgroundObjectArray[j].x - canvas.width;
			//document.getElementById("testdiv").innerHTML = "Ny tile højre!";
		}
		tileDisplay.x = tileDisplay.x + canvas.width;
		newTile = 1;
		gameDisplay.indexX = gameDisplay.indexX - 1;
		generateEnvironment(gameDisplay.indexX,gameDisplay.indexY, numberOfLampsOnScreen,tileDisplay,monsterArray,missionArray,environmentImagesLoaded,pgImagesLoaded,gzImagesLoaded,farmImagesLoaded,forestImagesLoaded,basecampImagesLoaded,environmentArray,gameDisplay,objectArray);
	}
	if(backgroundObjectArray[8].x < -canvas.width/2) {
		//new tile leftside
		for(j=0;j<backgroundObjectArray.length;j++) {
			backgroundObjectArray[j].x = backgroundObjectArray[j].x + canvas.width;
			//document.getElementById("testdiv").innerHTML = "Ny tile venstre!";
		}
		tileDisplay.x = tileDisplay.x - canvas.width;
		newTile = 1;
		gameDisplay.indexX = gameDisplay.indexX + 1;
		generateEnvironment(gameDisplay.indexX,gameDisplay.indexY, numberOfLampsOnScreen,tileDisplay,monsterArray,missionArray,environmentImagesLoaded,pgImagesLoaded,gzImagesLoaded,farmImagesLoaded,forestImagesLoaded,basecampImagesLoaded,environmentArray,gameDisplay,objectArray);
	}
    //console.log(gameDisplay.indexX + "," + gameDisplay.indexY);
}

function addLampToScreenArrayVersion2(indexXX,indexYY,startPointX,startPointY,radius,numberOfLampsOnScreen) {
	//var randomXvalue = Math.round((Math.floor(Math.random() * 400) + (startPointX+100)));
	//var randomYvalue = Math.round((Math.floor(Math.random() * 200) + (startPointY+100)));
	//var lampLighted = Math.round((Math.floor(Math.random() * 2) + 0));
	var lampLighted = 1;
	var randomXvalue = Math.round((Math.floor(Math.random() * ((canvas.width-radius)-10)) + (startPointX+10)));
	var randomYvalue = Math.round((Math.floor(Math.random() * ((canvas.height-radius)-10)) + (startPointY+10)));
	var lampPost = {
	tileStartPointX:startPointX,
	tileStartPointY:startPointY,
	indexX:indexXX,
	indexY:indexYY,
	radius: radius,
	on:lampLighted,
	x: randomXvalue,
	y: randomYvalue,
	color: '0,0,0',
	centerX:randomXvalue + 150,
	centerY:randomYvalue + 150
	};
	numberOfLampsOnScreen.push(lampPost);
	//document.getElementById("testdiv2").innerHTML = document.getElementById("testdiv2").innerHTML + numberOfLampsOnScreen.length + ": lamp pushed: " + indexXX + "," + indexYY + " | " + randomXvalue + "," + randomYvalue + " | " + startPointX + "," + startPointY + "<br />";
}

function generateEnvironment(coreX, coreY,numberOfLampsOnScreen,tileDisplay,monsterArray,missionArray,environmentImagesLoaded,pgImagesLoaded,gzImagesLoaded,farmImagesLoaded,forestImagesLoaded,basecampImagesLoaded,environmentArray,gameDisplay,objectArray) {
	arrayOfNewAdditions = [];
	var realityStatus = true;
	//center coreX, coreY
	arrayOfNewAdditions.push({x:coreX, y:coreY,startPointX:0,startPointY:0});
	//top: coreX, coreY-1 - DONE
	arrayOfNewAdditions.push({x:coreX, y:(coreY-1),startPointX:0+((canvas.width/2)-tileDisplay.x),startPointY:-(canvas.height*1.5)+(canvas.height-tileDisplay.y)});

	//bottom: coreX, coreY+1 - DONE
	arrayOfNewAdditions.push({x:coreX, y:(coreY+1),startPointX:0+((canvas.width/2)-tileDisplay.x),startPointY:(canvas.height*1.5)-tileDisplay.y});

	//left: coreX-1, coreY  - DONE
	arrayOfNewAdditions.push({x:(coreX-1), y:coreY,startPointX:-(canvas.width*1.5)+((canvas.width)-tileDisplay.x),startPointY:0+((canvas.height/2)-tileDisplay.y)});

	//right: coreX+1, coreY - DONE
	arrayOfNewAdditions.push({x:(coreX+1), y:coreY,startPointX:(canvas.width*1.5)-tileDisplay.x,startPointY:0+((canvas.height/2)-tileDisplay.y)});

	//top right: coreX+1, coreY-1 - DONE
	arrayOfNewAdditions.push({x:(coreX+1), y:(coreY-1),startPointX:canvas.width+((canvas.width/2)-tileDisplay.x),startPointY:-canvas.height+((canvas.height/2)-tileDisplay.y)});

	//top left: coreX-1, coreY-1 - DONE
	arrayOfNewAdditions.push({x:(coreX-1), y:(coreY-1),startPointX:-canvas.width+((canvas.width/2)-tileDisplay.x),startPointY:-canvas.height+((canvas.height/2)-tileDisplay.y)});

	//bottom right: coreX+1, coreY+1 - DONE
	arrayOfNewAdditions.push({x:(coreX+1), y:(coreY+1),startPointX:canvas.width+((canvas.width/2)-tileDisplay.x),startPointY:canvas.height+((canvas.height/2)-tileDisplay.y)});

	//bottom left: coreX-1, coreY+1 - DONE
	arrayOfNewAdditions.push({x:(coreX-1), y:(coreY+1),startPointX:-canvas.width+((canvas.width/2)-tileDisplay.x),startPointY:canvas.height+((canvas.height/2)-tileDisplay.y)});

	for(g=0;g<arrayOfNewAdditions.length;g++) {
		for(l=0;l<numberOfLampsOnScreen.length;l++) {
		if(arrayOfNewAdditions[g].x === numberOfLampsOnScreen[l].indexX && arrayOfNewAdditions[g].y === numberOfLampsOnScreen[l].indexY) {
			realityStatus = false;
			//document.getElementById("testdiv2").innerHTML = document.getElementById("testdiv2").innerHTML + "POSITIVE! <br />";
		}
		}
	if(realityStatus === true) {
		//Tilføj lampe
		addLampToScreenArrayVersion2(arrayOfNewAdditions[g].x,arrayOfNewAdditions[g].y, arrayOfNewAdditions[g].startPointX, arrayOfNewAdditions[g].startPointY,300,numberOfLampsOnScreen);
        spawnBoxInTile(objectArray,gameDisplay.x,gameDisplay.y,arrayOfNewAdditions[g].startPointX,arrayOfNewAdditions[g].startPointY);
		//newEnvironment(arrayOfNewAdditions[g].startPointX, arrayOfNewAdditions[g].startPointY);
		//Tilføj monstre indenfor det givne område!
		var randomNumber = Math.round(Math.random() * 3 + 1);
		for(x=0;x<randomNumber;x++) {
			spawnMonster(arrayOfNewAdditions[g].startPointX, arrayOfNewAdditions[g].startPointY,20,500,100,100,1,monsterArray);
		}
        if(arrayOfNewAdditions[g].x == missionArray[0][0].indexX && arrayOfNewAdditions[g].y == missionArray[0][0].indexY) {
            //Throw down basecamp!
            console.log("Basecamp spawned on " + arrayOfNewAdditions[g].x + "," + arrayOfNewAdditions[g].y);
            setSpecificEnvironment(basecampImagesLoaded,arrayOfNewAdditions[g].x,arrayOfNewAdditions[g].y,gameDisplay,environmentArray,arrayOfNewAdditions[g].startPointX,arrayOfNewAdditions[g].startPointY);
        }
        else if(arrayOfNewAdditions[g].x == missionArray[1][0].indexX && arrayOfNewAdditions[g].y == missionArray[1][0].indexY) {
            //Throw down farm!
            console.log("Farm spawned on " + arrayOfNewAdditions[g].x + "," + arrayOfNewAdditions[g].y);
            setSpecificEnvironment(farmImagesLoaded,arrayOfNewAdditions[g].x,arrayOfNewAdditions[g].y,gameDisplay,environmentArray,arrayOfNewAdditions[g].startPointX,arrayOfNewAdditions[g].startPointY);
        }
        else if(arrayOfNewAdditions[g].x == missionArray[5][0].indexX && arrayOfNewAdditions[g].y == missionArray[5][0].indexY) {
            //Throw down ground zero!
            console.log("Ground zero spawned on " + arrayOfNewAdditions[g].x + "," + arrayOfNewAdditions[g].y);
            setSpecificEnvironment(gzImagesLoaded,arrayOfNewAdditions[g].x,arrayOfNewAdditions[g].y,gameDisplay,environmentArray,arrayOfNewAdditions[g].startPointX,arrayOfNewAdditions[g].startPointY);
        }
        else if(arrayOfNewAdditions[g].x == missionArray[9][0].indexX && arrayOfNewAdditions[g].y == missionArray[9][0].indexY ||
           arrayOfNewAdditions[g].x == missionArray[9][0].indexX-1 && arrayOfNewAdditions[g].y == missionArray[9][0].indexY-1 ||
           arrayOfNewAdditions[g].x == missionArray[9][0].indexX-1 && arrayOfNewAdditions[g].y == missionArray[9][0].indexY ||
           arrayOfNewAdditions[g].x == missionArray[9][0].indexX-1 && arrayOfNewAdditions[g].y == missionArray[9][0].indexY+1 ||
           arrayOfNewAdditions[g].x == missionArray[9][0].indexX && arrayOfNewAdditions[g].y == missionArray[9][0].indexY-1 ||
           arrayOfNewAdditions[g].x == missionArray[9][0].indexX && arrayOfNewAdditions[g].y == missionArray[9][0].indexY+1 ||
           arrayOfNewAdditions[g].x == missionArray[9][0].indexX+1 && arrayOfNewAdditions[g].y == missionArray[9][0].indexY-1 ||
           arrayOfNewAdditions[g].x == missionArray[9][0].indexX+1 && arrayOfNewAdditions[g].y == missionArray[9][0].indexY ||
           arrayOfNewAdditions[g].x == missionArray[9][0].indexX+1 && arrayOfNewAdditions[g].y == missionArray[9][0].indexY+1) {
            //Throw down forest!
            console.log("Forest spawned " + arrayOfNewAdditions[g].x + "," + arrayOfNewAdditions[g].y);
            setSpecificEnvironment(forestImagesLoaded,arrayOfNewAdditions[g].x,arrayOfNewAdditions[g].y,gameDisplay,environmentArray,arrayOfNewAdditions[g].startPointX,arrayOfNewAdditions[g].startPointY);
        }
        else if(arrayOfNewAdditions[g].x == missionArray[11][0].indexX && arrayOfNewAdditions[g].y == missionArray[11][0].indexY) {
            //Throw down zombie playground!
            console.log("Zombie playground spawned " + arrayOfNewAdditions[g].x + "," + arrayOfNewAdditions[g].y);
            setSpecificEnvironment(pgImagesLoaded,arrayOfNewAdditions[g].x,arrayOfNewAdditions[g].y,gameDisplay,environmentArray,arrayOfNewAdditions[g].startPointX,arrayOfNewAdditions[g].startPointY);
        }
        else {
            //Throw down random environment!
            spawnRandomEnvironment(arrayOfNewAdditions[g].x, arrayOfNewAdditions[g].y,environmentImagesLoaded,environmentArray,gameDisplay,arrayOfNewAdditions[g].startPointX,arrayOfNewAdditions[g].startPointY);
        }
	}
	else {
	}
	realityStatus = true;
}
}

function spawnBoxInTile(objectArray,indexX,indexY,x,y) {
    var decider = Math.round(Math.random() * 100 + 0);
    if(decider >= 30) {
        var name = "Box of stuff";
        if(x === undefined) {
            x = 800 * indexX;
        }
        if(y === undefined) {
            y = 600 * indexY;
        }
            var randomXdistance = 0;
            var randomYdistance = 0;
            if(indexX > 0) {
                randomXdistance = x + Math.round(Math.random() * 700 + 50);
            }
            else {
                randomXdistance = x + Math.round(Math.random() * 700 + 50);
            }
            if(indexY > 0) {
                randomYdistance = y + Math.round(Math.random() * 500 + 10);
            }
            else {
                randomYdistance = y + Math.round(Math.random() * 500 + 50);
            }
        //console.log(randomXdistance + "," + randomYdistance);
        var boxObject = {
            itemType:"box",
            name:name,
            offset:18,
            drop:Math.round(Math.random() * 3 + 2),
            x:randomXdistance,
            y:randomYdistance,
        }
        objectArray.push(boxObject);
        console.log(" box spawned at " + x + "," + y);
        }
    else {
        console.log("no box!")
    }
}

function spawnRandomEnvironment(indexX,indexY,environmentImagesLoaded,environmentArray,gameDisplay,x,y) {
    if(x === undefined) {
        x = 800 * indexX;
    }
    if(y === undefined) {
        y = 600 * indexY;
    }
        var randomAngle = 0; //Math.round(Math.random() * 360 - 0);
        var randomXdistance = 0;
        var randomYdistance = 0;
        if(indexX > 0) {
            randomXdistance = x + 100; //((800 * ffsX) + coordinates.x); // + Math.round(Math.random() * 150 - 0);
        }
        else {
            randomXdistance = x + 100; //((800 * ffsX) + coordinates.x); // + Math.round(Math.random() * 150 - 0);
        }
        if(indexY > 0) {
            randomYdistance = y + 100; //((600 * ffsY) + coordinates.y) - 600; // + Math.round(Math.random() * 50 - 0);
        }
        else {
            randomYdistance = y + 100; //((600 * ffsY) + coordinates.y) - 600; // + Math.round(Math.random() * 50 - 0);
        }
    var calNumber = environmentImagesLoaded.length - 1;
        var environmentObject = new Image();
        environmentObject.src = environmentImagesLoaded[Math.round(Math.random() * calNumber)].src;
        environmentObject.targetX = randomXdistance;
        environmentObject.targetY = randomYdistance;
        environmentObject.angle = randomAngle;
        environmentObject.indexX = indexX;
        environmentObject.indexY = indexY;
        environmentArray.push(environmentObject);
}

function setSpecificEnvironment(imageArray,indexX,indexY,gameDisplay,environmentArray,x,y) {
        var randomAngle = 0;
        var randomXdistance = 0;
        var randomYdistance = 0;
        var ffsX = "";
        var ffsY = "";
        var coordinates = {x:400,y:300};
        if(indexX > 0) {
            ffsX = indexX - gameDisplay.indexX;
            randomXdistance = x + 100; //((800 * ffsX) + coordinates.x); // + Math.round(Math.random() * 150 - 0);
        }
        else {
            ffsX = indexX + gameDisplay.indexX;
            randomXdistance = x + 100; //((800 * ffsX) + coordinates.x); // + Math.round(Math.random() * 150 - 0);
        }
        if(indexY > 0) {
            ffsY = indexY - gameDisplay.indexY;
            randomYdistance = y + 100; //((600 * ffsY) + coordinates.y) - 600; // + Math.round(Math.random() * 50 - 0);
        }
        else {
            ffsY = indexY - gameDisplay.indexY;
            randomYdistance = y + 100; //((600 * ffsY) + coordinates.y) - 600; // + Math.round(Math.random() * 50 - 0);
        }
    var calNumber = imageArray.length - 1;
        var environmentObject = new Image();
        environmentObject.src = imageArray[Math.round(Math.random() * calNumber)].src;
        environmentObject.targetX = randomXdistance;
        environmentObject.targetY = randomYdistance;
        environmentObject.angle = randomAngle;
        environmentObject.indexX = indexX;
        environmentObject.indexY = indexY;
        //console.log("startpoints: " + indexX + "," + indexY + " | " + "gameDisplay: " + gameDisplay.indexX + "," + gameDisplay.indexY +
        //            " | spawning in: " + ffsX + "," + ffsY + " | " + randomXdistance + "," + randomYdistance);
        environmentArray.push(environmentObject);
}

function setEnvironmentalPoints(environmentalPoints) {
    environmentalPoints.basecampPosition.indexX = 5;
}

function drawTileShadow(tileStartPointX, tileStartPointY, lightX,lightY,radius) {
	ctx.globalAlpha = 1;
	ctx.fillStyle = 'rgba(0,0,0,0.80)';
	var imageLength = radius;
	var canvasLength = canvas.width;
	var canvasHeight = canvas.height;
	ctx.fillRect(tileStartPointX,tileStartPointY, lightX-tileStartPointX, lightY-tileStartPointY);
	ctx.fillRect(lightX,tileStartPointY,imageLength, lightY-tileStartPointY);
	ctx.fillRect(lightX+imageLength,tileStartPointY, canvasLength-(lightX-tileStartPointX+imageLength), lightY-tileStartPointY);
	ctx.fillRect(tileStartPointX,lightY, lightX-tileStartPointX, imageLength);
	ctx.fillRect(lightX+imageLength,lightY, canvasLength-(lightX-tileStartPointX+imageLength), imageLength);
	ctx.fillRect(tileStartPointX,lightY+imageLength, lightX-tileStartPointX, canvasHeight-(lightY-tileStartPointY+imageLength));
	ctx.fillRect(lightX,lightY+imageLength, imageLength, canvasHeight-(lightY-tileStartPointY+imageLength));
	ctx.fillRect(lightX+imageLength,lightY+imageLength, canvasLength-(lightX-tileStartPointX+imageLength), canvasHeight-(lightY-tileStartPointY+imageLength));
}
