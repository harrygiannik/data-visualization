var queryResults = {};
var maxColumn = 2;

function home(){
	fetch('/', {
    method: 'GET',
    headers: {
        'Content-type': 'text/html'
    }
	}).then(response => window.location.replace('/'))
	.catch(error => console.error('Error:', error));
}

function goBack(){
fetch('/chooseCharts', {
    method: 'GET',
    headers: {
        'Content-type': 'text/html'
    }
	}).then(response => window.location.replace('/chooseCharts'))
	.catch(error => console.error('Error:', error));
}

function getIndicName(s){
	indicators ={"AG.LND.FRST.ZS": "Forest area %", "SH.XPD.CHEX.GD.ZS": "Current health expenditure %", "EG.ELC.ACCS.ZS": "Access to electricity %", "SE.PRM.UNER.MA.ZS": "Children out of school male %",
	 "SE.PRM.UNER.FE.ZS": "Children out of school female %", "TM.VAL.FUEL.ZS.UN": "Fuel imports %",
	 "TX.VAL.FUEL.ZS.UN": "Fuel exports %", "MS.MIL.XPND.GD.ZS": "Military expenditure %GDP",
	 "IP.JRN.ARTC.SC": "journal articles", "SL.UEM.1524.MA.NE.ZS": "Unemployement youth male % (15-24)",
	 "SL.UEM.1524.FE.NE.ZS": "Unemployement youth female % (15-24)", "ST.INT.ARVL": "International tourism arrivals (*10k)"}
	 countries = {"ALB": "Albania", "ARG": "Argentina", "AUS": "Australia","BGR": "Bulgaria","BRA": "Brazil", "CHL": "Chile", "CUB":"Cuba", "CYP":"Cyprus","CZE": "Czech Republic", "DNK":"Denmark", "FRA": "France", "GRC": "Greece"}
	 for (i in indicators){
		if ( i === s){
			return indicators[i]; 
		}
	 }
	 for (c in countries){
		if ( c === s){
			return countries[c]; 
		}
	 }
}

function getData() {
	fetch('/getData', {
		method: 'POST',
		headers: {
			'Content-type': 'application/json'
	}
	}).then(data => {
		return data.json()
	}).then(res => {queryResults = res;
		return queryResults;
	}).then(res => {draw();})
	.catch(error => console.error('Error:', error));

    /* 
    EXAMPLE LINK:
    https://bl.ocks.org/pstuffa/26363646c478b2028d36e7274cedefa6
    */
    
}	


function draw(){	
	var margin = {top: 50, right: 50, bottom: 50, left: 100}
  , width = 1600 - margin.left - margin.right // Use the window's width 
  , height = 600 - margin.top - margin.bottom; // Use the window's height

    // The number of datapoints
    //var n = 21;
    d3.json("/getData", function(error, data) {
    // 5. X scale will use the index of our data
    var xExtent = d3.extent(data, d => d.year);
    var xScale = d3.scaleBand().rangeRound([0, width])	
    	.domain(data.map(d => d.year));
   // var xAxis = d3.axisBottom().scale(xScale);
    
   
    // 6. Y scale will use the randomly generate number 
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d[Object.keys(queryResults[1])[2]])]) // input 
        .range([height, 0]); // output 

    // 7. d3's line generator
    var line = d3.line()
        .x(function(d) { return xScale(d.year); }) // set the x values for the line generator
        .y(function(d) { return yScale(d[Object.keys(queryResults[1])[2]]); }) // set the y values for the line generator 
        .curve(d3.curveMonotoneX) // apply smoothing to the line

    // 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
    //var dataset = d3.range(n).map(function(d) { return {"y": d3.randomUniform(1)() } })

    // 1. Add the SVG to the page and employ #2
    var svg = d3.select("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // 3. Call the x axis in a group tag
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale))
        .selectAll("text")	
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-45)");
 // Create an axis component with d3.axisBottom

    // 4. Call the y axis in a group tag
    svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

    // 9. Append the path, bind the data, and call the line generator 
    svg.append("path")
        .datum(data) // 10. Binds data to the line 
        .attr("class", "line") // Assign a class for styling 
        .attr("stroke", "red")
        .attr("d", line); // 11. Calls the line generator 
    var line1color = document.createElement("P");
    line1color.style.float = "center";
    line1color.innerText = " " + getIndicName(data[0].country_code) + " " + getIndicName(Object.keys(queryResults[1])[2]);
    var ydot = document.createElement("P");
    ydot.innerText = "\u220E";
    ydot.style.float = "left";
    ydot.style.color = "red";
    document.getElementById("legend").appendChild(ydot);
    document.getElementById("legend").appendChild(line1color);
		});
}
