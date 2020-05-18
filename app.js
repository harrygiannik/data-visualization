//var mysql = require('mysql');

var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res){
  switch (req.url) {
    case '/':
    
    case '/index.html':
      res.writeHead(200, {'Content-Type': 'text/html'});
      fs.createReadStream(__dirname + '/index.html').pipe(res);
      break;
    
    case '/indscripts.js':
      res.writeHead(200, {'Content-Type': 'application/javascript'});
      fs.createReadStream(__dirname + '/indscripts.js').pipe(res);
      break;
      
    default:
      res.writeHead(404, {'Content-Type': 'text/plain-text'});
      res.end('Corona-virus detected. Please stay home for 14 dayz!');
      break;
  }
});

server.listen(3011, '127.0.0.1');
console.log("hello");

/*var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "world_bank_data"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  setTimeout(function(){}, 600);
});*/
