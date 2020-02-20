import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import API from '../api/index';
import InputBox from '../components/inputbox';

export default class Search extends Component {
	state = {
		data: [ '', '', '', '', '', '', '', '', '', '' ],
		input: '',
		inputA: true,
		inputB: false,
		inputC: false,
		inputD: false,
		inputE: false,
		inputF: false,
		inputG: false,
		inputH: false,
		inputI: false,
		inputJ: false
	};

	/* Once the component is loaded, add the 'add' button to the action bar */
	componentDidMount() {
		this.props.navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity style={{ marginRight: 10 }} onPress={() => this.addInputBox()}>
					<Icon name="add" size={35} color="#fff" />
				</TouchableOpacity>
			)
		});
	}

	/* Add new data to the state every time the 'add' button is pressed from the action bar */
	addInputBox = () => {
		let count = 1;

		for (let view in this.state) {
			if (view !== 'data' && view !== 'input') {
				if (this.state[view] === false) {
					this.setState({
						[view]: true
					});
					return true;
				} else if (count === 10) {
					alert('Max Limit Reached');
					return false;
				} else {
					count += 1;
					console.warn('Counter: ' + count);
				}
			}
		}
	};

	/* Remove an input box by swiping */
	removeInputBox = (position, inputType) => {
		const prevState = this.state.data.slice();
		prevState[position] = '';

		this.setState({
			[inputType]: false,
			data: prevState
		});
	};

	/* Check if at least one ingredient is filled in */
	isItEmpty = () => {
		return this.state.data.length > 0;
	};

	/* Return ingredients that aren't listed as 'null' */
	getList = () => {
		return this.state.data.filter((ingredient) => ingredient !== 'null');
	};

	/* Authenticate list before confirming and submitting list to search */
	confirm = () => {
		if (this.isItEmpty() && this.getList().length > 0) {
			alert('it works');
			// this.props.navigation.navigate('Results');
		} else {
			alert('Please fill in at least one ingredient');
		}
	};

	/* As the user is typing, update the state about its input */
	typing = (text) => {
		console.warn(text);
		this.setState({
			input: text
		});
	};

	/* Update the value of the input box to the state */
	updateValue = (index) => {
		alert('done ' + index);
		const prevState = this.state.data.slice();
		const input = this.state.input;
		prevState[index] = input.toLowerCase();
		this.setState({
			data: prevState,
			input: ''
		});
	};

	render() {
		return (
			<SafeAreaView style={styles.mainView}>
				<ScrollView style={styles.area}>
					<Text style={styles.title}>Fill In Your Ingredients</Text>
					<AwesomeButtonRick
						backgroundColor={'orange'}
						borderRadius={100}
						height={50}
						width={300}
						style={styles.confirm}
						type="primary"
						textSize={20}
						onPress={() => alert(this.state.data)}
					>
						Confirm
					</AwesomeButtonRick>
					<View style={styles.listView}>
						{this.state.inputA && (
							<InputBox
								onChangeText={(text) => this.typing(text)}
								delete={() => this.removeInputBox(0, 'inputA')}
								onEndEditing={() => this.updateValue(0)}
							/>
						)}
						{this.state.inputB && (
							<InputBox
								onChangeText={(text) => this.typing(text)}
								delete={() => this.removeInputBox(1, 'inputB')}
								onEndEditing={() => this.updateValue(1)}
							/>
						)}
						{this.state.inputC && (
							<InputBox
								onChangeText={(text) => this.typing(text)}
								delete={() => this.removeInputBox(0, 'inputC')}
								onEndEditing={() => this.updateValue(0)}
							/>
						)}
						{this.state.inputD && (
							<InputBox
								onChangeText={(text) => this.typing(text)}
								delete={() => this.removeInputBox(0, 'inputD')}
								onEndEditing={() => this.updateValue(0)}
							/>
						)}
						{this.state.inputE && (
							<InputBox
								onChangeText={(text) => this.typing(text)}
								delete={() => this.removeInputBox(0, 'inputE')}
								onEndEditing={() => this.updateValue(0)}
							/>
						)}
						{this.state.inputF && (
							<InputBox
								onChangeText={(text) => this.typing(text)}
								delete={() => this.removeInputBox(0, 'inputF')}
								onEndEditing={() => this.updateValue(0)}
							/>
						)}
						{this.state.inputG && (
							<InputBox
								onChangeText={(text) => this.typing(text)}
								delete={() => this.removeInputBox(0, 'inputG')}
								onEndEditing={() => this.updateValue(0)}
							/>
						)}
						{this.state.inputH && (
							<InputBox
								onChangeText={(text) => this.typing(text)}
								delete={() => this.removeInputBox(0, 'inputH')}
								onEndEditing={() => this.updateValue(0)}
							/>
						)}
						{this.state.inputI && (
							<InputBox
								onChangeText={(text) => this.typing(text)}
								delete={() => this.removeInputBox(0, 'inputI')}
								onEndEditing={() => this.updateValue(0)}
							/>
						)}
						{this.state.inputJ && (
							<InputBox
								onChangeText={(text) => this.typing(text)}
								delete={() => this.removeInputBox(0, 'inputJ')}
								onEndEditing={() => this.updateValue(0)}
							/>
						)}
					</View>
				</ScrollView>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	mainView: {
		flex: 1,
		width: '100%'
	},

	area: {
		flex: 2,
		paddingLeft: 10
	},

	listView: {
		flex: 1
	},

	title: {
		fontSize: 20,
		alignSelf: 'center',
		marginVertical: 20
	},

	input: {
		borderColor: 'gray',
		borderBottomWidth: 1,
		height: 50,
		backgroundColor: '#E8E8E8',
		marginVertical: 20,
		borderWidth: 1
	},

	confirm: {
		alignSelf: 'center'
	},

	delete: {
		borderColor: 'gray',
		borderBottomWidth: 1,
		height: 100,
		backgroundColor: '#d9534f',
		marginVertical: 20,
		justifyContent: 'center'
	}
});
