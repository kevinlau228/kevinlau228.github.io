/******w*************
    
    Project 3
    Name: Yue Kwong Kevin Lau
    Date: April 16, 2022
    Description: This is the JavaScript file for the Experiments page of the Project 3: WEBSITE DEVELOPMENT & DEPLOYMENT.

********************/

/*
    Load function
    Using the fetch API, get your chosen dataset from the Dog API

 */
function load() {
    // API source: City of Winnipeg: Recycling, Garbage and Yard Waste Collection Days
    let api = "https://data.winnipeg.ca/resource/6rcy-9uik.json?$limit=20";

    fetch(api)
        .then(function(result){
            return result.json();
        })
        .then(function(data){
            createTable(data);
        });

    // API source: City of Winnipeg: Tree Inventory
    api = "https://data.winnipeg.ca/resource/hfwk-jp4h.json?$select=botanical_name,COUNT(*)&$group=botanical_name&$order=COUNT(*)%20DESC";

    fetch(api)
        .then(function(result){
            return result.json();
        })
        .then(function(data){
            createPieChart(data);
        });
}

/*
    createTable function
        Using the dataset returned from the API to create the HTML table row elements 
        and add them to the HTML table
*/
function createTable(data){
    let tbody = document.getElementById("exp_api_waste_collection_days_table").getElementsByTagName("tbody")[0];

    for(let i=0; i < data.length; i++){
        let tr = document.createElement("tr");

        let td = document.createElement("td");
        td.innerHTML = `${data[i].address_id}`;
        tr.appendChild(td);

        td = document.createElement("td");
        td.innerHTML = `${data[i].combined_address}`;
        tr.appendChild(td);

        td = document.createElement("td");
        td.innerHTML = `${data[i].collection_day}`;
        tr.appendChild(td);

        tbody.appendChild(tr);
    }
}

function createPieChart(data){
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        const numberOfSlices = 12;
        const otherCategory = "(Other)"

        let otherCount = 0;

        let chartData = [];
        chartData.push(['Botanical Name', 'Tree Inventory Count']);

        for(let i=0; i < data.length; i++){
            if (i < numberOfSlices){
                chartData.push([`${data[i].botanical_name}`, parseInt(`${data[i].COUNT}`)]);
            } else {
                otherCount += parseInt(`${data[i].COUNT}`)
            }
        }

        if (otherCount > 0){
            chartData.push([otherCategory, otherCount]);
        }

        chartData = google.visualization.arrayToDataTable(chartData);

        let options = {
            title: 'Tree Inventory By Botanical Names',
            pieSliceText: 'value',
            'width': 350,
            'height': 300,
            'chartArea': {'width': '100%', 'height': '100%'},
        };

        let chart = new google.visualization.PieChart(document.getElementById('tree_inventory_piechart'));

        chart.draw(chartData, options);
      }
}

//adds an event listener to execute onLoad method when page finished loading
document.addEventListener("DOMContentLoaded", load);