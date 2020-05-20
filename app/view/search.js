import React, { Component } from 'react';
import {
	View,
	StyleSheet,
	Text,
	SafeAreaView,
	TextInput,
	TouchableOpacity,
	FlatList,
	Image,
	Modal
} from 'react-native';
import Loader from '../components/loader';
import Footer from '../components/footer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AddPhoto from '../assets/images/add.png';
import API from '../api/index';

/* Return item box view whenever a new ingredient is added */
Ingredient = ({ item, remove }) => {
	return (
		<View style={{ padding: 10, flexDirection: 'row' }}>
			<TouchableOpacity onPress={remove} style={styles.deleteBtn}>
				<MaterialIcons name={'cancel'} size={30} color={'red'} />
			</TouchableOpacity>
			<Text style={styles.ingredientText}>{item}</Text>
		</View>
	);
};

/* Return a view that notifies the list is empty whenever no ingredients have been added */
Empty = () => {
	return (
		<View style={{ padding: 20, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' }}>
			<MaterialIcons name={'shopping-basket'} size={40} color={'grey'} />
			<Text style={{ color: 'grey', fontSize: 16, paddingVertical: 15 }}>List Is Empty</Text>
		</View>
	);
};

export default class Search extends Component {
	constructor(props) {
		super(props);
		this._input = React.createRef();
		this.state = {
			data: [],
			input: '',
			modal: false
		};
	}

	/* Once the component is loaded, add the 'add' button to the action bar */
	componentDidMount() {
		this.props.navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity style={{ marginRight: 10 }} onPress={() => this.transmitRequest()}>
					<Text style={{ color: '#fff', paddingRight: 10, fontSize: 17 }}>Confirm</Text>
				</TouchableOpacity>
			)
		});
	}

	/* Remove item from the data array and update the flatlist */
	removeItem = (id) => {
		const prevState = this.state.data;
		const filtered_array = prevState.filter((item) => item !== prevState[id]);
		this.setState({
			data: filtered_array
		});
	};

	/* Check if at least one ingredient is filled in */
	isItEmpty = () => {
		return this.state.data.length > 0;
	};

	/* Set state for modal visibility */
	setModalState = (bool) => {
		this.setState({
			modal: bool
		});
	};

	/* Authenticate list before confirming and submitting list to search */
	transmitRequest = () => {
		const items = this.state.data;
		if (items.length > 0) {
			this.setModalState(true);
			const api = new API(items);
			api.requestComplexSearch((payload) => {
				this.setModalState(false);
				if (payload) this.props.navigation.navigate('Results', { data: payload });
			});
		} else {
			alert('Please fill in at least one ingredient');
		}
	};

	/* As the user is typing, update the state about its input */
	typing = (text) => {
		this.setState({
			input: text
		});
	};

	/* Update the value of the input box to the state */
	updateValue = () => {
		if (this.validateInput(this.state.input)) {
			const prevState = this.state.data.slice();
			const input = this.state.input;
			prevState.push(input.toLowerCase());
			this.setState({
				data: prevState,
				input: ''
			});
			this._input.current.clear(); //Clear the text input value
		} else {
			alert('Please enter an ingredient.');
		}
	};

	/* Validate user input if it contains null or invalid text */
	validateInput = (input) => {
		return /^(?=.*[a-zA-Z0-9])/.test(input);
	};

	/* Return the header view that contains the text input component */
	returnInputBox = (length) => {
		return (
			<View style={styles.header}>
				<View style={styles.input}>
					<TextInput
						ref={this._input}
						style={styles.text}
						placeholder={'Add An Ingredient'}
						onChangeText={(text) => this.typing(text)}
						maxLength={40}
						autoCorrect={true}
						placeholderTextColor={'#fff'}
						selectionColor={'yellow'}
					/>
					<TouchableOpacity onPress={() => this.updateValue()} style={styles.addBtn}>
						<Image source={AddPhoto} style={{ width: 55, height: 55 }} />
					</TouchableOpacity>
				</View>
				<Text style={styles.charsLeftLabel}>{40 - length} characters remaining</Text>
			</View>
		);
	};

	render() {
		return (
			<SafeAreaView style={styles.mainView}>
				<FlatList
					ListHeaderComponent={this.returnInputBox(this.state.input.length)}
					ListEmptyComponent={<Empty />}
					ListFooterComponent={<Footer />}
					contentContainerStyle={{ flexGrow: 1 }}
					ListFooterComponentStyle={{ flex: 1, justifyContent: 'flex-end' }}
					data={this.state.data}
					renderItem={({ item, index }) => <Ingredient item={item} remove={() => this.removeItem(index)} />}
					keyExtractor={(y, z) => z.toString()}
				/>
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
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	mainView: {
		width: '100%',
		flex: 1
	},

	header: {
		backgroundColor: '#11508e',
		borderBottomColor: '#000',
		paddingVertical: '10%',
		borderBottomWidth: 2
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
		flex: 3
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
	},

	charsLeftLabel: {
		color: '#E8E8E8',
		paddingHorizontal: 10,
		fontSize: 13
	},

	modal: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#211a23',
		justifyContent: 'center'
	}
});
