function granadeToPlayer(damage, radius, granadeArray) {
	var primaryGranade = {
		x:canvas.width/2,
		y:canvas.height/2,
		explosion:0,
		damage:damage,
		radius:radius,
		thrown:0,
		activated:0,
		activationTime:0,
		inbound:1,
		throwLength:0,
		blown:0,
		explosionTime:0,
		explosionExpansion:1.7,
		explosionExpansionTopped:0,
		explosionFade:0,
		explosionFadeTopped:0,
		hit:0,
		hitOpacity:0,
		hitPeaked:0
	};
	granadeArray.push(primaryGranade);
}

function selectWeapon(weapon, hero) {
	var weapons = ['Machete','Pistol','Shotgun','Machinegun','Flamethrower'];
	if(hero[weapon] === 1) {
		hero.gun = weapon;
		document.getElementById("weapon" + weapons[0]).style.border = "0px";
		document.getElementById("weapon" + weapons[0]).style.boxShadow = "0px 0px 0px 0px white";
		document.getElementById("weapon" + weapons[1]).style.border = "0px";
		document.getElementById("weapon" + weapons[1]).style.boxShadow = "0px 0px 0px 0px white";
		document.getElementById("weapon" + weapons[2]).style.border = "0px";
		document.getElementById("weapon" + weapons[2]).style.boxShadow = "0px 0px 0px 0px white";
		document.getElementById("weapon" + weapons[3]).style.border = "0px";
		document.getElementById("weapon" + weapons[3]).style.boxShadow = "0px 0px 0px 0px white";
		document.getElementById("weapon" + weapons[4]).style.border = "0px";
		document.getElementById("weapon" + weapons[4]).style.boxShadow = "0px 0px 0px 0px white";
		document.getElementById("weapon" + weapon[0].toUpperCase() + weapon.substring(1)).style.border = "1px solid grey";
		document.getElementById("weapon" + weapon[0].toUpperCase() + weapon.substring(1)).style.borderStyle = "none solid none solid";
		document.getElementById("weapon" + weapon[0].toUpperCase() + weapon.substring(1)).style.boxShadow = "0 8px 16px -6px black";
	}
	else {
	}
}

function bulletFire(damageDealt,shooter,bulletArray,gameVariables,angle) {
	var bulletAngleFromHero;
	var startX = shooter.x;
	var startY = shooter.y;
	var speed = 10;
	if(shooter.gun == 'shotgun') {
		speed = Math.round(Math.random() * 2) + 9;
		bulletAngleFromHero = angle + (Math.random() * 31) - 15;
	}
	else if(shooter.gun == 'machinegun') {
		bulletAngleFromHero = angle + (Math.random() * 5) - 2;
	}
	else if(shooter.gun == 'flamethrower') {
		bulletAngleFromHero = angle + (Math.random() * 21) - 10;
	}
	else if(shooter.gun == 'machete') {
		bulletAngleFromHero = Math.round(angle + 10);
		startX = Math.round(shooter.x + Math.cos(bulletAngleFromHero * TO_RADIANS) * 20);
		startY = Math.round(shooter.y + Math.sin(bulletAngleFromHero * TO_RADIANS) * 20);
	}
	else {
		bulletAngleFromHero = angle;
	}
	var bullet = {
	firedFrom:shooter.gun,
	bulletNumber: gameVariables.bulletCounter,
	timeOfShot:gameVariables.timeControler,
	bulletReleaseTime: new Date(),
	speed: speed, // movement in pixels per second
	bulletDamage: damageDealt,
	bulletStartX:shooter.x,
	bulletStartY:shooter.y,
	bulletHit:0,
	bulletX: startX,
	bulletY: startY,
	bulletAngle: bulletAngleFromHero,
	bulletStartAngle: shooter.angle,
	angleCount:0
	};
    if(shooter === 'hero') {
	gameVariables.bulletCounter = gameVariables.bulletCounter + 1;
    }
	bulletArray.push(bullet);
}

function showPulseTransmitterCooldown(hero,timeControler) {
    if(hero.pulseTransmitterFired === 1) {
        document.getElementById("gameAbilitySix").innerHTML = "!";
    }
    else {
    //console.log(((hero.pulseTransmitterCountdown+30000 - timeControler.getTime())/1000).toFixed(1));
    if((((hero.pulseTransmitterCountdown+30000 - timeControler.getTime())/1000).toFixed(1)) <= 0 && hero.pulseTransmitterObtained === 1) {
        document.getElementById("gameAbilitySix").innerHTML = "rdy";
        //console.log("ready");
    }
    else if((((hero.pulseTransmitterCountdown+30000 - timeControler.getTime())/1000).toFixed(1)) > 0 && hero.pulseTransmitterObtained === 1) {
        document.getElementById("gameAbilitySix").innerHTML = ((hero.pulseTransmitterCountdown+30000 - timeControler.getTime())/1000).toFixed(1);
        //console.log("Ready in: " + ((hero.pulseTransmitterCountdown+30000 - timeControler.getTime())/1000).toFixed(1));
    }
    else {
        //console.log("not obtained");
    }
 }
}

function firePulseTransmitter(hero,timeControler) {
	//console.log(((hero.pulseTransmitterCountdown+30000 - timeControler.getTime())/1000).toFixed(1));
	if(hero.pulseTransmitterCountdown+30000 < timeControler.getTime() && hero.pulseTransmitterObtained === 1) {
		hero.pulseTransmitterFired = 1;
		hero.pulseTransmitterCountdown = timeControler.getTime();
	}
}

function pulseEmitter(monsterArray,hero,timeControler,j,archivedMonsterArray,missionArray,gameVariables,objectArray,drops) {
	console.log("fired!");
	if(hero.pulseTransmitterFired === 1) {
		if(hero.pulseTransmitterFiredTime+300 > timeControler.getTime()) {
			ctx.beginPath();
			ctx.lineWidth = 2;
			ctx.strokeStyle = 'rgba(255,255,255,1)';
			ctx.arc(400,300,j,0,2*Math.PI);
			ctx.stroke();
			ctx.beginPath();
			ctx.lineWidth = 2;
			ctx.strokeStyle = 'rgba(255,255,255,0.5)';
			ctx.arc(400,300,j-2,0,2*Math.PI);
			ctx.stroke();
			ctx.beginPath();
			ctx.lineWidth = 2;
			ctx.strokeStyle = 'rgba(255,255,255,0.2)';
			ctx.arc(400,300,j-4,0,2*Math.PI);
			ctx.stroke();
			for(h=0;h<monsterArray.length;h++) {
				if(((monsterArray[h].x - hero.x)*(monsterArray[h].x - hero.x) + (monsterArray[h].y - hero.y)*(monsterArray[h].y - hero.y)) < (j*j)) {
					if(monsterArray[h].health - 20 > 1) {
						//console.log("monster lives");
						monsterArray[h].health = monsterArray[h].health - 50;
						monsterArray[h].startledTime = timeControler.getTime();
						if(monsterArray[h].category == 1) {
							monsterArray[h].state = "startled";
						}
						else {
							monsterArray[h].state = "insane";
						}
					}
					else if(monsterArray[h].health - 20 <= 0) {
						//console.log("dead monster");
						monsterArray[h].killedBy = "pulse";
						monsterArray[h].timeOfDeath = timeControler.getTime();
						archivedMonsterArray.push(monsterArray[h]);
						//Check mission state && check zombie number - if mission is exact - add to the total killed
                        missionKillCounter(missionArray,monsterArray[h],hero);
                        monsterDrop(monsterArray[h],drops,objectArray,gameVariables);
						//remove monster from active array;
						monsterArray.splice(h,1);
					}
				}
			}

		}
		else {
			hero.pulseTransmitterFiredTime = 0;
			hero.pulseTransmitterFired = 0;
			hero.pulseTransmitterCounter = 4;
		}
	}
}

function swingSword(heroX,heroY,bulletX,bulletY) {
	var opposedAngle = (Math.atan2(heroY - bulletY, heroX - bulletX) * 180 / Math.PI) - 90;
	var swordSwingFromBulletX = "";
	var swordSwingFromBulletY = "";
	var swordStartPointX = Math.round(Math.cos((opposedAngle -90) * Math.PI / 180) * 10 + heroX);
	var swordStartPointY = Math.round(Math.sin((opposedAngle -90) * Math.PI / 180) * 10 + heroY);
	var color = 0;
	var visibility = 0;
	var bestcolor = 'rgba('+ color + ',' + color + ',' + color + ',' + visibility + ')';
	for(x=0;x<240;x++) {
	swordSwingFromBulletX = Math.round(bulletX + Math.cos((opposedAngle-x) * TO_RADIANS) * 10);//(x/2));
	swordSwingFromBulletY = Math.round(bulletY + Math.sin((opposedAngle-x) * TO_RADIANS) * 10);//(x/2));
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle =  bestcolor; //'rgba(240,240,240,1)';
	bestcolor = 'rgba('+ color + ',' + color + ',' + color + ',' + visibility + ')';
	ctx.moveTo(swordSwingFromBulletX,swordSwingFromBulletY);
	ctx.lineTo(swordStartPointX,swordStartPointY);
	ctx.arc(swordSwingFromBulletX,swordSwingFromBulletY,1,0,2*Math.PI);
	ctx.stroke();
	color = color + 1;
	visibility = x/1000;
}
}

function flamethrowerFire(bulletX, bulletY) {
	ctx.beginPath();
	ctx.lineWidth = 3;
	ctx.strokeStyle = 'rgba(255,230,87,0.7)';
	ctx.arc(bulletX,bulletY,5,0,2*Math.PI);
	ctx.stroke();
	ctx.beginPath();
	ctx.lineWidth = 6;
	ctx.strokeStyle = 'rgba(255,100,100,0.6)';
	ctx.arc(bulletX,bulletY,3,0,2*Math.PI);
	ctx.stroke();
	ctx.beginPath();
	ctx.strokeStyle = 'rgba(186,90,58,0.3)';
	ctx.arc(bulletX,bulletY,7,0,2*Math.PI);
	ctx.stroke();
	ctx.beginPath();
	ctx.lineWidth = 12;
	ctx.strokeStyle = 'rgba(100,100,100,0.2)';
	ctx.arc(bulletX,bulletY,9,0,2*Math.PI);
	ctx.stroke();
	ctx.lineWidth = 1;
	ctx.fillRect(bulletX,bulletY,1,1);
}

function bulletTraceFade(bullet) {
	var bulletX;
	var bulletY;
	var opacityFiler;
	var tailLine = 7;
	for(x=0;x<tailLine;x++) {
		if(x==0) {
			bulletX = bullet.bulletX;
			bulletY = bullet.bulletY;
		}
		else {
		}
	bulletX -= (0+x) * Math.sin(bullet.bulletAngle * TO_RADIANS);
	bulletY += (0+x) * Math.cos(bullet.bulletAngle * TO_RADIANS);
	opacityFiler = 1/x;
	blueAdder = 12.8;
	blueFiler = 191+(x*2);
	if(bullet.firedFrom === "pistol") {
	ctx.fillStyle = 'rgba(0,' + blueFiler + ',255,' + opacityFiler + ')';
	ctx.fillRect(bulletX,bulletY,1,1);
	ctx.fillRect(bulletX-1,bulletY,1,1);
	ctx.fillRect(bulletX,bulletY-1,1,1);
	ctx.fillRect(bulletX+1,bulletY,1,1);
	ctx.fillRect(bulletX,bulletY+1,1,1);
	}
	else if(bullet.firedFrom === "flamethrower") {
	//ctx.fillStyle = 'rgba(0,' + blueFiler + ',255,' + opacityFiler + ')';
	//ctx.fillRect(bulletX+2,bulletY+2,2,2);
	//ctx.fillRect(bulletX-2,bulletY-2,2,2);
	//ctx.fillRect(bulletX,bulletY-2,2,2);
	//ctx.fillRect(bulletX,bulletY+2,2,2);
	//ctx.fillRect(bulletX,bulletY-2,2,2);
	//ctx.fillRect(bulletX-2,bulletY,2,2);
	//ctx.fillRect(bulletX+2,bulletY-2,2,2);
	//ctx.fillRect(bulletX-2,bulletY+2,2,2);
	}
	else if(bullet.firedFrom === "machinegun") {
	ctx.fillStyle = 'rgba(255,0,0' + ',' + opacityFiler + ')';
	ctx.fillRect(bulletX,bulletY,1,1);
	}
	else if(bullet.firedFrom === "shotgun") {
	ctx.fillStyle = 'rgba(255,255,0' + ',' + opacityFiler + ')';
	ctx.fillRect(bulletX,bulletY,1,1);
	}
    else if(bullet.firedFrom === "slime") {
    ctx.fillStyle = 'rgb(124,252,0' + ',' + opacityFiler + ')';
	ctx.fillRect(bulletX,bulletY,1,1);
	ctx.fillRect(bulletX-1,bulletY,1,1);
	ctx.fillRect(bulletX,bulletY-1,1,1);
	ctx.fillRect(bulletX+1,bulletY,1,1);
	ctx.fillRect(bulletX,bulletY+1,1,1);
    }
	else {
	}
}
}

function thrownGranade(granade,timeControler,monsterArray, archivedMonsterArray, hero,thrownGranadeArray,missionArray,objectArray,gameVariables,drops) {
	if(granade.thrown = 1 && timeControler.getTime() < granade.activationTime.getTime()) {
		ctx.beginPath();
		ctx.strokeStyle = 'rgba(255,255,255,'+ 1 + ')';
		ctx.arc(granade.x,granade.y,granade.radius,0,2*Math.PI);
		ctx.stroke();
		ctx.font = "10px Lato";
		ctx.fillText(((granade.activationTime.getTime() - timeControler.getTime()+10)/500).toFixed(1),granade.x-8,granade.y-(granade.radius+5));
		for(x=0;x<50;x++) {
			ctx.beginPath();
			ctx.strokeStyle = 'rgba(255,255,255,0.'+ x + ')';
			ctx.arc(granade.x,granade.y,(granade.radius/50)*x,0,2*Math.PI);
			ctx.stroke();
		//document.getElementById("testdiv").innerHTML = ((granade.activationTime.getTime() - timeControler.getTime()+10)/500).toFixed(1);
		}
		if(timeControler.getTime()+25 >= granade.activationTime.getTime() && granade.blown == 0) {
			granade.explosionTime = timeControler.getTime() + 500;
			granade.explosion = 1;
			for(i=0;i<monsterArray.length;i++) {
				//(x1 - x2)^2 + (y1 - y2)^2 <= D^2
				//console.log(((monsterArray[i].x - granade.x)*(monsterArray[i].x - granade.x) + (monsterArray[i].y - granade.y)*(monsterArray[i].y - granade.y)) + " < " + (granade.radius*granade.radius));
				if(((monsterArray[i].x - granade.x)*(monsterArray[i].x - granade.x) + (monsterArray[i].y - granade.y)*(monsterArray[i].y - granade.y)) < (granade.radius*granade.radius)) {
					//console.log("yes");
					//console.log("radius: " + granade.radius + " damage:" + granade.damage + " distance:" + Math.round(Math.sqrt((monsterArray[i].x-granade.x)*(monsterArray[i].x-granade.x) + (monsterArray[i].y-granade.y)*(monsterArray[i].y-granade.y))) + " %: " + (granade.radius-Math.round(Math.sqrt((monsterArray[i].x-granade.x)*(monsterArray[i].x-granade.x) + (monsterArray[i].y-granade.y)*(monsterArray[i].y-granade.y))))/100 + "||damage dealt: " + Math.round(granade.damage * ((granade.radius-Math.round(Math.sqrt((monsterArray[i].x-granade.x)*(monsterArray[i].x-granade.x) + (monsterArray[i].y-granade.y)*(monsterArray[i].y-granade.y))))/100)));
					if((monsterArray[i].health - Math.round(granade.damage * ((granade.radius-Math.round(Math.sqrt((monsterArray[i].x-granade.x)*(monsterArray[i].x-granade.x) + (monsterArray[i].y-granade.y)*(monsterArray[i].y-granade.y))))/100))) > 1) {
						//console.log("monster lives");
						monsterArray[i].health = monsterArray[i].health - Math.round(granade.damage * ((granade.radius-Math.round(Math.sqrt((monsterArray[i].x-granade.x)*(monsterArray[i].x-granade.x) + (monsterArray[i].y-granade.y)*(monsterArray[i].y-granade.y))))/100));
						monsterArray[i].startledTime = timeControler.getTime();
						if(monsterArray[i].category == 1) {
							monsterArray[i].state = "startled";
						}
						else {
							monsterArray[i].state = "insane";
						}
					}
					else if((monsterArray[i].health - Math.round(granade.damage * ((granade.radius-Math.round(Math.sqrt((monsterArray[i].x-granade.x)*(monsterArray[i].x-granade.x) + (monsterArray[i].y-granade.y)*(monsterArray[i].y-granade.y))))/100))) <= 0) {
						//console.log("dead monster");
						monsterArray[i].killedBy = "granade";
						monsterArray[i].timeOfDeath = timeControler.getTime();
						archivedMonsterArray.push(monsterArray[i]);
						//Check mission state && check zombie number - if mission is exact - add to the total killed
                        monsterDrop(monsterArray[i],drops,objectArray,gameVariables);
                        missionKillCounter(missionArray,monsterArray[i],hero);
						//remove monster from active array;
						monsterArray.splice(i,1);
					}
				}

			}
			//console.log(((hero.x - granade.x)*(hero.x - granade.x) + (hero.y - granade.y)*(hero.y - granade.y)) + " < " + (granade.radius*granade.radius));
			if(((hero.x - granade.x)*(hero.x - granade.x) + (hero.y - granade.y)*(hero.y - granade.y)) < (granade.radius*granade.radius)) {
				thrownGranadeArray[thrownGranadeArray.length-1].hit = timeControler.getTime();
				if(Math.round(granade.damage * ((granade.radius-Math.round(Math.sqrt((hero.x-granade.x)*(hero.x-granade.x) + (hero.y-granade.y)*(hero.y-granade.y))))/200) > hero.health)) {
					hero.health = 0;
				}
				else {
					hero.health = hero.health - Math.round(granade.damage * ((granade.radius-Math.round(Math.sqrt((hero.x-granade.x)*(hero.x-granade.x) + (hero.y-granade.y)*(hero.y-granade.y))))/200));
				}

			}
			granade.blown = 1;
			}
			//document.getElementById("testdiv").innerHTML = "BOOM!";
		}
}

function granadeExplosion(granade) {
	if(granade.explosionExpansion > 1.30 && granade.explosionExpansionTopped == 0) {
		granade.explosionExpansion = granade.explosionExpansion - 0.03;
		//granade.explosionFade = granade.explosionFade + 0.15;
		//console.log("Expanding!");
	}
	else {
		granade.explosionExpansionTopped = 1;
		granade.explosionExpansion = granade.explosionExpansion + 0.02;
		//granade.explosionFade = granade.explosionFade - 0.15;
		//console.log("Diminishing!");
	}
	if(granade.explosionFade < 0.7 && granade.explosionFadeTopped == 0) {
		granade.explosionFade = granade.explosionFade + 0.05;
	}
	else {
		granade.explosionFadeTopped = 1;
		granade.explosionFade = granade.explosionFade - 0.02;
	}
	//console.log(granade.explosionExpansion + " " + granade.explosionFade);
}

function granadeStatus(gameArrays,gameVariables) {
	if(gameArrays.granadeArray.length > 0) {
			if(gameArrays.granadeArray[gameArrays.granadeArray.length-1].activated === 1 && gameArrays.granadeArray[gameArrays.granadeArray.length-1].inbound === 1) {
				gameArrays.granadeArray[gameArrays.granadeArray.length-1].thrown === 1;
				gameArrays.granadeArray[gameArrays.granadeArray.length-1].activationTime = new Date();
				gameArrays.granadeArray[gameArrays.granadeArray.length-1].activationTime.setTime(gameVariables.timeControler.getTime() + 500);
				gameArrays.thrownGranadeArray.push(gameArrays.granadeArray[gameArrays.granadeArray.length-1]);
				gameArrays.granadeArray.splice(gameArrays.granadeArray.length-1,1);
				recountGranade(gameArrays);

			}
			else  if(gameArrays.granadeArray[gameArrays.granadeArray.length-1].activated === 1 && gameArrays.granadeArray[gameArrays.granadeArray.length-1].inbound === 0) {
				//Reset the granade
				gameArrays.granadeArray[gameArrays.granadeArray.length-1].activated = 0;
				gameArrays.granadeArray[gameArrays.granadeArray.length-1].inbound = 1;
				gameArrays.granadeArray[gameArrays.granadeArray.length-1].x = canvas.width/2;
				gameArrays.granadeArray[gameArrays.granadeArray.length-1].y = canvas.height/2;
			}
		}
}

function throwingGranade(gameArrays) {
	if(gameArrays.granadeArray.length > 0) {
			gameArrays.granadeArray[gameArrays.granadeArray.length-1].activated = 1;
		}
}

function throwGranade(granade, hero) {
	if(granade.activated == 1) {
		if(Math.sqrt( ((canvas.width/2)-granade.x)*((canvas.width/2)-granade.x) + ((canvas.height/2)-granade.y)*((canvas.height/2)-granade.y) ) < 500) {
			//document.getElementById("testdiv").innerHTML = "throwing!";
			granade.x = Math.round(Math.cos((hero.angle-90) * Math.PI / 180) * granade.throwLength + canvas.width/2);
			granade.y = Math.round(Math.sin((hero.angle-90) * Math.PI / 180) * granade.throwLength + canvas.height/2);
			//granade.x = 500;
			//granade.y = 400;
			ctx.beginPath();
			ctx.moveTo(canvas.width/2, canvas.height/2);
			ctx.lineTo(granade.x, granade.y);
			ctx.lineWidth = 1;
			ctx.strokeStyle = 'rgba(255,255,255,0.5)';
			ctx.stroke();
			ctx.beginPath();
			ctx.arc(granade.x,granade.y,granade.radius,0,2*Math.PI);
			ctx.stroke();
			granade.throwLength = granade.throwLength + 4;
		}
		else {
			//document.getElementById("testdiv").innerHTML = "Stopped throwing";
			granade.inbound = 0;
			granade.throwLength = 0;
			}
        	}
        else {
        }
}


