import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HeadBar = (props) => {
	return (
		<View style={styles.bar}>
			<TouchableOpacity>
				<Icon name="menu" size={35} color="red" />
			</TouchableOpacity>
			<Text style={{ fontSize: 20 }}>{props.name}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	bar: {
		width: '100%',
		height: '10%',
		shadowColor: 'red',
		shadowOffset: {
			width: 0,
			height: 3
		},
		shadowOpacity: 1,
		shadowRadius: 4.65,
		elevation: 1,
		alignItems: 'center',
		flexDirection: 'row',
		paddingLeft: 15
	}
});
export default HeadBar;
