function drawRotatedMonster(image, x, y, angle, sizeX, sizeY, state) {
	if(state === "idle") {
		ctx.save();
		ctx.translate(x, y);
		ctx.rotate(angle * TO_RADIANS);
		//ctx.drawImage(image, -(image.width/2), -(image.height/2),sizeX,sizeY);
		ctx.drawImage(image, -(15), -(15), sizeX, sizeY);
		ctx.restore();
	}
	else {
		ctx.save();
		ctx.translate(x, y);
		ctx.rotate(angle * TO_RADIANS);
		//ctx.drawImage(image, -(image.width/2), -(image.height/2),sizeX,sizeY);
		ctx.drawImage(image, -(15), -(15), sizeX, sizeY);
		ctx.restore();
    	}
}

function drawRotatedArrow(image,x,y,angle) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle * TO_RADIANS);
    ctx.drawImage(image, -(image.width/1), -(image.height/1),60,60);
    ctx.restore();
}

function drawRotatedImage(image, x, y, angle) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle * TO_RADIANS);
    ctx.drawImage(image, -(image.width/1), -(image.height/1),60,60);
    ctx.restore();
}

function drawRotatedFlashlight(image, x, y, angle) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle * TO_RADIANS);
    ctx.drawImage(image, -750, -750,1500,1500);
    ctx.restore();
}

function flashlightOff(width,height) {
	ctx.fillStyle = 'rgba(0,0,0,0.80)';
	ctx.fillRect(0,0,width,height);
}

function newPositionBackward(target,hero) {
	target.x -= Math.round((0-(hero.speed)) * Math.sin(hero.angle * TO_RADIANS));
	target.y += Math.round((0-(hero.speed)) * Math.cos(hero.angle * TO_RADIANS));
	//target.x -= (0-hero.speed) * Math.sin(hero.angle * TO_RADIANS);
	//target.y += (0-hero.speed) * Math.cos(hero.angle * TO_RADIANS);
}

function newPositionBackwardMonster(target,hero) {
	target.x -= (0-(hero.speed)) * Math.sin(hero.angle * TO_RADIANS);
	target.y += (0-(hero.speed)) * Math.cos(hero.angle * TO_RADIANS);
	//target.x -= (0-hero.speed) * Math.sin(hero.angle * TO_RADIANS);
	//target.y += (0-hero.speed) * Math.cos(hero.angle * TO_RADIANS);
}

function newPositionBackwardShadow(target,hero) {
	target.tileStartPointX -= Math.round(0-(hero.speed) * Math.sin(hero.angle * TO_RADIANS));
	target.tileStartPointY += Math.round(0-(hero.speed) * Math.cos(hero.angle * TO_RADIANS));
}

function bulletTrace(bullet,hero) {
	if(bullet.firedFrom === 'machete') {
		bullet.angleCount = bullet.angleCount + 1;
		bullet.bulletAngle = bullet.bulletAngle - 15;
		//console.log(bullet.bulletStartAngle);
		bullet.bulletX = Math.round(hero.x + Math.cos(bullet.bulletAngle * TO_RADIANS) * 20);
		bullet.bulletY = Math.round(hero.y + Math.sin(bullet.bulletAngle * TO_RADIANS) * 20);
	}
	else {
		bullet.bulletX -= (0-bullet.speed) * Math.sin(bullet.bulletAngle * TO_RADIANS);
		bullet.bulletY += (0-bullet.speed) * Math.cos(bullet.bulletAngle * TO_RADIANS);
	}
}

function bulletTraceMovingForward(bullet,hero) {
	if(bullet.firedFrom === 'machete') {
		bullet.bulletX -=  Math.round((hero.speed-(hero.speed)) * Math.sin(hero.angle * TO_RADIANS));
		bullet.bulletY +=  Math.round((hero.speed-(hero.speed)) * Math.cos(hero.angle * TO_RADIANS));
	}
	else {
		bullet.bulletX -= (3) * Math.sin(hero.angle * TO_RADIANS);
		bullet.bulletY += (3) * Math.cos(hero.angle * TO_RADIANS);
	}
}

function bulletTraceMovingBackward(bullet,hero) {
	if(bullet.firedFrom === 'machete') {
		bullet.bulletX -= 0 * Math.sin(hero.angle * TO_RADIANS);
		bullet.bulletY += 0 * Math.cos(hero.angle * TO_RADIANS);
	}
	else {
		bullet.bulletX -= (0-(hero.speed)) * Math.sin(hero.angle * TO_RADIANS);
		bullet.bulletY += (0-(hero.speed)) * Math.cos(hero.angle * TO_RADIANS);
	}
}

function newPositionForward(target,hero) {
	//document.getElementById("testdiv").innerHTML = document.getElementById("testdiv").innerHTML + "<br />" + "target: " + target + "| y: " + target.y;
	target.x -= Math.round((hero.speed) * Math.sin(hero.angle * TO_RADIANS));
	target.y += Math.round((hero.speed) * Math.cos(hero.angle * TO_RADIANS));
	//target.x -= hero.speed * Math.sin(hero.angle * TO_RADIANS);
	//target.y += hero.speed * Math.cos(hero.angle * TO_RADIANS);
}

function newPositionForwardMonster(target,hero) {
	//document.getElementById("testdiv").innerHTML = document.getElementById("testdiv").innerHTML + "<br />" + "target: " + target + "| y: " + target.y;
	target.x -= (hero.speed) * Math.sin(hero.angle * TO_RADIANS);
	target.y += (hero.speed) * Math.cos(hero.angle * TO_RADIANS);
	//target.x -= hero.speed * Math.sin(hero.angle * TO_RADIANS);
	//target.y += hero.speed * Math.cos(hero.angle * TO_RADIANS);
}

function newPositionForwardShadow(target,hero) {
	target.tileStartPointX -= Math.round((hero.speed) * Math.sin(hero.angle * TO_RADIANS));
	target.tileStartPointY += Math.round((hero.speed) * Math.cos(hero.angle * TO_RADIANS));
}

function runningAnimation(hero) {
	var x = timeControler.getMilliseconds();
	//Running forward
	if(hero.walking === 0 && 38 in keysDown) {
		if(x > 0 && x < 100 || x > 200 && x < 300 || x > 400 && x < 500 || x > 600 && x < 700 || x > 800 && x < 900) {
			heroImageUsed = "graphics/hero-new/hero-walking-one-" + hero.gun + ".png";
			heroImage.src = heroImageUsed;
		}
		else {
			heroImageUsed = "graphics/hero-new/hero-walking-two-" + hero.gun + ".png";
			heroImage.src = heroImageUsed;
		}
	}
	//Walking forward or Running backward
	else if(hero.walking === 1 && 38 in keysDown || hero.walking === 0 && 40 in keysDown) {
		if(x > 0 && x < 250 || x > 500 && x < 750) {
			heroImageUsed = "graphics/hero-new/hero-walking-one-" + hero.gun + ".png";
			heroImage.src = heroImageUsed;
		}
		else {
			heroImageUsed = "graphics/hero-new/hero-walking-two-" + hero.gun + ".png";
			heroImage.src = heroImageUsed;
		}

	}
	//Walking backward
	else if(hero.walking === 1 && 40 in keysDown) {
		if(x > 0 && x < 500) {
			heroImageUsed = "graphics/hero-new/hero-walking-one-" + hero.gun + ".png";
			heroImage.src = heroImageUsed;
		}
		else {
			heroImageUsed = "graphics/hero-new/hero-walking-two-" + hero.gun + ".png";
			heroImage.src = heroImageUsed;
		}
	}
}

function damageHitOnHero(afflictor,monsterHitImage,timeControler) {
	if(timeControler.getTime() < afflictor.hit + 150) {
		if(afflictor.hitOpacity < 0.9 && afflictor.hitPeaked === 0) {
		afflictor.hitOpacity = afflictor.hitOpacity + 0.2;
		ctx.globalAlpha = afflictor.hitOpacity;
		ctx.drawImage(monsterHitImage,0,0,canvas.width,canvas.width);
		ctx.globalAlpha = 1;
		}
		else {
		afflictor.hitPeaked = 1;
		afflictor.hitOpacity = afflictor.hitOpacity - 0.2;
		ctx.globalAlpha = afflictor.hitOpacity;
		ctx.drawImage(monsterHitImage,0,0,canvas.width,canvas.height);
		ctx.globalAlpha = 1;
		}
	}
	else {
	ctx.globalAlpha = 1;
	afflictor.hit = 0;
	afflictor.hitPeaked = 0;
	afflictor.hitOpacity = 0;
	}
}
