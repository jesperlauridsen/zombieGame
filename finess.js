document.addEventListener('mousemove', e => {
	const x = Math.round((e.clientX / window.innerWidth) * 100);
	const y = Math.round((e.clientY / window.innerHeight) * 100);
	document.body.style.background =
		'radial-gradient(circle at ' + x + '% ' + y + '%, rgba(35,35,60,1) 0%, rgba(30,30,30,1) 90% )';
});
