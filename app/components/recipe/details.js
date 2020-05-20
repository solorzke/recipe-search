import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FontListoIcon from 'react-native-vector-icons/Fontisto';
import MaterialDesignIcon from 'react-native-vector-icons/MaterialCommunityIcons';
const Scheme = require('../../assets/schemes/scheme');

export default class Details extends Component {
	/* Check if there are cooking times available */
	returnTime = (time) => {
		return time === undefined ? 'Information not available' : time + ' minutes';
	};

	/* Check if there are Likes available */
	returnLikes = (likes) => {
		return likes === undefined ? 'Information not available' : likes;
	};

	/* Check if there are Servings available */
	returnServings = (servings) => {
		return servings === undefined ? 'Information not available' : servings;
	};

	render() {
		return (
			<View style={styles.mainView}>
				<Text style={styles.heading}>Details</Text>
				<Text style={styles.detail}>
					<Text style={{ fontWeight: 'bold' }}>
						<Icon name={'clock'} color={'gray'} size={15} /> Prep Time:{' '}
					</Text>
					{this.returnTime(this.props.prepTime)}
				</Text>
				<Text style={styles.detail}>
					<Text style={{ fontWeight: 'bold' }}>
						<Icon name={'clock'} color={'gray'} size={15} /> Cook Time:{' '}
					</Text>
					{this.returnTime(this.props.cookTime)}
				</Text>
				<Text style={styles.detail}>
					<Text style={{ fontWeight: 'bold' }}>
						<FontListoIcon name={'like'} color={'#d4af37'} size={15} /> Likes:{' '}
					</Text>
					{this.returnLikes(this.props.likes)}
				</Text>
				<Text style={styles.detail}>
					<Text style={{ fontWeight: 'bold' }}>
						<MaterialDesignIcon name={'silverware-variant'} color={'gray'} size={15} /> Servings:{' '}
					</Text>
					{this.returnServings(this.props.servings)}
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
		color: Scheme.labelText,
		paddingTop: 10
	},

	detail: {
		paddingVertical: 10,
		fontSize: 15
	}
});
