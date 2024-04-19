const testButton = document.getElementById('test');
const loginButton = document.getElementById('loginButton');
const loginText = document.getElementById('username');
const passText = document.getElementById('password');
const loginDiv = document.getElementById('loginDiv');
const charSelDiv = document.getElementById('characterSelectDiv');

let username = '';
let char_id = '';

// This is the site that we will use to host the server.
//const URL = 'https://csc436-social-media-rpg.onrender.com';

// Uncomment this if you're testing on your own machine:
const URL = 'http://localhost:3000';

// Test function to get items
async function itemQuery() {
	// Send a POST requet to the server to perform a query
	// and save the HTML response
	let response = await fetch(URL + '/query', {
			method: "POST",
			headers: {
				'Accept': 'application/json',
		    	'Content-Type': 'application/json'
			},
			body: JSON.stringify({query: 'SELECT * FROM item'})
		})
		.then(res => {
			if (res.status === 200) {
				return res.json();
			}
			else { return null }
		})
		.catch(err => { console.log(err); });

	// Get the data from the query (in response.query)
	// iterater over each row and print the item type to the console
	response.query.forEach((row) => {
		console.log(row.type);
	});
}

// Login function
async function login() {
	let username = loginText.value;
	let password = passText.value;
	let response = await fetch(URL + '/login', {
			method: "POST",
			headers: {
				'Accept': 'application/json',
		    	'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: username,
				password: password
			})
		})
		.then(res => {
			if (res.status === 200) {
				console.log('Login successful');
				loginDiv.parentNode.removeChild(loginDiv);
				return res.json();
			}
				
		})
		.catch(err => { console.log(err); });
	
	response.characters.forEach((row) => {
		let charDiv = document.createElement('div');
		charDiv.id = row.character_ID;

		let characterElem = document.createElement('h2');
		characterElem.innerHTML = row.name;
		charDiv.appendChild(characterElem);
		
		let charButton = document.createElement('button');
		charButton.onclick = charSelect;
		charButton.innerText = 'Select';
		charDiv.appendChild(charButton);
		
		charSelDiv.appendChild(charDiv);
	});
}

// Character select function
function charSelect(elem) {
	char_ID = elem.target.parentNode.id;
	console.log("Char ID selected: ", char_ID);
	charSelDiv.parentNode.removeChild(charSelDiv);
}

testButton.onclick = itemQuery;
loginButton.onclick = login;
