import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import HeadBar from '../components/head';
import Status from '../components/statusbar';
import Card from '../components/card';
import Animation1 from '../assets/animations/food-carousel.json';
import Animation2 from '../assets/animations/analytics.json';
import Animation3 from '../assets/animations/search-ask.json';

export default class Home extends Component {
	returnStyle = (color) => {
		return {
			width: '100%',
			height: 200,
			justifyContent: 'center',
			alignItems: 'center',
			borderTopLeftRadius: 10,
			borderTopRightRadius: 10,
			backgroundColor: color
		};
	};

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
						background={this.returnStyle('#ff9a72')}
						animation={Animation1}
					/>
					<Card
						onPress={() => this.props.navigation.navigate('Search')}
						title={'Discover How It Works'}
						subtitle={'Learn about how we generate your recipes in the app'}
						background={this.returnStyle('#4ec9ff')}
						animation={Animation2}
					/>
					<Card
						onPress={() => this.props.navigation.navigate('Search')}
						title={'Frequently Asked Questions'}
						subtitle={'Have questions? Check out our FAQ section'}
						background={this.returnStyle('#ffc74c')}
						animation={Animation3}
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
