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
	constructor(items, complex = 0) {
		var _API = require('./token');
		this.getAPIKey = () => {
			return _API.key;
		};
		this.items = items;
	}

	/* Send a HTTP request for a random recipe */
	async requestRandomRecipe(callback) {
		try {
			let requestString = this.returnRandomRecipeURL() + this.returnAuthRandom();
			await fetch(requestString)
				.then((payload) => {
					return payload.json();
				})
				.then((payload) => {
					let data = [];
					for (let item of payload['recipes']) {
						data.push({
							label: item['title'],
							image: item['image'],
							source: this.returnSourceName(item['sourceName']),
							url: item['sourceUrl'],
							dietLabels: item['diets'],
							healthLabels: this.returnHealthLabels(item),
							ingredientLines: this.returnIngredientsList(item['extendedIngredients']),
							totalTime: item['readyInMinutes'],
							summary: item['summary'],
							instructions: this.returnInstructions(item['analyzedInstructions']),
							ww: this.returnWeightWatchersRating(item),
							prepTime: item['preparationMinutes'],
							cookTime: item['cookingMinutes'],
							likes: item['aggregateLikes'],
							servings: item['servings'],
							id: item['id']
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

	/* For testing purposes, send a http request to a development server */
	async requestHTTP(callback) {
		try {
			let requestString = this.returnRecipeInfoURL() + this.returnIngredients() + '&' + this.returnAuth();
			await fetch(requestString).then((response) => response.json()).then((payload) => {
				let data = [];
				for (let item of payload) {
					data.push({
						label: item['title'],
						image: item['image'],
						source: this.returnSourceName(item['sourceName']),
						url: item['sourceUrl'],
						dietLabels: item['diets'],
						healthLabels: this.returnHealthLabels(item),
						ingredientLines: this.returnIngredientsList(item['extendedIngredients']),
						totalTime: item['readyInMinutes'],
						summary: item['summary'],
						instructions: this.returnInstructions(item['analyzedInstructions']),
						ww: this.returnWeightWatchersRating(item),
						prepTime: item['preparationMinutes'],
						cookTime: item['cookingMinutes'],
						likes: item['aggregateLikes'],
						servings: item['servings'],
						id: item['id']
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

	/* For testing purposes, send a http request to the dev server for complex search mockup */
	async requestComplexSearch(callback) {
		try {
			let requestString = this.returnComplexSearchURL() + this.returnAuthComplex();
			await fetch(requestString).then((response) => response.json()).then((payload) => {
				let data = [];
				for (let item of payload['results']) {
					data.push({
						label: item['title'],
						image: item['image'],
						source: this.returnSourceName(item['sourceName']),
						url: item['sourceUrl'],
						dietLabels: item['diets'],
						healthLabels: this.returnHealthLabels(item),
						ingredientLines: this.returnIngredientsList(item['extendedIngredients']),
						totalTime: item['readyInMinutes'],
						summary: item['summary'],
						instructions: this.returnInstructions(item['analyzedInstructions']),
						ww: this.returnWeightWatchersRating(item),
						prepTime: item['preparationMinutes'],
						cookTime: item['cookingMinutes'],
						likes: item['aggregateLikes'],
						servings: item['servings'],
						id: item['id']
					});
				}
				if (typeof callback === 'function') {
					callback(data);
				}
			});
		} catch (error) {
			console.log(error);
			alert("Couldn't connect to the server. Try again or check your internet connection.");
		}
	}

	/* Use the 'Find the Recipe by ID' interface from Spoonacular's API */
	returnRecipeInfoURL = () => {
		return 'https://web.njit.edu/~kas58/json/index.php?';
	};

	/* Return arguments for random recipe API request */
	returnRandomRecipeParams = () => {
		const diets = [
			'vegetarian',
			'vegan',
			'gluten free',
			'dairy free',
			'dessert',
			'cheap',
			'main course',
			'side dish',
			'appetizer',
			'salad'
		];
		const tag = diets[Math.floor(Math.random() * diets.length)];
		return 'limitLicense=true&tags=' + tag + '&number=1';
	};

	/* Return the api key required to use the API */
	returnAuth = () => {
		return 'apiKey=development';
	};

	returnAuthRandom = () => {
		return 'apiKey=random';
	};

	returnAuthComplex = () => {
		return 'apiKey=complex';
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

	/* Return a default source name if not found */
	returnSourceName = (payload) => {
		return payload != null ? payload : 'Spoonacular';
	};

	/* Return the weight watchers rating */
	returnWeightWatchersRating = (payload) => {
		return payload['weightWatcherSmartPoints'] != null ? payload['weightWatcherSmartPoints'] : 0;
	};

	/* Return the params for the api request url */
	returnIngredients = () => {
		return 'ingredients=' + this.items.join();
	};

	/* Use the 'Find A Random Recipe' interface from Spoonacular's API */
	returnRandomRecipeURL = () => {
		return 'https://web.njit.edu/~kas58/json/index.php?';
	};

	/* Use the 'Complex Recipe Search' interface from Spoonacular's API */
	returnComplexSearchURL = () => {
		return 'https://web.njit.edu/~kas58/json/index.php?';
	};
}
