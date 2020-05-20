import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import HeadBar from '../components/head';
import Status from '../components/statusbar';
import Card from '../components/card';
import Animation1 from '../assets/animations/food-carousel.json';
import Animation2 from '../assets/animations/random.json';
import Animation3 from '../assets/animations/search-ask.json';
import API from '../api/index';

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			payload: [ { label: 'Please Wait...' } ]
		};
	}

	/* Change the style for the card components */
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
		const api = new API();
		api.requestRandomRecipe((data) => {
			if (data) this.setRandomRecipeState(data);
		});
	}

	/* Set the random recipe state  */
	setRandomRecipeState = (data) => {
		this.setState({
			payload: data
		});
	};

	render() {
		return (
			<View style={styles.mainView}>
				<Status barStyle={'light-content'} />
				<HeadBar name={'Home'} onPress={() => this.props.navigation.toggleDrawer()} />
				<ScrollView style={styles.buttonView}>
					<Card
						onPress={() => this.props.navigation.navigate('Search By')}
						title={'Start Finding Recipes'}
						subtitle={'Fill in available ingredients to generate recipes'}
						background={this.returnStyle('#ff9a72')}
						animation={Animation1}
						animate={true}
					/>
					<Card
						onPress={() => this.props.navigation.navigate('Recipe', { food: this.state.payload[0] })}
						title={'Recipe Of The Day'}
						subtitle={this.state.payload[0]['label']}
						background={this.returnStyle('#4ec9ff')}
						animate={true}
						animation={Animation2}
					/>
					<Card
						onPress={() => this.props.navigation.navigate('FAQ')}
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
