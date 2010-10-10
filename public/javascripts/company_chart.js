var companyChart;
function graphCompany(company){
  var data = [];
  var numActivities = 40;
  var relevantActivity = company.activity.slice(0-numActivities);
  for(var i=0; relevantActivity.length>i; i++) {
    data.push(relevantActivity[i].value);
  }
  
	companyChart = new Highcharts.Chart({
		chart: {
			renderTo: 'company_chart',
			zoomType: 'x'
		},
	        title: {
			text: 'Share Price'
		},
	        subtitle: {
			text: 'Click and drag in the plot area to zoom in'
		},
		yAxis: {
			title: {
				text: ''
			},
			min: 0,
			startOnTick: false,
			showFirstLabel: false
		},
		tooltip: {
			formatter: function() {
				return 'Share Price: '+ Highcharts.numberFormat(this.y, 2);
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
						[0, '#c8e072'],
						[1, '#9dbe2a']
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
			data: data
		}]
	});
}
function updateChart(point){
	companyChart.series[0].addPoint(point)
}