import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import ListItem from '../components/listitem';

export default class Results extends Component {
	render() {
		const { data } = this.props.route.params;
		const results = data.map((recipe, index) => {
			return (
				<ListItem
					id={index}
					title={recipe['label']}
					subtitle={recipe['totalTime']}
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
