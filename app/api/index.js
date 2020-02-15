/* 
API Class that can be reused to test or request data from the API in service.
API: 'edamam'
HTTP Request Package: 'unirest' 

Required: 'API KEY' and 'API ID' and <query search>
*/
export default class API {
	constructor(items) {
		var _API = require('./token');
		this.getAPIKey = () => {
			return _API.key;
		};
		this.getAPIId = () => {
			return _API.id;
		};
		this.items = items;
		this.unirest = require('unirest');
	}

	requestHTTP = (callback) => {
		let requestString = 'https://api.edamam.com/search?' + this.returnIngredients() + '&' + this.returnAuth();
		this.unirest.get(requestString).end((result) => {
			let data = [];
			for (let item of result.body.hits) {
				data.push({
					label: item['recipe']['label'],
					image: item['recipe']['image'],
					source: item['recipe']['source'],
					url: item['recipe']['url'],
					dietLabels: item['recipe']['dietLabels'],
					healthLabels: item['recipe']['healthLabels'],
					cautions: item['recipe']['cautions'],
					ingredientLines: item['recipe']['ingredientLines'],
					calories: item['recipe']['calories'],
					totalTime: item['recipe']['totalTime'],
					digest: item['recipe']['digest']
				});
			}
			if (typeof callback === 'function') {
				callback(data);
			}
		});
	};

	returnIngredients = () => {
		return 'q=' + this.items.join();
	};

	returnAuth = () => {
		return 'app_id=' + this.getAPIId() + '&app_key=' + this.getAPIKey();
	};
}
