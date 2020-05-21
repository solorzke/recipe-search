import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import ListItem from '../components/listitem';
import Footer from '../components/footer';
const Scheme = require('../assets/schemes/scheme');

Header = ({ resultsNumber }) => {
	return (
		<View style={{ borderBottomColor: 'gray', borderBottomWidth: 1 }}>
			<Text style={styles.searchResults}>{resultsNumber} search results found.</Text>
		</View>
	);
};

/* Return a view that notifies the list is empty whenever no ingredients have been added */
Empty = () => {
	return (
		<View style={{ padding: 20, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' }}>
			<MaterialIcons name={'shopping-basket'} size={40} color={'grey'} />
			<Text style={{ color: 'grey', fontSize: 16, paddingVertical: 15 }}>List Is Empty</Text>
		</View>
	);
};

export default class Results extends Component {
	constructor(props) {
		super(props);
		const { data } = this.props.route.params;
		this.results = data;
	}

	/* Shorten the title of the recipe by adding 3 dots  */
	sliceString = (str, limit) => {
		return str.length > limit ? str.slice(0, limit - 1) + '...' : str;
	};

	/* Set a placeholder for subtitle in case the source is non-existent */
	setSource = (source) => {
		return source.length !== 0 ? `Source: ${source}` : 'Source: Spoonacular.com';
	};

	render() {
		return (
			<View style={styles.mainView}>
				<FlatList
					ListHeaderComponent={<Header resultsNumber={this.results.length} />}
					ListEmptyComponent={<Empty />}
					ListFooterComponent={<Footer />}
					contentContainerStyle={{ flexGrow: 1 }}
					keyExtractor={(y, z) => z.toString()}
					ListFooterComponentStyle={{ flex: 1, justifyContent: 'flex-end' }}
					data={this.results}
					renderItem={(recipe) => {
						return (
							<ListItem
								title={this.sliceString(recipe['item']['label'], 50)}
								subtitle={this.sliceString(this.setSource(recipe['item']['source']), 60)}
								img={recipe['item']['image']}
								rating={recipe['item']['ww']}
								onPress={() => this.props.navigation.navigate('Recipe', { food: recipe['item'] })}
							/>
						);
					}}
				/>
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
