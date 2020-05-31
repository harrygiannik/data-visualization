var mysql = require("mysql");
var readline = require("readline");
var http = require("http");
var fs = require("fs");

var queryResults = {};
var passwd = "";
var countries = { count: 1 };
//get mysql server password
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.stdoutMuted = true;

rl.question("mysql-server password: ", function (password) {
  passwd = password; // store user input in var passwd
  rl.close();
});

rl._writeToOutput = function _writeToOutput(stringToWrite) {
  if (rl.stdoutMuted) rl.output.write("");
  else rl.output.write(stringToWrite);
};

var server = http.createServer(function (req, res) {
  switch (req.url) {
    case "/":

    case "/index.html":
      res.writeHead(200, { "Content-Type": "text/html" });
      fs.createReadStream(__dirname + "/index.html").pipe(res);
      break;

    case "/indscripts.js":
      res.writeHead(200, { "Content-Type": "application/javascript" });
      fs.createReadStream(__dirname + "/indscripts.js").pipe(res);
      break;

    case "/chooseCharts":
      res.writeHead(200, { "Content-Type": "text/html" });
      fs.createReadStream(__dirname + "/chooseCharts.html").pipe(res);
      break;

    case "/chooseCharts.js":
      res.writeHead(200, { "Content-Type": "application/javascript" });
      fs.createReadStream(__dirname + "/chooseCharts.js").pipe(res);
      break;

    case "/barCharts":
      res.writeHead(200, { "Content-Type": "text/html" });
      fs.createReadStream(__dirname + "/barCharts.html").pipe(res);
      break;

    case "/barCharts.js":
      res.writeHead(200, { "Content-Type": "application/javascript" });
      fs.createReadStream(__dirname + "/barCharts.js").pipe(res);
      break;
    case "/lineCharts":
      res.writeHead(200, { "Content-Type": "text/html" });
      fs.createReadStream(__dirname + "/lineCharts.html").pipe(res);
      break;

    case "/lineCharts.js":
      res.writeHead(200, { "Content-Type": "application/javascript" });
      fs.createReadStream(__dirname + "/lineCharts.js").pipe(res);
      break;

    case "/scatterPlots":
      res.writeHead(200, { "Content-Type": "text/html" });
      fs.createReadStream(__dirname + "/scatterPlots.html").pipe(res);
      break;

    case "/scatterPlots.js":
      res.writeHead(200, { "Content-Type": "application/javascript" });
      fs.createReadStream(__dirname + "/scatterPlots.js").pipe(res);
      break;

    case "/getData":
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(queryResults));
      res.end();
      break;

    case "/countriesCount":
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(countries));
      res.end();
      break;

    case "/query":
      countries = { count: 1 };
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString(); // convert Buffer to string
      });
      req.on("end", () => {
        res.end("ok");
      });
      con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: passwd, //passwd for mysql password
        database: "world_bank_data",
      });

      con.connect(function (err) {
        if (err) throw err;
        con.query(body, function (err, result, fields) {
          if (err) throw err;
          var values = JSON.stringify(result);
          queryResults = JSON.parse(values);
          country = queryResults[0].country_code;
          for (var i = 1; i < queryResults.length; i++) {
            if (country !== queryResults[i].country_code) {
              countries.count++;
              country = queryResults[i].country_code;
            }
          }
          setTimeout(function () {}, 600);
          con.end();
        });
      });

      break;

    default:
      res.writeHead(404, { "Content-Type": "text/plain-text" });
      res.end("Page not found");
      break;
  }
});

server.listen(3011, "127.0.0.1");
