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
	constructor(items, complex_items = 0) {
		var _API = require('./token');
		this.getAPIKey = () => {
			return _API.key;
		};
		this.items = items;
		this.complex_items = complex_items;
	}

	/* Send a HTTP request for a random recipe */
	async requestRandomRecipe(callback) {
		try {
			let requestString =
				this.returnRandomRecipeURL() + this.returnAuth() + '&' + this.returnRandomRecipeParams();
			await fetch(requestString)
				.then((payload) => {
					return payload.json();
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
		} catch (error) {
			console.log(error);
			alert('Request timed out. Try Again.');
		}
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

	/* Send a HTTP request for a complex recipe search */
	async requestComplexSearch(callback) {
		try {
			let requestString = this.returnComplexSearchURL() + this.returnAuth() + this.returnComplexSearchParams();
			await fetch(requestString).then((payload) => payload.json()).then((payload) => {
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
		} catch (error) {
			console.log(error);
			alert("Couldn't connect to the server. Try again or check your internet connection.");
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

	/* Return arguments for complex search API request */
	returnComplexSearchParams = () => {
		const cuisines = this.complex_items[0]['cuisines'];
		const meal = this.complex_items[0]['meal'];
		const diet = this.complex_items[0]['diet'];
		const calories = this.complex_items[0]['calories'];
		let data = '';
		cuisines.length > 0 ? data.concat(`&cuisines=${cuisines.join()}`) : null;
		meal.length > 0 ? data.concat(`&type=${meal}`) : null;
		diet.length > 0 ? data.concat(`&diet=${diet}`) : null;
		calories > 0 ? data.concat(`&maxCalories=${calories}`) : null;
		if (data.length > 0) {
			data.concat(
				'&addRecipeInformation=true&instructionsRequired=true&fillIngredients=true&number=10&limitLicense=true'
			);
			return data;
		} else {
			throw new Error('PARAMS NOT FOUND');
		}
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

	/* Use the 'Find A Random Recipe' interface from Spoonacular's API */
	returnRandomRecipeURL = () => {
		return 'https://api.spoonacular.com/recipes/random?';
	};

	/* Use the 'Complex Recipe Search' interface from Spoonacular's API */
	returnComplexSearchURL = () => {
		return 'https://api.spoonacular.com/recipes/complexSearch?';
	};
}
