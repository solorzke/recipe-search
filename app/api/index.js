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
	constructor(items = 0, complex_items = [ { cuisines: [], meal: '', diet: '', calories: 0 } ]) {
		const _API = require('./token');
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

	/* Send a HTTP request for a complex recipe search */
	async requestComplexSearch(callback) {
		try {
			let requestString = this.returnComplexSearchURL() + this.returnAuth() + this.returnComplexSearchParams();
			await fetch(requestString).then((payload) => payload.json()).then((payload) => {
				let data = [];
				for (let item of payload['results'])
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

				if (typeof callback === 'function') {
					callback(data);
				}
			});
		} catch (error) {
			console.log(error);
			alert("Couldn't connect to the server. Try again or check your internet connection.");
			callback(false);
		}
	}

	/* Parse the ingredient list array and return its relevant data */
	returnIngredientsList = (payload) => {
		let data = [];
		if (payload == null || payload.length < 0) return [ 'Not available' ];
		for (let ingredient of payload) data.push(ingredient['original']);
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

	/* Return a default source name if not found */
	returnSourceName = (payload) => {
		return payload != null ? payload : 'Spoonacular';
	};

	/* Parse the instructions list array and return its relevant data */
	returnInstructions = (steps) => {
		let data = [];
		if (steps == null) return [ false ];
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
		return data.length == 0 || data == null ? [ false ] : data;
	};

	/* Return the weight watchers rating */
	returnWeightWatchersRating = (payload) => {
		return payload['weightWatcherSmartPoints'] != null ? payload['weightWatcherSmartPoints'] : 0;
	};

	/* Return the params for the api request url */
	returnIngredientsParams = () => {
		return this.items !== 'NONE' ? this.items.join() : '';
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
		let data = '';
		const cuisines = this.complex_items[0]['cuisines'];
		const meal = this.complex_items[0]['meal'];
		const diet = this.complex_items[0]['diet'];
		const calories = this.complex_items[0]['calories'];
		const ingredients = this.returnIngredientsParams();
		cuisines.length > 0 ? (data = data.concat(`&cuisines=${cuisines.join()}`)) : null;
		meal.length > 0 ? (data = data.concat(`&type=${meal}`)) : null;
		diet.length > 0 ? (data = data.concat(`&diet=${diet}`)) : null;
		ingredients.length > 0 ? (data = data.concat(`&includeIngredients=${ingredients}`)) : null;
		calories > 0 ? (data = data.concat(`&maxCalories=${calories}`)) : null;
		if (data.length === 0) throw new Error('PARAMS NOT FOUND');
		data = data.concat('&addRecipeInformation=true&instructionsRequired=true&fillIngredients=true&number=10');
		return data;
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
