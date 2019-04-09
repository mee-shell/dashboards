
// ---------------table canvas myChart  ------------------------------------


var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'My First dataset',
            backgroundColor: 'rgb(55, 99, 132)',
            borderColor: 'rgb(55, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45]
        }]
    },
});

var ctx = document.getElementById('myChart1').getContext('2d');
var chart1 = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'My Second dataset',
            backgroundColor: 'rgb(205, 99, 132)',
            borderColor: 'rgb(205, 99, 132)',
            data: [4, 3, 10, 2, 10, 30, 15]
        }]
    },
});
// several attempts to get the dropdown menue or a button to work... not working yet

// // ----- button toggle -------------
// var button_toggle = document.getElementById('year1');
// button_toggle.onclick = function() {
// 	title.classList.toggle('year2');
// };
//
//
// // // -------------- dropdown -------------------------
 //  with json file, wasnt working, so called data is included in js
// var dropdown_year1 = document.getElementById('year1');
// dropdown_year1.onclick = function(){
//
// 	fetch('data.json') // get the data
// 		.then( function(response) {
// 			return response.json(); // transform the data
// 		})
// 		.then(function(data) {
// 			console.log('data', data)}
//     )
// }
//
// var dropdown_year2 = document.getElementById('year2');
// dropdown_year2.onclick = function(){
//
// 	fetch('data.json') // get the data
// 		.then( function(response) {
// 			return response.json(); // transform the data
// 		})
// 		.then(function(data) {
// 			console.log('data', data)}
//     )
// }




//https://stackoverflow.com/questions/23439324/select-and-display-one-chart-using-dropdown-menu

// <select id="leave" onchange="leaveChange()">
//   <option value="1">Second</option>
//   <option value="2">First</option>
//
// </select>

// function leaveChange() {
//     if (document.getElementById("dropdown_year").value != "1"){
//  document.getElementById("myChart").data="myChart";
//     }
//     else{
//         document.getElementById("myCHart1").data="myChart";
//     }
// }

// ---------------logic: if onclick(year1) = canvas.myChart , if onnclick(year2)= canvas.myCHart.data1----------
// var dropdown_year = document.getElementById('dropdown_year'); // target the button
// dropdown_year.onclick = function () { // click the button
//   if (dropdown_year.value ="1"){
//   return chart;
//
// } if else (dropdown_year.value ="2"){
//   return chart1;
// }
// }
// ;




// -CLUSTER _--------------------------------

var DATA_COUNT = 16;
var MIN_XY = -150;
var MAX_XY = 100;

var utils = Samples.utils;

utils.srand(110);

function colorize(opaque, context) {
  var value = context.dataset.data[context.dataIndex];
  var x = value.x / 100;
  var y = value.y / 100;
  var r = x < 0 && y < 0 ? 250 : x < 0 ? 150 : y < 0 ? 50 : 0;
  var g = x < 0 && y < 0 ? 0 : x < 0 ? 50 : y < 0 ? 150 : 250;
  var b = x < 0 && y < 0 ? 0 : x > 0 && y > 0 ? 250 : 150;
  var a = opaque ? 1 : 0.5 * value.v / 1000;

  return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
}

function generateData() {
  var data = [];
  var i;

  for (i = 0; i < DATA_COUNT; ++i) {
    data.push({
      x: utils.rand(MIN_XY, MAX_XY),
      y: utils.rand(MIN_XY, MAX_XY),
      v: utils.rand(0, 1000)
    });
  }

  return data;
}
//  declaring data variable
var data = {
  datasets: [{
    data: generateData()
  }, {
    data: generateData()
  }]
};

var options = {
  aspectRatio: 1,
  legend: false,
  tooltips: false,

  elements: {
    point: {
      backgroundColor: colorize.bind(null, false),

      borderColor: colorize.bind(null, true),

      borderWidth: function(context) {
        return Math.min(Math.max(1, context.datasetIndex + 1), 8);
      },

      hoverBackgroundColor: 'transparent',

      hoverBorderColor: function(context) {
        return utils.color(context.datasetIndex);
      },

      hoverBorderWidth: function(context) {
        var value = context.dataset.data[context.dataIndex];
        return Math.round(8 * value.v / 1000);
      },

      radius: function(context) {
        var value = context.dataset.data[context.dataIndex];
        var size = context.chart.width;
        var base = Math.abs(value.v) / 1000;
        return (size / 24) * base;
      }
    }
  }
};
//  variable chart2
var chart2 = new Chart('chart-0', {
  type: 'bubble',
  data: data,
  options: options
});

// target and call randomize button
function randomize() {
  chart2.data.datasets.forEach(function(dataset) {
    dataset.data = generateData();
  });
  chart2.update();
}

// target and call adding data button
function addDataset() {
  chart2.data.datasets.push({
    data: generateData()
  });
  chart2.update();
}

// target and call removing data button
function removeDataset() {
  chart2.data.datasets.shift();
  chart2.update();
}
