import React, { Component } from 'react';
import { Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

export default class Recipe extends Component {
	render() {
		const { recipe } = this.props.route.params;
		return (
			<SafeAreaView style={styles.mainView}>
				<ScrollView>
					<Text>Hello</Text>
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
