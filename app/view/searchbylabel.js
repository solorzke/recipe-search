import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Slider from '@react-native-community/slider';

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

class PickerView extends Component {
	constructor(props) {
		super(props);
		this.pickerRef = React.createRef();
	}

	state = {
		selected: '',
		picker: false
	};

	/* Update the state to what was selected */
	setSelectedValue = (value) => {
		value != null
			? value.length > 0 ? this.setState({ selected: value }) : this.setState({ selected: '' })
			: this.setState({ selected: '' });
	};

	/* Return the selected diet label to the parent class */
	returnLabel = () => {
		this.props.activeLabel(this.state.selected);
	};

	render() {
		return (
			<View>
				{this.returnLabel()}
				<View style={styles.pickerView} onPress={() => this.pickerRef.current.togglePicker()}>
					<View style={{ borderBottomColor: '#000', borderBottomWidth: 1, width: '100%' }}>
						<Text style={styles.pickerSelector} onPress={() => this.pickerRef.current.togglePicker()}>
							{this.state.selected.length > 0 ? this.state.selected : this.props.placeholder}
						</Text>
					</View>
				</View>
				<RNPickerSelect
					placeholder={'Select a Diet...'}
					ref={this.pickerRef}
					onValueChange={(value) => this.setSelectedValue(value)}
					items={this.props.items}
				/>
			</View>
		);
	}
}

class CalorieView extends Component {
	state = {
		sliderValue: 0,
		onChangeValue: 0
	};

	/* Update the current slider value after the user is done using it to the state */
	setSliderState = (value) => {
		this.setState({
			sliderValue: value
		});
	};

	/* Update the current slider value as it slides to the state to reflect that value to the user */
	setOnGoingValue = (value) => {
		this.setState({
			onChangeValue: value
		});
	};

	/* Return the slider value back to the parent class */
	returnSliderValue = () => {
		this.props.activeCalorieValue(this.state.sliderValue);
	};

	/* Change the color of the slider as you slide from 0 to 100 (Green to Red)*/
	changeColorGradient = () => {
		/* Find a way to fade the color green gradient & red gradient with the slider */
		let value = this.state.onChangeValue * 100 / 3000;
		/* RG: 0, 255 */
		if (value < 0) return '#00FF00';
		else if (0 < value <= 10)
			/* RG: 26, 229 */
			return '#1AE500';
		else if (10 < value <= 20)
			/* RG: 52, 203 */
			return '#34CB00';
		else if (20 < value <= 30)
			/* RG: 78, 177 */
			return '#4EB100';
		else if (30 < value <= 40)
			/* RG: 104, 151 */
			return '#689700';
		else if (40 < value <= 50)
			/* RG: 130, 125 */
			return '#827D00';
		else if (50 < value <= 60)
			/* RG: 156, 99 */
			return '#9C6300';
		else if (60 < value <= 70)
			/* RG: 182, 73 */
			return '#B64900';
		else if (70 < value <= 80)
			/* RG: 208, 47 */
			return '#D02F00';
		else if (80 < value <= 90)
			/* RG: 234, 21 */
			return '#EA1500';
		else if (90 < value)
			/* RG: 255, 0 */
			return '#FF0000';
	};

	render() {
		return (
			<View style={styles.sliderView}>
				<Slider
					style={{ width: '70%', height: 40 }}
					minimumValue={0}
					maximumValue={3000}
					step={100}
					minimumTrackTintColor={this.changeColorGradient}
					maximumTrackTintColor="#000000"
					onSlidingComplete={(value) => this.setSliderState(value)}
					onValueChange={(value) => this.setOnGoingValue(value)}
				/>
				<Text>Cal: {this.state.onChangeValue}</Text>
			</View>
		);
	}
}

export default class SearchByLabel extends Component {
	/* Once the component is loaded, add the 'Confirm' button to the action bar */
	componentDidMount() {
		this.props.navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity style={{ marginRight: 10 }} onPress={() => alert('hello')}>
					<Text style={{ color: '#fff', paddingRight: 10, fontSize: 17 }}>Confirm</Text>
				</TouchableOpacity>
			)
		});
	}

	diets = [
		{
			label: 'Gluten Free',
			value: 'gluten free'
		},
		{
			label: 'Ketogenic',
			value: 'ketogenic'
		},
		{
			label: 'Vegetarian',
			value: 'vegetarian'
		},
		{
			label: 'Lacto-Vegetarian',
			value: 'lacto-vegetarian'
		},
		{
			label: 'Ovo-Vegetarian',
			value: 'ovo-egetarian'
		},
		{
			label: 'Vegan',
			value: 'vegan'
		},
		{
			label: 'Pescetarian',
			value: 'pescetarian'
		},
		{
			label: 'Paleo',
			value: 'paleo'
		},
		{
			label: 'Primal',
			value: 'primal'
		},
		{
			label: 'Whole30',
			value: 'whole30'
		}
	];

	meals = [
		{
			label: 'Main Course',
			value: 'main course'
		},
		{
			label: 'Side Dish',
			value: 'side dish'
		},
		{
			label: 'Dessert',
			value: 'dessert'
		},
		{
			label: 'Appetizer',
			value: 'appetizer'
		},
		{
			label: 'Salad',
			value: 'salad'
		},
		{
			label: 'Bread',
			value: 'bread'
		},
		{
			label: 'Breakfast',
			value: 'breakfast'
		},
		{
			label: 'Soup',
			value: 'soup'
		},
		{
			label: 'Beverage',
			value: 'beverage'
		},
		{
			label: 'Sauce',
			value: 'sauce'
		},
		{
			label: 'Marinade',
			value: 'marinade'
		},
		{
			label: 'Fingerfood',
			value: 'fingerfood'
		},
		{
			label: 'Snack',
			value: 'snack'
		},
		{
			label: 'Drink',
			value: 'drink'
		}
	];

	/* Handle active cusine labels from CuisineView's state */
	handleCuisineLabels = (labels) => {
		console.log(labels);
	};

	/* Handle active Diet Label from DietView's state */
	handleDietLabel = (label) => {
		console.log(label);
	};

	/* Handle active Calorie value from Calorie Slider */
	handleCalorieIntake = (value) => {
		console.log(value);
	};

	render() {
		return (
			<ScrollView style={styles.mainView}>
				<Heading title={'Cuisine Types'} />
				<CuisineView activeLabels={this.handleCuisineLabels} />
				<Heading title={'Diets'} />
				<PickerView activeLabel={this.handleDietLabel} items={this.diets} placeholder={'Select a diet...'} />
				<Heading title={'Meal Types'} />
				<PickerView activeLabel={this.handleDietLabel} items={this.meals} placeholder={'Select a meal...'} />
				<Heading title={'Max Calories'} />
				<CalorieView activeCalorieValue={this.handleCalorieIntake} />
			</ScrollView>
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
	},

	pickerView: {
		alignItems: 'flex-start',
		justifyContent: 'center',
		paddingHorizontal: 15,
		height: Dimensions.get('window').height / 7
	},

	pickerSelector: {
		fontSize: 17,
		color: '#000',
		paddingBottom: 10,
		width: '100%',
		textTransform: 'capitalize'
	},

	sliderView: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 15,
		height: Dimensions.get('window').height / 5
	}
});
