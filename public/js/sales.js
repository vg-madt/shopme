var categories;
var chartData;
function init(){
    var colors=["Red","Blue","Pink","Green","Yellow"];
    var request = new XMLHttpRequest();
      var url = 'getCategory.action';
      request.open("GET", url, false);
  
      request.setRequestHeader('Content-type', 'application/json');
      //console.log("category list ",);
      request.send();
      categories = JSON.parse(request.responseText);

      var c = document.getElementById('categories');
    for(i in categories){
        var sq = document.createElement('div');
        sq.className="square p-1 h-1 w-1 d-inline-block";
        sq.style.backgroundColor=colors[i-2];
        console.log("value of i ",i);
        var name = document.createElement('span');
        name.innerHTML=categories[i].name;
        name.className="p-2 pl-2 m-2 d-inline";
        c.appendChild(sq);
        c.appendChild(name);
    }

    var request = new XMLHttpRequest();
    var url = 'getStats.action';
    request.open("GET", url, false);

    request.setRequestHeader('Content-type', 'application/json');
    //console.log("category list ",);
    request.send();
    chartData = JSON.parse(request.responseText);
    console.log("Stats: ", JSON.stringify(chartData));

var chBar = document.getElementById("chBar");

if (chBar) {
  new Chart(chBar, {
  type: 'bar',
  data: chartData,
  options: {
    scales: {
      xAxes: [{
        barPercentage: 0.4,
        categoryPercentage: 0.5
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    legend: {
      display: false
    }
  }
  });
}
}