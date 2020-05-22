var group_list = [1,0,0,0];

function group(x){
  switch (x){
    case 0:
      group_list = [1,0,0,0];
      console.log("button 0");
      break;
    case 1:
      group_list = [0,1,0,0];
      console.log("button 1");
      break;
    case 2: 
      group_list = [0,0,1,0];
      console.log("button 2");
      break;
    case 3:
      group_list = [0,0,0,1];
      console.log("button 3");
      break;
    default:
      group_list = [1,0,0,0];
  }
}

function home(){
	fetch('/', {
    method: 'GET',
    headers: {
        'Content-type': 'text/html'
    }
	}).then(response => window.location.replace('/'))
	.catch(error => console.error('Error:', error));
}

function processForm(e) {
  var country_counter = 0;
  var indicator_counter = 0;
  
  if (e.preventDefault) e.preventDefault();

  var alb = {code: document.getElementById("ALB").id, value: document.getElementById("ALB").checked};
  var arg = {code: document.getElementById("ARG").id, value: document.getElementById("ARG").checked};
  var aus = {code: document.getElementById("AUS").id, value: document.getElementById("AUS").checked};
  var bgr = {code: document.getElementById("BGR").id, value: document.getElementById("BGR").checked};
  var bra = {code: document.getElementById("BRA").id, value: document.getElementById("BRA").checked};
  var chl = {code: document.getElementById("CHL").id, value: document.getElementById("CHL").checked};
  var cub = {code: document.getElementById("CUB").id, value: document.getElementById("CUB").checked};
  var cyp = {code: document.getElementById("CYP").id, value: document.getElementById("CYP").checked};
  var cze = {code: document.getElementById("CZE").id, value: document.getElementById("CZE").checked};
  var dnk = {code: document.getElementById("DNK").id, value: document.getElementById("DNK").checked};
  var fra = {code: document.getElementById("FRA").id, value: document.getElementById("FRA").checked};
  var grc = {code: document.getElementById("GRC").id, value: document.getElementById("GRC").checked};
  var forest = {code: document.getElementById("AG.LND.FRST.ZS").id, value: document.getElementById("AG.LND.FRST.ZS").checked};
  var health_expen = {code: document.getElementById("SH.XPD.CHEX.GD.ZS").id, value: document.getElementById("SH.XPD.CHEX.GD.ZS").checked}
  var electricity = {code: document.getElementById("EG.ELC.ACCS.ZS").id, value: document.getElementById("EG.ELC.ACCS.ZS").checked};
  var outschool_male = {code: document.getElementById("SE.PRM.UNER.MA.ZS").id, value: document.getElementById("SE.PRM.UNER.MA.ZS").checked};
  var outschool_female = {code: document.getElementById("SE.PRM.UNER.FE.ZS").id, value: document.getElementById("SE.PRM.UNER.FE.ZS").checked};
  var fuel_im = {code: document.getElementById("TM.VAL.FUEL.ZS.UN").id, value: document.getElementById("TM.VAL.FUEL.ZS.UN").checked};
  var fuel_ex = {code: document.getElementById("TX.VAL.FUEL.ZS.UN").id, value: document.getElementById("TX.VAL.FUEL.ZS.UN").checked};
  var military_expen ={code: document.getElementById("MS.MIL.XPND.GD.ZS").id, value:  document.getElementById("MS.MIL.XPND.GD.ZS").checked};
  var journal = {code: document.getElementById("IP.JRN.ARTC.SC").id, value: document.getElementById("IP.JRN.ARTC.SC").checked};
  var unempl_male = {code: document.getElementById("SL.UEM.1524.MA.NE.ZS").id, value: document.getElementById("SL.UEM.1524.MA.NE.ZS").checked};
  var unempl_female = {code: document.getElementById("SL.UEM.1524.FE.NE.ZS").id, value: document.getElementById("SL.UEM.1524.FE.NE.ZS").checked};
  var tourism = {code: document.getElementById("ST.INT.ARVL").id, value: document.getElementById("ST.INT.ARVL").checked};
  var arr = [alb, arg, aus, bgr, bra, chl, cub, cyp, cze, dnk, fra, grc,
      forest, health_expen, electricity, outschool_male, outschool_female, fuel_im, 
      fuel_ex, military_expen, journal, unempl_male, unempl_female, tourism];

  var countries = [alb, arg, aus, bgr, bra, chl, cub, cyp, cze, dnk, fra, grc];
  var indicators = [forest, health_expen, electricity, outschool_male, outschool_female, fuel_im, fuel_ex, military_expen, journal, unempl_male, unempl_female, tourism];

  columns = "year, country_code, "
  for (let index = 0; index < indicators.length; index++) {
    
    const indicator = indicators[index];
    if (indicator.value) {
      indicator_counter += 1;
      if (columns === "year, country_code, "){
      	columns += "`" + indicator.code + "`";
    }
      else {
    	columns += ", `" + indicator.code + "`";
      }
    }
  }
  
  where_clause = "country_code = '"
  for (let index = 0; index < countries.length; index++) {
    
    const country = countries[index];
    if (country.value) {
      country_counter += 1;
      if (where_clause === "country_code = '"){
      	where_clause += country.code + "'";
    }
      else {
    	where_clause += " or country_code = '" + country.code +"'" ;
      }
    }
  }

  if (group_list[0] === 1){
    from = "data";
  }
  else if (group_list[1] === 1){
    from = "data_3_years_avg";
  }
  else if (group_list[2] === 1){
    from = "data_5_years_avg";
  }
  else{
    from = "data_10_years_avg";
  }

  
  const query = {q: "SELECT " + columns + " FROM " + from + " WHERE " + where_clause + ";"};
  console.log(query);
  if ((country_counter === 2 && indicator_counter === 2) || (country_counter < 5 && country_counter !== 0 && indicator_counter === 1) || (indicator_counter < 5 && indicator_counter !== 0 && country_counter === 1)){
	  fetch('/query', {
		method: 'POST',
		body: "SELECT " + columns + " FROM data WHERE " + where_clause + ";",
		headers: {
		    'Content-type': 'text/plain'
		}
	  }).then(response => window.location.replace("/chooseCharts"))
	  .catch(error => console.error('Error:', error));
  }
  else{
  	fetch('/', {
		method: 'GET',
		headers: {
		    'Content-type': 'text/plain'
		}
	  }).then(response => window.alert("Please select again countries and indicators following the instructions, by clicking the Help button."))
	  .then(response => window.location.replace("/"))
	  .catch(error => console.error('Error:', error));
  }
 
}

var form_content = [];
var form = document.getElementById('form');
if (form.attachEvent) {
  form.attachEvent("submit", processForm);
} else {
  form.addEventListener("submit", processForm);
}
