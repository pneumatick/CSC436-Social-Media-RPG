const testButton = document.getElementById('test');

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

testButton.onclick = itemQuery;
