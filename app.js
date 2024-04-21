const express = require('express');
const morgan = require('morgan');
var mysql = require('mysql');

/* Database connection code */
var con;
function handleDisconnect() {
	con = mysql.createConnection({
		host : '192.185.2.183',
		user : 'joseharv_team_member',
		password : 'group9project',
		database : 'joseharv_group9_project'
	});

	con.connect(function(err) {
		if(err) {
			console.log('Error connecting to database:', err);
			setTimeout(handleDisconnect, 2000);
		}
	});

	con.on('error', function(err) {
		console.log('Database error:', err);
		if(err.code === 'PROTOCOL_CONNECTION_LOST') {
			handleDisconnect();
		} else {
			throw err;
		}
	});
}
handleDisconnect();

/* HTTP server code */
const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));

// Handle front-end queries
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

// Handle log in requests
app.post('/login', async (req, res) => {
	let loggedIn = false;
	let { username, password } = req.body;

	// Check if the user exists
	let query = `SELECT COUNT(*) FROM \`user\` WHERE username='${username}' AND password='${password}';`;
	con.query(query, function(err, result) {
        if (err) {
            res.status(404).json();
            throw err;
        }
		let qResult = Object.values(JSON.parse(JSON.stringify(result)));
		qResult.forEach((k, v) => {
			if (k['COUNT(*)'] == 0) {
				console.log("Login attempt failed (bad credentials)");
				return res.status(401).json();
			}
		});
    });

	// If the user exists, get their characters
	if (loggedIn) {
		let char_query = `SELECT player_character.* FROM user INNER JOIN plays ON user.username = plays.username INNER JOIN player_character ON plays.character_ID=player_character.character_ID WHERE user.username='${username}';`;
		con.query(char_query, function(err, result) {
			if (err) {
				res.status(404).json();
				throw err;
			}	
			res.send({ characters: result });
		});
	}
});

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
