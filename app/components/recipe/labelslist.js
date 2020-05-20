import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import Heart from '../../assets/animations/heart.json';
const Scheme = require('../../assets/schemes/scheme');

export default class Labels extends Component {
	/* Render Labels */
	renderLabels = (items) => {
		let views = [];
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

	/* Render Description */
	renderDescription = (items) => {
		let views = [];
		if (items.length !== 0) {
			for (item of items) {
				switch (item) {
					case 'vegetarian':
						views.push(
							<Text style={styles.labelText}>
								It does not include any meat, poultry, or seafood. It is a meal plan made up of foods
								that come mostly from plants.
							</Text>
						);
						break;
					case 'vegan':
						views.push(
							<Text style={styles.labelText}>
								Is devoid of all animal products, including meat, eggs and dairy.
							</Text>
						);
						break;
					case 'gluten free':
						views.push(
							<Text style={styles.labelText}>
								Involves excluding foods that contain the protein gluten, including wheat, rye and
								barley.
							</Text>
						);
						break;
					case 'dairy free':
						views.push(
							<Text style={styles.labelText}>
								Avoid all or most foods containing milk, milk proteins like casein and whey and/or milk
								sugar/lactose.
							</Text>
						);
						break;
					case 'very healthy':
						views.push(
							<Text style={styles.labelText}>
								Eating a variety of foods that give you the nutrients you need to maintain your health,
								feel good, and have energy. These nutrients include protein, carbohydrates, fat, water,
								vitamins, and minerals.
							</Text>
						);
						break;
					case 'cheap':
						views.push(
							<Text style={styles.labelText}>
								Foods whose ingredients are found to be cheap or low in price at markets and stores.
							</Text>
						);
						break;
					case 'very popular':
						views.push(
							<Text style={styles.labelText}>
								Dish that has been frequently requested/viewed by many users to consume.
							</Text>
						);
						break;
					case 'sustainable':
						views.push(
							<Text style={styles.labelText}>
								Provides a healthy balance to strengthen or support your body and mind.
							</Text>
						);
						break;
					default:
						views.push(<Text style={styles.labelText}>No information available.</Text>);
						break;
				}
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
		return (
			<View style={styles.mainView}>
				<Text style={styles.heading}>Health Labels</Text>
				<View style={styles.labelsView}>
					<View
						style={{
							backgroundColor: '#CC0B59',
							borderTopLeftRadius: 10,
							borderTopRightRadius: 10,
							borderBottomColor: '#000',
							borderBottomWidth: 1,
							paddingVertical: 10
						}}
					>
						<LottieView source={Heart} progress={0.5} autoPlay={true} style={styles.anim} />
					</View>
					<View style={{ flexDirection: 'row' }}>
						<View style={styles.healthColumn}>
							<Text style={styles.labelTitle}>Health</Text>
							{this.renderLabels(this.props.healthItems)}
						</View>
						<View style={styles.dietColumn}>
							<Text style={styles.labelTitle}>Description</Text>
							{this.renderDescription(this.props.healthItems)}
						</View>
					</View>
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

	anim: {
		width: 75,
		height: 75,
		alignSelf: 'center'
	},

	heading: {
		fontSize: 25,
		fontWeight: 'bold',
		color: Scheme.labelText,
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
		flexDirection: 'column',
		backgroundColor: '#fff',
		marginHorizontal: 5,
		marginVertical: 20,
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
		padding: 5,
		textTransform: 'capitalize',
		flex: 1
	}
});
