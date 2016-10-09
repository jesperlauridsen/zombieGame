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

function rocketBoots(hero) {
	if(hero.rocketBootsObtained === 1 && hero.rocketBootsOn === 1) {
	hero.initialSpeed = 6;
	}
}

function secondCommit() {
    console.log("ffs");
}
