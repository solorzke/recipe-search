import React, { Component } from 'react';
import { StyleSheet, ScrollView, SafeAreaView, View, Text } from 'react-native';
import Header from '../components/recipe/header';
import IngredientsList from '../components/recipe/ingredientslist';
import LabelsList from '../components/recipe/labelslist';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

export default class Recipe extends Component {
	state = {
		bookmark: false,
		bookmark_name: 'star-outline',
		bookmark_color: 'gray'
	};

	/* Toggle the boolean value for the pressed bookmark icon  */
	toggleBookmark = () => {
		if (this.state.bookmark) {
			this.setState({
				bookmark: false,
				bookmark_name: 'star-outline',
				bookmark_color: 'gray'
			});
		} else {
			this.setState({
				bookmark: true,
				bookmark_name: 'star',
				bookmark_color: '#d4af37'
			});
		}
	};

	render() {
		const { food } = this.props.route.params;
		const Tab = createMaterialTopTabNavigator();

		const InstructionsScreen = () => {
			return (
				<SafeAreaView style={styles.mainView}>
					<ScrollView>
						<Header
							label={food['label']}
							source={food['source']}
							bookmarkOptions={[
								() => this.toggleBookmark(),
								this.state.bookmark_name,
								this.state.bookmark_color
							]}
						/>
						<IngredientsList
							img={food['image']}
							ingredients={food['ingredientLines']}
							source={food['source']}
						/>
						<LabelsList
							dietItems={food['dietLabels']}
							healthItems={food['healthLabels']}
							cautionItems={food['cautions']}
						/>
					</ScrollView>
				</SafeAreaView>
			);
		};

		const RecipeInfo = () => {
			return (
				<View>
					<Text>Hello</Text>
				</View>
			);
		};

		return (
			<Tab.Navigator>
				<Tab.Screen name="Instructions" component={InstructionsScreen} />
				<Tab.Screen name="Information" component={RecipeInfo} />
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
