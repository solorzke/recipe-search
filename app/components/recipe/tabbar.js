import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class TabBar extends Component {
	render() {
		return (
			<View style={styles.mainView}>
				<TouchableOpacity style={styles.tabView} onPress={this.props.onRecipePress}>
					<Icon name={'list_alt'} size={35} color="#000" />
					<Text>Recipe</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.tabView} onPress={this.props.onDescPress}>
					<Icon name={'description'} size={35} color="#000" />
					<Text>Description</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	mainView: {
		width: Dimensions.get('window').width,
		height: 200,
		flexDirection: 'row',
		backgroundColor: '#fff'
	},

	tabView: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	}
});
