const express = require('express');
const morgan = require('morgan');
var mysql = require('mysql');

var con = mysql.createConnection({
	host : '192.185.2.183',
	user : 'joseharv_team_member',
	password : 'group9project',
	database : 'joseharv_group9_project'
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.static('public'));

con.connect(function(err) {
	if (err) throw err;
	// Perform a query on the 'item' table
	con.query('SELECT * FROM item', function(err, result) {
		if (err) throw err;
		console.log(result);
	});
});

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
