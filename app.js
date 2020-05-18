var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "world_bank_data"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  setTimeout(function(){}, 600);
});

