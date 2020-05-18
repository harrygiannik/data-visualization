var queryResults = {};


function getData() {
	fetch('/getData', {
		method: 'POST',
		headers: {
			'Content-type': 'application/json'
	}
	}).then(data => {
		return data.json()
	}).then(res => {queryResults = res})
	.catch(error => console.error('Error:', error));
    //console.log(Object.keys(queryResults[0])[2]);
    console.log("after fetch");
//  Object.getOwnPropertyNames(queryResults[0])[0];
	const svg = d3.select("svg"),
	  margin = {top: 20, right: 20, bottom: 30, left: 100},
	  width = +svg.attr("width")  - margin.left - margin.right,
	  height = +svg.attr("height") - margin.top  - margin.bottom,
	  x0 = d3.scaleBand().rangeRound([0, width]).padding(.2),
	  x1 = d3.scaleBand(),
	  y = d3.scaleLinear().rangeRound([height, 0]),
	  g = svg.append("g")
		           .attr("transform", `translate(${margin.left},${margin.top})`);
	
	d3.json("/getData", function(error, data) {
		console.log('"' + Object.keys(queryResults[1])[3] + '"');
		//var tmp = '"' + Object.keys(queryResults[1])[2] + '"';
		//k = d3.map(data.json()).keys(); 
		data1 = [];
		data2 = [];
		biggerData = data; //added for one counrty case!!!!!!!!!
		
		for (var i = 0; i < data.length; i++){
			if (i < 60){
				data1.push(data[i]);
			}
			else{
				data2.push(data[i]);
			}
		}
		//console.log(Math.max(data1[Object.keys(queryResults[1])[2]]));
		x0.domain(data.map(d => d.year));
		//x1.domain(data2.map(d => d.year));
		x1.domain(['year', 'year']).range([0, x0.bandwidth()]);
		
		if(data.length > 60){ //added for one counrty case!!!!!!!!!
			if(Math.max(data1[Object.keys(queryResults[1])[2]]) > 
				Math.max(data2[Object.keys(queryResults[1])[2]])){
			
				biggerData = data1; 
			}
			else{
				biggerData = data2;
			}
		}
		y.domain([0, d3.max(biggerData, d => d[Object.keys(queryResults[1])[2]])]); 
		 
		g.append("g") 
		.attr("class", "axis axis-x") 
		.attr("transform", `translate(0,${height})`) 
		.call(d3.axisBottom(x0).tickSizeOuter(0)); 
		 
		g.append("g") 
		.attr("class", "axis axis-y") 
		.call(d3.axisLeft(y).ticks(5).tickSizeOuter(0)); 
	
		
		//TODO legend me country_code, play more see values > than y max
		
		g.selectAll(".bar.country1") 
		.data(data1) 
		.enter().append("rect") 
		.attr("class", "bar country1") 
		.attr("x", d => x0(d.year) + x0.bandwidth()/2) 
		.attr("y", d => y(d[Object.keys(queryResults[1])[2]])) 
		.attr("width", x0.bandwidth()/2)	
		.attr("fill", "red") 
		.attr("height", d => height - y(d[Object.keys(queryResults[1])[2]])); 
		
		if(data.length >60){ //added for one counrty case!!!!!!!!!
		g.selectAll(".bar.country2") 
		.data(data2) 
		.enter().append("rect") 
		.attr("class", "bar country2") 
		.attr("x", d => x0(d.year)) 
		.attr("y", d => y(d[Object.keys(queryResults[1])[2]])) 
		.attr("width", x0.bandwidth()/2)
		.attr("fill", "steelblue") 
		.attr("height", d => height - y(d[Object.keys(queryResults[1])[2]]));
		}
		if(Object.keys(queryResults[1]).length > 3){ //added for one counrty case!!!!!!!!!
		g.selectAll(".bar.country2") 
		.data(data1) 
		.enter().append("rect") 
		.attr("class", "bar country2") 
		.attr("x", d => x0(d.year)) 
		.attr("y", d => y(d[Object.keys(queryResults[1])[3]])) //for second indicator!!! 
		.attr("width", x0.bandwidth()/2)
		.attr("fill", "steelblue") 
		.attr("height", d => height - y(d[Object.keys(queryResults[1])[3]]));
		
		}
		}); 
}
