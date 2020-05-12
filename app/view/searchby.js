import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class SearchBy extends Component {
	render() {
		return (
			<View style={styles.mainView}>
				<ScrollView style={styles.container}>
					<TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate('Search')}>
						<Entypo name={'bowl'} size={25} color={'#1976d2'} style={{ paddingRight: 10 }} />
						<View>
							<Text style={styles.title}>Search By Ingredients</Text>
							<Text style={styles.subtitle}>
								Fill in your available ingredients to find matching recipes
							</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.item}
						onPress={() => this.props.navigation.navigate('SearchByLabels')}
					>
						<Ionicons
							name={Platform.OS === 'ios' ? 'ios-list-box' : 'md-list-box'}
							size={25}
							color={'#1976d2'}
							style={{ paddingRight: 10 }}
						/>
						<View>
							<Text style={styles.title}>Search By Type</Text>
							<Text style={styles.subtitle}>
								Search via cuisine types, diets, courses, calories, etc.
							</Text>
						</View>
					</TouchableOpacity>
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	mainView: {
		flex: 1,
		width: '100%',
		backgroundColor: '#fff'
	},

	container: {
		flex: 1,
		marginRight: 20
	},

	item: {
		height: 100,
		width: '100%',
		borderBottomWidth: 1,
		borderColor: '#E8E8E8',
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 10
	},

	title: {
		color: '#1976d2',
		fontSize: 20
	},

	subtitle: {
		color: '#000',
		fontSize: 13,
		width: '90%'
	}
});
