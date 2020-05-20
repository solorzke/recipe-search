import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import ListItem from '../components/listitem';
import Footer from '../components/footer';
const Scheme = require('../assets/schemes/scheme');

export default class Results extends Component {
	/* Shorten the title of the recipe by adding 3 dots  */
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
			const source = recipe['source'].length !== 0 ? 'Source: ' + recipe['source'] : 'Source: Spoonacular.com';
			return (
				<ListItem
					id={'key' + index}
					title={this.sliceString(recipe['label'], 50)}
					subtitle={this.sliceString(source, 60)}
					img={recipe['image']}
					rating={recipe['ww']}
					onPress={() => this.props.navigation.navigate('Recipe', { food: recipe })}
				/>
			);
		});

		return (
			<View style={styles.mainView}>
				<ScrollView>
					<View style={{ borderBottomColor: 'gray', borderBottomWidth: 1 }}>
						<Text style={styles.searchResults}>{results.length} search results found.</Text>
					</View>
					{results}
					<View style={{ paddingVertical: 20 }}>
						<Footer />
					</View>
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	mainView: {
		flex: 1,
		width: '100%',
		backgroundColor: Scheme.subBackground
	},

	searchResults: {
		color: 'gray',
		fontSize: 13,
		textAlign: 'left',
		padding: 10
	}
});
