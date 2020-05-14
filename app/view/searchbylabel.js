import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

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

class DietsView extends Component {
	constructor(props) {
		super(props);
		this.dietRef = React.createRef();
		this.pickerRef = React.createRef();
	}

	state = {
		selected: '',
		picker: false
	};

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

	/* Update the state to what was selected */
	setSelectedValue = (value) => {
		value != null
			? value.length > 0 ? this.setState({ selected: value }) : this.setState({ selected: '' })
			: this.setState({ selected: '' });
	};

	/* Return the selected diet label to the parent class */
	returnDietLabel = () => {
		this.props.activeDietLabel(this.state.selected);
	};

	render() {
		return (
			<View>
				{this.returnDietLabel()}
				<View style={styles.pickerView} onPress={() => this.pickerRef.current.togglePicker()}>
					<View style={{ borderBottomColor: '#000', borderBottomWidth: 1, width: '100%' }}>
						<Text
							ref={this.dietRef}
							style={styles.dietSelector}
							onPress={() => this.pickerRef.current.togglePicker()}
						>
							{this.state.selected.length > 0 ? this.state.selected : 'Select a diet...'}
						</Text>
					</View>
				</View>
				<RNPickerSelect
					placeholder={'Select a Diet...'}
					ref={this.pickerRef}
					onValueChange={(value) => this.setSelectedValue(value)}
					items={this.diets}
				/>
			</View>
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

	/* Handle active Diet Label from DietView's state */
	handleDietLabel = (label) => {
		console.warn(label);
	};

	render() {
		return (
			<View style={styles.mainView}>
				<Heading title={'Cuisine Types'} />
				<CuisineView activeLabels={this.handleCuisineLabels} />
				<Heading title={'Diets'} />
				<DietsView activeDietLabel={this.handleDietLabel} />
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
	},

	dietsView: {
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

	dietSelector: {
		fontSize: 17,
		color: '#000',
		paddingBottom: 10,
		width: '100%',
		textTransform: 'capitalize'
	},

	dietText: {
		paddingBottom: 10,
		width: '100%'
	},

	picker: {
		width: '100%',
		height: 1
	}
});
