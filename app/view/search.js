import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';

export default class Search extends Component {
	state = { data: [] };

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
		this.setState({
			data: [ ...this.state.data, 'null' ]
		});
	};

	/* Remove an input box by swiping */
	removeInputBox = (position) => {
		const filtered = this.state.data.filter((item, key) => {
			return position != key;
		});

		this.setState({ data: filtered });
	};

	render() {
		/* Add a new text input every time a new element is added to the state */
		let boxes = this.state.data.map((data, index) => {
			return (
				<TextInput
					key={index}
					placeholder={'Ingredient'}
					style={styles.input}
					onChangeText={(text) => this.setState({ text })}
				/>
			);
		});

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
						onPress={() => this.props.navigation.navigate('Results')}
					>
						Confirm
					</AwesomeButtonRick>
					<TextInput
						placeholder={'Ingredient'}
						style={styles.input}
						onChangeText={(text) => this.setState({ text })}
					/>
					{boxes}
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
		margin: 10
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
		backgroundColor: '#E8E8E8'
	},

	confirm: {
		alignSelf: 'center'
	}
});
