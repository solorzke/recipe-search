import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FontListoIcon from 'react-native-vector-icons/Fontisto';
import MaterialDesignIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Details extends Component {
	render() {
		return (
			<View style={styles.mainView}>
				<Text style={styles.heading}>Details</Text>
				<Text style={styles.detail}>
					<Text style={{ fontWeight: 'bold' }}>
						<Icon name={'clock'} color={'gray'} size={15} /> Prep Time:{' '}
					</Text>
					{this.props.prepTime} minutes
				</Text>
				<Text style={styles.detail}>
					<Text style={{ fontWeight: 'bold' }}>
						<Icon name={'clock'} color={'gray'} size={15} /> Cook Time:{' '}
					</Text>
					{this.props.cookTime} minutes
				</Text>
				<Text style={styles.detail}>
					<Text style={{ fontWeight: 'bold' }}>
						<FontListoIcon name={'like'} color={'#d4af37'} size={15} /> Likes:{' '}
					</Text>
					{this.props.likes}
				</Text>
				<Text style={styles.detail}>
					<Text style={{ fontWeight: 'bold' }}>
						<MaterialDesignIcon name={'silverware-variant'} color={'gray'} size={15} /> Servings:{' '}
					</Text>
					{this.props.prepTime}
				</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	mainView: {
		borderBottomWidth: 1,
		borderBottomColor: '#ddd',
		paddingHorizontal: 10
	},

	heading: {
		fontSize: 25,
		fontWeight: 'bold',
		color: '#E0115F',
		paddingTop: 10
	},

	detail: {
		paddingVertical: 10,
		fontSize: 15
	}
});
