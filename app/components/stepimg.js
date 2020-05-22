import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StepNumber = (props) => {
	return (
		<View style={styles.mainView}>
			<Text style={{ color: '#fff', fontWeight: 'bold' }}>{props.number}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	mainView: {
		backgroundColor: '#ffae19',
		borderRadius: 50,
		width: 30,
		height: 30,
		alignItems: 'center',
		justifyContent: 'center'
	}
});

export default StepNumber;
