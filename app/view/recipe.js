import React, { Component } from 'react';
import { StyleSheet, ScrollView, SafeAreaView, View, Text } from 'react-native';
import Header from '../components/recipe/header';
import IngredientsList from '../components/recipe/ingredientslist';
import LabelsList from '../components/recipe/labelslist';
import Steps from '../components/recipe/steps';
import SummarySection from '../components/recipe/summary';
import WeightWatchersSection from '../components/recipe/weightwatchers';
import DetailSection from '../components/recipe/details';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Recipe extends Component {
	state = {
		bookmark: false,
		bookmark_name: 'star-outline',
		bookmark_color: 'gray',
		save_text: 'Save'
	};

	/* Toggle the boolean value for the pressed bookmark icon  */
	toggleBookmark = () => {
		if (this.state.bookmark) {
			this.setState({
				bookmark: false,
				bookmark_name: 'star-outline',
				bookmark_color: 'gray',
				save_text: 'Save'
			});
		} else {
			this.setState({
				bookmark: true,
				bookmark_name: 'star',
				bookmark_color: '#d4af37',
				save_text: 'Saved'
			});
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
							bookmarkOptions={[
								() => this.toggleBookmark(),
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
