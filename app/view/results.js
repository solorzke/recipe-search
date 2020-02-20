import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import ListItem from '../components/listitem';

export default class Results extends Component {
	render() {
		const payload = this.props.navigation.getParam('data', () => {
			return this.props.navigation.goBack();
		});

		const results = payload.map((recipe, index) => {
			return (
				<ListItem
					title={recipe['label']}
					subtitle={recipe['totalTime']}
					img={recipe['image']}
					calories={recipe['calories']}
					onPress={() => this.props.navigation.navigate('Recipe', { data: recipe })}
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
