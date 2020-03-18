import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Labels extends Component {
	/* Render Labels */
	renderLabels = (items) => {
		let views = [];
		console.log(items.length);
		if (items.length !== 0) {
			for (item of items) {
				views.push(<Text style={styles.labelText}>{item}</Text>);
			}
		} else {
			return (
				<Text style={styles.labelText} key={'key' + Math.floor(Math.random() * 100)}>
					None Available
				</Text>
			);
		}
		return views;
	};

	render() {
		console.log(this.props.dietItems);
		console.log(this.props.healthItems);
		return (
			<View style={styles.mainView}>
				<Text style={styles.heading}>Health Labels</Text>
				<View style={styles.labelsView}>
					<View style={styles.healthColumn}>
						<Text style={styles.labelTitle}>Health</Text>
						{this.renderLabels(this.props.healthItems)}
					</View>
					<View style={styles.dietColumn}>
						<Text style={styles.labelTitle}>Diet</Text>
						{this.renderLabels(this.props.dietItems)}
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	mainView: {
		width: '100%'
	},

	heading: {
		fontSize: 25,
		fontWeight: 'bold',
		color: '#E0115F',
		paddingHorizontal: 10,
		paddingTop: 10
	},

	healthColumn: {
		flex: 1,
		alignItems: 'center',
		borderRightWidth: 1
	},

	dietColumn: {
		flex: 1,
		alignItems: 'center'
	},

	labelsView: {
		flexDirection: 'row',
		backgroundColor: '#fff',
		marginHorizontal: 5,
		marginTop: 10,
		shadowColor: 'gray',
		shadowOpacity: 2,
		shadowOffset: {
			height: 3,
			width: 3
		},
		elevation: 2,
		borderRadius: 10
	},

	labelTitle: {
		fontSize: 15,
		fontWeight: 'bold'
	},

	labelText: {
		paddingVertical: 5,
		textTransform: 'capitalize'
	}
});
