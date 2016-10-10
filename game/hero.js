function heroDeath(hero,monsterArray,granadeArray,timeEnd,archivedBulletArray, archivedMonsterArray, numberOfDrops,gameArrays,gameVariables) {
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
	showStatistics(archivedBulletArray, archivedMonsterArray, numberOfDrops);
	showStatisticsOnCanvas(gameArrays,gameVariables);
	document.getElementById("gameClip").innerHTML = "";
	document.getElementById("gameHealth").innerHTML = "";
	document.getElementById("gameInventory").style.display = "none";
	document.getElementById("gameSchematics").style.display = "none";
	document.getElementById("missionProgressContainer").style.display = "none";
	document.getElementById("gameVision").style.display = "none";
	document.getElementById("inventoryBackpack").className = "closedInventory";
}

function heroTestFunction() {
    console.log("ayyy");
}
