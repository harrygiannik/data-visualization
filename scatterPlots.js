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
	
}
