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

   
}

function draw(){
	var margin = {top: 50, right: 50, bottom: 50, left: 100}
  , width = 1600 - margin.left - margin.right // Use the window's width 
  , height = 600 - margin.top - margin.bottom; // Use the window's height
  
  d3.json("/getData", function(error, data) {
  	
  	
  	
  	var xScale = d3.scaleLinear().rangeRound([0, width])
  		.domain([0,d3.max(data, d => d[Object.keys(queryResults[1])[3]])])
  		
  		
  	var yScale = d3.scaleLinear().rangeRound([height,0])
  		.domain([0,d3.max(data, d => d[Object.keys(queryResults[1])[2]])]);

    var svg = d3.select("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  	svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale))
        .selectAll("text")	
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-45)");

    svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(yScale)); 

	 svg.append('g')
		.selectAll("dot")
		.data(data)
		.enter()
		.append("circle")
		  .attr("cx", function (d) { return xScale(d[Object.keys(queryResults[1])[3]]); } )
		  .attr("cy", function (d) { return yScale(d[Object.keys(queryResults[1])[2]]); } )
		  .attr("r", 3.5)
		  .style("fill", "black")
	var xLegend = document.createElement("P");
		xLegend.style.float = "center";
		xLegend.innerText = "Horizontal axis: " + getIndicName(data[0].country_code) + " " + getIndicName(Object.keys(queryResults[1])[3]);
		document.getElementById("legend").appendChild(xLegend);
	var yLegend = document.createElement("P");
		yLegend.style.float = "center";
		yLegend.innerText = "Vertical axis: " + getIndicName(data[0].country_code) + " " + getIndicName(Object.keys(queryResults[1])[2]);
		document.getElementById("legend").appendChild(yLegend);
/*		var blackDot = document.createElement("P");
		steelblueDot.innerText = "\u220E";
		steelblueDot.style.float = "left";
		steelblueDot.style.color = "peru";
		document.getElementById("legend").appendChild(steelblueDot);
		document.getElementById("legend").appendChild(line4color);
*/
  });
}















