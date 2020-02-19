import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

/*
Props: 
items: [] of items
onChangeText: pass function to update state of the text being entered in

*/
const InputBox = (props) => {
	return props.items.map((item, id) => (
		<View style={styles.areaView} key={id}>
			<TouchableOpacity style={styles.cancelBtn}>
				<Icon name="cancel" size={30} color="#000" />
			</TouchableOpacity>
			<View style={styles.input}>
				<TextInput
					style={styles.text}
					placeholder={'IngredientIngredientIngredientIngredient'}
					onChangeText={props.onChangeText}
					maxLength={40}
					autoCorrect={true}
				/>
			</View>
		</View>
	));
};

const styles = StyleSheet.create({
	areaView: {
		width: '98%',
		height: 100,
		marginVertical: 10,
		justifyContent: 'center',
		borderRadius: 100 / 2,
		backgroundColor: '#DDD'
		// alignItems: 'center'
	},

	cancelBtn: {
		width: 36, //Width/Height have to be bigger than Icon Size
		height: 36,
		borderWidth: 2,
		borderColor: '#f0f',
		borderRadius: 8,
		backgroundColor: '#DDD',
		position: 'absolute',
		top: 0, //Top and Left control the positioning of the Button.
		left: 0,
		zIndex: 5
	},

	input: {
		backgroundColor: 'orange',
		marginHorizontal: '10%'
	},

	text: {
		color: '#000',
		fontSize: 15,
		borderBottomColor: '#000',
		borderBottomWidth: 1
	}
});

export default InputBox;
