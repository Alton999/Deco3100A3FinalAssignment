// Code for carbon emissions graph can be accessed in components/renderCarbonGraphs
import * as CarbonGraph from "./components/renderCarbonGraph.js";

// Code for setting up animation players
import "./components/renderGHEAnimation.js";

const energyData =
	"https://raw.githubusercontent.com/owid/energy-data/master/owid-energy-data.csv";

const emissionsData =
	"https://raw.githubusercontent.com/owid/co2-data/master/owid-co2-data.csv";

const checkFirstWorldButton = document.getElementById("checkFirstWorld");

let developedCountries;
let developingCountries;

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

const loadData = () => {
	developedCountries = checkCheckboxes("developed");
	developingCountries = checkCheckboxes("developing");
	Plotly.d3.csv(emissionsData, (data) => {
		processWorldEmissionData(data);
		processCountriesEmissions(
			data,
			developedCountries,
			"carbonProdPlot",
			"gdpPlot"
		);
	});
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
			y: tempCO2Values,
			fill: "tozeroy"
		};
		tempGDPObj = {
			type: "scatter",
			name: country,
			x: tempYears,
			y: tempGDPValues,
			fill: "tozeroy"
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

loadData();
