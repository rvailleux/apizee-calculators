
/**
 * options: title, labels, colors, values
 */
function makeChart(options) {
    // Get the canvas element
    var ctx = document.getElementById(options.canvas_id).getContext("2d");

    // Create the doughnut chart
    var myDoughnutChart = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: options.labels,
            datasets: [
                {
                    data: options.values,
                    backgroundColor: options.colors,
                },
            ],
        },
        options: {
            responsive: false,
            legend: {
                display: false
            },
            title: {
                display: false
            },
            onHover: function (event, legendItem) {
                // Show the legend on mouseover
                document.getElementById("myDoughnutChart").style.cursor = "pointer";
                myDoughnutChart.options.legend.display = true;
                myDoughnutChart.update();
            },
            onLeave: function (event, legendItem) {
                // Hide the legend on mouse leave
                document.getElementById("myDoughnutChart").style.cursor = "default";
                myDoughnutChart.options.legend.display = false;
                myDoughnutChart.update();
            },
        },
    });
}
