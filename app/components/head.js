import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HeadBar = (props) => {
	return (
		<View style={styles.bar}>
			<TouchableOpacity onPress={props.onPress}>
				<Icon name="menu" size={35} color="#fff" />
			</TouchableOpacity>
			<Text style={styles.title}>{props.name}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	bar: {
		width: '100%',
		height: '10%',
		shadowColor: '#000000',
		shadowOffset: {
			width: 0,
			height: 0.5
		},
		shadowRadius: 5,
		shadowOpacity: 1.0,
		elevation: 5,
		alignItems: 'center',
		flexDirection: 'row',
		paddingLeft: 15,
		backgroundColor: '#1976d2'
	},
	title: {
		color: '#fff',
		fontSize: 20,
		marginLeft: 20
	}
});
export default HeadBar;
