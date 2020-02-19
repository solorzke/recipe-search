import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import API from '../api/index';
import InputBox from '../components/inputbox';

export default class Search extends Component {
	state = { data: [ 'null' ] };

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
		if (this.state.data.length <= 10) {
			this.setState({
				data: [ ...this.state.data, 'null' ]
			});
		} else {
			alert('Max limit reached!');
		}
	};

	/* Remove an input box by swiping */
	removeInputBox = (position) => {
		console.warn(position);

		const filtered = this.state.data.filter((item, key) => {
			return position != key;
		});

		this.setState({ data: filtered });
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

	typing = (text) => {
		const prevState = this.state.data.slice();
		prevState[0] = text.toLowerCase();
		this.setState({
			data: prevState
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
						<InputBox items={this.state.data} onChangeText={this.typing} />
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
