function spawnMonster(xStart, yStart,damage,damageInterval,health,fullHealth,category,monsterArray,state) {
	var dropNumber = 0;
	var randomNumber = 0;
	if(category == 1) {
		// 0 - 1 drop (0 drops 75%, 1 drop 25%)
		randomNumber = Math.round(Math.random() * (100 - (0)));
		if(randomNumber <= 75) {
			dropNumber = 0;
		}
		else {
			dropNumber = 1;
		}
	}
	else if(category == 2) {
		// 0 - 2 drops (0 drop 50%, 1 drop 35%, 2 drops 15%)
		randomNumber = Math.round(Math.random() * (100 - (0)));
		if(randomNumber <= 50) {
			dropNumber = 0;
		}
		else if(randomNumber > 50 && randomNumber <= 85) {
			dropNumber = 1;
		}
		else {
			dropNumber = 2;
		}
	}
	else if(category == 3) {
		// 1 - 2 drops (1 drop 75%, 2 drops 25%)
		randomNumber = Math.round(Math.random() * (100 - (0)));
		if(randomNumber <= 75) {
			dropNumber = 1;
		}
		else {
			dropNumber = 2;
		}
	}
	else if(category == 4) {
		// 2 - 3 drops (2 drops 75%, 3 drops 25%)
		randomNumber = Math.round(Math.random() * (100 - (0)));
		if(randomNumber <= 75) {
			dropNumber = 2;
		}
		else {
			dropNumber = 3;
		}
	}
	else {
	}
	var randomX;
	var randomY;
	if(xStart < 0) {
		randomX = Math.round((Math.random() * (xStart - (xStart+canvas.width))));
	}
	else if(xStart == 0) {
		randomX = Math.round((Math.random() * canvas.width + xStart));
	}
	else {
		randomX = Math.round((Math.random() * (canvas.width) + xStart));
	}

	if(yStart < 0) {
		randomY = Math.round((Math.random() * (yStart - (yStart+canvas.height))));
	}
	else if(yStart == 0) {
		randomY = Math.round((Math.random() * canvas.height + yStart));
	}
	else {
		randomY = Math.round((Math.random() * (canvas.height) + yStart));
	}
	var monster = {
		x: randomX,
		y: randomY,
		speed: (Math.random() * 3 + 5),
		angle:(Math.random() * 360 - 0),
		state:state,
		category: category,
		fullHealth:fullHealth,
		health: health,
		timeOfDeath:0,
		damage:damage,
		damageInterval:damageInterval,
		drop:dropNumber,
		killedBy:0,
		startledTime:0,
		attackTime:0,
		attackIni:0,
		hit:0,
		hitOpacity:0,
		hitPeaked:0,
		skin: Math.round((Math.random() * 2 + 1)),
		offAngle:0,
		offAngleSet:1
	};
	monsterArray.push(monster);
	//console.log(monster.x + "," + monster.y + " | " + xStart + "," + yStart);
}

function monsterDrop(monster, drops, objectArray, gameVariables) {
	for(y=0;y<monster.drop;y++) {
		var randomAngle = (Math.round(Math.random() * 360 + 0));
		if(randomAngle > 360) {
			randomAngle = randomAngle - 360;
		}
		randomAngle = randomAngle * TO_RADIANS;
		var randomDrop = (Math.round(Math.random() * drops.length + 0));
		//console.log(randomDrop + " | " + drops[randomDrop].name + " " + Math.round(monster.x + Math.cos(randomAngle) * 10) + " " + Math.round(monster.y + Math.sin(randomAngle) * 10) + " " + drops[randomDrop].imgName + " " + drops[randomDrop].amount);
		var dropObject = {
			number:randomDrop,
			name:drops[randomDrop].name,
			itemType:drops[randomDrop].itemType,
			x: Math.round(monster.x + Math.cos(randomAngle) * 10),
			y: Math.round(monster.y + Math.sin(randomAngle) * 10),
			imageSource: drops[randomDrop].imgName,
			amount:drops[randomDrop].amount,
			offset:drops[randomDrop].offset,
			dropTime:gameVariables.timeControler.getTime(),
			pickUpTime:0,
            solid:0
		};
		objectArray.push(dropObject);
	}
}

function monsterBrainDrop(objectArray,gameVariables,monster,imgSource) {
    //console.log("checking drop");
    if(Math.round(Math.random() * 100 + 0) > 66) {
        //console.log("confirmed drop");
        var randomAngle = (Math.round(Math.random() * 360 + 0));
		if(randomAngle > 360) {
			 randomAngle = randomAngle - 360;
		}
        randomAngle = randomAngle * TO_RADIANS;
        var dropObject = {
            number:0,
            name:"Non-smashed brain",
            itemType:"questItem",
            x: Math.round(monster.x + Math.cos(randomAngle) * 10),
            y: Math.round(monster.y + Math.sin(randomAngle) * 10),
            imageSource:imgSource,
            amount:1,
            offset:25,
            dropTime:gameVariables.timeControler.getTime(),
            pickUpTime:0,
            solid:0
        };
    objectArray.push(dropObject);
    }
    //console.log("finished");
}

function monsterState(monster,hero,gameVariables) {
	//console.log(monster.state);
	if(monster.state == "idle") {
		//document.getElementById("testdiv2").innerHTML = timeControler.getSeconds() + " < " + setTimeState + " " + monster.angle + " --- " + hero.angle;
		if(gameVariables.timeControler.getSeconds() < gameVariables.setTimeState) {
			monster.angle = monster.angle + (Math.round((Math.random() * 2) - 1))*5;
			monster.x -= (monster.speed/12) * Math.sin(monster.angle * TO_RADIANS);
			monster.y += (monster.speed/12) * Math.cos(monster.angle * TO_RADIANS);
		}
		else {
			if(gameVariables.setTimeState >= 60) {
				gameVariables.setTimeState = Math.round(0 + ((Math.random() * 3) - 0));
			}
			else {
				gameVariables.setTimeState = Math.round(gameVariables.timeControler.getSeconds() + ((Math.random() * 3) - 0));
			}
			monster.angle = Math.round((Math.random() * 360) - 0);
		}
	}
	else if(monster.state == "attacking") {
		if (hero.x <= (monster.x + 18) && monster.x <= (hero.x + 18) && hero.y <= (monster.y + 18) && monster.y <= (hero.y + 18)) {
		}
		else {
		//document.getElementById("testdiv").innerHTML =" ATTACKING!!!";
		monster.angle = (Math.atan2(hero.y-10 - monster.y, hero.x-10 - monster.x) * 180 / Math.PI) - 90;
		monster.x -= (monster.speed/1.8) * Math.sin(monster.angle * TO_RADIANS);
		monster.y += (monster.speed/1.8) * Math.cos(monster.angle * TO_RADIANS);
		}
	}
	else if(monster.state == "hiding") {
		monster.x -= (monster.speed/0) * Math.sin(monster.angle * TO_RADIANS);
		monster.y += (monster.speed/0) * Math.cos(monster.angle * TO_RADIANS);
	}
	else if(monster.state == "startled") {
		if(gameVariables.timeControler.getTime() < monster.startledTime + 6050) {
			if (hero.x <= (monster.x + 18) && monster.x <= (hero.x + 18) && hero.y <= (monster.y + 18) && monster.y <= (hero.y + 18)) {
		}
		else {
			monster.angle = (Math.atan2(hero.y-10 - monster.y, hero.x-10 - monster.x) * 180 / Math.PI) - 90;
			monster.x -= (monster.speed/1.5) * Math.sin(monster.angle * TO_RADIANS);
			monster.y += (monster.speed/1.5) * Math.cos(monster.angle * TO_RADIANS);
		}
		}
		else if(gameVariables.timeControler.getTime() > monster.startledTime + 6050) {
			monster.state = "idle";
		}
		else {
		}
	}
	else if(monster.state == "insane") {
		if(monster.setOffAngle == 1) {
			monster.setOffAngle = gameVariables.timeControler.getTime();
		}
		if(gameVariables.timeControler.getTime() < monster.startledTime + 6050) {
			if (hero.x <= (monster.x + 18) && monster.x <= (hero.x + 18) && hero.y <= (monster.y + 18) && monster.y <= (hero.y + 18)) {
			}
		else {
			if(gameVariables.timeControler.getTime() > monster.setOffAngle + 300 || monster.offAngle == "0") {
				monster.setOffAngle = gameVariables.timeControler.getTime();
				monster.offAngle = Math.round(Math.random() * 121 - 60);
			}
			monster.angle = ((Math.atan2(hero.y-10 - monster.y, hero.x-10 - monster.x) * 180 / Math.PI) - 90);
			monster.angle = monster.angle + monster.offAngle;
			monster.x -= (monster.speed/1.5) * Math.sin(monster.angle * TO_RADIANS);
			monster.y += (monster.speed/1.5) * Math.cos(monster.angle * TO_RADIANS);
		}
		}
		else if(gameVariables.timeControler.getTime() > monster.startledTime + 6050) {
			monster.state = "idle";
		}
		else {
		}
	}
    else if(monster.state == "desperate") {
        monster.angle = ((Math.atan2(hero.y-10 - monster.y, hero.x-10 - monster.x) * 180 / Math.PI) - 90);
		monster.angle = monster.angle + monster.offAngle;
		monster.x -= (monster.speed/2) * Math.sin(monster.angle * TO_RADIANS);
		monster.y += (monster.speed/2) * Math.cos(monster.angle * TO_RADIANS);
    }
    else if(monster.state == "boss") {

    }
}

function monsterStateRevision(monster, hero) {
	//document.getElementById("testdiv2").innerHTML = Math.sqrt((monster.x-400)*(monster.x-400) + (monster.y-300)*(monster.y-300)) + " " + monster.state + " " + monster.angle;
	if(monster.state == "startled" || monster.state == "insane" || monster.state == 'desperate' || monster.state == "boss") {
	}
	else {
		if(hero.walking == '1') {
			if(Math.sqrt((monster.x-(canvas.width/2))*(monster.x-(canvas.width/2)) + (monster.y-(canvas.height/2))*(monster.y-(canvas.height/2))) < 200 + ((Math.random() * 5) -0) && monster.state != "startled") {
				monster.state = "attacking";
			}
			else {
				monster.state = "idle";
			}
		}
		else if(hero.walking == '0') {
			if(Math.sqrt((monster.x-(canvas.width/2))*(monster.x-(canvas.width/2)) + (monster.y-(canvas.height/2))*(monster.y-(canvas.height/2))) < 250 + ((Math.random() * 5) -0) && monster.state != "startled") {
				monster.state = "attacking";
			}
			else {
				monster.state = "idle";
			}
		}
	}
}


