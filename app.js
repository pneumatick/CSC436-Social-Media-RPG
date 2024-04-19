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

app.post('/login', async (req, res) => {
	let { username, password } = req.body;
	let query = `SELECT COUNT(*) FROM \`user\` WHERE username='${username}' AND password='${password}';`;
	con.query(query, function(err, result) {
        if (err) {
            res.status(404).json();
            throw err;
        }
		let qResult = Object.values(JSON.parse(JSON.stringify(result)));
		qResult.forEach((k, v) => {
			if (k['COUNT(*)'] == 0) {
				res.status(404).json();
				res.send();
			}
		});
    });

	let char_query = `SELECT player_character.* FROM user INNER JOIN plays ON user.username = plays.username INNER JOIN player_character ON plays.character_ID=player_character.character_ID WHERE user.username='${username}';`;
	con.query(char_query, function(err, result) {
		if (err) {
			res.status(404).json();
			throw err;
		}	
		res.send({ characters: result });
	});
});


app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
