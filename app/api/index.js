/* 
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

	/* Send a HTTP request to the API and handle the response JSON data.  */
	async requestHTTP(callback) {
		try {
			let requestString = this.returnIngredientsURL() + this.returnIngredients() + '&' + this.returnAuth();
			await fetch(requestString)
				.then((response) => {
					return response.json();
				})
				.then((payload) => {
					let ids = [];
					for (let item of payload) {
						ids.push(item['id']);
					}
					const requestString = this.returnRecipeInfoURL() + this.returnAuth() + '&ids=' + ids.join();
					fetch(requestString)
						.then((response) => {
							return response.json();
						})
						.then((payload) => {
							let data = [];
							for (let item of payload) {
								data.push({
									label: payload[item]['title'],
									image: payload[item]['image'],
									source: this.returnSourceName(payload[item]['sourceName']),
									url: payload[item]['sourceUrl'],
									dietLabels: payload[item]['diets'],
									healthLabels: this.returnHealthLabels(payload[item]),
									ingredientLines: this.returnIngredientsList(payload[item]['extendedIngredients']),
									totalTime: payload[item]['readyInMinutes'],
									summary: payload[item]['summary'],
									instructions: this.returnInstructions(payload[item]['analyzedInstructions']),
									ww: this.returnWeightWatchersRating(payload[item]),
									prepTime: payload[item]['preparationMinutes'],
									cookTime: payload[item]['cookingMinutes'],
									likes: payload[item]['aggregateLikes'],
									servings: payload[item]['servings'],
									id: payload[item]['id']
								});
							}
							if (typeof callback === 'function') {
								callback(data);
							}
						});
				});
		} catch (error) {
			console.log(error);
			alert('Request timed out. Try Again.');
		}
	}

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

	/* Return a default source name if not found */
	returnSourceName = (payload) => {
		return payload != null ? payload : 'Spoonacular';
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

	/* Return the api key required to use the API */
	returnAuth = () => {
		return 'apiKey=' + this.getAPIKey();
	};

	/* Use the 'Find the Recipe by Ingredients' interface from Spoonacular's API */
	returnIngredientsURL = () => {
		return 'https://api.spoonacular.com/recipes/findByIngredients?';
	};

	/* Use the 'Find the Recipe by ID' interface from Spoonacular's API */
	returnRecipeInfoURL = () => {
		return 'https://api.spoonacular.com/recipes/informationBulk?';
	};
}
