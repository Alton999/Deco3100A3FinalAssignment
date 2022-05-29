const newAnimation = document.getElementById("GHG-animation");
const animation = bodymovin.loadAnimation({
	container: newAnimation,
	renderer: "svg",
	loop: true,
	autoplay: true,
	path: "dataGHG.json"
});
