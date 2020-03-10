import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import HeadBar from '../components/head';
import Status from '../components/statusbar';
import Card from '../components/card';
import Background from '../assets/images/card.png';
import Background2 from '../assets/images/card2.png';
import Background3 from '../assets/images/3255.jpg';
import API from '../api/developer';

export default class Home extends Component {
	render() {
		return (
			<View style={styles.mainView}>
				<Status barStyle={'light-content'} />
				<HeadBar name={'Home'} onPress={() => this.props.navigation.toggleDrawer()} />
				<ScrollView style={styles.buttonView}>
					<Card
						onPress={() => this.props.navigation.navigate('Search')}
						title={'Start Finding Recipes'}
						subtitle={'Fill in available ingredients to generate recipes'}
						background={Background}
					/>
					<Card
						onPress={() => this.props.navigation.navigate('Search')}
						title={'Discover How It Works'}
						subtitle={'Learn about how we generate your recipes in the app'}
						background={Background2}
					/>
					<Card
						onPress={() => this.props.navigation.navigate('Search')}
						title={'Frequently Asked Questions'}
						subtitle={'Have questions? Check out our FAQ section'}
						background={Background3}
					/>
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	mainView: {
		flex: 1,
		width: '100%'
	},

	buttonView: {
		flex: 2,
		paddingHorizontal: 10
	},

	button: {
		justifyContent: 'center',
		alignItems: 'center'
	}
});
