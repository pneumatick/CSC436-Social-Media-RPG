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
app.use(express.json());
app.use(express.static('public'));

app.post('/query', async (req, res) => {
	let {query} = req.body;
	con.query(query, function(err, result) {
		if (err) {
			res.status(404).json();
			throw err;
		}
		res.send({ query: result });
	});
});


app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
