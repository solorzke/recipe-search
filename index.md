# Recipe Search
A mobile application built on the React Native framework that aims to deliver a list of relevant recipe choices based on the list of options provided by the user. The application uses Spoonacular’s API service to provide the recipe data.
Working on Android and iOS.

Expo: https://expo.io/@solorzke/recipe-search

## Deployment
### Features
The application can request recipes via two different types of searches:

- 'Search by Ingredient' meaning fill in all the available ingredients in your kitchen or closest to you to generate the list of recipes that closely match your available ingredients.
- 'Search by Label' meaning select the types of diet, meal course, max calories, and cuisine you would like to generate recipes based off of.
- Able to bookmark or save your favorite recipes locally via cache to view them later via 'Bookmarks' Page without having to search them again.
- Share the recipe you found via SMS, Social Media, or Email.
- Generate a random recipe at the start of the application ('Home Page') to try out.
- Grab all of the recipe data from a third party source API (Spoonacular).
- View the recipe information such as its ingredients, instructions, details, health labels, calories and cooking times.

### How Searching Works
Searching requires one of two types of input from the user. Either he/she adds a list of ingredients that they have available to use near them, or select what type of recipe they are looking for via its diet, meal course, and cuisine type. 

#### Searching by Ingredients
 
[![Demo CountPages alpha](https://j.gifs.com/NLo1Yz.gif)](https://youtu.be/aVkN6Nw1okM)

You can add as many ingredients as you want to the search box and it dyanamically gets rendered to the screen with the option to remove. Once you are ready to search, hit the 'Confirm' button to request a search with those ingredients via Spoonacular's Web API service to return the list of available ingredients matching those ingredients. 

From there, you can view whichever recipes you want and get specific information about how to prepare them.

#### Searching by Labels

[![Demo CountPages alpha](https://j.gifs.com/zvglnr.gif)](https://youtu.be/Ygp5FMV4iWM)

Similar to Searching via Ingredients, you can also class which type of recipes you are looking for based on the cuisine type, meal course, diet type and max amount of calories you're looking for. 

After a validation process concludes the user input is valid, the same process continues: a request is made to the Web API to get the recipes that closely match those labels and render them to the app to view.

### Bookmarks

[![Demo CountPages alpha](https://j.gifs.com/JykXED.gif)](https://youtu.be/Rf3ZF6p3mo8)

You can save any recipes you've found to the application via the Bookmark feature. Simply hit 'Save' and the recipe data gets stored to the application to view later.

### View Recipe Information

[![Demo CountPages alpha](https://j.gifs.com/jZWJAz.gif)](https://youtu.be/aVkN6Nw1okM)

When you view a recipe, you get information that is vital to understanding not only how to prepare this dish, but how nutritional or healthy it is for you. Provided for you are its required ingredients, its instructions, health & nutritional labels, Weight Watchers scale, summary about the dish, and cooking times/calories.
