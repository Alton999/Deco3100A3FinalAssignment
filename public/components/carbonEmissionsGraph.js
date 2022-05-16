const energyData =
	"https://raw.githubusercontent.com/owid/energy-data/master/owid-energy-data.csv";
const emissionsData =
	"https://raw.githubusercontent.com/owid/co2-data/master/owid-co2-data.csv";

const loadData = () => {
	Plotly.d3.csv(energyData, function (data) {
		// Second parameter would be used to choose the different countries of comparison
		processDataSourcesOfEnergy(data, "Australia", "plot1", 2005);
		processDataSourcesOfEnergy(data, "Australia", "plot2", 2020);
	});

	Plotly.d3.csv(emissionsData, function (data) {
		processDataEmissions(data, "India");
	});
};
