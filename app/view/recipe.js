import React, { Component } from 'react';
import { StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import Header from '../components/header';
import IngredientsList from '../components/list';

export default class Recipe extends Component {
	render() {
		const { food } = this.props.route.params;
		return (
			<SafeAreaView style={styles.mainView}>
				<ScrollView>
					<Header bookmark={'star-outline'} label={food['label']} source={food['source']} />
					<IngredientsList
						img={food['image']}
						ingredients={food['ingredientLines']}
						source={food['source']}
					/>
				</ScrollView>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	mainView: {
		flex: 1,
		width: '100%'
	}
});
