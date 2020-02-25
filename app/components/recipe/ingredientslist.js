import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class List extends Component {
	produceItems = (items) => {
		return items.map((item, index) => {
			<View style={{ flexDirection: 'row', padding: 10, justifyContent: 'center', alignItems: 'center' }}>
				<Icon name="square-small" size={35} color={'#000'} />
				<Text style={{ paddingHorizontal: 10 }}>{item}</Text>
			</View>;
		});
	};

	render() {
		let items = this.props.ingredients.map((item, index) => {
			return (
				<View style={{ flexDirection: 'row', paddingVertical: 5 }}>
					<Icon name="square-small" size={25} color={'gray'} />
					<Text style={{ alignSelf: 'center', paddingRight: 10 }}>{item}</Text>
				</View>
			);
		});
		return (
			<View style={styles.mainView}>
				<Text style={styles.heading}>Ingredients</Text>
				<View style={styles.listView}>
					<View style={styles.ingredientsList}>{items}</View>
					<View style={styles.imgView}>
						<Image source={{ uri: this.props.img }} style={styles.img} resizeMode={'contain'} />
						<Text style={{ color: '#1976d2', fontStyle: 'italic' }}>{this.props.source}</Text>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	mainView: {
		width: '100%',
		borderBottomWidth: 1,
		borderBottomColor: '#ddd'
	},

	listView: {
		flexDirection: 'row',
		marginVertical: 10
	},

	ingredientsList: {
		flex: 4,
		paddingHorizontal: 10
	},

	imgView: {
		flex: 2,
		alignItems: 'center',
		justifyContent: 'flex-start'
	},

	img: {
		width: 100,
		height: 100,
		borderColor: 'green',
		borderBottomWidth: 5,
		borderLeftWidth: 5,
		borderRightWidth: 5,
		borderRadius: 10
	},

	heading: {
		fontSize: 25,
		fontWeight: 'bold',
		color: 'red',
		paddingHorizontal: 10
	}
});
