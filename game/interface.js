function inventoryReload(inventory, schematics, hero, gameVariables) {
	var inventoryColor = "";
	if(document.getElementById("inventoryBackpack").className === "openInventory" && gameVariables.pickUp > 0 && document.getElementById("inventoryBackpack").getElementsByTagName("h4")[0].innerHTML === "Inventory") {
		document.getElementById("inventoryBackpack").innerHTML = "<div class='exitInventory' onclick='closeInventory()'>X</div><h4>Inventory</h4><break>";
		for(i=0;i<Object.keys(inventory).length;i++) {
			if(inventory[Object.keys(inventory)[i]].amount === 0) {
				inventoryColor = "inventoryColorNotActive";
			}
			else {
				inventoryColor = "inventoryColorActive";
			}
			document.getElementById("inventoryBackpack").innerHTML += "<span class='inventoryNameDisplay " + inventoryColor + "'> " +   inventory[Object.keys(inventory)[i]].name + ": </span> <span class='inventoryCountDisplay " + inventoryColor + "'>" + inventory[Object.keys(inventory)[i]].amount + "</span><break>";
		}
		gameVariables.pickUp = 0;
		}
	else if(document.getElementById("inventoryBackpack").className === "openInventory" && gameVariables.pickUpSchematics > 0 && document.getElementById("inventoryBackpack").getElementsByTagName("h4")[0].innerHTML === "Schematics") {
		schematicsDisplay(inventory,schematics,hero);
        gameVariables.pickUpSchematics = 0;
	}
	else {
	}
	newPickUpsDisplayed(gameVariables);
}

function obtainedSchematicShow(schematic, schematics, inventory, heroObject) {
	document.getElementById('inventoryBackpack').innerHTML = "";
	var headLine = "";
	var description = "hey";
	var materials = "";
	var craftNumber = "";
	var craftable = true;
	for(y=0;y<Object.keys(schematics).length;y++) {
		if(schematic === schematics[Object.keys(schematics)[y]].constructor) {
			craftNumber = y;
			headLine = schematics[Object.keys(schematics)[y]].name;
			headLine = headLine.replace("Schematic: ", "");
			console.log(schematics[Object.keys(schematics)[y]].description);
			description = schematics[Object.keys(schematics)[y]].description;
			for(h=0;h<schematics[Object.keys(schematics)[y]].materials.length;h++) {
				materials += "<span id='" + schematics[Object.keys(schematics)[y]].materials[h].constructor + "All'>" + schematics[Object.keys(schematics)[y]].materials[h].name + ": " + "</span><span id='" + schematics[Object.keys(schematics)[y]].materials[h].constructor + "Process'><span id='" + schematics[Object.keys(schematics)[y]].materials[h].constructor + "Collected'>" + inventory[schematics[Object.keys(schematics)[y]].materials[h].constructor].amount + "</span>" + "/" + "<span id='" + schematics[Object.keys(schematics)[y]].materials[h].constructor + "Needed'>" + schematics[Object.keys(schematics)[y]].materials[h].amount + "</span></span><br />";
			}
		}
	}
	document.getElementById("inventoryBackpack").innerHTML = "<div id='inventoryExit' class='exitInventory' onclick='closeInventory()'>X</div><h4>" + headLine + "</h4><break>";
	var craftSchematicContainer = document.createElement('div');
	var returnToSchematics = document.createElement('div');
	var craftSchematic = document.createElement('div');
	returnToSchematics.id = 'returnToSchematics';
	returnToSchematics.className = 'returnToSchematicsButton';
	craftSchematic.id = 'craftSchematic';
	craftSchematic.className = 'craftSchematicButton';
	craftSchematicContainer.id = 'craftSchematicContainer';
	craftSchematicContainer.className = 'craftSchematicContainer';
	document.getElementById('inventoryBackpack').appendChild(craftSchematicContainer);
	document.getElementById('inventoryBackpack').appendChild(returnToSchematics);
	document.getElementById('inventoryBackpack').appendChild(craftSchematic);
	document.getElementById('craftSchematicContainer').innerHTML = description + "<br /><br />" + materials;
	for(u=0;u<schematics[Object.keys(schematics)[craftNumber]].materials.length;u++) {
		document.getElementById(schematics[Object.keys(schematics)[craftNumber]].materials[u].constructor + "All").className = "inventoryNameDisplay";
		document.getElementById(schematics[Object.keys(schematics)[craftNumber]].materials[u].constructor + "Process").className = "inventoryCountDisplay";
		if(inventory[schematics[Object.keys(schematics)[craftNumber]].materials[u].constructor].amount >= schematics[Object.keys(schematics)[craftNumber]].materials[u].amount) {
			document.getElementById(schematics[Object.keys(schematics)[craftNumber]].materials[u].constructor + "Process").style.color = "green";
		}
		else {
			document.getElementById(schematics[Object.keys(schematics)[craftNumber]].materials[u].constructor + "Process").style.color = "red";
			craftable = false;
		}
	}
	document.getElementById('returnToSchematics').innerHTML = "Back";
	document.getElementById('craftSchematic').innerHTML = "Craft";
	document.getElementById('returnToSchematics').onclick = function() {schematicsDisplay(inventory,schematics,heroObject);}
	if(craftable === true) {
		document.getElementById('craftSchematic').onclick = function() {craftSpecificSchematic(inventory,schematic,heroObject,schematics);}
		document.getElementById('craftSchematic').className = "active";
		document.getElementById('craftSchematic').style.cursor = "pointer";
	}
	else {
		document.getElementById('craftSchematic').style.opacity = "0.5";
	}
}

function craftSpecificSchematic(inventory,schematic,hero,schematics) {
	if(schematic === "schematicBoots") {
        document.getElementById("gameAbilityFive").className = "gameAbility activated";
        document.getElementById("gamingAbilityNameFive").className = "gameAbilityName";
        document.getElementById("gameAbilityFive").innerHTML = "on";
		hero.rocketBootsObtained = 1;
		hero.rocketBootsOn = 1;
	}
	if(schematic === "schematicScope") {
        document.getElementById("gameAbilityThree").className = "gameAbility activated";
        document.getElementById("gamingAbilityNameThree").className = "gameAbilityName";
        document.getElementById("gameAbilityThree").innerHTML = "on";
		hero.scopeObtained = 1;
		hero.scopeOn = 1;
	}
	if(schematic === "schematicRadio") {
		hero.radioObtained = 1;
		hero.radioOn = 1;
	}
	if(schematic === "schematicGoogles") {
        document.getElementById("gameAbilityTwo").className = "gameAbility activated";
        document.getElementById("gamingAbilityNameTwo").className = "gameAbilityName";
        document.getElementById("gameAbilityTwo").innerHTML = "on";
		hero.heatGogglesObtained = 1;
		hero.heatGogglesOn = 1;
	}
	if(schematic === "schematicPulse") {
        document.getElementById("gameAbilitySix").className = "gameAbility activated";
        document.getElementById("gamingAbilityNameSix").className = "gameAbilityName";
        document.getElementById("gameAbilitySix").innerHTML = "on";
		hero.pulseTransmitterObtained = 1;
		hero.pulseTransmitterOn = 1;
	}
	if(schematic === "schematicTrash") {
        document.getElementById("gameAbilityFour").className = "gameAbility activated";
        document.getElementById("gamingAbilityNameFour").className = "gameAbilityName";
        document.getElementById("gameAbilityFour").innerHTML = "on";
		hero.scavangerObtained = 1;
		hero.scavangerOn = 1;
	}
	for(y=0;y<Object.keys(schematics).length;y++) {
		if(schematic === schematics[Object.keys(schematics)[y]].constructor) {
			for(h=0;h<schematics[Object.keys(schematics)[y]].materials.length;h++) {
				inventory[schematics[Object.keys(schematics)[y]].materials[h].constructor].amount = inventory[schematics[Object.keys(schematics)[y]].materials[h].constructor].amount - schematics[Object.keys(schematics)[y]].materials[h].amount;
			}
		}
	}
	obtainedSchematicShow(schematic, schematics, inventory, hero);
}

function weaponAvailability(hero) {
	if(hero.machete === 1) {
		document.getElementById("weaponMachete").className = "unselect gameItem obtained";
	}
	else {
		document.getElementById("weaponMachete").className = "unselect gameItem";
	}
	if(hero.pistol === 1) {
		document.getElementById("weaponPistol").className = "unselect gameItem obtained";
	}
	else {
		document.getElementById("weaponPistol").className = "unselect gameItem";
	}
	if(hero.shotgun === 1) {
		document.getElementById("weaponShotgun").className = "unselect gameItem obtained";
	}
	else {
		document.getElementById("weaponShotgun").className = "unselect gameItem";
	}
	if(hero.machinegun === 1) {
		document.getElementById("weaponMachinegun").className = "unselect gameItem obtained";
	}
	else {
		document.getElementById("weaponMachinegun").className = "unselect gameItem";
	}
	if(hero.flamethrower === 1) {
		document.getElementById("weaponFlamethrower").className = "unselect gameItem obtained";
	}
	else {
		document.getElementById("weaponFlamethrower").className = "unselect gameItem";
	}
}

function showInventory(argument,inventory,gameVariables,owner,schematics,hero) {
    console.log("running all the time?");
	if(document.getElementById("inventoryBackpack").className === "openInventory") {
		var ownerString = owner.replace('game','');
		if(argument === document.getElementById("inventoryBackpack").getElementsByTagName("h4")[0].innerHTML) {
			document.getElementById("inventoryBackpack").className = "closedInventory";
		}
		else {
			if(owner === 'gameSchematics') {
				schematicsDisplay(inventory,schematics,hero);
			}
			else {
				inventoryDisplay(inventory);
				gameVariables.pickUp = 0;
				newPickUpsDisplayed(gameVariables);
			}
		}
	}
	else {
		document.getElementById("inventoryBackpack").className = "openInventory";
		if(argument === 'Inventory') {
			inventoryDisplay(inventory);
			gameVariables.pickUp = 0;
			newPickUpsDisplayed(gameVariables);
		}
		else if(argument === 'Schematics') {
			schematicsDisplay(inventory,schematics,hero);
		}
	}
}

function closeInventory() {
	document.getElementById("inventoryBackpack").className = "closedInventory";
}

function schematicsDisplay(inventory,schematics,hero) {
    console.log("opening schematics");
	document.getElementById("inventoryBackpack").innerHTML = "<div id='inventoryExit' class='exitInventory' onclick='closeInventory()'>X</div><h4>Schematics</h4><break>";
	var obtainedSchematicsDiv = document.createElement('div');
	var obtainedSchematicsName ="obtainedSchematics";
	obtainedSchematicsDiv.id = obtainedSchematicsName;
	document.getElementById('inventoryBackpack').appendChild(obtainedSchematicsDiv);
	document.getElementById('obtainedSchematics').innerHTML = "<p>Obtained schematics:</p>";
	var schematicsDivider = document.createElement('hr');
	schematicsDivider.id = "schematicsDivider";
	document.getElementById('inventoryBackpack').appendChild(schematicsDivider);
	var notObtainedSchematicsDiv = document.createElement('div');
	var notObtainedSchematicsName ="notObtainedSchematics";
	notObtainedSchematicsDiv.id = notObtainedSchematicsName;
	document.getElementById('inventoryBackpack').appendChild(notObtainedSchematicsDiv);
	document.getElementById('notObtainedSchematics').innerHTML = "<p>Unobtained schematics:</p>";
	for(u=0;u<Object.keys(schematics).length;u++) {
		if(schematics[Object.keys(schematics)[u]].obtained === 0) {
			var schematicDiv = document.createElement('div');
			var schematicName = schematics[Object.keys(schematics)[u]].constructor;
			schematicDiv.id = schematicName;
			schematicDiv.className = 'schematic schematicNotObtained';
			document.getElementById(notObtainedSchematicsName).appendChild(schematicDiv);
			document.getElementById(schematicName).innerHTML = schematics[Object.keys(schematics)[u]].name;
		}
		else {
			var schematicDiv = document.createElement('div');
			var schematicName = schematics[Object.keys(schematics)[u]].constructor;
			schematicDiv.id = schematicName;
			schematicDiv.className = 'schematic schematicObtained';
			document.getElementById(obtainedSchematicsName).appendChild(schematicDiv);
			document.getElementById(schematicName).innerHTML = schematics[Object.keys(schematics)[u]].name;
			document.getElementById(schematicName).onclick = function() {obtainedSchematicShow(this.id,schematics,inventory,hero);}
		}
	}

}

function closeInteractionContainer() {
    document.getElementById("missionInteractionContainer").className = "progressNotActive";
}

function inventoryDisplay(inventory) {
	document.getElementById("inventoryBackpack").innerHTML = "<div id='inventryExit' class='exitInventory' onclick='closeInventory()'>X</div><h4>Inventory</h4><break>";
		for(i=0;i<Object.keys(inventory).length;i++) {
			if(inventory[Object.keys(inventory)[i]].amount === 0) {
				inventoryColor = "inventoryColorNotActive";
			}
			else {
				inventoryColor = "inventoryColorActive";
			}
			document.getElementById("inventoryBackpack").innerHTML += "<span class='inventoryNameDisplay " + inventoryColor + "'> " +   inventory[Object.keys(inventory)[i]].name + ": </span> <span class='inventoryCountDisplay " + inventoryColor + "'>" + inventory[Object.keys(inventory)[i]].amount + "</span><break>";
		}
}

function newPickUpsDisplayed(newPickUps) {
	if(newPickUps.pickUp > 0) {
	document.getElementById("pickUp").className = "pickedUp";
	document.getElementById("pickUp").innerHTML = newPickUps.pickUp + "!";
	}
	else {
	document.getElementById("pickUp").className = "";
	document.getElementById("pickUp").innerHTML = "";
	}
}

function displayMonsterHealth(monster,hero) {
	try {
		if(monster.state != 'idle' || monster.health < monster.fullHealth) {
			if(monster.category === 1) {
				ctx.fillStyle ='rgba(225,255,255,0.5)';
				ctx.fillRect(monster.x-16,monster.y-26,25*(monster.health/monster.fullHealth)+2,5);
			}
			else if(monster.category === 2) {
				ctx.fillStyle ='rgba(225,255,255,0.5)';
				ctx.fillRect(monster.x-16,monster.y-26,25*(monster.health/monster.fullHealth)+2,5);
			}
			else if(monster.category === 3) {
				ctx.fillStyle ='rgba(225,255,255,0.5)';
				ctx.fillRect(monster.x-16,monster.y-26,25*(monster.health/monster.fullHealth)+2,5);
			}
			else if(monster.category === 4) {
				ctx.fillStyle ='rgba(225,255,255,0.5)';
				ctx.fillRect(monster.x-16,monster.y-26,25*(monster.health/monster.fullHealth)+2,5);
			}
			if(monster.health > monster.fullHealth/100*80) {
				ctx.fillStyle ='rgba(22,255,5,1)';
				ctx.fillRect(monster.x-15,monster.y-25,25*(monster.health/monster.fullHealth),3);
			}
			else if(monster.health <= monster.fullHealth/100*80 && monster.health > monster.fullHealth/100*60) {
				ctx.fillStyle = 'rgba(255,183,5,1)';
				ctx.fillRect(monster.x-15,monster.y-25,25*(monster.health/monster.fullHealth),3);
			}
			else if(monster.health <= monster.fullHealth/100*60 && monster.health > monster.fullHealth/100*40) {
				ctx.fillStyle = 'rgba(255,135,5,1)';
				ctx.fillRect(monster.x-15,monster.y-25,25*(monster.health/monster.fullHealth),3);
			}
			else if(monster.health <= monster.fullHealth/100*40 && monster.health > monster.fullHealth/100*20) {
				ctx.fillStyle = 'rgba(255,98,5,1)';
				ctx.fillRect(monster.x-15,monster.y-25,25*(monster.health/monster.fullHealth),3);
			}
			else if(monster.health <= monster.fullHealth/100*20 && monster.health > monster.fullHealth/100*0) {
				ctx.fillStyle = 'rgba(255,41,5,1)'
				ctx.fillRect(monster.x-15,monster.y-25,25*(monster.health/monster.fullHealth),3);
			}
	}
	}
	catch(err) {
	}
	try {
		if(hero.scavangerObtained === 1 && hero.scavangerOn === 1) {
			ctx.fillStyle = 'rgba(200,200,200,1)'
			if(monster.drop === 1) {
				ctx.fillRect(monster.x-15,monster.y-35,3,3);
			}
			else if(monster.drop === 2) {
				ctx.fillRect(monster.x-15,monster.y-35,3,3);
				ctx.fillRect(monster.x-10,monster.y-35,3,3);
			}
			else if(monster.drop === 3) {
				ctx.fillRect(monster.x-15,monster.y-35,3,3);
				ctx.fillRect(monster.x-10,monster.y-35,3,3);
				ctx.fillRect(monster.x-5,monster.y-35,3,3);
			}
		}
	}
	catch(err) {
	}
}

function recountMedkit(hero) {
	if(hero.medkit <= 0) {
		document.getElementById("utilitiesMedkit").className = "gameItem";
	}
	else {
		document.getElementById("utilitiesMedkit").className = "gameItem obtained";
	}
	document.getElementById("utilitiesMedkit").innerHTML = hero.medkit;
}

function useMedkit(hero) {
	if(hero.medkit > 0) {
		for(y=0;y<25;y++) {
			if(hero.health < 100) {
				hero.health = hero.health + 1;
			}
			else {
			}
		}
		hero.medkit = hero.medkit - 1;
	}
	else {
	console.log("no medkit :(!");
	}
	recountMedkit(hero);
}

function GuidePlayerToObjective(missionArray,hero,image,gameVariables) {
    //console.log(hero.trackerCountdown+30000 + "  " + gameVariables.timeControler.getTime());
    if(missionArray[hero.currentMission][0].type === "find" && hero.trackerCountdown+15000 < gameVariables.timeControler.getTime()  || missionArray[hero.currentMission][0].type === "interact"  && hero.trackerCountdown+15000 < gameVariables.timeControler.getTime()) {
        hero.trackerActivated = 1;
        hero.trackerActivatedTime = gameVariables.timeControler.getTime();
    }
}

function showArrowToMission(missionArray,image,hero,timeControler) {
    if(hero.trackerActivatedTime+3500 > timeControler.getTime() && missionArray[hero.currentMission][0].type === "find" || missionArray[hero.currentMission][0].type === "interact" && hero.trackerActivatedTime+3500 > timeControler.getTime()) {
    //console.log(missionArray[hero.currentMission][0].x + "," + missionArray[hero.currentMission][0].y)
	var angle = Math.atan2(missionArray[hero.currentMission][0].y - 300, missionArray[hero.currentMission][0].x - 400) * 180 / Math.PI + 90;
	ctx.beginPath();
	ctx.lineWidth = 3;
	ctx.strokeStyle = 'rgba(255,230,87,0.7)';
	ctx.arc(missionArray[hero.currentMission][0].x,missionArray[hero.currentMission][0].y,5,0,2*Math.PI);
	ctx.stroke();
    //console.log(missionArray[hero.currentMission][0].x + ", " + missionArray[hero.currentMission][0].y);
    if(hero.trackerFadeInit <= 0.8 && hero.trackerFadeInit >= 0.02 && hero.trackerMaxFadeReached === 0) {
      hero.trackerFadeInit = hero.trackerFadeInit + 0.02;
    }
    else if(hero.trackerFadeInit <= 0.8 && hero.trackerFadeInit >= 0.02 && hero.trackerMaxFadeReached === 1) {
        hero.trackerFadeInit = hero.trackerFadeInit - 0.02;
    }
    else if(hero.trackerFadeInit >= 0.8) {
         hero.trackerMaxFadeReached = 1;
         hero.trackerFadeInit = 0.8;
    }
    else if(hero.trackerFadeInit <= 0.2) {
        hero.trackerMaxFadeReached = 0;
        hero.trackerFadeInit = 0.2;
    }
    ctx.globalAlpha = hero.trackerFadeInit;
	drawRotatedArrow(image,400,300,angle);
    ctx.globalAlpha = 1;
    }
    else {
        hero.trackerMaxFadeReached = 0;
        hero.trackerCountdown = timeControler.getTime();
        hero.trackerActivated = 0;
        hero.trackerFadeInit = 0.2;
    }
}

function showMissionInPlay(hero,missionArray) {
	var missionNumber = parseFloat(hero.currentMission) + 1;
	document.getElementById("missionProgressContainer").innerHTML = "<h4>Mission " + missionNumber + "</h4>";
	//console.log(hero.currentMission + " | mission number");
	//console.log(missionArray[hero.currentMission][0].func + " | access to elements");
	//data[i]['action'][0]['text']
	//console.log(missionArray[hero.currentMission].length + " | number of objectives");
	for(h=0;h<missionArray[hero.currentMission].length;h++) {
            if(missionArray[hero.currentMission][h].type === "get") {
                document.getElementById("missionProgressContainer").innerHTML += "<li><span id='missionContentSpan" + h + "'  class='missionContentSpan'>" + missionArray[hero.currentMission][h].statement + "<span class='amountDisplay'> " + missionArray[hero.currentMission][h].gathered + "/" + missionArray[hero.currentMission][h].amount + "</span></span></li>";
            }
            else if(missionArray[hero.currentMission][h].type === "find") {
                document.getElementById("missionProgressContainer").innerHTML += "<li><span id='missionContentSpan" + h + "' class='missionContentSpan'>" +missionArray[hero.currentMission][h].statement + "</span></li>";
            }
            else if(missionArray[hero.currentMission][h].type === "kill") {
                var kills = "";
                if(missionArray[hero.currentMission][h].gathered < missionArray[hero.currentMission][h].amount) {
                    kills = missionArray[hero.currentMission][h].gathered;
                }
                else {
                    kills = missionArray[hero.currentMission][h].amount;
                }
                document.getElementById("missionProgressContainer").innerHTML += "<li><span id='missionContentSpan" + h + "' class='missionContentSpan'>" + missionArray[hero.currentMission][h].statement + "<span class='amountDisplay'> " + kills + "/" + missionArray[hero.currentMission][h].amount + "</span></span></li>";
            }
            else if(missionArray[hero.currentMission][h].type === "interact") {
                document.getElementById("missionProgressContainer").innerHTML += "<li><span id='missionContentSpan" + h + "' class='missionContentSpan'>" + missionArray[hero.currentMission][h].statement + "</span></li>";
            }
            else if(missionArray[hero.currentMission][h].type === "win") {
                document.getElementById("missionProgressContainer").innerHTML += "<li><span id='missionContentSpan" + h + "' class='missionContentSpan'>" + missionArray[hero.currentMission][h].statement + "</span></li>";
            }
                else {
            }
            if(missionArray[hero.currentMission][h].completed === "yes") {
            //console.log("YEA");
            document.getElementById("missionContentSpan" + h).style.textDecoration = "line-through";
            }
            else {
            }
	}
}

function showMissionTrackerCooldown(hero,timeControler) {
    if(hero.trackerActivated === 1) {
        document.getElementById("gameAbilityOne").innerHTML = "!";
    }
    else {
    //console.log(((hero.trackerCountdown+30000 - timeControler.getTime())/1000).toFixed(1));
    if((((hero.trackerCountdown+15000 - timeControler.getTime())/1000).toFixed(1)) <= 0) {
        document.getElementById("gameAbilityOne").innerHTML = "rdy";
        //console.log("ready");
    }
    else if((((hero.trackerCountdown+15000 - timeControler.getTime())/1000).toFixed(1)) > 0) {
        document.getElementById("gameAbilityOne").innerHTML = ((hero.trackerCountdown+15000 - timeControler.getTime())/1000).toFixed(1);
        //console.log("Ready in: " + ((hero.pulseTransmitterCountdown+30000 - timeControler.getTime())/1000).toFixed(1));
    }
    else {
        //console.log("not obtained");
    }
  }
}

function fireMissionTracker(hero,timeControler) {
	//console.log(((hero.pulseTransmitterCountdown+30000 - timeControler.getTime())/1000).toFixed(1));
	if(hero.trackerCountdown+30000 < timeControler.getTime()) {
		hero.trackerActivated = 1;
		hero.trackerCountdown = timeControler.getTime();
	}
}

function useAntidote(hero) {
	if(hero.antidote > 0) {
	hero.isPoisoned = 0;
	hero.antidote = hero.antidote - 1;
	}
	else {
	console.log("no antidote :(!");
	}
	recountAntidote(hero);
}

function recountGranade(gameArrays) {
	if(gameArrays.granadeArray <= 0) {
		document.getElementById("utilitiesGranade").className = "gameItem";
	}
	else {
		document.getElementById("utilitiesGranade").className = "gameItem obtained";
	}
	document.getElementById("utilitiesGranade").innerHTML = gameArrays.granadeArray.length;
}

function recountAntidote(hero) {
	if(hero.antidote <= 0) {
		document.getElementById("utilitiesAntidote").className = "gameItem";
	}
	else {
		document.getElementById("utilitiesAntidote").className = "gameItem obtained";
	}
	document.getElementById("utilitiesAntidote").innerHTML = hero.antidote;
}

function reset(drops,gameVariables,gameArrays,inventory,hero,keyPressed,backgroundImage,gameDisplay,tileDisplay,keysDown,tileArray,schematics,missionArray,environmentalPoints,survivorImage,elderweedImage,zombieExcrementImage,butterflyEggsImage,environmentImagesLoaded) {
	for(y=0;y<drops.length;y++) {
		if(drops[y].itemType === "mat") {
			inventory[drops[y].imgName] = {"amount":100, "name":drops[y].name,"constructor":drops[y].imgName};
		}
		if(drops[y].itemType === "schematic") {
			schematics[drops[y].imgName] = {"obtained":1,"name":drops[y].name,"constructor":drops[y].imgName,"materials":drops[y].materials,"description":drops[y].description};
		}
	}
    setEnvironmentalPoints(environmentalPoints);
	hero.gun = "machete";
	hero.clip = 7;
	hero.shotgunclip = 8;
	hero.machinegunclip = 30;
	hero.gunshots = 40;
	hero.shotgunshots = 500;
	hero.machinegunshots = 0;
	hero.flameshells = 0;
	hero.medkit = 3;
	hero.antidote = 1;
    hero.machete = 1;
    hero.pistol = 1;
	hero.shotgun = 1;
	hero.machinegun = 0;
	hero.flamethrower = 0;
	gameArrays.backgroundArray = [];
	gameArrays.backgroundObjectArray = [];
	gameArrays.schematicsyArray = [];
	gameArrays.bulletArray = [];
	gameArrays.objectArray = [];
	gameArrays.thrownGranadeArray = [];
	gameArrays.archivedObjectArray = [];
	gameArrays.archivedBulletArray = [];
	gameArrays.archivedMonsterArray = [];
	gameArrays.archivedGranadeArray = [];
	gameArrays.numberOfLampsOnScreen = [];
	gameArrays.monsterArray = [];
	gameArrays.granadeArray = [];
	granadeToPlayer(200,75,gameArrays.granadeArray);
	granadeToPlayer(200,75,gameArrays.granadeArray);
	granadeToPlayer(200,75,gameArrays.granadeArray);
	tileArray = {};
	keysDown = {};
	keyPressed = {};
	gameVariables.gameStopped = 0;
	gameVariables.hasFired = 0;
	gameVariables.numberOfDrops = 0;
	gameVariables.pickUp = 0;
	newPickUpsDisplayed(gameVariables);
	initiateMissions(missionArray,environmentalPoints,gameArrays.objectArray,survivorImage,gameVariables,elderweedImage,zombieExcrementImage,butterflyEggsImage);
	gameVariables.isPressed = 0;
	gameVariables.timeStamp = new Date();
	gameVariables.timeStart = new Date();
	gameVariables.timeEnd = "";
	gameVariables.timeControler = new Date();
	gameVariables.setTimeState = gameVariables.timeControler.getSeconds() + 3;
	gameVariables.bulletCounter = 0;
    gameVariables.missionHighlight = gameVariables.timeControler.getTime();
	//Initiate ground-values
	hero.angle = 0;
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;
	hero.death = 0;
	hero.antidote = 0;
	hero.medkit = 3;
	hero.health = 100;
	//Set time-values
	//Hide buttons
	document.getElementById("gameInventory").style.display = "block";
	document.getElementById("gameSchematics").style.display = "block";
	document.getElementById("gameVision").style.display = "block";
	document.getElementById("missionProgressContainer").style.display = "block";
	document.getElementById("gameStatistics").style.display = "none";
    document.getElementById("gameAbilityOverallContainer").style.display = "block";
	initiateBackground(gameArrays.backgroundArray, gameArrays.backgroundObjectArray, backgroundImage);
	initialNineTileGameboard(gameArrays.numberOfLampsOnScreen, gameArrays.monsterArray,environmentImagesLoaded,gameArrays.environmentArray,gameDisplay);
	weaponAvailability(hero);
	recountAntidote(hero);
	recountMedkit(hero);
	recountGranade(gameArrays);
	//Initiate gameworld workings
	gameDisplay.x = canvas.width/2;
	gameDisplay.y = canvas.height/2;
	gameDisplay.indexX = 0;
	gameDisplay.indexY = 0;
	tileDisplay.x = canvas.width/2;
	tileDisplay.y = canvas.height/2;
	selectWeapon("machete", hero);
    presentMission(missionArray,hero,gameVariables.timeControler);
}

/* TEST FUNCTION */
function changeStatusOfMissionProgress(missionArray,hero,timeControler) {
	hero.missionProgress = hero.missionProgress + 1 ;
	hero.currentMission = hero.currentMission + 1;
	hero.missionPresented = 0;
    hero.missionShown = 0;
    presentMission(missionArray,hero,timeControler);
}
