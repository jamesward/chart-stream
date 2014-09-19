$(function() {

  var data = [];
  var totalPoints = 30;

  for (var i = 0; i < totalPoints; i++) {
    data[i] = 0;
  }

  var chartData = function() {
    var chartData = [];

    for (var i = 0; i < totalPoints; i++) {
      chartData[i] = [i, data[i]];
    }

    return chartData;
  };

  var plot = $.plot("#chart", [chartData()], {
    series: {
      shadowSize: 0
    },
    yaxis: {
      min: 0,
      max: 60
    },
    xaxis: {
      show: false
    }
  });

  var url = $("body").data("ws");
  console.log(url);

  var ws = new WebSocket(url);
  ws.onmessage = function(event) {
    data.shift();
    data.push(Number(event.data));

    plot.setData([chartData()]);
    plot.draw();
  };

});