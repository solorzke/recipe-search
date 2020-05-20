import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Dimensions, Modal } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Slider from '@react-native-community/slider';
import API from '../api/index';
const Labels = require('../assets/data/labels');
import Loader from '../components/loader';
import Footer from '../components/footer';

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
	constructor(props) {
		super(props);
		this.state = {
			active: []
		};
		this.types = this.props.items;
	}

	/* Return the active cuisine labels to the parent class */
	returnActiveLabels = () => {
		return this.state.active;
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
		this.state = {
			selected: '',
			picker: false
		};
	}

	/* Update the state to what was selected */
	setSelectedValue = (value) => {
		value != null
			? value.length > 0 ? this.setState({ selected: value }) : this.setState({ selected: '' })
			: this.setState({ selected: '' });
	};

	/* Return the selected diet label to the parent class */
	returnLabel = () => {
		return this.state.selected;
	};

	render() {
		return (
			<View>
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
	constructor(props) {
		super(props);
		this.state = {
			sliderValue: 0,
			onChangeValue: 0,
			tintColor: '#00FF00'
		};
	}

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
		return this.state.sliderValue;
	};

	/* Change the color of the slider as you slide from 0 to 100 (Green to Red)*/
	changeColorGradient = () => {
		/* Find a way to fade the color green gradient & red gradient with the slider */
		let value = this.state.onChangeValue * 100 / 3000;
		/* RG: 0, 255 */
		if (value < 0)
			this.setState({
				tintColor: '#00FF00'
			});
		else if (value <= 10)
			/* RG: 26, 229 */
			this.setState({
				tintColor: '#1AE500'
			});
		else if (value <= 20)
			/* RG: 52, 203 */
			this.setState({
				tintColor: '#34CB00'
			});
		else if (value <= 30)
			/* RG: 78, 177 */
			this.setState({
				tintColor: '#4EB100'
			});
		else if (value <= 40)
			/* RG: 104, 151 */
			this.setState({
				tintColor: '#689700'
			});
		else if (value <= 50)
			/* RG: 130, 125 */
			this.setState({
				tintColor: '#827D00'
			});
		else if (value <= 60)
			/* RG: 156, 99 */
			this.setState({
				tintColor: '#9C6300'
			});
		else if (value <= 70)
			/* RG: 182, 73 */
			this.setState({
				tintColor: '#B64900'
			});
		else if (value <= 80)
			/* RG: 208, 47 */
			this.setState({
				tintColor: '#D02F00'
			});
		else if (value <= 90)
			/* RG: 234, 21 */
			this.setState({
				tintColor: '#EA1500'
			});
		else if (90 < value)
			/* RG: 255, 0 */
			this.setState({
				tintColor: '#FF0000'
			});
	};

	render() {
		return (
			<View style={styles.sliderView}>
				<Slider
					style={{ width: '70%', height: 40 }}
					minimumValue={0}
					maximumValue={3000}
					step={100}
					minimumTrackTintColor={this.state.tintColor}
					maximumTrackTintColor="#000000"
					onSlidingComplete={(value) => this.setSliderState(value)}
					onValueChange={(value) => {
						this.setOnGoingValue(value), this.changeColorGradient();
					}}
				/>
				<Text>Cal: {this.state.onChangeValue}</Text>
			</View>
		);
	}
}

export default class SearchByLabel extends Component {
	constructor(props) {
		super(props);
		this.cuisineRef = React.createRef();
		this.dietRef = React.createRef();
		this.mealRef = React.createRef();
		this.calorieRef = React.createRef();
		this.state = {
			modal: false
		};
	}

	/* Once the component is loaded, add the 'Confirm' button to the action bar */
	componentDidMount() {
		this.props.navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity style={{ marginRight: 10 }} onPress={() => this.transmitRequest()}>
					<Text style={{ color: '#fff', paddingRight: 10, fontSize: 17 }}>Confirm</Text>
				</TouchableOpacity>
			)
		});
	}

	/* Check if any of the fields were filled */
	validate = () => {
		const cuisineLength = this.cuisineRef.current.returnActiveLabels().length;
		const dietLength = this.dietRef.current.returnLabel().length;
		const mealLength = this.mealRef.current.returnLabel().length;
		return cuisineLength + dietLength + mealLength + this.calorieRef.current.returnSliderValue() > 0;
	};

	/* Transmit a network request to Spoonacular's Web API to search for recipes based on the selected parameters */
	transmitRequest = () => {
		if (this.validate()) {
			this.setModalState(true);
			const cuisines = this.cuisineRef.current.returnActiveLabels();
			const diet = this.dietRef.current.returnLabel();
			const meal = this.mealRef.current.returnLabel();
			const calories = this.calorieRef.current.returnSliderValue();
			const complex_items = [ { cuisines: cuisines, diet: diet, meal: meal, calories: calories } ];
			const api = new API('NONE', complex_items);
			api.requestComplexSearch((data) => {
				this.setModalState(false);
				if (data) this.props.navigation.navigate('Results', { data: data });
			});
		} else {
			alert('Please fill in at least one of the fields to search.');
		}
	};

	/* Set state for modal visibility */
	setModalState = (bool) => {
		this.setState({
			modal: bool
		});
	};

	render() {
		return (
			<ScrollView style={styles.mainView}>
				<Heading title={'Cuisine Types'} />
				<CuisineView ref={this.cuisineRef} items={Labels.cuisines} />
				<Heading title={'Diets'} />
				<PickerView ref={this.dietRef} items={Labels.diets} placeholder={'Select a diet...'} />
				<Heading title={'Meal Types'} />
				<PickerView ref={this.mealRef} items={Labels.meals} placeholder={'Select a meal...'} />
				<Heading title={'Max Calories'} />
				<CalorieView ref={this.calorieRef} />
				<Modal
					animationType={'slide'}
					transparent={false}
					visible={this.state.modal}
					onRequestClose={() => {
						console.log('Modal has been closed.');
					}}
				>
					<View style={styles.modal}>
						<Loader text={'Find the best recipes...'} />
					</View>
				</Modal>
				<Footer />
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	mainView: {
		width: '100%',
		backgroundColor: '#fff'
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
	},

	modal: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#211a23',
		justifyContent: 'center'
	}
});
