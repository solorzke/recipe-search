import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const InputBox = (props) => {
	return (
		<TextInput placeholder={'Ingredient'} style={styles.input} onChangeText={(text) => this.setState({ text })} />
	);
};

const styles = StyleSheet.create({
	input: {
		borderColor: 'gray',
		borderBottomWidth: 1,
		height: 50,
		backgroundColor: '#E8E8E8'
	}
});

export default InputBox;
