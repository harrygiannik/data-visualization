var queryResults = {};
var countriesCount = 0;

function goBack() {
  fetch("/", {
    method: "GET",
    headers: {
      "Content-type": "text/html",
    },
  })
    .then((response) => window.location.replace("/"))
    .catch((error) => console.error("Error:", error));
}

function barChart() {
  fetch("/barCharts", {
    method: "GET",
    headers: {
      "Content-type": "text/html",
    },
  })
    .then((response) => window.location.replace("/barCharts"))
    .catch((error) => console.error("Error:", error));
}

function lineChart() {
  fetch("/lineCharts", {
    method: "GET",
    headers: {
      "Content-type": "text/html",
    },
  })
    .then((response) => window.location.replace("/lineCharts"))
    .catch((error) => console.error("Error:", error));
}

function scatter() {
  fetch("/scatterPlots", {
    method: "GET",
    headers: {
      "Content-type": "text/html",
    },
  })
    .then((response) => window.location.replace("/scatterPlots"))
    .catch((error) => console.error("Error:", error));
}

function getCountOfCountries() {
  fetch("/countriesCount", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      countriesCount = res.count;
    })
    .then((res) => {
      analyzeQuery();
    })
    .catch((error) => console.error("Error:", error));
}

function controlElements() {
  fetch("/getData", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((data) => {
      return data.json();
    })
    .then((res) => {
      queryResults = res;
      return queryResults;
    })
    .then((res) => {
      getCountOfCountries();
    })
    .catch((error) => console.error("Error:", error));
}

function analyzeQuery() {
  var linesOfCountry = queryResults.length / countriesCount;
  console.log(linesOfCountry);
  countries = queryResults.length / linesOfCountry;
  indicators = Object.keys(queryResults[1]).length - 2;

  document.getElementById("bar").disabled = true;
  document.getElementById("line").disabled = true;
  document.getElementById("scatter").disabled = true;

  if (indicators === 2 && countries === 1) {
    document.getElementById("bar").disabled = false;
    document.getElementById("line").disabled = false;
    document.getElementById("scatter").disabled = false;
  }
  if (countries === 2 && indicators === 1) {
    document.getElementById("bar").disabled = false;
    document.getElementById("line").disabled = false;
  }
  if ((countries > 1 && indicators < 3) || (countries < 3 && indicators > 1)) {
    document.getElementById("line").disabled = false;
  }

  if (countries === 1 && indicators === 1) {
    document.getElementById("bar").disabled = false;
    document.getElementById("line").disabled = false;
  }

  if (
    (countries === 1 && indicators < 4) ||
    (countries < 4 && indicators === 1)
  ) {
    document.getElementById("bar").disabled = false;
  }
}
