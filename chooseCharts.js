var queryResults = {};

function goBack(){
	fetch('/', {
    method: 'GET',
    headers: {
        'Content-type': 'text/html'
    }
	}).then(response => window.location.replace('/'))
	.catch(error => console.error('Error:', error));
}

function barChart(){
	fetch('/barCharts', {
    method: 'GET',
    headers: {
        'Content-type': 'text/html'
    }
	}).then(response => window.location.replace('/barCharts'))
	.catch(error => console.error('Error:', error));
}

function lineChart(){
	fetch('/lineCharts', {
		method: 'GET',
		headers: {
			'Content-type': 'text/html'
		}
		}).then(response => window.location.replace('/lineCharts'))
		.catch(error => console.error('Error:', error));
}

function scatter(){
	fetch('/scatterPlots', {
		method: 'GET',
		headers: {
			'Content-type': 'text/html'
		}
		}).then(response => window.location.replace('/scatterPlots'))
		.catch(error => console.error('Error:', error));
}

function controlElements(){
	fetch('/getData', {
		method: 'POST',
		headers: {
			'Content-type': 'application/json'
	}
	}).then(data => {
		return data.json()
	}).then(res => {queryResults = res;
		return queryResults;
	}).then(res => {analyzeQuery();})
	.catch(error => console.error('Error:', error));
}

function analyzeQuery(){
	countries = queryResults.length / 60;
	indicators = Object.keys(queryResults[1]).length - 2;
	
	if ((indicators > 3) || (countries > 3)) {
		document.getElementById("bar").disabled = true;
	}
	else{
		document.getElementById("bar").disabled = false;
	}
	if ((indicators === 2) && (countries === 2)) {
		document.getElementById("bar").disabled = true;
	}
	else{
		document.getElementById("bar").disabled = false;
	}
	if (((indicators === 2) && (countries > 2)) || ((indicators === 2) && (countries > 2))) {
		document.getElementById("line").disabled = true;
		document.getElementById("bar").disabled = true;
	}
	else{
		document.getElementById("line").disabled = false;
		document.getElementById("bar").disabled = false;
	}
	if ((indicators === 2) && (countries === 1)) {
		document.getElementById("scatter").disabled = false;
	}
	else{
		document.getElementById("scatter").disabled = true;
	}
	
	
}
