import React, { Component } from 'react';
import { StyleSheet, ScrollView, SafeAreaView, Text } from 'react-native';
import Header from '../components/recipe/header';
import IngredientsList from '../components/recipe/ingredientslist';
import LabelsList from '../components/recipe/labelslist';
import Steps from '../components/recipe/steps';
import SummarySection from '../components/recipe/summary';
import WeightWatchersSection from '../components/recipe/weightwatchers';
import DetailSection from '../components/recipe/details';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import Share from 'react-native-share';

export default class Recipe extends Component {
	state = {
		bookmark: false,
		bookmark_name: 'star-outline',
		bookmark_color: 'gray',
		save_text: 'Save'
	};

	/* Open the social media applications (if any) available on the user's phone to our social media page */
	onShare = (recipe, source, url) => {
		const shareOptions = {
			title: 'From Recipe Search: ',
			message: 'Check out this recipe I found called "' + recipe + '" from "' + source + '". \n Link: ' + url,
			email: 'mailto:email@example.com',
			failOnCancel: false
			// url: url, //<--- change later when app is ready for distro in app/play stores
		};
		return Share.open(shareOptions);
	};

	componentDidMount() {
		const { food } = this.props.route.params;
		this.cacheCheck(food['id'], food['title']);
	}

	/* Check if the recipe was cached before or not */
	cacheCheck = async (id, title) => {
		try {
			const keys = await AsyncStorage.getAllKeys();
			if (keys.includes(id.toString()) || keys.includes(title)) {
				this.setState({
					bookmark: true,
					bookmark_name: 'star',
					bookmark_color: '#d4af37',
					save_text: 'Saved'
				});
			} else {
				this.setState({
					bookmark: false,
					bookmark_name: 'star-outline',
					bookmark_color: 'gray',
					save_text: 'Save'
				});
			}
		} catch (error) {
			console.log('An error occured checking the cache: ' + error);
			throw new ErrorEvent(error);
		}
	};

	/* Toggle the boolean value for the pressed bookmark icon  */
	toggleBookmark = (recipe) => {
		if (this.state.bookmark) {
			this.setState({
				bookmark: false,
				bookmark_name: 'star-outline',
				bookmark_color: 'gray',
				save_text: 'Save'
			});
			this.cacheRecipe(recipe, false, (bool) => {
				bool ? console.log('Removed Cache recipe...') : console.log('Unable to clear Cache recipe');
			});
		} else {
			this.setState({
				bookmark: true,
				bookmark_name: 'star',
				bookmark_color: '#d4af37',
				save_text: 'Saved'
			});
			this.cacheRecipe(recipe, true, (bool) => {
				bool ? console.log('Removed Cache recipe...') : console.log('Unable to clear Cache recipe');
			});
		}
	};

	/* Bookmark the recipe by cache using Async Storage or dont */
	cacheRecipe = async (recipe, bool, callback) => {
		if (bool) {
			try {
				const id = recipe['id'] !== undefined ? recipe['id'] : recipe['title'];
				const stringified_recipe = JSON.stringify(recipe);
				await AsyncStorage.setItem(id.toString(), stringified_recipe);
				if (typeof callback === 'function') {
					callback(true);
				}
			} catch (error) {
				alert('Unable to cache recipe. Error msg: ' + error);
				if (typeof callback === 'function') {
					callback(false);
				}
				throw new ErrorEvent(error);
			}
		} else {
			try {
				const id = recipe['id'] !== undefined ? recipe['id'] : recipe['title'];
				await AsyncStorage.removeItem(id.toString());
				if (typeof callback === 'function') {
					callback(true);
				}
			} catch (error) {
				alert('Unable to remove cached recipe. Error msg: ' + error);
				if (typeof callback === 'function') {
					callback(false);
				}
				throw new ErrorEvent(error);
			}
		}
	};

	render() {
		const { food } = this.props.route.params;
		const Tab = createMaterialTopTabNavigator();

		/* Tab View Screen showcasing the recipe ingredients and instructions */
		const InstructionsScreen = () => {
			return (
				<SafeAreaView style={styles.mainView}>
					<ScrollView>
						<Header
							label={food['label']}
							source={food['source']}
							url={food['url']}
							onShare={() => this.onShare(food['label'], food['source'], food['url'])}
							bookmarkOptions={[
								() => this.toggleBookmark(food),
								this.state.bookmark_name,
								this.state.bookmark_color,
								this.state.save_text
							]}
						/>
						<IngredientsList
							img={food['image']}
							ingredients={food['ingredientLines']}
							source={food['source']}
							url={food['url']}
							label={food['label']}
						/>
						<Steps steps={food['instructions']} source={food['source']} url={food['url']} />
					</ScrollView>
				</SafeAreaView>
			);
		};

		/* Tab View Screen for information about the recipe */
		const SummaryInfo = () => {
			return (
				<SafeAreaView style={styles.mainView}>
					<ScrollView>
						<LabelsList healthItems={food['healthLabels']} />
						<SummarySection summary={food['summary']} />
						<WeightWatchersSection points={food['ww']} />
						<DetailSection
							prepTime={food['prepTime']}
							cookTime={food['cookTime']}
							likes={food['likes']}
							servings={food['servings']}
						/>
					</ScrollView>
				</SafeAreaView>
			);
		};

		return (
			<Tab.Navigator
				initialRouteName="Instructions"
				tabBarOptions={{
					showIcon: true,
					indicatorStyle: {
						backgroundColor: '#E0115F'
					}
				}}
			>
				<Tab.Screen
					options={{
						tabBarLabel: ({ focused, color }) => {
							const textcolor = focused ? '#E0115F' : color;
							return <Text style={{ color: textcolor }}>STEPS</Text>;
						},
						tabBarIcon: ({ focused, color }) => {
							const colors = focused ? '#E0115F' : color;
							return <Icon name="ios-restaurant" color={colors} size={25} />;
						},
						tabBarAccessibilityLabel: 'Instructions'
					}}
					name="Instructions"
					component={InstructionsScreen}
				/>
				<Tab.Screen
					name="Information"
					component={SummaryInfo}
					options={{
						tabBarLabel: ({ focused, color }) => {
							const textcolor = focused ? '#E0115F' : color;
							return <Text style={{ color: textcolor }}>SUMMARY</Text>;
						},
						tabBarIcon: ({ focused, color }) => {
							const colors = focused ? '#E0115F' : color;
							return <Icon name="md-list-box" color={colors} size={25} />;
						},
						tabBarAccessibilityLabel: 'Summary'
					}}
				/>
			</Tab.Navigator>
		);
	}
}

const styles = StyleSheet.create({
	mainView: {
		flex: 1,
		width: '100%'
	}
});
