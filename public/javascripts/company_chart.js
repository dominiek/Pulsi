function graphCompany(){
	companyChart = new Highcharts.Chart({
		chart: {
			renderTo: 'company_chart',
			zoomType: 'x'
		},
	        title: {
			text: 'Stock Value'
		},
	        subtitle: {
			text: 'Click and drag in the plot area to zoom in'
		},
		yAxis: {
			title: {
				text: ''
			},
			//min: 0.6,
			startOnTick: false,
			showFirstLabel: false
		},
		tooltip: {
			formatter: function() {
				return 'Stock Value = '+ Highcharts.numberFormat(this.y, 2);
			}
		},
		legend: {
			enabled: false
		},
		plotOptions: {
			area: {
				fillColor: {
					linearGradient: [0, 0, 0, 300],
					stops: [
						[0, '#4572A7'],
						[1, 'rgba(2,0,0,0)']
					]
				},
				lineWidth: 1,
				marker: {
					enabled: false,
					states: {
						hover: {
							enabled: true,
							radius: 5
						}
					}
				},
				shadow: false,
				states: {
					hover: {
						lineWidth: 1						
					}
				}
			}
		},

		series: [{
			type: 'area',
			pointInterval: 1,
			pointStart: 0,
			data: [
				12, 34, 500, 1000, 123, 242, 300
			]
		}]
	});
}