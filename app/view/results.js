import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import ListItem from '../components/listitem';

export default class Results extends Component {
	sliceString = (str, limit) => {
		if (str.length > limit) {
			return str.slice(0, limit - 1) + '...';
		} else {
			return str;
		}
	};

	render() {
		const { data } = this.props.route.params;
		const results = data.map((recipe, index) => {
			console.warn(recipe['healthLabels']);
			const labels =
				recipe['healthLabels'].length !== 0 ? recipe['healthLabels'].join(', ') : 'Delicious & Nutritional';
			return (
				<ListItem
					id={index}
					title={this.sliceString(recipe['label'], 50)}
					subtitle={this.sliceString(labels, 60)}
					img={recipe['image']}
					calories={Math.ceil(recipe['calories'])}
					onPress={() => this.props.navigation.navigate('Recipe', { food: recipe })}
				/>
			);
		});

		return (
			<View style={styles.mainView}>
				<ScrollView>{results}</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	mainView: {
		flex: 1,
		width: '100%'
	}
});
