// import "./components/carbonEmissionGraph";

const energyData =
	"https://raw.githubusercontent.com/owid/energy-data/master/owid-energy-data.csv";
const emissionsData =
	"https://raw.githubusercontent.com/owid/co2-data/master/owid-co2-data.csv";

const countryFInput = document.getElementById("countriesF");
const countryTInput = document.getElementById("countriesT");

const loadData = () => {
	Plotly.d3.csv(emissionsData, (data) => {
		processEmissionData(data, "Australia");
	});
};

const processEmissionData = (allRows, country) => {
	// Initialise empty arrays to store individual values
	let years = [],
		co2Prod = [],
		energyConsumption = [],
		gdp = [];

	// Initialise variables

	for (let i = 0; i < allRows.length; i++) {
		let row = allRows[i];

		if (parseInt(row["year"]) > 2000 && row["country"] === country) {
			years.push(row["year"]);
			co2Prod.push(row["co2_per_capita"]);
			energyConsumption.push(row["energy_per_capita"]);
			gdp.push(row["gdp"]);
		}
	}
	console.log("Information processed");
	makeEmissionsPlotF(years, co2Prod, country, "carbonProdPlotF");
	makeEmissionsPlotT(years, co2Prod, country, "carbonProdPlotT");
};

const makeEmissionsPlotF = (years, co2Prod, country, plot) => {
	let traces = [
		{
			type: "scatter",
			x: years,
			y: co2Prod,
			name: "Carbon dioxide production per capita (tonnes per person)",
			mode: "lines+markers"
		}
	];

	let layout = {
		title: "Annual production of carbon based emissions in " + country,
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
		width: 850,
		height: 900
	};

	Plotly.newPlot(plot, traces, layout);
};

const makeEmissionsPlotT = (years, co2Prod, country, plot) => {
	let traces = [
		{
			type: "scatter",
			x: years,
			y: co2Prod,
			name: "Carbon dioxide production per capita (tonnes per person)",
			mode: "lines+markers"
		}
	];

	let layout = {
		title: "Annual production of carbon based emissions in " + country,
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
		width: 850,
		height: 900
	};

	Plotly.newPlot(plot, traces, layout);
};

loadData();
