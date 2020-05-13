import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, FlatList, TouchableOpacity, Dimensions } from 'react-native';

/* Return a Cusine View */
Cuisines = ({ items, onPress, style, column }) => {
	return items.map((item, index) => (
		<TouchableOpacity onPress={() => onPress(column, index)} style={style('BUTTON', item)}>
			<Text style={style('TEXT', item)}>{item}</Text>
		</TouchableOpacity>
	));
};

/* Return a heading view */
Heading = ({ title }) => {
	return (
		<View style={styles.heading}>
			<Text style={styles.headingTitle}>{title}</Text>
		</View>
	);
};

/* Cusine Types View available for selection */
class CuisineView extends Component {
	state = {
		active: []
	};

	types = [
		'African',
		'American',
		'British',
		'Cajun',
		'Caribbean',
		'Chinese',
		'Eastern European',
		'European',
		'French',
		'German',
		'Greek',
		'Indian',
		'Irish',
		'Italian',
		'Japanese',
		'Jewish',
		'Korean',
		'Latin American',
		'Mediterranean',
		'Mexican',
		'Middle Eastern',
		'Nordic',
		'Southern',
		'Spanish',
		'Thai',
		'Vietnamese'
	];

	/* Return the active cuisine labels to the parent class */
	returnActiveLabels = () => {
		this.props.activeLabels(this.state.active);
	};

	/* Return a style appropriate for when a button was toggled */
	toggleStyle = (type, item) => {
		if (type === 'BUTTON') {
			if (this.state.active.includes(item)) {
				return {
					borderColor: '#00b300',
					borderWidth: 2,
					borderRadius: 20,
					color: '#fff',
					justifyContent: 'center',
					alignItems: 'center',
					padding: 10,
					margin: 5,
					width: Dimensions.get('window').width / 2.5,
					backgroundColor: '#50c878'
				};
			} else {
				return {
					borderColor: '#c0c0c0',
					borderWidth: 2,
					color: '#000',
					borderRadius: 20,
					justifyContent: 'center',
					alignItems: 'center',
					padding: 10,
					margin: 5,
					width: Dimensions.get('window').width / 2.5
				};
			}
		} else {
			return this.state.active.includes(item) ? { color: '#fff' } : { color: '#000' };
		}
	};

	/* Update the state for active array depending on the toggle event */
	updateActiveState = (current) => {
		!this.state.active.includes(current)
			? this.setState((prevState) => {
					return { active: [ ...prevState.active, current ] };
				})
			: this.setState((prevState) => {
					return { active: prevState.active.filter((item) => item !== current) };
				});
	};

	/* Toggle the status of the cusine press event */
	toggleActive = (col, index) => {
		const type = this.types[col * 4 - 4 + index];
		this.updateActiveState(type);
	};

	render() {
		return (
			<ScrollView
				style={styles.cuisineView}
				bounces={false}
				horizontal={true}
				showsHorizontalScrollIndicator={false}
			>
				{this.returnActiveLabels()}
				<View style={styles.cuisineGrid}>
					<Cuisines
						items={this.types.slice(0, 4)}
						onPress={this.toggleActive}
						style={this.toggleStyle}
						column={1}
					/>
				</View>
				<View style={styles.cuisineGrid}>
					<Cuisines
						items={this.types.slice(4, 8)}
						onPress={this.toggleActive}
						style={this.toggleStyle}
						column={2}
					/>
				</View>
				<View style={styles.cuisineGrid}>
					<Cuisines
						items={this.types.slice(8, 12)}
						onPress={this.toggleActive}
						style={this.toggleStyle}
						column={3}
					/>
				</View>
				<View style={styles.cuisineGrid}>
					<Cuisines
						items={this.types.slice(12, 16)}
						onPress={this.toggleActive}
						style={this.toggleStyle}
						column={4}
					/>
				</View>
				<View style={styles.cuisineGrid}>
					<Cuisines
						items={this.types.slice(16, 20)}
						onPress={this.toggleActive}
						style={this.toggleStyle}
						column={5}
					/>
				</View>
				<View style={styles.cuisineGrid}>
					<Cuisines
						items={this.types.slice(20, 24)}
						onPress={this.toggleActive}
						style={this.toggleStyle}
						column={6}
					/>
				</View>
				<View style={styles.cuisineGrid}>
					<Cuisines
						items={this.types.slice(24)}
						onPress={this.toggleActive}
						style={this.toggleStyle}
						column={7}
					/>
				</View>
			</ScrollView>
		);
	}
}

export default class SearchByLabel extends Component {
	/* Once the component is loaded, add the 'add' button to the action bar */
	componentDidMount() {
		this.props.navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity style={{ marginRight: 10 }} onPress={() => alert('hello')}>
					<Text style={{ color: '#fff', paddingRight: 10, fontSize: 17 }}>Confirm</Text>
				</TouchableOpacity>
			)
		});
	}

	/* Handle active cusine labels from CuisineView's state */
	handleCuisineLabels = (labels) => {
		console.warn(labels);
	};

	render() {
		return (
			<View style={styles.mainView}>
				<Heading title={'Cuisine Types'} />
				<CuisineView activeLabels={this.handleCuisineLabels} />
				<Heading title={'Cuisine Types'} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	mainView: {
		width: '100%'
	},

	cuisineBtn: {
		borderColor: '#c0c0c0',
		borderWidth: 1,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
		margin: 5,
		width: Dimensions.get('window').width / 2.5
	},

	heading: {
		width: '100%',
		alignItems: 'flex-start',
		paddingTop: 5
	},

	headingTitle: {
		fontSize: 25,
		fontWeight: 'bold',
		color: '#E0115F',
		paddingHorizontal: 10
	},

	cuisineGrid: {
		flexDirection: 'column',
		flex: 1
	},

	cuisineView: {
		width: '100%',
		height: Dimensions.get('window').height / 3,
		flexDirection: 'row',
		padding: 10
	}
});
