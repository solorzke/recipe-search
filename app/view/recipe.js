import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Recipe extends Component {
	render() {
		return (
			<View>
				<Text>Hello</Text>
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
