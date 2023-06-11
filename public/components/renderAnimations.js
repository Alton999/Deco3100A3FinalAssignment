const newGHGAnimation = document.getElementById("GHG-animation");
const GHGanimation = bodymovin.loadAnimation({
	container: newGHGAnimation,
	renderer: "svg",
	loop: true,
	autoplay: true,
	assetsPath: "./GHGAnimationImages/",
	path: "dataGHG.json"
});

const newRenewableAnimation = document.getElementById("renewableAnimation");

const renewableAnimation = bodymovin.loadAnimation({
	container: newRenewableAnimation,
	renderer: "svg",
	loop: true,
	autoplay: true,
	assetsPath: "./RenewableAnimationImages/",
	path: "dataRenewables.json"
});
