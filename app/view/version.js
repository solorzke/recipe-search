import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Scheme = require('../assets/schemes/scheme');

export default class Version extends Component {
	render() {
		return (
			<View style={styles.mainView}>
				<View style={styles.container}>
					<Icon name={'application'} size={150} color={'#A9A9A9'} />
					<Text style={styles.paragraph}>Recipe Search</Text>
					<Text style={styles.paragraph}>Version: 1.0.1</Text>
					<Text style={styles.paragraph}>Last Update: 04/16/2020</Text>
				</View>
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
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},

	paragraph: {
		textAlign: 'center',
		color: '#A9A9A9'
	}
});
