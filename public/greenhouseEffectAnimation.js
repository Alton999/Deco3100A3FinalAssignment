const newAnimation = document.getElementById("animationHere");
const animation = bodymovin.loadAnimation({
	container: newAnimation,
	renderer: "svg",
	loop: true,
	autoplay: true,
	path: "data.json"
});
