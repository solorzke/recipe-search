const unirest = require('unirest');
const api = require('./token');

const API_KEY = api.key;
const API_ID = api.id;

let requestString = 'https://api.edamam.com/search?q=chicken';
requestString = requestString + '&app_id=' + API_ID + '&app_key=' + API_KEY + '&to=1';
unirest.get(requestString).end(function(result) {
	console.log(result.body.hits[0]);

	console.log('not here');
});
