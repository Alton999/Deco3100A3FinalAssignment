// Code for carbon emissions graph can be accessed in components/renderCarbonGraphs
import * as CarbonGraph from "./components/renderCarbonGraph.js";

// Code for setting up animation players
import "./components/renderAnimations.js";

const energyData =
	"https://raw.githubusercontent.com/owid/energy-data/master/owid-energy-data.csv";

const emissionsData =
	"https://raw.githubusercontent.com/owid/co2-data/master/owid-co2-data.csv";

const checkFirstWorldButton = document.getElementById("checkFirstWorld");
let countrySelect = document.getElementById("renewableCountry");
let yearSlider = document.getElementById("yearRange");
let yearSelectedDom = document.getElementById("yearSelected");

let developedCountries;

const loadData = () => {
	developedCountries = checkCheckboxes("developed");
	Plotly.d3.csv(emissionsData, (data) => {
		processWorldEmissionData(data);
		processCountriesEmissions(
			data,
			developedCountries,
			"carbonProdPlot",
			"gdpPlot"
		);
	});

	Plotly.d3.csv(energyData, (data) => {
		processEnergyConsumption(data, "United States", 2000, "renewablesPlot");
	});
};

const processEnergyConsumption = (allRows, country, year, plot) => {
	// let trace = [];
	let consumptions = [];
	// let traceObj = {};

	for (let row of allRows) {
		if (parseInt(row["year"]) === year && row["country"] === country) {
			consumptions = [
				row["solar_consumption"],
				row["biofuel_consumption"],
				row["coal_consumption"],
				row["gas_consumption"],
				row["hydro_consumption"],
				row["wind_consumption"],
				row["nuclear_consumption"],
				row["oil_consumption"]
			];
		}
	}
	let trace = [
		{
			values: consumptions,
			labels: [
				"Solar",
				"Biofuel",
				"Coal",
				"Gas",
				"Hydro",
				"Wind",
				"Nuclear",
				"Oil"
			],
			name: "Type of energy consumption",
			hoverinfo: "label+percent+name",
			hole: 0.4,
			type: "pie"
		}
	];

	let layout = {
		title: `Diversity of Energy Consumption in ${country} in ${year}`,
		font: {
			color: "white"
		},
		annotations: {
			font: {
				size: 20,
				color: "white"
			},
			showarrow: false,
			x: 0.82,
			y: 0.5
		},
		paper_bgcolor: "rgba(0,0,0,0)",
		plot_bgcolor: "rgba(0,0,0,0)",
		width: 800,
		height: 600,
		showlegend: true
	};

	Plotly.newPlot(plot, trace, layout);
};

const processCountriesEmissions = (
	allRows,
	countries,
	plotIdCO2,
	plotIdGDP
) => {
	const startingYear = 1900;

	// Easiest way to store values is in an array of country objects
	let tracesCO2 = [];
	let tracesGDP = [];

	for (let country of countries) {
		let tempYears = [];
		let tempCO2Values = [];
		let tempGDPValues = [];
		let tempGDPObj;
		let tempObjCO2;
		// console.log(country);
		for (let row of allRows) {
			if (parseInt(row["year"]) >= startingYear && row["country"] === country) {
				tempYears.push(row["year"]);
				tempCO2Values.push(row["co2"]);
				tempGDPValues.push(row["gdp"]);
			}
		}
		tempObjCO2 = {
			type: "scatter",
			name: country,
			x: tempYears,
			y: tempCO2Values
		};
		tempGDPObj = {
			type: "scatter",
			name: country,
			x: tempYears,
			y: tempGDPValues
		};
		tracesGDP.push(tempGDPObj);
		tracesCO2.push(tempObjCO2);
	}
	CarbonGraph.makeEmissionsPlot(
		tracesCO2,
		plotIdCO2,
		"Annual production of carbon based emissions in selected countries.",
		"Production of carbon dioxide in million tonnes"
	);
	CarbonGraph.makeEmissionsPlot(
		tracesGDP,
		plotIdGDP,
		"Annual total gross domestic product (GDP) in selected countries.",
		"Total gross domestic product"
	);
};

const processWorldEmissionData = (allRows) => {
	// Initialise empty arrays to store individual values

	let yearsG = [],
		co2ProdWorld = [];

	// Initialise variables
	const startingYear = 1900;
	for (let i = 0; i < allRows.length; i++) {
		let row = allRows[i];

		if (parseInt(row["year"]) >= startingYear && row["country"] === "World") {
			yearsG.push(row["year"]);
			co2ProdWorld.push(row["co2"]);
		}
	}

	CarbonGraph.makeWorldEmissionsPlot(
		yearsG,
		co2ProdWorld,
		"worldCarbonEmissionsGraph"
	);
};

const checkCheckboxes = (type) => {
	let checked;
	let final = [];
	// Returns an array of checked checkboxes
	if (type === "developed") {
		checked = document.querySelectorAll(
			"input[name='developedCountry']:checked"
		);
		for (let checkbox of checked) {
			final.push(checkbox.value);
		}
	} else {
		checked = document.querySelectorAll(
			"input[name='developingCountry']:checked"
		);
		for (let checkbox of checked) {
			final.push(checkbox.value);
		}
	}
	return final;
};

checkFirstWorldButton.addEventListener("click", (e) => {
	e.preventDefault();
	developedCountries = checkCheckboxes("developed");
	Plotly.d3.csv(emissionsData, (data) => {
		processCountriesEmissions(
			data,
			developedCountries,
			"carbonProdPlot",
			"gdpPlot"
		);
	});
});

// Needs to onchange one for the select and one for the scrubber
// countrySelect
// yearSlider
countrySelect.addEventListener("change", (e) => {
	e.preventDefault();
	console.log(countrySelect.value);
	Plotly.d3.csv(energyData, (data) => {
		processEnergyConsumption(
			data,
			countrySelect.value,
			parseInt(yearSlider.value),
			"renewablesPlot"
		);
	});
	console.log(yearSlider.value, countrySelect.value);
});

yearSlider.addEventListener("change", (e) => {
	e.preventDefault();
	console.log(yearSlider.value);

	yearSelectedDom.innerHTML = `Year selected: ${yearSlider.value}`;
	Plotly.d3.csv(energyData, (data) => {
		processEnergyConsumption(
			data,
			countrySelect.value,
			parseInt(yearSlider.value),
			"renewablesPlot"
		);
	});
});

loadData();
