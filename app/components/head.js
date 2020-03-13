import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HeadBar = (props) => {
	return (
		<View style={styles.bar}>
			<TouchableOpacity onPress={props.onPress}>
				<Icon name="menu" size={33} color="#fff" />
			</TouchableOpacity>
			<Text style={styles.title}>{props.name}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	bar: {
		width: '100%',
		height: Dimensions.get('window').height / 12,
		borderBottomColor: '#11508e',
		borderBottomWidth: 0.5,
		shadowColor: '#000000',
		shadowOffset: {
			width: 0,
			height: 0.5
		},
		shadowRadius: 0.5,
		shadowOpacity: 0.5,
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
