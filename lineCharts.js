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

    d3.json("/getData", function(error, data) {
    var xExtent = d3.extent(data, d => d.year);
    var xScale = d3.scaleBand().rangeRound([0, width])	
    	.domain(data.map(d => d.year));
    
   	data1 = []
   	data2 = []
   	data3 = []
   	data4 = []
   	biggerData = data;
   	for (var i = 0; i < data.length; i++){
			if (i < 60){
				data1.push(data[i]);
			}
			else if (i < 120){
				data2.push(data[i]);
			}
			else if(i < 180){
				data3.push(data[i]);
			}
			else{
				data4.push(data[i]);
			}
		}
		
	if(Object.keys(queryResults[1]).length - 2 > 1){
			maxColumnValue = d3.max(biggerData, d => d[Object.keys(queryResults[1])[2]]) 
			for(i = 3; i < Object.keys(queryResults[1]).length; i++){
				console.log(biggerData[Object.keys(queryResults[1])[3]]);
				//first = d3.max(biggerData, d => d[Object.keys(queryResults[1])[i-1]])
				second = d3.max(biggerData, d => d[Object.keys(queryResults[1])[i]])
				if(maxColumnValue < second){
					maxColumn = i;
					maxColumnValue = second
				}
			}
			
		}
		
	if(data.length > 60){ //added for one counrty case!!!!!!!!!
			
			tempMax = d3.max(data1, d => d[Object.keys(queryResults[1])[maxColumn]]);
			currentMax = d3.max(data2, d => d[Object.keys(queryResults[1])[maxColumn]]);
			
			if(tempMax > currentMax){
				biggerData = data1; 
			}
			else{
				biggerData = data2;
			}
	}
	if(data.length > 120){ //added for one counrty case!!!!!!!!!
			tempMax = d3.max(biggerData, d => d[Object.keys(queryResults[1])[2]]);
			currentMax = d3.max(data3, d => d[Object.keys(queryResults[1])[2]]);
			if(tempMax < currentMax){
				biggerData = data3; 
			}
	}
	if(data.length > 180){ //added for one counrty case!!!!!!!!!
			tempMax = d3.max(biggerData, d => d[Object.keys(queryResults[1])[2]]);
			currentMax = d3.max(data4, d => d[Object.keys(queryResults[1])[2]]);
			if(tempMax < currentMax){
				biggerData = data4; 
			}
	}
	
	
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(biggerData, d => d[Object.keys(queryResults[1])[maxColumn]])]) // input 
        .range([height, 0]); // output 

    var line = d3.line()
        .x(function(d) { return xScale(d.year); }) // set the x values for the line generator
        .y(function(d) { return yScale(d[Object.keys(queryResults[1])[2]]); }) // set the y values for the line generator 
        .curve(d3.curveMonotoneX) // apply smoothing to the line

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
 // Create an axis component with d3.axisBottom

    // 4. Call the y axis in a group tag
    svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

    // 9. Append the path, bind the data, and call the line generator 
    svg.append("path")
        .datum(data1) // 10. Binds data to the line 
        .attr("class", "line") // Assign a class for styling 
        .attr("stroke", "red")
        .attr("stroke-width", "2")
        .attr("fill", "none")
        .attr("d", line); // 11. Calls the line generator 
    var line1color = document.createElement("P");
    line1color.style.float = "center";
    line1color.innerText = " " + getIndicName(data1[0].country_code) + " " + getIndicName(Object.keys(queryResults[1])[2]);
    var ydot = document.createElement("P");
    ydot.innerText = "\u220E";
    ydot.style.float = "left";
    ydot.style.color = "red";
    document.getElementById("legend").appendChild(ydot);
    document.getElementById("legend").appendChild(line1color);
	
	if (data.length > 60){
   		svg.append("path")
        .datum(data2) // 10. Binds data to the line 
        .attr("class", "line") // Assign a class for styling 
        .attr("stroke", "steelblue")
        .attr("stroke-width", "2")
        .attr("fill", "none")
        .attr("d", line);
        
        var line2color = document.createElement("P");
		line2color.style.float = "center";
		line2color.innerText = " " + getIndicName(data2[0].country_code) + " " + getIndicName(Object.keys(queryResults[1])[2]);
		var steelblueDot = document.createElement("P");
		steelblueDot.innerText = "\u220E";
		steelblueDot.style.float = "left";
		steelblueDot.style.color = "steelblue";
		document.getElementById("legend").appendChild(steelblueDot);
		document.getElementById("legend").appendChild(line2color);
    }
    if (data.length > 120){

   		svg.append("path")
        .datum(data3) // 10. Binds data to the line 
        .attr("class", "line") // Assign a class for styling 
        .attr("stroke", "seagreen")
        .attr("stroke-width", "2")
        .attr("fill", "none")
        .attr("d", line);

        var line3color = document.createElement("P");
		line3color.style.float = "center";
		line3color.innerText = " " + getIndicName(data3[0].country_code) + " " + getIndicName(Object.keys(queryResults[1])[2]);
		var bdot = document.createElement("P");
		bdot.innerText = "\u220E";
		bdot.style.float = "left";
		bdot.style.color = "seagreen";
		document.getElementById("legend").appendChild(bdot);
		document.getElementById("legend").appendChild(line3color);
    }
    if (data.length > 180){
   	
   		svg.append("path")
        .datum(data4)  
        .attr("class", "line") 
        .attr("stroke", "peru")
        .attr("stroke-width", "2")
        .attr("fill", "none")
        .attr("d", line);
        var line4color = document.createElement("P");
		line4color.style.float = "center";
		line4color.innerText = " " + getIndicName(data4[0].country_code) + " " + getIndicName(Object.keys(queryResults[1])[2]);
		var pdot = document.createElement("P");
		pdot.innerText = "\u220E";
		pdot.style.float = "left";
		pdot.style.color = "peru";
		document.getElementById("legend").appendChild(pdot);
		document.getElementById("legend").appendChild(line4color);
    }
	
	if(Object.keys(queryResults[1]).length > 3 && data.length === 60){ 
		
		var line = d3.line()
        .x(function(d) { return xScale(d.year); }) // set the x values for the line generator
        .y(function(d) { return yScale(d[Object.keys(queryResults[1])[3]]); })
        .curve(d3.curveMonotoneX) // apply smoothing to the line
		
		svg.append("path")
        .datum(data1)  
        .attr("class", "line") 
        .attr("stroke", "steelblue")
        .attr("stroke-width", "2")
        .attr("fill", "none")
        .attr("d", line);
		var indicator2Color = document.createElement("P");
		indicator2Color.style.float = "center";
		indicator2Color.innerText = " " + getIndicName(data1[0].country_code) + " " + getIndicName(Object.keys(queryResults[1])[3]);
		var bdot = document.createElement("P");
		bdot.innerText = "\u220E";
		bdot.style.float = "left";
		bdot.style.color = "steelblue";
		document.getElementById("legend").appendChild(bdot);
		document.getElementById("legend").appendChild(indicator2Color);
	}
	
	if(Object.keys(queryResults[1]).length > 4 && data.length === 60){ //added for one counrty case!!!!!!!!!
		
		var line = d3.line()
        .x(function(d) { return xScale(d.year); }) // set the x values for the line generator
        .y(function(d) { return yScale(d[Object.keys(queryResults[1])[4]]); })
        .curve(d3.curveMonotoneX) // apply smoothing to the line
		
		svg.append("path")
        .datum(data1)  
        .attr("class", "line") 
        .attr("stroke", "seagreen")
        .attr("stroke-width", "2")
        .attr("fill", "none")
        .attr("d", line);
		var indicator3Color = document.createElement("P");
		indicator3Color.style.float = "center";
		indicator3Color.innerText = " " + getIndicName(data1[0].country_code) + " " + getIndicName(Object.keys(queryResults[1])[4]);
		var bdot = document.createElement("P");
		bdot.innerText = "\u220E";
		bdot.style.float = "left";
		bdot.style.color = "seagreen";
		document.getElementById("legend").appendChild(bdot);
		document.getElementById("legend").appendChild(indicator3Color);
	}
	
	if(Object.keys(queryResults[1]).length > 5 && data.length === 60){ //added for one counrty case!!!!!!!!!
		
		var line = d3.line()
        .x(function(d) { return xScale(d.year); }) // set the x values for the line generator
        .y(function(d) { return yScale(d[Object.keys(queryResults[1])[5]]); })
        .curve(d3.curveMonotoneX) // apply smoothing to the line
		
		svg.append("path")
        .datum(data1)  
        .attr("class", "line") 
        .attr("stroke", "peru")
        .attr("stroke-width", "2")
        .attr("fill", "none")
        .attr("d", line);
		var indicator4Color = document.createElement("P");
		indicator4Color.style.float = "center";
		indicator4Color.innerText = " " + getIndicName(data1[0].country_code) + " " + getIndicName(Object.keys(queryResults[1])[5]);
		var bdot = document.createElement("P");
		bdot.innerText = "\u220E";
		bdot.style.float = "left";
		bdot.style.color = "peru";
		document.getElementById("legend").appendChild(bdot);
		document.getElementById("legend").appendChild(indicator4Color);
	}
	
	if (data.length === 120 && Object.keys(queryResults[1]).length > 3){
		var line = d3.line()
        .x(function(d) { return xScale(d.year); }) // set the x values for the line generator
        .y(function(d) { return yScale(d[Object.keys(queryResults[1])[3]]); })
        .curve(d3.curveMonotoneX) // apply smoothing to the line
				
		svg.append("path")
        .datum(data1) // 10. Binds data to the line 
        .attr("class", "line") // Assign a class for styling 
        .attr("stroke", "seagreen")
        .attr("stroke-width", "2")
        .attr("fill", "none")
        .attr("d", line); // 11. Calls the line generator 
		var line3color = document.createElement("P");
		line3color.style.float = "center";
		line3color.innerText = " " + getIndicName(data1[0].country_code) + " " + getIndicName(Object.keys(queryResults[1])[3]);
		var ydot = document.createElement("P");
		ydot.innerText = "\u220E";
		ydot.style.float = "left";
		ydot.style.color = "seagreen";
		document.getElementById("legend").appendChild(ydot);
		document.getElementById("legend").appendChild(line3color);
		
		svg.append("path")
        .datum(data2) // 10. Binds data to the line 
        .attr("class", "line") // Assign a class for styling 
        .attr("stroke", "peru")
        .attr("stroke-width", "2")
        .attr("fill", "none")
        .attr("d", line);
        
        var line4color = document.createElement("P");
		line4color.style.float = "center";
		line4color.innerText = " " + getIndicName(data2[0].country_code) + " " + getIndicName(Object.keys(queryResults[1])[3]);
		var steelblueDot = document.createElement("P");
		steelblueDot.innerText = "\u220E";
		steelblueDot.style.float = "left";
		steelblueDot.style.color = "peru";
		document.getElementById("legend").appendChild(steelblueDot);
		document.getElementById("legend").appendChild(line4color);
	}
	
	
	});
}
