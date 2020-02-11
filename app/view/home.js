import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../components/header';
import HeadBar from '../components/head';

export default class Home extends Component {
	render() {
		return (
			<View style={styles.mainView}>
				<HeadBar name={'Home'} />
				<Header name={'Start Cooking'} date={'Jan 01, 2020'} />
				<View style={styles.buttonView}>
					<TouchableOpacity style={styles.button}>
						<Text>Start</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	mainView: {
		flex: 1,
		width: '100%'
	},

	buttonView: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'center'
	},

	button: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'gold',
		height: 300,
		width: 300, //The Width must be the same as the height
		borderRadius: 400
	}
});
