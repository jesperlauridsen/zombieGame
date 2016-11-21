function lazerScope(hero) {
	if(hero.scopeObtained === 1 && hero.scopeOn === 1) {
	var lazerScopeX = canvas.width/2;
	var lazerScopeY = canvas.height/2;
	for(x=0;x<60;x++) {
		if(x<20) {
	}
	else {
		lazerScopeX += (0+x/2) * Math.sin(hero.angle * TO_RADIANS);
		lazerScopeY -= (0+x/2) * Math.cos(hero.angle * TO_RADIANS);
		ctx.fillStyle = 'rgba(255,0,0,0.7)';
		ctx.fillRect(lazerScopeX,lazerScopeY,1,1);
		ctx.fillRect(lazerScopeX+1,lazerScopeY,1,1);
		ctx.fillRect(lazerScopeX,lazerScopeY+1,1,1);
			}
		}
	}
}

function activateFlashlight(hero,keysDown,gameVariables) {
    if(hero.flashlight === "on") {
				delete keysDown[70];
				gameVariables.isPressed = 1;
				hero.flashlight = "off";
                document.getElementById('gameAbilitySeven').innerHTML = "off";
			}
			else if(hero.flashlight === "off") {
				delete keysDown[70];
				gameVariables.isPressed = 1;
				hero.flashlight = "on";
                document.getElementById('gameAbilitySeven').innerHTML = "on";
			}
}

function activateLazerScope(hero) {
    if(hero.scopeObtained === 1) {
        if(hero.scopeOn === 1) {
            document.getElementById("gameAbilityThree").innerHTML = "off";
            hero.scopeOn = 0;
        }
        else {
            hero.scopeOn = 1;
             document.getElementById("gameAbilityThree").innerHTML = "on";
        }
    }
    else {

    }
}

function rocketBoots(hero) {
	if(hero.rocketBootsObtained === 1 && hero.rocketBootsOn === 1) {
	hero.initialSpeed = 6;
	}
}

function activateScavanger(hero) {
    if(hero.scavangerObtained === 1) {
        if(hero.scavangerOn === 1) {
            document.getElementById("gameAbilityFour").innerHTML = "off";
            hero.scavangerOn = 0;
        }
        else {
            hero.scavangerOn = 1;
            document.getElementById("gameAbilityFour").innerHTML = "on";
        }
    }
    else {
    }
}

function activateRocketBoots(hero) {
    if(hero.rocketBootsObtained === 1) {
        if(hero.rocketBootsOn === 1) {
            document.getElementById("gameAbilityFive").innerHTML = "off";
            hero.rocketBootsOn = 0;
            hero.initialSpeed = 5;
        }
        else {
            document.getElementById("gameAbilityFive").innerHTML = "on";
            hero.rocketBootsOn = 1;
            hero.initialSpeed = 6;
        }
    }
    else {
    }
}

function activateHeatGoggles(hero) {
    if(hero.heatGogglesObtained === 1) {
        if(hero.heatGogglesOn === 1) {
            document.getElementById("gameAbilityTwo").innerHTML = "off";
            hero.heatGogglesOn = 0;
        }
        else {
            document.getElementById("gameAbilityTwo").innerHTML = "on";
            hero.heatGogglesOn = 1;
        }
    }
    else {
    }
}

function launchRocket(distance,angle,r,b,g,type,rocketArray) {
    console.log("Launching a " + type + " rocket, with colors " + r + "," + b + "," + g + " with distance " + distance + " at angle " + angle);
    var rocketObject = {
        type: type,
        distance: distance,
        angle: angle,
        red: r,
        blue: b,
        green: g,
    };
}

function launchRandomRocket(rocketArray) {
    var rocketType = ["regular","sphere"];
    var randomRocket = (Math.round(Math.random() * 1 + 0));
    var red = (Math.round(Math.random() * 255 + 0));
    var blue = (Math.round(Math.random() * 255 + 0));
    var randomAngle = (Math.round(Math.random() * 360 + 0));
    var distance = (Math.round(Math.random() * 45 + 40));
    randomAngle = randomAngle * TO_RADIANS;
    var green = (Math.round(Math.random() * 255 + 0))
    launchRocket(distance,randomAngle,red,blue,green,rocketType[randomRocket],rocketArray);
}
