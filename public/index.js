// import "./components/carbonEmissionGraph";

const energyData =
	"https://raw.githubusercontent.com/owid/energy-data/master/owid-energy-data.csv";
const emissionsData =
	"https://raw.githubusercontent.com/owid/co2-data/master/owid-co2-data.csv";

const countryFInput = document.getElementById("countriesF");
const countryTInput = document.getElementById("countriesT");

const loadData = () => {
	Plotly.d3.csv(emissionsData, (data) => {
		processEmissionData(data, "Australia", "Indonesia");
	});
};

const processEmissionData = (allRows, country1, country2) => {
	// Initialise empty arrays to store individual values
	let years = [],
		co2ProdCountry1 = [],
		co2ProdCountry2 = [];
	// Initialise variables

	for (let i = 0; i < allRows.length; i++) {
		let row = allRows[i];

		if (parseInt(row["year"]) > 2000 && row["country"] === country1) {
			years.push(row["year"]);
			co2ProdCountry1.push(row["co2_per_capita"]);
		}
		if (parseInt(row["year"]) > 2000 && row["country"] === country2) {
			years.push(row["year"]);
			co2ProdCountry2.push(row["co2_per_capita"]);
		}
	}
	console.log("Information processed");
	makeEmissionsPlotF(
		years,
		co2ProdCountry1,
		co2ProdCountry2,
		country1,
		country2,
		"First World",
		"carbonProdPlotF"
	);
	// makeEmissionsPlotF(
	// 	years,
	// 	co2ProdCountry2,
	// 	country2,
	// 	"Third World",
	// 	"carbonProdPlotT"
	// );
};

const makeEmissionsPlotF = (years, co2Prod1, co2Prod2, country1, country2, type, plot) => {
	let traces = [
		{
			type: "scatter",
			x: years,
			y: co2Prod1,
			name: country1,
			mode: "lines+markers"
		},
		{
			type: "scatter",
			x: years,
			y: co2Prod2,
			name: country2,
			mode: "lines+markers"
		}
	];

	let layout = {
		title: type + ": Annual production of carbon based emissions in " + country1,
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
