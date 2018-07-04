/**
 * Created by DAY7RT on 22.05.2018.
 */

const colors = {
    pH: '#4286f4',
    ammonia: '#076d00',
    ammonia_light: 'rgba(115, 216, 108, 0.3)',
    nitrite: '#9120a0',
    nitrite_light: 'rgba(242, 169, 252,0.3)',
    nitrate: '#ff0019',
    nitrate_light: 'rgba(247, 123, 135,0.3)'
};

const revData = {
    dates: [],
    pH: [],
    amm: [],
    nitrite: [],
    nitrate: []
};
const init_revDataForCharting = () => {
    revData.dates = global_data_arrays.sys1.dates.slice().reverse();
    revData.pH = global_data_arrays.sys1.pH.slice().reverse();
    revData.amm = global_data_arrays.sys1.ammonia.slice().reverse();
    revData.nitrite = global_data_arrays.sys1.nitrite.slice().reverse();
    revData.nitrate = global_data_arrays.sys1.nitrate.slice().reverse();
};

console.log(revData.dates);

let chart;
const setUpChart = () => {
    let ctx = document.getElementById("myChart").getContext('2d');
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: revData.dates,
            datasets: []
        },
        options: {
            scales: {
                yAxes: [{
                    id: 'A',
                    scaleLabel: {
                        display: true,
                        labelString: 'ammonia / nitrate ppm'
                    },
                    ticks: {
                        beginAtZero:true,
                        max: 10
                    },
                    gridLines: {
                        display: true
                    }
                },{
                    id: 'B',
                    position: 'right',
                    scaleLabel: {
                        display: true,
                        labelString: 'nitrate ppm',
                    },
                    ticks: {
                        beginAtZero:true,
                        max: 80
                    },
                    gridLines: {
                        display: false
                    }
                },{
                    id: 'C',
                    position: 'right',
                    scaleLabel: {
                        display: true,
                        labelString: 'pH',
                    },
                    ticks: {
                        beginAtZero:true,
                        max: 12
                    },
                    gridLines: {
                        display: false
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true
                    },
                    gridLines: {
                        display: false
                    }
                }]
            },
            legend : {
                position: 'top'
            },
            tooltips:{
                mode: 'x',
                bodyFontSize: 26,
                displayColors: false,
                position: 'nearest'
            }
        }
    });
};


const populateChart = () => {
    chart.data.datasets = [{
        type: 'line',
        label: 'pH',
        data: revData.pH,
        yAxisID: 'C',
        fill: false,
        borderColor: colors.pH,
        backgroundColor: colors.pH,
        pointBackgroundColor: colors.pH,
        pointHoverBackgroundColor: colors.pH,
        pointHoverBorderColor: colors.pH,
        borderWidth: 1,
        pointRadius: 2
    },{
        type: 'line',
        label: 'ammonia',
        yAxisID: 'A',
        data: revData.amm,
        fill: true,
        fillOpacity: 0.3,
        borderColor: colors.ammonia,
        backgroundColor: colors.ammonia_light,
        pointBackgroundColor: colors.ammonia,
        pointHoverBackgroundColor: colors.ammonia,
        pointHoverBorderColor: colors.ammonia,
        borderWidth: 2,
        pointRadius: 3
    },{
        type: 'line',
        label: 'nitrite',
        yAxisID: 'A',
        data: revData.nitrite,
        fill: true,
        fillOpacity: 0.3,
        borderColor: colors.nitrite,
        backgroundColor: colors.nitrite_light,
        pointBackgroundColor: colors.nitrite,
        pointHoverBackgroundColor: colors.nitrite,
        pointHoverBorderColor: colors.nitrite,
        borderWidth: 2,
        pointRadius: 3
    },{
        type: 'line',
        label: 'nitrate',
        yAxisID: 'B',
        data: revData.nitrate,
        fill: true,
        fillOpacity: 0.3,
        borderColor: colors.nitrate,
        backgroundColor: colors.nitrate_light,
        pointBackgroundColor: colors.nitrate,
        pointHoverBackgroundColor: colors.nitrate,
        pointHoverBorderColor: colors.nitrate,
        borderWidth: 2,
        pointRadius: 3
    }];
    chart.update();
};





