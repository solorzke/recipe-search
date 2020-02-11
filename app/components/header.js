import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Header = (props) => {
	return (
		<View style={styles.headerView}>
			<Text style={styles.name}>{props.name}</Text>
			<Text style={{ fontSize: 15, color: '#EEF5DB' }}>Player Since: {props.date}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	headerView: {
		flex: 1,
		backgroundColor: '#FE5F55',
		color: 'black',
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 10
	},

	name: {
		fontSize: 35,
		color: '#EEF5DB'
	}
});

export default Header;
