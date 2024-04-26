const testButton = document.getElementById('test');
const emailText = document.getElementById('email');
const loginButton = document.getElementById('loginButton');
const switchButton = document.getElementById('switchButton');

const charSelectButton = document.getElementById('charSelectButton')
const mapNavButton = document.getElementById('mapNavButton')

const loginText = document.getElementById('username');
const passText = document.getElementById('password');
const loginDiv = document.getElementById('loginDiv');
const charSelDiv = document.getElementById('characterSelectDiv');
const mapNav = document.getElementById('mapNavDiv')

const locSwap = document.getElementById('locSwapDiv');
const subSwap = document.getElementById('subSwapDiv');

const inventory = document.getElementById('inventoryList');

let username = '';
let char_id = '';
let current_region = '';
let current_subloc = '';
let selected_subloc = '';

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
	let signResponse = await fetch(URL + '/signup', {
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
	if (signResponse) {
		char_id = signResponse.char_id;
		console.log("Char ID selected: ", char_id);
		fetchLocation();
		fetchSublocation();
		fetchSubList();
		fetchCharacterInfo();
		fetchInventory();
	}
}

// Login function
async function login() {
	username = loginText.value;
	let password = await sha256(passText.value);
	let loginResponse = await fetch(URL + '/login', {
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
	if (loginResponse) {
		console.log(loginResponse.characters)
		loginResponse.characters.forEach((row) => {
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
	
	fetchLocation();
	fetchSublocation();
	fetchSubList();
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

/* Nathaniel's Code */

function listChars(){
	location.reload()
/*
    let response = await fetch(URL + '/query', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({query: `SELECT char2.name FROM player_character JOIN plays ON player_character.character_ID = plays.character_ID JOIN user ON user.username = plays.username JOIN plays AS plays2 ON plays2.username = user.username JOIN player_character AS char2 ON plays2.character_ID = char2.character_ID WHERE player_character.character_ID = ${char_id}`})
    })
    .then(res => {
        if (res.status === 200) {
            return res.json();
        }
        else { return null }
    })
    .catch(err => { console.log(err); });

    if (response) {
        response.query.forEach((row) => {
            console.log(row.name)
            let charDiv = document.createElement('div');
            charDiv.id = row.character_ID;

            let characterElem = document.createElement('h2');
            characterElem.innerHTML = row.name;
            charDiv.appendChild(characterElem);

            let charButton = document.createElement('button');
            charButton.onclick = charSelect(row.character_ID);
            charButton.innerText = 'Select';
            charDiv.appendChild(charButton);

            charSelDiv.appendChild(charDiv);
        });
    }
    */
}


async function openMap(){
	/*
    let response = await fetch(URL + '/query', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({query: `SELECT connections.name FROM location JOIN connects_to ON location.location_ID = connects_to.location_ID JOIN location AS connections ON connections.location_ID = connects_to.location_ID_2 WHERE location.name = (SELECT location.name FROM player_character JOIN currently_in ON player_character.character_ID = currently_in.character_ID JOIN is_part_of ON is_part_of.sublocation_ID = currently_in.sublocation_ID JOIN location ON location.location_ID = is_part_of.location_ID WHERE player_character.character_ID = ${char_id}) UNION SELECT connections.name FROM location JOIN connects_to ON location.location_ID = connects_to.location_ID_2 JOIN location AS connections ON connections.location_ID = connects_to.location_ID WHERE location.name = (SELECT location.nameFROM player_character JOIN currently_in ON player_character.character_ID = currently_in.character_ID JOIN is_part_of ON is_part_of.sublocation_ID = currently_in.sublocation_ID JOIN location ON location.location_ID = is_part_of.location_ID WHERE player_character.character_ID = ${char_id})`})
    })
    .then(res => {
        if (res.status === 200) {
            return res.json();
        }
        else { return null }
    })
    .catch(err => { console.log(err); });

    if(response){
    */
    document.getElementById('mapNavDiv').style.display = 'block';

    	/*
        let mapCloseButton = document.createElement('button');
        mapCloseButton.innerText = "Close";
        mapCloseButton.onclick = closeMap;
        mapNavDiv.appendChild(mapCloseButton)

        let mapTitle = document.createElement('h2');
        mapTitle.innerText = "Map of Salamar and the Kendakrath Mountains";
        mapNavDiv.appendChild(mapTitle)

        let mapImg = document.createElement('img');
        mapImg.src = "images/Social_Media_RPG_Map_w_Labels.jpeg";
        mapImg.alt = "map";
        mapImg.width = "800";
        mapImg.height = "450";
        mapNavDiv.appendChild(mapImg)

        let navText = document.createElement('h3');
        navText.innerText = "Travel to:";
        mapNavDiv.appendChild(navText)

        response.query.forEach((row) => {
            console.log(row.name);
            let navContainer = document.createElement('div');
            navContainer.id = row.name;

            let locButton = document.createElement('button');
            locButton.onclick = navToLoc(row.name);
            locButton.innerText = row.name;
            mapNavDiv.appendChild(locButton);


        });
		
    }
    */
}

async function navToLoc(elem){
	let locname = elem.target.innerText;
    let response = await fetch(URL + '/query', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        //body: JSON.stringify({query: `UPDATE currently_in SET currently_in.character_ID = ${char_id}), currently_in.sublocation_ID = (SELECT is_part_of.sublocation_ID FROM is_part_of JOIN location ON is_part_of.location_ID = location.location_ID WHERE location.name = ${locname} LIMIT 1) WHERE currently_in.character_ID = (SELECT character_ID FROM player_character WHERE character_ID = ${char_id});`})
        body: JSON.stringify({query: `UPDATE currently_in SET currently_in.sublocation_ID = (SELECT is_part_of.sublocation_ID FROM is_part_of JOIN location ON is_part_of.location_ID = location.location_ID WHERE location.name = '${locname}' LIMIT 1) WHERE currently_in.character_ID = ${char_id};`})

    })
    .then(res => {
        if (res.status === 200) {
            return res.json();
        }
        else { return null }
    })
    .catch(err => { console.log(err); });

    if (response){
		console.log("Navigating to", locname)
		console.log(response);
		fetchLocation();
		fetchSublocation();
		fetchSubList();
    }
}

function closeMap(){
    document.getElementById('mapNavDiv').style.display = 'none';
    //document.getElementById(mapNavDiv).classList.toggle("active");
}

// Fill the Location Header
async function fetchLocation() {
	let locResponse = await fetch(URL + '/query', {
		method: "POST",
		headers: {
			'Accept': 'application/json',
	    	'Content-Type': 'application/json'
		},
		body: JSON.stringify({query: `SELECT location.* FROM player_character JOIN currently_in ON player_character.character_ID = currently_in.character_ID JOIN is_part_of ON currently_in.sublocation_ID = is_part_of.sublocation_ID JOIN location ON is_part_of.location_ID = location.location_ID WHERE player_character.character_ID = ${char_id}`})
	})
	.then(res => res.json())
	.catch(err => { console.log(err); return null; });

    if (locResponse) {
		console.log(locResponse);
        let locationData = locResponse.query[0];

    	current_region = locationData.region;

		document.getElementById('locationDiv').style.backgroundColor = 'cornsilk';
        document.getElementById('locName').innerHTML = locationData.name;
        document.getElementById('locType').innerHTML = locationData.region + ', ' + locationData.location_type;
        document.getElementById('locDesc').innerHTML = locationData.description;

		fetchConnectedLocations(locationData.location_ID);
	}
}

// Get connected locations
async function fetchConnectedLocations(loc_ID) {
	console.log("Current region:", current_region);
	let locResponse = await fetch(URL + '/query', {
		method: "POST",
		headers: {
			'Accept': 'application/json',
	    	'Content-Type': 'application/json'
		},
		body: JSON.stringify({query: `SELECT connects_to.location_ID_2, (SELECT location.name FROM location WHERE location.location_ID = connects_to.location_ID_2) AS name FROM location JOIN connects_to ON location.location_ID = connects_to.location_ID WHERE location.location_ID = ${loc_ID}`})
	})
	.then(res => res.json())
	.catch(err => { console.log(err); return null; });

	if (locResponse) {
		let connectedLocs = locResponse.query;

		locSwap.replaceChildren();
		connectedLocs.forEach((row) => {
			let locButton = document.createElement('button');
			let buttonDiv = document.createElement('div');
			locButton.onclick = navToLoc;
			locButton.innerText = row.name;
			buttonDiv.appendChild(locButton);
			locSwap.appendChild(buttonDiv);
		});
	}
	else {
		console.log('Error fetching connected locations');
	}
}

// Fill the Sublocation Header
async function fetchSublocation() {
	let subResponse = await fetch(URL + '/query', {
		method: "POST",
		headers: {
			'Accept': 'application/json',
	    	'Content-Type': 'application/json'
		},
		body: JSON.stringify({query: `SELECT sublocation.* FROM player_character JOIN currently_in ON player_character.character_ID = currently_in.character_ID JOIN sublocation ON currently_in.sublocation_ID = sublocation.sublocation_ID WHERE player_character.character_ID = ${char_id}`})
	})
	.then(res => res.json())
	.catch(err => { console.log(err); return null; });

    if (subResponse) {
        let sublocData = subResponse.query[0];
		console.log(sublocData)
        document.getElementById('subName').innerHTML = sublocData.name;
        document.getElementById('subType').innerHTML = sublocData.building_type;
        document.getElementById('subDesc').innerHTML = sublocData.description;

        //current_subloc = sublocData.name;
	}
}

// Create the Sublocation Button List
async function fetchSubList() {
	let formatted_subloc = current_subloc.replace(/'/g, "''");
	let subListResponse = await fetch(URL + '/query', {
		method: "POST",
		headers: {
			'Accept': 'application/json',
	    	'Content-Type': 'application/json'
		},
		body: JSON.stringify({query: `SELECT sublocation.* FROM player_character JOIN currently_in ON player_character.character_ID = currently_in.character_ID JOIN is_part_of ON currently_in.sublocation_ID = is_part_of.sublocation_ID JOIN location ON is_part_of.location_ID = location.location_ID JOIN is_part_of AS others_part_of ON location.location_ID = others_part_of.location_ID JOIN sublocation ON others_part_of.sublocation_ID = sublocation.sublocation_ID WHERE player_character.character_ID =  ${char_id} AND sublocation.name != '${formatted_subloc}'` })
	})
	.then(res => res.json())
	.catch(err => { console.log(err); return null; });

    if (subListResponse) {
        document.getElementById('subSwapInfo').textContent = 'Available Travel Locations within ' + current_region + ':';
		subSwap.replaceChildren();
        subListResponse.query.forEach((row) => {
			if (row.name === document.getElementById('subName').innerText) { return; }
        	let subDiv = document.createElement('div')

            let subButton = document.createElement('button');
            subButton.onclick = subSelect;
            subButton.innerText = row.name;
			subDiv.appendChild(subButton);

            subSwap.appendChild(subDiv);
		});
    }
}

// Sublocation select function
async function subSelect(elem) { 
	let name = elem.target.innerText.replace(/'/g, "''");
	console.log("Sublocation selected:", name);
	let selectResponse = await fetch(URL + '/query', {
		method: "POST",
		headers: {
			'Accept': 'application/json',
	    	'Content-Type': 'application/json'
		},
		body: JSON.stringify({query: `UPDATE currently_in SET sublocation_ID = ( SELECT sublocation_ID FROM sublocation WHERE sublocation.name = '${name}') WHERE currently_in.character_ID = ${char_id} `})
	})
	.then(res => res.json())
	.catch(err => { console.log(err); return null; });


	if (selectResponse) {
		current_subloc = elem.target.innerText;
		console.log('Switching location...');
		fetchLocation();
		fetchSublocation();
		//document.getElementById('subSwapDiv').replaceChildren();
		fetchSubList();
	}
	else {
		console.log('SubSelect Error')
	}
}

/* Anish's Code */
// Fetch character information using character ID
async function fetchCharacterInfo() {
    let charResponse = await fetch(URL + '/query', {
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

    if (charResponse) {
        // Assuming response.character is the data received for character
        let characterData = charResponse.query[0];
		document.getElementById('characterDiv').style.backgroundColor = 'cornsilk';
        document.getElementById('charInfo').textContent = 'Character Info:';
        document.getElementById('charName').textContent = characterData.name;
        document.getElementById('charRace').textContent = 'Race: ' + characterData.race;
        document.getElementById('charClass').textContent = 'Class: ' + characterData.class;
        document.getElementById('charTool').textContent = 'Tool Proficiency: ' + characterData.tool_proficiency;
        document.getElementById('charWeapon').textContent = 'Weapon Proficiency: ' + characterData.weapon_proficiency;
        document.getElementById('charHP').textContent = 'Total Health Points: ' + characterData.health_points;
        document.getElementById('charDate').textContent = 'Date Created: ' + characterData.date_created;
    }
}

// Fetch inventory items using character ID
async function fetchInventory() {
    let invResponse = await fetch(URL + '/query', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({query: `SELECT item.type FROM player_character JOIN has_item ON player_character.character_ID = has_item.character_ID JOIN item ON has_item.item_ID = item.item_ID WHERE player_character.character_ID = ${char_id}`})
    })
    .then(res => res.json())
    .catch(err => { console.error(err); return null; });

    if (invResponse) {
		document.getElementById('inventory').style.backgroundColor = 'cornsilk';
        document.getElementById('invInfo').textContent = 'Inventory:';

        let inventory = document.getElementById('inventoryList');
        inventory.innerHTML = ''; // Clear existing items

        // Create a list item for each item in the inventory
        invResponse.query.forEach(item => {
			console.log(item.type)
            let listItem = document.createElement('li');
            listItem.textContent = '	' + item.type;
            inventory.appendChild(listItem);
        });
    }
}


// Assign functions to elements
//testButton.onclick = itemQuery;
loginButton.onclick = login;
switchButton.onclick = signOrLog;
mapNavButton.onclick = openMap;
charSelectButton.onclick = listChars;

// Assign functions to elements
//testButton.onclick = itemQuery;
loginButton.onclick = login;
switchButton.onclick = signOrLog;

