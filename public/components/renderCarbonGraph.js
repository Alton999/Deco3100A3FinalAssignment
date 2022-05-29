export const makeWorldEmissionsPlot = (years, co2Prod, plot) => {
	let traces = [
		{
			type: "scatter",
			x: years,
			y: co2Prod,
			name: "Global carbon emissions",
			mode: "lines+markers",
			marker: {
				color: "#c0392b",
				line: {
					color: "#c0392b"
				}
			},
			fill: "tozeroy"
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

export const makeEmissionsPlot = (traces, plot, title, yLabel) => {
	let layout = {
		title: title,
		font: {
			color: "white"
		},
		xaxis: {
			title: "Year"
		},
		yaxis: {
			title: yLabel
		},
		paper_bgcolor: "rgba(0,0,0,0)",
		plot_bgcolor: "rgba(0,0,0,0)",
		width: 900,
		height: 800
	};

	Plotly.newPlot(plot, traces, layout);
};
