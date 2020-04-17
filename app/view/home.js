import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import HeadBar from '../components/head';
import Status from '../components/statusbar';
import Card from '../components/card';
import Animation1 from '../assets/animations/food-carousel.json';
import Animation2 from '../assets/animations/analytics.json';
import Animation3 from '../assets/animations/search-ask.json';
import API from '../api/developer';
const api = new API([ 99999 ]);

export default class Home extends Component {
	state = {
		payload: [ { label: 'Please Wait...', image: '../assets/images/photo.png' } ]
	};

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

	componentDidMount() {
		api.requestRandomRecipe((data) => {
			this.setState({
				payload: data
			});
		});
	}

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
						animate={true}
					/>
					<Card
						onPress={() => this.props.navigation.navigate('Search')}
						title={'Recipe Of The Day'}
						subtitle={this.state.payload[0]['label']}
						background={this.returnStyle('#4ec9ff')}
						animate={false}
						img={this.state.payload[0]['image']}
					/>
					<Card
						onPress={() => this.props.navigation.navigate('Search')}
						title={'Frequently Asked Questions'}
						subtitle={'Have questions? Check out our FAQ section'}
						background={this.returnStyle('#ffc74c')}
						animation={Animation3}
						animate={true}
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
