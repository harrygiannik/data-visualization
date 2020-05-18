var mysql = require('mysql');

var http = require('http');
var fs = require('fs');
var queryResults = {};

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
    
    case '/charts':
      res.writeHead(200, {'Content-Type': 'text/html'});
      fs.createReadStream(__dirname + '/charts.html').pipe(res);
      break;
    
    case '/charts.js':
      res.writeHead(200, {'Content-Type': 'application/javascript'});
      fs.createReadStream(__dirname + '/charts.js').pipe(res);
      break;
    
    case '/getData':
    	res.writeHead(200, {'Content-Type': 'text/plain-text'});
    	res.write(JSON.stringify(queryResults));
    	res.end();
       	break;
      
    case '/query':
	
		let body = '';
		req.on('data', chunk => {
			body += chunk.toString(); // convert Buffer to string
		});
		req.on('end', () => {

		res.end('ok');
		});
		con = mysql.createConnection({
			host: "localhost",
			user: "root",
			password: "",
			database: "world_bank_data"
		});

		con.connect(function(err) {
		if (err) throw err;
			console.log(body);
			con.query(body, function(err,
			result, fields) {
			if (err) throw err;
			var values = JSON.stringify(result);
			queryResults = JSON.parse(values);
			//console.log(obj.length);
			//console.log(obj[obj.length - 4][Object.keys(obj[obj.length - 4])[0]]);
			
			setTimeout(function(){}, 600);
			con.end();
			});
		});
		
			
			
      break;
    
    default:
      res.writeHead(404, {'Content-Type': 'text/plain-text'});
      res.end('Page not found');
      break;
  }
});

server.listen(3011, '127.0.0.1');
console.log("hello");


/*con.connect(function(err) {
  if (err) throw err;`TM.VAL.FUEL.ZS.UN`
  console.log("Connected!");
  setTimeout(function(){}, 600);
});
*/


