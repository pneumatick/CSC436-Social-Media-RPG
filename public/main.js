const testButton = document.getElementById('test');
const emailText = document.getElementById('email');
const loginButton = document.getElementById('loginButton');
const switchButton = document.getElementById('switchButton');

const charSelectButton = document.getElementById('charSelectButton')
const mapNavButton = document.getElementById('mapNavButton')
const mapCloseButton = document.getElementById('mapCloseButton')


const loginText = document.getElementById('username');
const passText = document.getElementById('password');
const loginDiv = document.getElementById('loginDiv');
const charSelDiv = document.getElementById('characterSelectDiv');

let username = '';
let char_id = '';

// This is the site that we will use to host the server.
const URL = 'https://csc436-social-media-rpg.onrender.com';

// Uncomment this if you're testing on your own machine:
//const URL = 'http://localhost:3000';

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

/* Log in / sign up functions */

// SHA-256 hashing function
async function sha256(password) {
    const msgBuffer = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

// Sign up function
async function signUp() {
	username = loginText.value;
	let password = await sha256(passText.value);
	let email = emailText.value;
	let response = await fetch(URL + '/signup', {
			method: "POST",
			headers: {
				'Accept': 'application/json',
		    	'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: username,
				password: password,
				email: email
			})
		})
		.then(res => {
			if (res.status === 200) {
				console.log('Sign up successful');
				loginDiv.parentNode.removeChild(loginDiv);
				return res.json();
			}
			else if (res.status === 409) {
				console.log('Sign up failed (user exists)');
				alert('Sign up failed (user exists)');
				return null;
			}
		})
		.catch(err => { console.log(err); });
	
	// Create a div for each character and a button to select them
	if (response) {
		char_id = response.char_id;
		console.log("Char ID selected: ", char_id);
		fetchCharacterInfo();
		fetchInventory();
	}
}

// Login function
async function login() {
	username = loginText.value;
	let password = await sha256(passText.value);
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
			else if (res.status === 401) {
				console.log('Login failed (bad credentials)');
				alert('Login failed (bad credentials)');
				return null;
			}
		})
		.catch(err => { console.log(err); });
	
	// Create a div for each character and a button to select them
	if (response) {
		console.log(response.characters)
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
}

// Character select function
function charSelect(elem) {
	char_id = elem.target.parentNode.id;
	console.log("Char ID selected: ", char_id);
	charSelDiv.parentNode.removeChild(charSelDiv);
	fetchCharacterInfo();
	fetchInventory();
}

// Switch between logging in and signing up
function signOrLog(elem) {
	// Switch to Sign Up mode
	if (elem.target.innerText === 'Sign Up Instead') {
		emailText.style.display = 'block';
		elem.target.innerText = 'Log in Instead';
		loginButton.innerText = 'Sign Up';
		loginButton.onclick = signUp;
	}
	// Switch to Log In mode 
	else {
		emailText.style.display = 'none';
		elem.target.innerText = 'Sign Up Instead';
		loginButton.innerText = 'Log In';
		loginButton.onclick = login;
	}
}

function toggleMap(){
	document.getElementById('mapNavDiv').classList.toggle('active')
}

/* Anish's Code */
// Fetch character information using character ID
async function fetchCharacterInfo() {
    let response = await fetch(URL + '/query', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: 
            `SELECT * FROM player_character WHERE character_ID=${char_id}`})
    })
    .then(res => res.json())
    .catch(err => { console.error(err); return null; });

    if (response) {
        // Assuming response.character is the data received for character
        let characterData = response.query[0];
        document.getElementById('race').textContent = characterData.race;
        document.getElementById('class').textContent = characterData.class;
        document.getElementById('tool_proficiency').textContent = characterData.tool_proficiency;
        document.getElementById('weapon_proficiency').textContent = characterData.weapon_proficiency;
        document.getElementById('health_points').textContent = characterData.health_points;
        document.getElementById('date_created').textContent = characterData.date_created;
    }
}

// Fetch inventory items using character ID
async function fetchInventory() {
    let response = await fetch(URL + '/query', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({query: `SELECT item.type FROM player_character JOIN has_item ON player_character.character_ID = has_item.character_ID JOIN item ON has_item.item_ID = item.item_ID WHERE player_character.character_ID = ${char_id}`})
    })
    .then(res => res.json())
    .catch(err => { console.error(err); return null; });

    if (response) {
        let inventoryList = document.getElementById('inventoryList');
        inventoryList.innerHTML = ''; // Clear existing items

        // Create a list item for each item in the inventory
        response.query.forEach(item => {
			console.log(item.type)
            let listItem = document.createElement('li');
            listItem.textContent = item.type;
            inventoryList.appendChild(listItem);
        });
    }
}


// Assign functions to elements
//testButton.onclick = itemQuery;
loginButton.onclick = login;
switchButton.onclick = signOrLog;
mapNavButton.onclick = toggleMap;
mapCloseButton.onclick = toggleMap;

// Assign functions to elements
testButton.onclick = itemQuery;
loginButton.onclick = login;
switchButton.onclick = signOrLog;

