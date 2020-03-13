/* 
Disclaimer: This is the developer API class that is used only for testing.
For production purposes, use the real API class in 'index.js'.

API Class that can be reused to test or request data from the API in service.
API: 'spoonacular'
HTTP Request Package: 'fetch' 

Required: 'API KEY' and <ingredients>
1. request: search recipe id's by ingredients
2. request: search recipe info by recipe id's
*/

export default class API {
	/* Demand an array of ingredient items at the moment of instantiation */
	constructor(items) {
		var _API = require('./token');
		this.getAPIKey = () => {
			return _API.key;
		};
		this.items = items;
	}

	/* For testing purposes, send a http request to a development server */
	async requestHTTP(callback) {
		try {
			let requestString = this.returnRecipeInfoURL() + this.returnIngredients() + '&' + this.returnAuth();
			await fetch(requestString)
				.then((response) => {
					return response.json();
				})
				.then((payload) => {
					let data = [];
					for (let item of payload) {
						data.push({
							label: item['title'],
							image: item['image'],
							source: item['sourceName'],
							url: item['sourceUrl'],
							dietLabels: item['diets'],
							healthLabels: this.returnHealthLabels(item),
							ingredientLines: this.returnIngredientsList(item['extendedIngredients']),
							totalTime: item['readyInMinutes'],
							summary: item['summary'],
							instructions: this.returnInstructions(item['analyzedInstructions']),
							ww: this.returnWeightWatchersRating(item)
						});
					}
					if (typeof callback === 'function') {
						callback(data);
					}
				});
		} catch (error) {
			console.log(error);
			alert('Request timed out. Try Again.');
		}
	}

	/* Use the 'Find the Recipe by ID' interface from Spoonacular's API */
	returnRecipeInfoURL = () => {
		return 'https://web.njit.edu/~kas58/json/index.php?';
	};

	/* Return the api key required to use the API */
	returnAuth = () => {
		return 'apiKey=development';
	};

	/* Parse the ingredient list array and return its relevant data */
	returnIngredientsList = (payload) => {
		let data = [];
		if (payload != null) {
			for (let ingredient of payload) {
				data.push(ingredient['original']);
			}
		} else {
			data.push('Not available');
		}

		return data;
	};

	/* Parse the health label list array and return its relevant data */
	returnHealthLabels = (payload) => {
		let data = [];
		payload['vegetarian'] == true ? data.push('vegetarian') : null;
		payload['vegan'] == true ? data.push('vegan') : null;
		payload['glutenFree'] == true ? data.push('gluten free') : null;
		payload['dairyFree'] == true ? data.push('dairy free') : null;
		payload['sustainable'] == true ? data.push('sustainable') : null;
		data.push('weight watcher smart points: ' + payload['weightWatcherSmartPoints']);
		return data;
	};

	/* Parse the instructions list array and return its relevant data */
	returnInstructions = (steps) => {
		let data = [];
		if (steps != null) {
			for (let i = 0; i < steps.length; i++) {
				if (steps[i].hasOwnProperty('steps')) {
					const label = steps[i]['name'] != '' ? steps[i]['name'] : 'Instruction:';
					data[i] = [ { name: label } ];
					for (let instruction of steps[i]['steps']) {
						if (instruction.hasOwnProperty('step') && instruction.hasOwnProperty('number')) {
							data[i].push({
								number: instruction['number'],
								instruction: instruction['step']
							});
						}
					}
				}
			}
		} else {
			data.push(false);
		}

		if (data.length == 0 || data == null) {
			data = [ false ];
			return data;
		} else {
			return data;
		}
	};

	/* Return the weight watchers rating */
	returnWeightWatchersRating = (payload) => {
		return payload['weightWatcherSmartPoints'] != null ? payload['weightWatcherSmartPoints'] : 0;
	};

	/* Return the params for the api request url */
	returnIngredients = () => {
		return 'ingredients=' + this.items.join();
	};
}