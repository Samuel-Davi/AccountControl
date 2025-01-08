const mysql = require('mysql2');

function executaQuery(query, res){
	const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '0907',
    database: 'accounts'
	});

  connection.query(query,function (error, results, fields){
    if(error){
      res.json(error);
      console.log(error);
    }else
      res.json(results);
    connection.end();
    console.log("ok");
  });
}

module.exports = executaQuery;