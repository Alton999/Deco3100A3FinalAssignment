// import "./components/carbonEmissionGraph";

const newAnimation = document.getElementById("animationHere");
const animation = bodymovin.loadAnimation({
	container: newAnimation,
	renderer: "svg",
	loop: true,
	autoplay: true,
	path: "data.json"
});

const energyData =
	"https://raw.githubusercontent.com/owid/energy-data/master/owid-energy-data.csv";
const emissionsData =
	"https://raw.githubusercontent.com/owid/co2-data/master/owid-co2-data.csv";

const countryFInput = document.getElementById("countriesF");
const countryTInput = document.getElementById("countriesT");

const loadData = () => {
	Plotly.d3.csv(emissionsData, (data) => {
		processEmissionData(data, "Australia", "Philippines");
	});
};

const processEmissionData = (allRows, country1, country2) => {
	// Initialise empty arrays to store individual values
	let yearsC1 = [],
		yearsC2 = [],
		yearsG = [],
		co2ProdCountry1 = [],
		co2ProdCountry2 = [],
		co2ProdWorld = [];

	// Initialise variables
	const startingYear = 1900;
	for (let i = 0; i < allRows.length; i++) {
		let row = allRows[i];

		if (parseInt(row["year"]) >= startingYear && row["country"] === country1) {
			yearsC1.push(row["year"]);
			co2ProdCountry1.push(row["co2"]);
		}
		if (parseInt(row["year"]) >= startingYear && row["country"] === country2) {
			yearsC2.push(row["year"]);
			co2ProdCountry2.push(row["co2"]);
		}
		if (parseInt(row["year"]) >= startingYear && row["country"] === "World") {
			yearsG.push(row["year"]);
			co2ProdWorld.push(row["co2"]);
		}
	}

	// console.log("Years:", years)
	console.log(allRows.length);
	console.log("Information processed");
	makeEmissionsPlot(
		yearsC1,
		yearsC2,
		co2ProdCountry1,
		co2ProdCountry2,
		country1,
		country2,
		"First World",
		"carbonProdPlotF"
	);
	makeWorldEmissionsPlot(yearsG, co2ProdWorld, "worldCarbonEmissionsGraph");
};
const makeWorldEmissionsPlot = (years, co2Prod, plot) => {
	let traces = [
		{
			type: "scatter",
			x: years,
			y: co2Prod,
			name: "Global carbon emissions",
			mode: "lines+markers"
		}
	];
	let layout = {
		title: "Global emissions of carbon dioxide",
		font: {
			color: "white"
		},
		axis: {
			title: "Year"
		},
		yaxis: {
			title: "Production of carbon dioxide in million tonnes"
		},
		paper_bgcolor: "rgba(0,0,0,0)",
		plot_bgcolor: "rgba(0,0,0,0)",
		width: 1500,
		height: 800
	};
	Plotly.newPlot(plot, traces, layout);
};
const makeEmissionsPlot = (
	yearsC1,
	yearsC2,
	co2Prod1,
	co2Prod2,
	country1,
	country2,
	type,
	plot
) => {
	let traces = [
		{
			type: "scatter",
			x: yearsC1,
			y: co2Prod1,
			name: country1,
			mode: "lines+markers"
		},
		{
			type: "scatter",
			x: yearsC2,
			y: co2Prod2,
			name: country2,
			mode: "lines+markers"
		}
	];

	let layout = {
		title:
			type + ": Annual production of carbon based emissions in " + country1,
		font: {
			color: "white"
		},
		xaxis: {
			title: "Year"
		},
		yaxis: {
			title: "Production of carbon dioxide per capita (Tonnes per person)"
		},
		paper_bgcolor: "rgba(0,0,0,0)",
		plot_bgcolor: "rgba(0,0,0,0)",
		width: 1500,
		height: 800
	};

	Plotly.newPlot(plot, traces, layout);
};

loadData();
