//
//	GAME STARTUP. LET'S DO THIS!
//
// Create the canvas

var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 768;	
document.getElementById("gameContainer").appendChild(canvas);

// Arrays and variables.
var backgroundArray = [];
var backgroundObjectArray = [];
var bulletArray = [];
var archivedBulletArray = [];
var archivedMonsterArray = [];
var archivedGranadeArray = [];
var numberOfLampsOnScreen = [];
var monsterArray = [];
var granadeArray = [];
var thrownGranadeArray = [];
var background = {};
var tileArray = {};
var keysDown = {};
var keyPressed = {};
var randomStartNumber = 0;
var bulletCounter = 0;
var hasFired = 0;
var timeStamp = new Date();
var timeStart = new Date();
var timeEnd = "";
var timeControler = new Date();
var setTimeState = timeControler.getSeconds() + 3;
var bgCounter = 0;
var isMade = 0;
var currentBackground = background;
var heroImageUsed = "graphics/hero-new/hero-standing-sword.png";
// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var TO_RADIANS = Math.PI/180;

//
//Images
//

//Background image
var backgroundImage = "graphics/grasstry2.png";
bgReady = true;

var monsterHitImage = new Image();
monsterHitImage.src = "graphics/monsterhit.png";
	
//Lamp image
var lampReady = false;
var lampImage = new Image();
lampImage.onload = function () {
 	 lampReady = true;
};
lampImage.src = "graphics/shadowness80.png";
 
//Explosion image
var explosionReady = false;
var explosionImage = new Image();
explosionImage.onload = function () {
	explosionReady = true;
};
explosionImage.src = "graphics/explosion3.png";

//Hero images
var heroArray = ['graphics/hero-new/hero-standing-machete.png','graphics/hero-new/hero-standing-pistol.png','graphics/hero-new/hero-standing-shotgun.png','graphics/hero-new/hero-standing-machinegun.png','graphics/hero-new/hero-standing-flamethrower.png'];
for(y=0;y<heroArray.length;y++) {
	var heroReady = false;
	var heroImage = new Image();
	heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = heroArray[y];
}

//Treasure image
var treasureReady = false;
var treasureImage = new Image();
treasureImage.onload = function () {
	treasureReady = true;
};
treasureImage.src = "graphics/star-green.png";

//Monster images
var monster1Ready = false;
var monsterImage1 = new Image();
var monster2Ready = false;
var monsterImage2 = new Image();
var monster3Ready = false;
var monsterImage3 = new Image();
	monsterImage1.onload = function () {
	monster1Ready = true;
};
monsterImage2.onload = function () {
	monster2Ready = true;
};
monsterImage3.onload = function () {
	monster3Ready = true;
};
monsterImage1.src = "graphics/monster1.png";
monsterImage2.src = "graphics/monster2.png";
monsterImage3.src = "graphics/monster3.png"; 

// Game objects
var gameDisplay  = {x: canvas.width/2, y:canvas.height/2, indexX:0, indexY:0};
var tileDisplay = {x:canvas.width/2,y:canvas.height/2};

var hero = {
	death:0,
	health:100,
	speed: 5, // movement in pixels per second
	angle:0,
	walking: 0,
	machete:1,
	lastFire:0,
	macheteDamage:13,	
	pistol:1,
	pistolDamage:35,
	machinegun:1,
	machinegunDamage:20,
	shotgun:1,
	shotgunDamage:30,
	flamethrower:1,
	flamethrowerDamage:40,
	gun: "machete",
	gunshots:75,
	machinegunshots:250,
	shotgunshots:40,
	flameshells:500,
	clip:7,
	machinegunclip:30,
	shotgunclip:8,
	scope: "no",
	armor:"no",
	infrared: "no",
	medkit:0,
	boots:"no",
	antidode:0,
	reloadDelay:0
};

var objective1 = {
	mission: 1,
	kills:40,
	discover:"door"
}

var objective2 = {
	mission: 2,
	kills:50,
	obtain:"blood"
}

var objective3 = {
	mission: 3,
	kills:50,
	save:5
}

var objective4 = {
	mission: 4,
	last:5
}

console.log(objective1.hasOwnProperty('kills'));

granadeToPlayer(200,75);
granadeToPlayer(200,75);
granadeToPlayer(200,75);

initiateBackground();
initialNineTileGameboard();
addEventListener("keydown", function (e) {keysDown[e.keyCode] = true;}, false);
addEventListener("keyup", function (e) {delete keysDown[e.keyCode]; if(hero.gun == 'pistol' || hero.gun == 'shotgun' || hero.gun == 'machete') {hasFired = 0;} else {}}, false);

// Reset the game when the player dies.
var reset = function () {
	backgroundArray = [];
	backgroundObjectArray = [];
	bulletArray = [];
	archivedBulletArray = [];
	archivedMonsterArray = [];
	archivedGranadeArray = [];
	numberOfLampsOnScreen = [];
	monsterArray = [];
	thrownGranadeArray = [];
	background = {};
	tileArray = {};
	keysDown = {};
	keyPressed = {};
	randomStartNumber = 0;
	bulletCounter = 0;
	hasFired = 0;
	timeStamp = new Date();
	timeStart = new Date();
	timeEnd = "";
	timeControler = new Date();
	setTimeState = timeControler.getSeconds() + 3;
	bgCounter = 0;
	isMade = 0;
	currentBackground = background;
	//Initiate ground-values
	hero.angle = 0;
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;
	hero.death = 0;
	background.x = 0;
	background.y = 0;
	background.width = canvas.width;
	background.height = canvas.height;
	hero.health = 100;
	//Set time-values
	//Hide buttons
	document.getElementById("gameStatistics").style.display = "none";
	initiateBackground();
	initialNineTileGameboard();
	//Initiate gameworld workings
	gameDisplay.x = canvas.width/2;
	gameDisplay.y = canvas.height/2;
	gameDisplay.indexX = 0;
	gameDisplay.indexY = 0;
	tileDisplay.x = canvas.width/2;
	tileDisplay.y = canvas.height/2;
};

// Update game objects
var update = function (modifier) {
	if(hero.death == 0) {
	timeControler = new Date();
	if(hero.angle > 360) {
		hero.angle = 0;
	}
	else if(hero.angle <0) {
		hero.angle = 360;
	}
	if (38 in keysDown) { // Player holding up
		//runningAnimation();
		if(hero.walking == '1') {
			hero.speed = 3;
		}
		else {
			hero.speed = 7;
		}
		newPositionBackward(gameDisplay);
		newPositionBackward(tileDisplay);
		for(u=0;u<monsterArray.length;u++) {
			newPositionForwardMonster(monsterArray[u]);
		}
		for(n=0;n<thrownGranadeArray.length;n++) {
			newPositionForward(thrownGranadeArray[n]);
		}
		newPositionForward(background);
		for(h=0;h<numberOfLampsOnScreen.length;h++) {
			newPositionForward(numberOfLampsOnScreen[h]);
			newPositionForwardShadow(numberOfLampsOnScreen[h]);
		}
		for(h=0;h<backgroundArray.length;h++) {
			//document.getElementById("testdiv").innerHTML = document.getElementById("testdiv").innerHTML + "<br />" + "updating pos UP";
			newPositionForward(backgroundObjectArray[h]);
		}
		for(f=0;f<bulletArray.length;f++) {
			//document.getElementById("testdiv").innerHTML = document.getElementById("testdiv").innerHTML + "<br />" + "updating pos UP";
			bulletTraceMovingForward(bulletArray[f]);
		}
	}
	else {
		heroImageUsed = "graphics/hero-new/hero-standing-" + hero.gun + ".png";
		heroImage.src = heroImageUsed;
	}
	
	if ( 16 in keysDown) {
		hero.walking = 1;
	}
	else {
		hero.walking = 0;
	}
	if (40 in keysDown) { // Player holding down
		//runningAnimation();
		if(hero.walking == '1') {
			hero.speed = 1;
		}
		else {
			hero.speed = 3;
		}
		newPositionForward(gameDisplay);
		newPositionForward(tileDisplay);
		for(u=0;u<monsterArray.length;u++) {
			newPositionBackwardMonster(monsterArray[u]);
		}
		for(n=0;n<thrownGranadeArray.length;n++) {
			newPositionBackward(thrownGranadeArray[n]);
		}
		newPositionBackward(background);
		for(h=0;h<numberOfLampsOnScreen.length;h++) {
			newPositionBackward(numberOfLampsOnScreen[h]);
			newPositionBackwardShadow(numberOfLampsOnScreen[h]);
		}
		for(h=0;h<backgroundArray.length;h++) {
			//document.getElementById("testdiv").innerHTML = document.getElementById("testdiv").innerHTML + "<br />" + "updating pos DOWN";
			newPositionBackward(backgroundObjectArray[h]);
		}
		for(f=0;f<bulletArray.length;f++) {
			//document.getElementById("testdiv").innerHTML = document.getElementById("testdiv").innerHTML + "<br />" + "updating pos DOWN";
			bulletTraceMovingBackward(bulletArray[f]);
		}
		//monster.y -= hero.speed * modifier;
		
	}
	if (37 in keysDown) { // Player holding left
		if(hero.walking == '1') {
		hero.angle -= 1;
		}
		else {
		hero.angle -= 2.5;
		}
		
	}
	if (39 in keysDown) { // Player holding right
		if(hero.walking == '1') {
		hero.angle += 1;
		}
		else {
		hero.angle += 2.5;
		}
	}
	
	if (82 in keysDown) { //Reload
		//console.log(timeControler.getTime() + " > " + hero.reloadDelay);
		if(hero.gun == 'pistol' && timeControler.getTime() > hero.reloadDelay + 550) {
			if(hero.gunshots >= 7) {
				hero.gunshots = hero.gunshots - (7-hero.clip);
				hero.clip = 7;
			}
			else if(hero.gunshots < 7 && hero.gunshots > 0) {
				for(y=0;y<7;y++) {
					if(hero.gunshots > 0 && hero.clip < 7) {
						hero.clip = hero.clip + 1;
						hero.gunshots = hero.gunshots -1;
					}
				}
			}
			else if(hero.gunshots <= 0) {
			}
			hero.reloadDelay = timeControler.getTime();
			
		}
		else if(hero.gun == 'machinegun' && timeControler.getTime() > hero.reloadDelay + 1050) {
			if(hero.machinegunshots >= 30) {
				hero.machinegunshots = hero.machinegunshots - (30-hero.machinegunclip);
				hero.machinegunclip = 30;
			}
			else if(hero.machinegunshots < 30 && hero.machinegunshots > 0) {
				for(y=0;y<30;y++) {
					if(hero.machinegunshots > 0 && hero.machinegunclip < 30) {
						hero.machinegunclip = hero.machinegunclip + 1;
						hero.machinegunshots = hero.machinegunshots -1;
					}
				}
			}
			else if(hero.machinegunshots <= 0) {
			}
			hero.reloadDelay = timeControler.getTime();
		}
		else if(hero.gun == 'shotgun' && timeControler.getTime() > hero.reloadDelay + 2050) {
			if(hero.shotgunshots >= 8) {
				hero.shotgunshots = hero.shotgunshots - (8-hero.shotgunclip);
				hero.shotgunclip = 8;
			}
			else if(hero.shotgunshots < 8 && hero.shotgunshots > 0) {
				for(y=0;y<80;y++) {
					if(hero.shotgunshots > 0 && hero.shotgunclip < 8) {
						hero.shotgunclip = hero.shotgunclip + 1;
						hero.shotgunshots = hero.shotgunshots -1;
					}
				}
			}
			else if(hero.machinegunshots <= 0) {
			}
			hero.reloadDelay = timeControler.getTime();
		}
	}
	if(17 in keysDown) { //Granade throw
		if(granadeArray.length > 0) {

			granadeArray[granadeArray.length-1].activated = 1;
			//document.getElementById("testdiv").innerHTML = granadeArray[granadeArray.length-1].activated;
		}
	}
	else {
		if(granadeArray.length > 0) {
			//document.getElementById("testdiv").innerHTML = "CTRL NOT DOWN!" + granadeArray[granadeArray.length-1].activated + granadeArray[granadeArray.length-1].inbound;
			if(granadeArray[granadeArray.length-1].activated == 1 && granadeArray[granadeArray.length-1].inbound == 1) {
				//document.getElementById("testdiv").innerHTML = "YES!WORKED!";
				granadeArray[granadeArray.length-1].thrown == 1;
				granadeArray[granadeArray.length-1].activationTime = new Date();
				granadeArray[granadeArray.length-1].activationTime.setTime(timeControler.getTime() + 500);
				thrownGranadeArray.push(granadeArray[granadeArray.length-1]);
				granadeArray.splice(granadeArray.length-1,1);
				
			}
			else  if(granadeArray[granadeArray.length-1].activated == 1 && granadeArray[granadeArray.length-1].inbound == 0) {
				//Reset the granade
				granadeArray[granadeArray.length-1].activated = 0;
				granadeArray[granadeArray.length-1].inbound = 1;
				granadeArray[granadeArray.length-1].x = canvas.width/2;
				granadeArray[granadeArray.length-1].y = canvas.height/2;
			}	
		}
	}
	
	if(49 in keysDown && hero.machete == '1') {
		hero.gun = 'machete';
	}
	if(50 in keysDown && hero.pistol == '1') {
		hero.gun = 'pistol';
	}
	if(51 in keysDown && hero.shotgun == '1') {
		hero.gun = 'shotgun';
	}
	if(52 in keysDown && hero.machinegun == '1') {
		hero.gun = 'machinegun';
	}
	if(53 in keysDown && hero.flamethrower == '1') {
		hero.gun = 'flamethrower';
	}
	
	
	if(32 in keysDown && hasFired == '0'){ //Shoot
			if(hero.gun == 'pistol' && hero.clip > 0) {
				delete keysDown[32];
				hasFired = 1;
				hero.clip = hero.clip - 1;
				bulletFire(hero.pistolDamage);
				}
			else if(hero.gun == 'machinegun' && hero.machinegunclip > 0) {
				hero.machinegunclip = hero.machinegunclip - 1;
				hasFired = 0;
				bulletFire(hero.machinegunDamage);
			}
			else if(hero.gun == 'shotgun' && hero.shotgunclip > 0 && timeControler.getTime() > hero.lastFire + 350) {
				delete keysDown[32];
				hero.lastFire = timeControler.getTime();
				hasFired = 1;
				hero.shotgunclip = hero.shotgunclip - 1;
				for(p=0;p<8;p++) {
				bulletFire(hero.shotgunDamage);
				}
			}
			else if(hero.gun == 'flamethrower' && hero.flameshells > 0) {
				hero.flameshells = hero.flameshells - 1;
				hasFired = 0;
				bulletFire(hero.flamethrowerDamage);
			}
			else if(hero.gun == 'machete' && timeControler.getTime() > hero.lastFire + 200) {
				delete keysDown[32];
				hero.lastFire = timeControler.getTime();
				hasFired = 1;
				bulletFire(hero.macheteDamage);
			}
			else {
			//hasFired = 1;
			}
		}
		else {
	}
	for(i=0;i<bulletArray.length;i++) {

		for(l=0;l<monsterArray.length;l++) {
			try {
		//((monster.x - granade.x)*(monster.x - granade.x) + (monster.y - granade.y)*(monster.y - granade.y)) < granade.radius*granade.radius
		//console.log((bulletArray[i].bulletX - monsterArray[l].x) * (bulletArray[i].bulletX - monsterArray[l].x) + (bulletArray[i].bulletY - monsterArray[l].y)*(bulletArray[i].bulletY - monsterArray[l].y) + " < " + 15*15);
		if((bulletArray[i].bulletX - monsterArray[l].x) * (bulletArray[i].bulletX - monsterArray[l].x) + (bulletArray[i].bulletY - monsterArray[l].y)*(bulletArray[i].bulletY - monsterArray[l].y) < 15*15) {
			bulletArray[i].bulletHit = 1;
		//if(bulletArray[i].bulletX <= (monsterArray[l].x + 30) && monsterArray[l].x <= (bulletArray[i].bulletX) && bulletArray[i].bulletY <= (monsterArray[l].y + 30) && monsterArray[l].y <= (bulletArray[i].bulletY)) {
				if(monsterArray[l].health-bulletArray[i].bulletDamage > 1) {
					monsterArray[l].health = monsterArray[l].health-bulletArray[i].bulletDamage;
					if(monsterArray[l].state != "attacking" || monsterArray[l].state != "startled") {
						monsterArray[l].startledTime = timeControler.getTime();
						monsterArray[l].state = "startled";
					}
					else {
					}
					//document.getElementById("testdiv").innerHTML = "Monster health: " + monsterArray[l].health;
				}
				else if(monsterArray[l].health-bulletArray[i].bulletDamage <= 0) {
					//document.getElementById("testdiv").innerHTML = "Monster dead!";
					monsterArray[l].killedBy = bulletArray[i].firedFrom;
					archivedMonsterArray.push(monsterArray[l]);
					monsterArray.splice(l,1);
				}
				if(bulletArray[i].firedFrom == 'machete') {
					if(bulletArray[i].bulletDamage < 2) {
					}
					else {
					bulletArray[i].bulletDamage = bulletArray[i].bulletDamage - 1;
					}
				}
				else {
					archivedBulletArray.push(bulletArray[i]);
					bulletArray.splice(i,1);
				}
			}
		else {
		}
		}
		catch(err) {
			//Monster dead or bullet hit something and removed.
			}
		}
	}
	
	for(g=0;g<monsterArray.length;g++) {
		monsterState(monsterArray[g]);
		monsterStateRevision(monsterArray[g]);
	}

	// Are they touching?
	for(b=0;b<monsterArray.length;b++) {
		if (hero.x <= (monsterArray[b].x + 18) && monsterArray[b].x <= (hero.x + 18) && hero.y <= (monsterArray[b].y + 18) && monsterArray[b].y <= (hero.y + 18)) {
			if(monsterArray[b].attackIni == 0) {
				monsterArray[b].attackIni = 1;
				//console.log("First touch!");
				monsterArray[b].attackTime = new Date();
				monsterArray[b].attackTime.setMilliseconds(timeControler.getMilliseconds() + monsterArray[b].damageInterval);
				//console.log("Starting " + timeControler.getTime() + " " + monsterArray[b].attackTime.getTime());
			}
			else if(monsterArray[b].attackIni == 1 && timeControler.getTime() >= monsterArray[b].attackTime.getTime()) {
				monsterArray[b].hit = timeControler.getTime();
				if(monsterArray[b].damage > hero.health) {
					hero.health = 0;
				}
				else {
					hero.health = hero.health - monsterArray[b].damage;
				}
				monsterArray[b].attackIni = 0;
			}
			else if(monsterArray[b].attackIni == 1 && timeControler.getTime() < monsterArray[b].attackTime.getTime()) {
				//console.log("Already touching tounching, waiting! " + timeControler.getTime() + " " + monsterArray[b].attackTime.getTime());
			}
		}
		else {
			//console.log("Not touching anymore!");
			monsterArray[b].attackIni = 0;
		}
	}
	mapControl();
	}
	else {
	}
};

// Draw everything
var render = function () {
	ctx.fillStyle = 'rgba(0,0,0,0.5)';
	//document.getElementById("testdiv2").innerHTML = monsterArray;
	if (bgReady) {
		for(y=0;y<backgroundArray.length;y++) {
			//ctx.globalAlpha = 0.1; // - spændende effekt, kan måske bruges ved poisoned?
			ctx.drawImage(backgroundArray[y], backgroundObjectArray[y].x, backgroundObjectArray[y].y,canvas.width,canvas.height);
			//document.getElementById("testdiv").innerHTML = document.getElementById("testdiv").innerHTML + "<br />" + backgroundArray[0].y + " " + bgCounter + " " + isMade;
		}
	}
	if (heroReady) {
		drawRotatedImage(heroImage, hero.x, hero.y, hero.angle);
	}	
	if (monster1Ready && monster2Ready & monster3Ready) {
		for(j=0;j<monsterArray.length;j++) {
			if(monsterArray[j].skin == 1) {
				drawRotatedMonster(monsterImage1, monsterArray[j].x, monsterArray[j].y, monsterArray[j].angle-180,30,30);
			}
			else if(monsterArray[j].skin == 2) {
				drawRotatedMonster(monsterImage2, monsterArray[j].x, monsterArray[j].y, monsterArray[j].angle-180,30,30);
			}
			else if(monsterArray[j].skin == 3) {
				drawRotatedMonster(monsterImage3, monsterArray[j].x, monsterArray[j].y, monsterArray[j].angle-180,30,30);
			}
			else {
			}
		}
	}
	if (lampReady) {
		for(y=0;y<numberOfLampsOnScreen.length;y++) {
			if(numberOfLampsOnScreen[y].on == '1') {
			ctx.drawImage(lampImage, numberOfLampsOnScreen[y].x, numberOfLampsOnScreen[y].y,numberOfLampsOnScreen[y].radius,numberOfLampsOnScreen[y].radius);
			//ctx.fillText(y+1,numberOfLampsOnScreen[y].x+150,numberOfLampsOnScreen[y].y+150);
			//ctx.strokeText(y+1,numberOfLampsOnScreen[y].x+150,numberOfLampsOnScreen[y].y+150);
			drawTileShadow(numberOfLampsOnScreen[y].tileStartPointX,numberOfLampsOnScreen[y].tileStartPointY,numberOfLampsOnScreen[y].x,numberOfLampsOnScreen[y].y,numberOfLampsOnScreen[y].radius);
			//document.getElementById("testdiv2").innerHTML = document.getElementById("testdiv2").innerHTML + "<br />" + y + ": Drawn at: " + numberOfLampsOnScreen[y].x + "|" +  numberOfLampsOnScreen[y].y;
			}
			else {
				ctx.fillStyle = 'rgba(0,0,0,0.8)';
				ctx.fillRect(numberOfLampsOnScreen[y].tileStartPointX,numberOfLampsOnScreen[y].tileStartPointY,canvas.width,canvas.height);
			}
		}
	}
	for(n=0;n<monsterArray.length;n++) {
		if(monsterArray[n].hit != 0) {
			damageHitOnHero(monsterArray[n]);
		}
	}
	for(c=0;c<thrownGranadeArray.length;c++) {
		if(thrownGranadeArray[c].hit != 0) {
			damageHitOnHero(thrownGranadeArray[c]);
		}
	}
	
	var bestMessage = gameDisplay.indexX + "|" + gameDisplay.indexY + "<br />";
	for(x=0;x<numberOfLampsOnScreen.length;x++) {
		bestMessage = bestMessage + numberOfLampsOnScreen[x].x + "|" + numberOfLampsOnScreen[x].y + "<br />";
	}
	//document.getElementById("testdiv").innerHTML = bestMessage;
	// Score
	ctx.fillStyle = 'rgba(255,255,255,1)';
	//Lamp
	//document.getElementById("testdiv2").innerHTML = "x: " + gameDisplay.indexX + " |  y: " + gameDisplay.indexY + "<br />" + numberOfLampsOnScreen[0].x + "." + numberOfLampsOnScreen[0].y;
	//darknessControl(0.95,300);
	for(g=0;g<bulletArray.length;g++) {
		//console.log(bulletArray[g].firedFrom);
		if(bulletArray[g].firedFrom == 'flamethrower') {
			if(Math.sqrt(Math.pow((bulletArray[g].bulletX-hero.x),2) + Math.pow((bulletArray[g].bulletY-hero.y),2)) > 150) {
				archivedBulletArray.push(bulletArray[g]);
				bulletArray.splice(g,1);
			}
			else {
				bulletTrace(bulletArray[g]);
				ctx.beginPath();
				ctx.lineWidth = 3;
				ctx.strokeStyle = 'rgba(255,230,87,0.7)';
				ctx.arc(bulletArray[g].bulletX,bulletArray[g].bulletY,5,0,2*Math.PI);
				ctx.stroke();
				ctx.beginPath();
				ctx.lineWidth = 6;
				ctx.strokeStyle = 'rgba(255,100,100,0.6)';
				ctx.arc(bulletArray[g].bulletX,bulletArray[g].bulletY,3,0,2*Math.PI);
				ctx.stroke();
				ctx.beginPath();
				ctx.strokeStyle = 'rgba(186,90,58,0.3)';
				ctx.arc(bulletArray[g].bulletX,bulletArray[g].bulletY,7,0,2*Math.PI);
				ctx.stroke();
				ctx.beginPath();
				ctx.lineWidth = 12;
				ctx.strokeStyle = 'rgba(100,100,100,0.2)';
				ctx.arc(bulletArray[g].bulletX,bulletArray[g].bulletY,9,0,2*Math.PI);
				ctx.stroke();
				ctx.lineWidth = 1;
				ctx.fillRect(bulletArray[g].bulletX,bulletArray[g].bulletY,1,1);
				bulletTraceFade(bulletArray[g]);
			}
			
		}
		else if(bulletArray[g].firedFrom == 'machete') {
			if(bulletArray[g].angleCount < 10) {
					bulletTrace(bulletArray[g]);
					ctx.globalAlpha = 0.7;
				 	var opposedAngle = (Math.atan2(hero.y - bulletArray[g].bulletY, hero.x - bulletArray[g].bulletX) * 180 / Math.PI) - 90;				 	
				 	var swordSwingFromBulletX = "";
				 	var swordSwingFromBulletY = "";
				 	var swordStartPointX = Math.round(Math.cos((opposedAngle -90) * Math.PI / 180) * 10 + hero.x);
				 	var swordStartPointY = Math.round(Math.sin((opposedAngle -90) * Math.PI / 180) * 10 + hero.y);
				 	var color = 0;
				 	var visibility = 0;
				 	var bestcolor = 'rgba('+ color + ',' + color + ',' + color + ',' + visibility + ')';
				 	
				 	for(x=0;x<240;x++) {
				 	swordSwingFromBulletX = Math.round(bulletArray[g].bulletX + Math.cos((opposedAngle-x) * TO_RADIANS) * 10);//(x/2));
				 	swordSwingFromBulletY = Math.round(bulletArray[g].bulletY + Math.sin((opposedAngle-x) * TO_RADIANS) * 10);//(x/2));				 	
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
			else {
				archivedBulletArray.push(bulletArray[g]);
				bulletArray.splice(g,1);
			}
			ctx.globalAlpha = 1;
		}
		else {
			//console.log(bulletArray[g].bulletX);
			if(Math.sqrt(Math.pow((bulletArray[g].bulletX-hero.x),2) + Math.pow((bulletArray[g].bulletY-hero.y),2)) > 800) {
				archivedBulletArray.push(bulletArray[g]);
				bulletArray.splice(g,1);
			}
			else {
				bulletTrace(bulletArray[g]);
				ctx.fillStyle = 'rgba(255,255,255,1)';
				ctx.fillRect(bulletArray[g].bulletX,bulletArray[g].bulletY,1,1);
				bulletTraceFade(bulletArray[g]);
			}
		}
	}
	lazerScope();
	//ctx.fillStyle = 'rgba(255,255,255,1)';
	//ctx.fillRect(5,5 , 50, 50);
	//Information to divs
	if(hero.gun == "pistol") {
		document.getElementById("gameClip").innerHTML = "<strong>" + hero.clip + "</strong>" + " / " + hero.gunshots;
	}
	else if(hero.gun == 'machete') {
		document.getElementById("gameClip").innerHTML = "<strong>" + "&infin;" + "</strong>";
	}
	else if(hero.gun == "machinegun") {
		document.getElementById("gameClip").innerHTML = "<strong>" + hero.machinegunclip + "</strong>" + " / " + hero.machinegunshots;
	}
	else if(hero.gun == "shotgun") {
		document.getElementById("gameClip").innerHTML = "<strong>" + hero.shotgunclip + "</strong>" + " / " + hero.shotgunshots;
	}
	else if(hero.gun == "flamethrower") {
		document.getElementById("gameClip").innerHTML = "<strong>" + hero.flameshells + "</strong>";
	}
	else {
	}
	if(hero.health < 25) {
		document.getElementById("gameHealth").className = "gameHealth lowHealth";
	}
	else {
		document.getElementById("gameHealth").className = "gameHealth";
	}
	document.getElementById("gameHealth").innerHTML = hero.health;
	if(hero.health <= 0) {
		hero.death = 1;
		hero.health = 0;
		monsterArray = [];
		granadeArray = [];
		timeEnd = new Date();
		ctx.fillStyle = 'rgba(255,255,255,1)';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = 'rgba(0,0,0,1)';
		ctx.font = "50px Lato";
		ctx.fillText("Game over!",(canvas.width/2)-(canvas.width/100*15),(canvas.height/2)-(canvas.height/100*20));
		showStatistics();
		document.getElementById("gameClip").innerHTML = "";
		document.getElementById("gameHealth").innerHTML = "";	
	}
	for(y=0;y<granadeArray.length;y++) {
		throwGranade(granadeArray[y]);
	}
	for(j=0;j<thrownGranadeArray.length;j++) {
		thrownGranade(thrownGranadeArray[j]);                                                                                           
	}
	for(y=0;y<monsterArray.length;y++) {
		displayMonsterHealth(monsterArray[y]);
	}
	for(y=0;y<thrownGranadeArray.length;y++) {
		if(thrownGranadeArray[y].explosion == 1) {
			//console.log(timeControler.getTime() + ">" + thrownGranadeArray[y].explosionTime);
			ctx.globalAlpha = thrownGranadeArray[y].explosionFade;
			ctx.drawImage(explosionImage, thrownGranadeArray[y].x-(125/thrownGranadeArray[y].explosionExpansion),thrownGranadeArray[y].y-(125/thrownGranadeArray[y].explosionExpansion),(250/thrownGranadeArray[y].explosionExpansion),(250/thrownGranadeArray[y].explosionExpansion));
			ctx.globalAlpha = 1;
			granadeExplosion(thrownGranadeArray[y]);
			if(timeControler.getTime() > thrownGranadeArray[y].explosionTime) {;
			archivedGranadeArray.push(thrownGranadeArray[thrownGranadeArray.length-1]);
			thrownGranadeArray.splice(thrownGranadeArray[thrownGranadeArray.length-1],1);
			}
		}
	}
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

function newPositionForward(target) {
	//document.getElementById("testdiv").innerHTML = document.getElementById("testdiv").innerHTML + "<br />" + "target: " + target + "| y: " + target.y;
	target.x -= Math.round((hero.speed) * Math.sin(hero.angle * TO_RADIANS));
	target.y += Math.round((hero.speed) * Math.cos(hero.angle * TO_RADIANS));
	//target.x -= hero.speed * Math.sin(hero.angle * TO_RADIANS);
	//target.y += hero.speed * Math.cos(hero.angle * TO_RADIANS);
}

function newPositionForwardMonster(target) {
	//document.getElementById("testdiv").innerHTML = document.getElementById("testdiv").innerHTML + "<br />" + "target: " + target + "| y: " + target.y;
	target.x -= (hero.speed) * Math.sin(hero.angle * TO_RADIANS);
	target.y += (hero.speed) * Math.cos(hero.angle * TO_RADIANS);
	//target.x -= hero.speed * Math.sin(hero.angle * TO_RADIANS);
	//target.y += hero.speed * Math.cos(hero.angle * TO_RADIANS);
}

function newPositionForwardShadow(target) {
	target.tileStartPointX -= Math.round((hero.speed) * Math.sin(hero.angle * TO_RADIANS));
	target.tileStartPointY += Math.round((hero.speed) * Math.cos(hero.angle * TO_RADIANS));
}

function runningAnimation() {
	var x = timeControler.getMilliseconds();
	//Running forward
	if(hero.walking == 0 && 38 in keysDown) {
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
	else if(hero.walking == 1 && 38 in keysDown || hero.walking == 0 && 40 in keysDown) {
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
	else if(hero.walking == 1 && 40 in keysDown) {
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

function lazerScope() {
	if(hero.scope == "yes") {
	var lazerScopeX = canvas.width/2;
	var lazerScopeY = canvas.height/2;
	for(x=0;x<40;x++) {
		if(x<20) {
		}
		else {
	lazerScopeX += (0+x) * Math.sin(hero.angle * TO_RADIANS);
	lazerScopeY -= (0+x) * Math.cos(hero.angle * TO_RADIANS);
	ctx.fillStyle = 'rgba(255,0,0,0.5)';
	ctx.fillRect(lazerScopeX,lazerScopeY,1,1);
	ctx.fillRect(lazerScopeX+1,lazerScopeY,1,1);
	ctx.fillRect(lazerScopeX,lazerScopeY+1,1,1);
		}
	}
	}
}

function throwGranade(granade) {
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

function damageHitOnHero(afflictor) {
	if(timeControler.getTime() < afflictor.hit + 150) {
		if(afflictor.hitOpacity < 0.9 && afflictor.hitPeaked == 0) {
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

function thrownGranade(granade) {
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
						monsterArray[i].state = "startled";	
					}
					else if((monsterArray[i].health - Math.round(granade.damage * ((granade.radius-Math.round(Math.sqrt((monsterArray[i].x-granade.x)*(monsterArray[i].x-granade.x) + (monsterArray[i].y-granade.y)*(monsterArray[i].y-granade.y))))/100))) <= 0) {
						//console.log("dead monster");
						monsterArray[i].killedBy = "granade";
						archivedMonsterArray.push(monsterArray[i]);
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

function newPositionBackward(target) {
	target.x -= Math.round((0-(hero.speed)) * Math.sin(hero.angle * TO_RADIANS));
	target.y += Math.round((0-(hero.speed)) * Math.cos(hero.angle * TO_RADIANS));
	//target.x -= (0-hero.speed) * Math.sin(hero.angle * TO_RADIANS);
	//target.y += (0-hero.speed) * Math.cos(hero.angle * TO_RADIANS);
}

function newPositionBackwardMonster(target) {
	target.x -= (0-(hero.speed)) * Math.sin(hero.angle * TO_RADIANS);
	target.y += (0-(hero.speed)) * Math.cos(hero.angle * TO_RADIANS);
	//target.x -= (0-hero.speed) * Math.sin(hero.angle * TO_RADIANS);
	//target.y += (0-hero.speed) * Math.cos(hero.angle * TO_RADIANS);
}

function newPositionBackwardShadow(target) {
	target.tileStartPointX -= Math.round(0-(hero.speed) * Math.sin(hero.angle * TO_RADIANS));
	target.tileStartPointY += Math.round(0-(hero.speed) * Math.cos(hero.angle * TO_RADIANS));
}

function bulletTrace(bullet) {
	if(bullet.firedFrom == 'machete') {
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

function bulletTraceMovingForward(bullet) {
	if(bullet.firedFrom == 'machete') {
		bullet.bulletX -=  Math.round((hero.speed-(hero.speed)) * Math.sin(hero.angle * TO_RADIANS));
		bullet.bulletY +=  Math.round((hero.speed-(hero.speed)) * Math.cos(hero.angle * TO_RADIANS));
	}
	else {
		bullet.bulletX -= (3) * Math.sin(hero.angle * TO_RADIANS); 
		bullet.bulletY += (3) * Math.cos(hero.angle * TO_RADIANS);
	}
}

function bulletTraceMovingBackward(bullet) {
	if(bullet.firedFrom == 'machete') {
		bullet.bulletX -= 0 * Math.sin(hero.angle * TO_RADIANS); 
		bullet.bulletY += 0 * Math.cos(hero.angle * TO_RADIANS);
	}
	else {
		bullet.bulletX -= (0-(hero.speed)) * Math.sin(hero.angle * TO_RADIANS); 
		bullet.bulletY += (0-(hero.speed)) * Math.cos(hero.angle * TO_RADIANS);
	}
}

function monsterState(monster) {
	if(monster.state == "idle") {
		//document.getElementById("testdiv2").innerHTML = timeControler.getSeconds() + " < " + setTimeState + " " + monster.angle + " --- " + hero.angle;
		if(timeControler.getSeconds() < setTimeState) {
			monster.angle = monster.angle + (Math.round((Math.random() * 2) - 1))*5;
			monster.x -= (monster.speed/12) * Math.sin(monster.angle * TO_RADIANS);
			monster.y += (monster.speed/12) * Math.cos(monster.angle * TO_RADIANS);
		}
		else {
			if(setTimeState >= 60) {
				setTimeState = Math.round(0 + ((Math.random() * 3) - 0));
			}
			else {
				setTimeState = Math.round(timeControler.getSeconds() + ((Math.random() * 3) - 0));
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
		if(timeControler.getTime() < monster.startledTime + 6050) {
			if (hero.x <= (monster.x + 18) && monster.x <= (hero.x + 18) && hero.y <= (monster.y + 18) && monster.y <= (hero.y + 18)) {
		}
		else {
			monster.angle = (Math.atan2(hero.y-10 - monster.y, hero.x-10 - monster.x) * 180 / Math.PI) - 90;
			monster.x -= (monster.speed/1.5) * Math.sin(monster.angle * TO_RADIANS);
			monster.y += (monster.speed/1.5) * Math.cos(monster.angle * TO_RADIANS);
		}
		}
		else if(timeControler.getTime() > monster.startledTime + 6050) {
			monster.state = "idle";	
		}
		else {
		}
		
	}
	else if(monster.state == "insane") {
	}
	//document.getElementById("testdiv2").innerHTML = timeControler.getMilliseconds();
}

function monsterStateRevision(monster) {
	//document.getElementById("testdiv2").innerHTML = Math.sqrt((monster.x-400)*(monster.x-400) + (monster.y-300)*(monster.y-300)) + " " + monster.state + " " + monster.angle;
	if(monster.state == "startled") {
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
	if(hero.gun == "pistol") {
	ctx.fillStyle = 'rgba(0,' + blueFiler + ',255,' + opacityFiler + ')';
	ctx.fillRect(bulletX,bulletY,1,1);
	ctx.fillRect(bulletX-1,bulletY,1,1);
	ctx.fillRect(bulletX,bulletY-1,1,1);
	ctx.fillRect(bulletX+1,bulletY,1,1);
	ctx.fillRect(bulletX,bulletY+1,1,1);
	}
	else if(bullet.firedFrom == "flamethrower") {
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
	else if(bullet.firedFrom == "machinegun") {
	ctx.fillStyle = 'rgba(255,0,0' + ',' + opacityFiler + ')';
	ctx.fillRect(bulletX,bulletY,1,1);
	}
	else if(bullet.firedFrom == "shotgun") {
	ctx.fillStyle = 'rgba(255,255,0' + ',' + opacityFiler + ')';
	ctx.fillRect(bulletX,bulletY,1,1);	
	}
	else {
	}
}
}

function fixThisLampShit(coreX, coreY) {
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
		if(arrayOfNewAdditions[g].x == numberOfLampsOnScreen[l].indexX && arrayOfNewAdditions[g].y == numberOfLampsOnScreen[l].indexY) {
			realityStatus = false;
			//document.getElementById("testdiv2").innerHTML = document.getElementById("testdiv2").innerHTML + "POSITIVE! <br />";
		}
		}
	if(realityStatus == true) {
		//Tilføj lampe
		addLampToScreenArrayVersion2(arrayOfNewAdditions[g].x,arrayOfNewAdditions[g].y, arrayOfNewAdditions[g].startPointX, arrayOfNewAdditions[g].startPointY,300);
		//Tilføj monstre indenfor det givne område!
		var randomNumber = Math.round(Math.random() * 1 + 3);
		for(x=0;x<randomNumber;x++) {
			spawnMonster(arrayOfNewAdditions[g].startPointX, arrayOfNewAdditions[g].startPointY,20,500,100,100,1);
		}
		//Sæt område-type (skov, by, mark)
		
		//Fyr opdelings-algoritme af
		
		//Tilføj område-elementer baseret på algoritme
		
		//Tilføj artistic scenery
	}
	else {
	}
	realityStatus = true;
}
}

function drawTileShadow(tileStartPointX, tileStartPointY, lightX,lightY,radius) {
	ctx.globalAlpha = 1;
	ctx.fillStyle = 'rgba(0,0,0,0.80)';
	var imageLength = radius;
	var canvasLength = canvas.width;
	var canvasHeight = canvas.height;	
	ctx.fillRect(tileStartPointX,tileStartPointY , lightX-tileStartPointX, lightY-tileStartPointY);
	ctx.fillRect(lightX,tileStartPointY ,imageLength, lightY-tileStartPointY);
	ctx.fillRect(lightX+imageLength,tileStartPointY, canvasLength-(lightX-tileStartPointX+imageLength), lightY-tileStartPointY);
	ctx.fillRect(tileStartPointX,lightY, lightX-tileStartPointX, imageLength);
	ctx.fillRect(lightX+imageLength,lightY, canvasLength-(lightX-tileStartPointX+imageLength), imageLength);
	ctx.fillRect(tileStartPointX,lightY+imageLength, lightX-tileStartPointX, canvasHeight-(lightY-tileStartPointY+imageLength));
	ctx.fillRect(lightX,lightY+imageLength , imageLength, canvasHeight-(lightY-tileStartPointY+imageLength));
	ctx.fillRect(lightX+imageLength,lightY+imageLength , canvasLength-(lightX-tileStartPointX+imageLength), canvasHeight-(lightY-tileStartPointY+imageLength));
}

function displayMonsterHealth(monster) {
	try {
		if(monster.state != 'idle' || monster.health < monster.fullHealth) {
			if(monster.health > monster.fullHealth/100*80) {
				ctx.fillStyle ='rgba(22,255,5,1)';
				ctx.fillRect(monster.x-15,monster.y-25,25*(monster.health/monster.fullHealth),2);
			}
			else if(monster.health <= monster.fullHealth/100*80 && monster.health > monster.fullHealth/100*60) {
				ctx.fillStyle = 'rgba(255,183,5,1)';
				ctx.fillRect(monster.x-15,monster.y-25,25*(monster.health/monster.fullHealth),2);
			}
			else if(monster.health <= monster.fullHealth/100*60 && monster.health > monster.fullHealth/100*40) {
				ctx.fillStyle = 'rgba(255,135,5,1)';
				ctx.fillRect(monster.x-15,monster.y-25,25*(monster.health/monster.fullHealth),2);
			}
			else if(monster.health <= monster.fullHealth/100*40 && monster.health > monster.fullHealth/100*20) {
				ctx.fillStyle = 'rgba(255,98,5,1)';
				ctx.fillRect(monster.x-15,monster.y-25,25*(monster.health/monster.fullHealth),2);
			}
			else if(monster.health <= monster.fullHealth/100*20 && monster.health > monster.fullHealth/100*0) {
				ctx.fillStyle = 'rgba(255,41,5,1)'
				ctx.fillRect(monster.x-15,monster.y-25,25*(monster.health/monster.fullHealth),2);
			}
	}
	}
	catch(err) {
	}
}

function addLampToScreenArrayVersion2(indexXX,indexYY,startPointX,startPointY,radius) {
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

function spawnMonster(xStart, yStart,damage,damageInterval,health,fullHealth,category) {
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
		speed: 6,
		angle:(Math.random() * 360 - 0),
		state:"idle",
		category: category,
		fullHealth:fullHealth,
		health: health,
		timeOfDeath:0,
		damage:damage,
		damageInterval:damageInterval,
		drop:"none",
		killedBy:0,
		startledTime:0,
		attackTime:0,
		attackIni:0,
		hit:0,
		hitOpacity:0,
		hitPeaked:0,
		skin: Math.round((Math.random() * 2 + 1))
	};
	monsterArray.push(monster);
	//console.log(monster.x + "," + monster.y + " | " + xStart + "," + yStart);
}

function granadeToPlayer(damage, radius) {
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

function bulletFire(damageDealt) {
	var bulletAngleFromHero;
	var startX = hero.x;
	var startY = hero.y;
	var speed = 10;
	if(hero.gun == 'shotgun') {
		speed = Math.round(Math.random() * 2) + 9;
		bulletAngleFromHero = hero.angle + (Math.random() * 31) - 15;
	}
	else if(hero.gun == 'machinegun') {
		bulletAngleFromHero = hero.angle + (Math.random() * 5) - 2;
	}
	else if(hero.gun == 'flamethrower') {
		bulletAngleFromHero = hero.angle + (Math.random() * 21) - 10;
	}
	else if(hero.gun == 'machete') {
		bulletAngleFromHero = Math.round(hero.angle + 10);
		startX = Math.round(hero.x + Math.cos(bulletAngleFromHero * TO_RADIANS) * 20);
		startY = Math.round(hero.y + Math.sin(bulletAngleFromHero * TO_RADIANS) * 20);
	}
	else {
		bulletAngleFromHero = hero.angle;
	}
	var bullet = {
	firedFrom:hero.gun,
	bulletNumber: bulletCounter,
	timeOfShot:timeControler,
	bulletReleaseTime: new Date(),
	speed: speed, // movement in pixels per second
	bulletDamage: damageDealt,
	bulletStartX:hero.x,
	bulletStartY:hero.y,
	bulletHit:0,
	bulletX: startX,
	bulletY: startY,
	bulletAngle: bulletAngleFromHero,
	bulletStartAngle: hero.angle,
	angleCount:0
	};
	bulletCounter = bulletCounter + 1;
	bulletArray.push(bullet);
}	
	
function mapControl() {
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
		fixThisLampShit(gameDisplay.indexX,gameDisplay.indexY);
		
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
		fixThisLampShit(gameDisplay.indexX,gameDisplay.indexY);
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
		fixThisLampShit(gameDisplay.indexX,gameDisplay.indexY);
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
		fixThisLampShit(gameDisplay.indexX,gameDisplay.indexY);
	}	
}

function initiateBackground() {
	for(i=0;i<9;i++) {
		if(i==0){
			backgroundArray[i] = new Image();
			backgroundObjectArray[i] = new Object;
			backgroundObjectArray[i].x = -canvas.width;
			backgroundObjectArray[i].y = -canvas.height;
			backgroundArray[i].src = backgroundImage;
		}
		else if(i==1){
			backgroundArray[i] = new Image();
			backgroundObjectArray[i] = new Object;
			backgroundObjectArray[i].x = 0;
			backgroundObjectArray[i].y = -canvas.height;
			backgroundArray[i].src = backgroundImage;
		}
		else if(i==2){
			backgroundArray[i] = new Image();
			backgroundObjectArray[i] = new Object;
			backgroundObjectArray[i].x = canvas.width;
			backgroundObjectArray[i].y = -canvas.height;
			backgroundArray[i].src = backgroundImage;
		}
		else if(i==3){
			backgroundArray[i] = new Image();
			backgroundObjectArray[i] = new Object;
			backgroundObjectArray[i].x = -canvas.width;
			backgroundObjectArray[i].y = 0;
			backgroundArray[i].src = backgroundImage;
		}
		else if(i==4){
			backgroundArray[i] = new Image();
			backgroundObjectArray[i] = new Object;
			backgroundObjectArray[i].x = canvas.width;
			backgroundObjectArray[i].y = 0;
			backgroundArray[i].src = backgroundImage;	
		}
		else if(i==5){
			backgroundArray[i] = new Image();
			backgroundObjectArray[i] = new Object;
			backgroundObjectArray[i].x = -canvas.width;
			backgroundObjectArray[i].y = canvas.height;
			backgroundArray[i].src = backgroundImage;	
		}
		else if(i==6){
			backgroundArray[i] = new Image();
			backgroundObjectArray[i] = new Object;
			backgroundObjectArray[i].x = 0;
			backgroundObjectArray[i].y = canvas.height;
			backgroundArray[i].src = backgroundImage;	
		}
		else if(i==7){
			backgroundArray[i] = new Image();
			backgroundObjectArray[i] = new Object;
			backgroundObjectArray[i].x = canvas.width;
			backgroundObjectArray[i].y = canvas.height;
			backgroundArray[i].src = backgroundImage;	
		}
		else if(i==8){
			backgroundArray[i] = new Image();
			backgroundObjectArray[i] = new Object;
			backgroundObjectArray[i].x = 0;
			backgroundObjectArray[i].y = 0;
			backgroundArray[i].src = backgroundImage;	
		}
	}
}

function initialNineTileGameboard() {
	//middle
	addLampToScreenArrayVersion2(0,0,0,0,300);
	//top
	addLampToScreenArrayVersion2(0,-1,0,-canvas.height,300);
	randomStartNumber = Math.round(Math.random() * 1 + 2);
		for(x=0;x<randomStartNumber;x++) {
			spawnMonster(0, -canvas.height,20,500,100,100,1);
		}
		//bottom
		addLampToScreenArrayVersion2(0,1,0,canvas.height,300); 
		randomStartNumber = Math.round(Math.random() * 1 + 2);
		for(x=0;x<randomStartNumber;x++) {
			spawnMonster(0,canvas.height,20,500,100,100,1);
		}
		//left
		addLampToScreenArrayVersion2(-1,0,-canvas.width,0,300);
		randomStartNumber = Math.round(Math.random() * 1 + 2);
		for(x=0;x<randomStartNumber;x++) {
			spawnMonster(-canvas.width,0,20,500,100,100,1);
		}
		//right
		addLampToScreenArrayVersion2(1,0,canvas.width,0,300);
		randomStartNumber = Math.round(Math.random() * 1 + 2);
		for(x=0;x<randomStartNumber;x++) {
			spawnMonster(canvas.width,0,20,500,100,100,1);
		}
		//top right
		addLampToScreenArrayVersion2(1,-1,canvas.width,-canvas.height,300);
		randomStartNumber = Math.round(Math.random() * 1 + 2);
		for(x=0;x<randomStartNumber;x++) {
			spawnMonster(canvas.width,-canvas.height,20,500,100,100,1);
		}
		//top left
		addLampToScreenArrayVersion2(-1,-1,-canvas.width,-canvas.height,300);
		randomStartNumber = Math.round(Math.random() * 1 + 2);
		for(x=0;x<randomStartNumber;x++) {
			spawnMonster(-canvas.width,-canvas.height,20,500,100,100,1);
		}
		//bottom right
		addLampToScreenArrayVersion2(1,1,canvas.width,canvas.height,300);
		randomStartNumber = Math.round(Math.random() * 1 + 2);
		for(x=0;x<randomStartNumber;x++) {
			spawnMonster(canvas.width,canvas.height,20,500,100,100,1);
		}
		//bottom left
		addLampToScreenArrayVersion2(-1,1,-canvas.width,canvas.height,300);
		randomStartNumber = Math.round(Math.random() * 1 + 2);
		for(x=0;x<randomStartNumber;x++) {
			spawnMonster(-canvas.width,canvas.height,20,500,100,100,1);
		}
}

function drawRotatedImage(image, x, y, angle) {
    ctx.save(); 
    ctx.translate(x, y);
    ctx.rotate(angle * TO_RADIANS);
    ctx.drawImage(image, -(image.width/1), -(image.height/1),60,60);
    ctx.restore(); 
}

function showStatistics() {
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
		if(archivedBulletArray[i].bulletHit == 1) {
			allHits = allHits + 1;
		}
		if(archivedBulletArray[i].firedFrom == 'machete') {
			macheteSwings = macheteSwings + 1;
			if(archivedBulletArray[i].bulletHit == 1) {
				macheteHits = macheteHits + 1;
			}
		}
		else if(archivedBulletArray[i].firedFrom == 'pistol') {
			pistolShots = pistolShots + 1;
			if(archivedBulletArray[i].bulletHit == 1) {
				pistolHits = pistolHits + 1;
			}
		}
		else if(archivedBulletArray[i].firedFrom == 'shotgun') {
			shotgunShots = shotgunShots + 1;
			if(archivedBulletArray[i].bulletHit == 1) {
				shotgunHits = shotgunHits + 1;
			}
		}
		else if(archivedBulletArray[i].firedFrom == 'machinegun') {
			machinegunShots = machinegunShots + 1;
			if(archivedBulletArray[i].bulletHit == 1) {
				machinegunHits = machinegunHits + 1;
			}
		}
		else if(archivedBulletArray[i].firedFrom == 'flamethrower') {
			flamethrowerShots = flamethrowerShots + 1;
			if(archivedBulletArray[i].bulletHit == 1) {
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
	
	for(j=0;j<archivedMonsterArray.length;j++) {
		if(archivedMonsterArray[j].killedBy == "machete") {
			macheteKills = macheteKills + 1;
		}
		else if(archivedMonsterArray[j].killedBy == "pistol") {
			pistolKills = pistolKills + 1;
		}
		else if(archivedMonsterArray[j].killedBy == "shotgun") {
			shotgunKills = shotgunKills + 1;
		}
		else if(archivedMonsterArray[j].killedBy == "machinegun") {
			machinegunKills = machinegunKills + 1;
		}
		else if(archivedMonsterArray[j].killedBy == "flamethrower") {
			flamethrowerKills = flamethrowerKills + 1;
		}
		else if(archivedMonsterArray[j].killedBy == "granade") {
			granadeKills = granadeKills + 1;
		}
		else {
		}
	}
	
	document.getElementById("overallStatistics").innerHTML = "<strong>Overall</strong><br />Attacks made: " + archivedBulletArray.length + 
								"<br />hits: " + allHits + "<br />" + "Accuracy: " + overallAcc + "%" + "<br />" +
								"Monsters killed: " + archivedMonsterArray.length + "<br > Granade kills: " + granadeKills;													
								
								
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

function drawRotatedMonster(image, x, y, angle, sizeX, sizeY) {
    ctx.save(); 
    ctx.translate(x, y);
    ctx.rotate(angle * TO_RADIANS);
    //ctx.drawImage(image, -(image.width/2), -(image.height/2),sizeX,sizeY);
    ctx.drawImage(image, -(15), -(15), sizeX, sizeY);
    ctx.restore(); 
}

// Let's play this game!
var then = Date.now();
reset();
main();
