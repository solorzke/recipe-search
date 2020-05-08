import React, { Component } from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView, TextInput, TouchableOpacity, FlatList } from 'react-native';
import Loader from '../components/loader';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

/* Return item box view whenever a new ingredient is added */
Ingredient = ({ item }) => {
	return (
		<View style={{ padding: 10, flexDirection: 'row' }}>
			<TouchableOpacity onPress={() => alert('hello')} style={styles.deleteBtn}>
				<MaterialIcons name={'cancel'} size={30} color={'red'} />
			</TouchableOpacity>
			<Text style={styles.ingredientText}>{item}</Text>
		</View>
	);
};

export default class Search extends Component {
	state = {
		data: [],
		input: '',
		searching: true,
		loader: false,
		button: true,
		title: true
	};

	/* As the user is typing, update the state about its input */
	typing = (text) => {
		this.setState({
			input: text
		});
	};

	/* Update the value of the input box to the state */
	updateValue = () => {
		const prevState = this.state.data.slice();
		const input = this.state.input;
		prevState.push(input.toLowerCase());
		this.setState({
			data: prevState,
			input: ''
		});
	};

	/* Return a flatlist to render all the added ingredients */
	returnFlatList = () => {
		return (
			<FlatList
				data={this.state.data}
				renderItem={({ item }) => <Ingredient item={item} />}
				keyExtractor={(item) => Math.random()}
			/>
		);
	};

	returnInputBox = () => {
		return (
			<View style={styles.input}>
				<TextInput
					style={styles.text}
					placeholder={'Add An Ingredient'}
					onChangeText={(text) => this.typing(text)}
					maxLength={40}
					autoCorrect={true}
					placeholderTextColor={'#fff'}
					selectionColor={'yellow'}
					// onEndEditing={() => alert(this.state.data)}
				/>
				<TouchableOpacity onPress={() => this.updateValue()} style={styles.addBtn}>
					<MaterialIcons name={'add-box'} size={60} color={'yellow'} />
				</TouchableOpacity>
			</View>
		);
	};

	render() {
		return (
			<SafeAreaView style={styles.mainView}>
				<View style={styles.header}>
					{this.state.searching && this.returnInputBox()}
					{this.state.loader && <Loader text={'Find the best recipes...'} />}
				</View>
				<View style={styles.content}>
					<View style={styles.labelArea}>
						<MaterialCommunityIcons name={'food-variant'} size={20} color={'grey'} />
						<Text style={styles.label}>Provided Ingredients</Text>
					</View>
					{this.returnFlatList()}
				</View>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	mainView: {
		width: '100%'
	},

	header: {
		backgroundColor: '#11508e',
		borderBottomColor: '#000',
		paddingVertical: '10%',
		borderBottomWidth: 1,
		flex: 1
	},

	input: {
		flexDirection: 'row',
		padding: 10
	},

	text: {
		color: '#fff',
		fontSize: 17,
		borderBottomColor: 'yellow',
		borderBottomWidth: 1,
		flex: 4
	},

	addBtn: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1
	},

	label: {
		fontSize: 17,
		color: 'grey',
		fontWeight: 'bold',
		padding: 10,
		textAlign: 'right'
	},

	labelArea: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center'
	},

	ingredientText: {
		color: 'grey',
		fontSize: 30
	},

	deleteBtn: {
		alignSelf: 'center',
		justifyContent: 'center',
		paddingRight: 10
	}
});
