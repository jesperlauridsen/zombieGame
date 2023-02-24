function showStatisticsOnCanvas(gameArrays,gameVariables,missionArray) {
	var statCanvas = document.getElementById("statCanvas");
	var statCtx = document.getElementById("statCanvas").getContext("2d");
	statCanvas.width = 620;
	statCanvas.height = 240;
	statCtx.strokeStyle = 'black';
	statCtx.beginPath();statCtx.moveTo(20,220);statCtx.lineTo(600,220);statCtx.stroke();
	statCtx.beginPath();statCtx.moveTo(20,220);statCtx.lineTo(20,20);statCtx.stroke();
	statCtx.beginPath();statCtx.moveTo(18,20);statCtx.lineTo(22,20);statCtx.stroke();
	statCtx.beginPath();statCtx.moveTo(18,120);statCtx.lineTo(22,120);statCtx.stroke();
	statCtx.beginPath();statCtx.moveTo(600,218);statCtx.lineTo(600,222);statCtx.stroke();
	var gameStart = gameVariables.timeStart.getTime();
	var gameEnd =  gameVariables.timeEnd.getTime();
	var maxPoint = gameEnd - gameStart;
	var loggedMonsterDeaths = [];
	for(u=0;u<gameArrays.archivedMonsterArray.length;u++) {
		deadMonster = {
			y:u+1,
			x:((gameArrays.archivedMonsterArray[u].timeOfDeath-gameStart)/maxPoint)*100,
		};
		loggedMonsterDeaths.push(deadMonster);
	}
	for(j=0;j<loggedMonsterDeaths.length;j++) {
		//statCtx.fillStyle = "#FF1C0A";
		statCtx.strokeStyle = 'red';
		statCtx.lineWidth = 1;
		statCtx.beginPath();
		var x = 20 + (580/100)*loggedMonsterDeaths[j].x;
		var y = 20 + (200/loggedMonsterDeaths.length)*(loggedMonsterDeaths.length-loggedMonsterDeaths[j].y);
		statCtx.arc(x,y,1,0,2*Math.PI);
		statCtx.stroke();
		//statCtx.fill();
	}

    for(i=0;i<missionArray.length;i++) {
        for(h=0;h<missionArray[i].length;h++) {
            var missionCompleted = 0;
            if(missionArray[i][h].completed === "yes") {
                missionCompleted = 1;
            }
            else {
               missionCompleted = 0;
            }
        }
        if(missionCompleted === 1) {
            console.log("mission completed!");
            var missionCompleyedArray = [];
            for(x=0;x<missionArray[i].length;x++) {
                missionCompleyedArray.push(missionArray[i][x].completionTime);
            }
            var questCompletionTime = Math.max.apply(Math, missionCompleyedArray);
            statCtx.strokeStyle = 'red';
            statCtx.beginPath();
            statCtx.moveTo(20 + (580/100)*((questCompletionTime-gameStart)/maxPoint*100),20);
            statCtx.lineTo(20 + (580/100)*((questCompletionTime-gameStart)/maxPoint*100),220);
            statCtx.stroke();
            statCtx.font = "12px Lato";
	        statCtx.fillText("M" + i,20 + (580/100)*((questCompletionTime-gameStart)/maxPoint*100)-8,15);
        }
    }

	var timePlayed = new Date(maxPoint);
	var minutesPlayed = timePlayed.getMinutes();
	var secondsPlayed = timePlayed.getSeconds();
	var minutesPlayedToCanvas = minutesPlayed;
	var secondsPlayedToCanvas = secondsPlayed;
	if(minutesPlayed <= 9) {
		minutesPlayedToCanvas = "0" + minutesPlayedToCanvas;
	}
	if(secondsPlayed <= 9) {
		secondsPlayedToCanvas = "0" + secondsPlayedToCanvas;
	}
	statCtx.fillStyle = 'rgba(0,0,0,1)';
	statCtx.fillText(loggedMonsterDeaths.length,15,15);
	statCtx.fillText(minutesPlayedToCanvas + ":" + secondsPlayedToCanvas,587,235);
	statCtx.font = "12px Lato";
	//statCtx.fillText("Events over time",250,12);
	document.getElementById("explanation").innerHTML = "gametime: " + minutesPlayed + " minutes and " + secondsPlayed + " seconds.";
	//statCtx.clearRect(0, 0, statCanvas.width, statCanvas.height);
}

function showStatistics(archivedBulletArray, archivedMonsterArray, numberOfDrops,archivedObjectArray) {
	document.getElementById("gameStatistics").style.display = "block";
	var allHits = 0;
	var macheteSwings = 0;
	var macheteHits = 0;
	var pistolShots = 0;
	var pistolHits = 0;
	var shotgunShots = 0;
	var shotgunHits = 0;
	var machinegunShots = 0;
	var machinegunHits = 0;
	var flamethrowerShots = 0;
	var flamethrowerHits = 0;
	for(i=0;i<archivedBulletArray.length;i++) {
		if(archivedBulletArray[i].bulletHit === 1) {
			allHits = allHits + 1;
		}
		if(archivedBulletArray[i].firedFrom === 'machete') {
			macheteSwings = macheteSwings + 1;
			if(archivedBulletArray[i].bulletHit === 1) {
				macheteHits = macheteHits + 1;
			}
		}
		else if(archivedBulletArray[i].firedFrom === 'pistol') {
			pistolShots = pistolShots + 1;
			if(archivedBulletArray[i].bulletHit === 1) {
				pistolHits = pistolHits + 1;
			}
		}
		else if(archivedBulletArray[i].firedFrom === 'shotgun') {
			shotgunShots = shotgunShots + 1;
			if(archivedBulletArray[i].bulletHit === 1) {
				shotgunHits = shotgunHits + 1;
			}
		}
		else if(archivedBulletArray[i].firedFrom === 'machinegun') {
			machinegunShots = machinegunShots + 1;
			if(archivedBulletArray[i].bulletHit === 1) {
				machinegunHits = machinegunHits + 1;
			}
		}
		else if(archivedBulletArray[i].firedFrom === 'flamethrower') {
			flamethrowerShots = flamethrowerShots + 1;
			if(archivedBulletArray[i].bulletHit === 1) {
				flamethrowerHits = flamethrowerHits + 1;
			}
		}
		else {
		}
	}

	var overallAcc = Math.round((allHits/archivedBulletArray.length*100) *10 ) / 10 || 0;
	var macheteAcc = Math.round((macheteHits/macheteSwings*100) *10 ) / 10 || 0;
	var pistolAcc = Math.round((pistolHits/pistolShots*100) *10 ) / 10 || 0;
	var shotgunAcc = Math.round((shotgunHits/shotgunShots*100) *10 ) / 10 || 0;
	var machinegunAcc = Math.round((machinegunHits/machinegunShots*100) *10 ) / 10 || 0;
	var flamethrowerAcc = Math.round((flamethrowerHits/flamethrowerShots*100) *10 ) / 10 || 0;

	var macheteProcentage = Math.round((macheteSwings/archivedBulletArray.length*100) *10 ) / 10 || 0;
	var pistolProcentage = Math.round((pistolShots/archivedBulletArray.length*100) *10 ) / 10 || 0;
	var shotgunProcentage = Math.round((shotgunShots/archivedBulletArray.length*100) *10 ) / 10 || 0;
	var machinegunProcentage = Math.round((machinegunShots/archivedBulletArray.length*100) *10 ) / 10 || 0;
	var flamethrowerProcentage = Math.round((flamethrowerShots/archivedBulletArray.length*100) *10 ) / 10 || 0;

	var macheteKills = 0;
	var pistolKills = 0;
	var shotgunKills = 0;
	var machinegunKills = 0;
	var flamethrowerKills = 0;
	var granadeKills = 0;
	var pulseKills = 0;

	for(j=0;j<archivedMonsterArray.length;j++) {
		if(archivedMonsterArray[j].killedBy === "machete") {
			macheteKills = macheteKills + 1;
		}
		else if(archivedMonsterArray[j].killedBy === "pistol") {
			pistolKills = pistolKills + 1;
		}
		else if(archivedMonsterArray[j].killedBy === "shotgun") {
			shotgunKills = shotgunKills + 1;
		}
		else if(archivedMonsterArray[j].killedBy === "machinegun") {
			machinegunKills = machinegunKills + 1;
		}
		else if(archivedMonsterArray[j].killedBy === "flamethrower") {
			flamethrowerKills = flamethrowerKills + 1;
		}
		else if(archivedMonsterArray[j].killedBy === "granade") {
			granadeKills = granadeKills + 1;
		}
		else if(archivedMonsterArray[j].killedBy === "pulse") {
			pulseKills = pulseKills + 1;
		}
		else {
		}
	}
    var dropFromMonster = 0;
    for(n=0;n<archivedObjectArray.length;n++) {
        //console.log("dropped from " + archivedObjectArray[n].from);
        if(archivedObjectArray[n].from === "monster") {
            dropFromMonster = dropFromMonster + 1;
        }
    }
	var dropchance =  Math.round((dropFromMonster/archivedMonsterArray.length * 100) * 10) / 10 || 0;
	document.getElementById("overallStatistics").innerHTML = "<strong>Overall</strong><br />" +
								"Monsters killed: " + archivedMonsterArray.length +
								"<br />Attacks made: " + archivedBulletArray.length +
								"<br />hits: " + allHits +
								"<br />" + "Accuracy: " + overallAcc + "%" +
								"<br /><br /> Granade kills: " + granadeKills +
								"<br /> Pulse kills: " + pulseKills +
								"<br /><br />Drops: " + dropFromMonster +
								"<br />Dropchance/mob: " + dropchance + "%";


	if(macheteSwings <= 0) {
		document.getElementById("gunMachete").className = "specificGunStat notUsed";
	}
	else {
		document.getElementById("gunMachete").className = "specificGunStat";
	}
	if(pistolShots <= 0) {
		document.getElementById("gunPistol").className = "specificGunStat notUsed";
	}
	else {
		document.getElementById("gunPistol").className = "specificGunStat";
	}
	if(shotgunShots <= 0) {
		document.getElementById("gunShotgun").className = "specificGunStat notUsed";
	}
	else {
		document.getElementById("gunShotgun").className = "specificGunStat";
	}
	if(machinegunShots <= 0) {
		document.getElementById("gunMachinegun").className = "specificGunStat notUsed";
	}
	else {
		document.getElementById("gunMachinegun").className = "specificGunStat";
	}
	if(flamethrowerShots <= 0) {
		document.getElementById("gunFlamethrower").className = "specificGunStat notUsed";
	}
	else {
		document.getElementById("gunFlamethrower").className = "specificGunStat";
	}


	document.getElementById("gunMachete").innerHTML = "<strong>Machete</strong> <br /> % of attacks: " + macheteProcentage + "%" + "<br />" +
								"Swings: " + macheteSwings + "<br /> hits: " + macheteHits + "<br /> Accuracy: " + macheteAcc + "%" + "<br />" + "Kills: " + macheteKills + "<br />";
	document.getElementById("gunPistol").innerHTML = "<strong>Pistol</strong> <br /> % of attacks: " + pistolProcentage + "%" + "<br />" +
								"Shots: " + pistolShots + "<br /> hits: " + pistolHits + "<br /> Accuracy: " + pistolAcc + "%" + "<br />" + "Kills: " + pistolKills + "<br />";
	document.getElementById("gunShotgun").innerHTML = "<strong>Shotgun</strong> <br /> % of attacks: " + shotgunProcentage + "%" + "<br />" +
								"Shots: " + shotgunShots + "<br /> hits: " + shotgunHits + "<br /> Accuracy: " + shotgunAcc + "%" + "<br />" + "Kills: " + shotgunKills + "<br />";
	document.getElementById("gunMachinegun").innerHTML = "<strong>Machinegun</strong> <br /> % of attacks: " + machinegunProcentage + "%" + "<br />" +
								"Shots: " + machinegunShots + "<br /> hits: " + machinegunHits + "<br /> Accuracy: " + machinegunAcc + "%" + "<br />" + "Kills: " + machinegunKills + "<br />";
	document.getElementById("gunFlamethrower").innerHTML = "<strong>Flamethrower</strong> <br /> % of attacks: " + flamethrowerProcentage + "%" + "<br />" +
								"Shots: " + flamethrowerShots + "<br /> hits: " + flamethrowerHits + "<br /> Accuracy: " + flamethrowerAcc + "%" + "<br />" + "Kills: " + flamethrowerKills + "<br />";

}
