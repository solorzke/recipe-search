import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

export default class List extends Component {
	produceItems = (items) => {
		return items.map((item, index) => {
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<Icon name="square-small" size={35} color={'#000'} />
				<Text>{item}</Text>
			</View>;
		});
	};

	render() {
		let items = this.props.ingredients.map((item, index) => {
			return (
				<View style={{ flexDirection: 'row', paddingVertical: 5, alignItems: 'center' }}>
					<FontAwesomeIcon name="cookie" size={10} color={'brown'} style={{ paddingRight: 5 }} />
					<Text style={{ alignSelf: 'center', paddingRight: 30 }}>{item}</Text>
				</View>
			);
		});
		return (
			<View style={styles.mainView}>
				<Text style={styles.heading}>Ingredients</Text>
				<View style={styles.listView}>
					<View style={styles.imgView}>
						<Image source={{ uri: this.props.img }} style={styles.img} />
						<Text style={styles.source}>{this.props.source}</Text>
					</View>
					<View style={styles.ingredientsList}>{items}</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	mainView: {
		borderBottomWidth: 1,
		borderBottomColor: '#ddd'
	},

	listView: {
		marginVertical: 10,
		paddingHorizontal: 10
	},

	ingredientsList: {},

	imgView: {},

	img: {
		width: Dimensions.get('window').width / 1.2,
		height: Dimensions.get('window').height / 4,
		borderRadius: 10,
		alignSelf: 'center',
		justifyContent: 'center'
	},

	source: {
		color: '#1976d2',
		fontStyle: 'italic',
		alignSelf: 'flex-end',
		marginHorizontal: Dimensions.get('window').width / 10,
		marginVertical: 10
	},

	heading: {
		fontSize: 25,
		fontWeight: 'bold',
		color: '#E0115F',
		paddingHorizontal: 10
	}
});
