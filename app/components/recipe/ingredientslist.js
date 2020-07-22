import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Linking, Modal, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
const Scheme = require('../../assets/schemes/scheme');

export default class List extends Component {
	state = {
		modal: false
	};

	/* Dynamically create Views for each Ingredient Item */
	produceItems = (items, index) => {
		return items.map((item) => {
			<View
				key={index.toString()}
				style={{
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<Icon name="square-small" size={35} color={'#000'} />
				<Text>{item}</Text>
			</View>;
		});
	};

	/* Toggle Modal View when Food Image is clicked */
	toggleModal = () => {
		const modalState = this.state.modal;
		this.setState({
			modal: !modalState
		});
	};

	render() {
		/* Dynamically create Views for each Ingredient Item */
		let items = this.props.ingredients.map((item, index) => {
			return (
				<View style={{ flexDirection: 'row', paddingVertical: 5 }} key={index}>
					<FontAwesomeIcon
						name="cookie"
						size={10}
						color={'brown'}
						style={{ paddingRight: 5, paddingTop: 3 }}
					/>
					<Text style={{ alignSelf: 'center', paddingRight: 30 }}>{item}</Text>
				</View>
			);
		});

		return (
			<View style={styles.mainView}>
				<Text style={styles.heading}>Ingredients</Text>
				<View style={styles.listView}>
					<View style={styles.imgView}>
						<TouchableOpacity onPress={() => this.toggleModal()}>
							<Image source={{ uri: this.props.img }} style={styles.img} />
						</TouchableOpacity>
						<Text onPress={() => Linking.openURL(this.props.url)} style={styles.source}>
							{this.props.source}
						</Text>
					</View>
					<View style={styles.ingredientsList}>{items}</View>
					<Modal
						animationType={'slide'}
						transparent={false}
						visible={this.state.modal}
						onRequestClose={() => {
							console.log('Modal has been closed.');
						}}
					>
						<View style={styles.modal}>
							<Image source={{ uri: this.props.img }} style={styles.modalImg} />
							<Text style={{ color: '#fff', fontSize: 20 }}>{this.props.label}</Text>
							<TouchableOpacity onPress={() => this.toggleModal()} style={styles.modalClose}>
								<Icon name={'close-circle'} size={60} color={'#E0115F'} />
							</TouchableOpacity>
						</View>
					</Modal>
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

	listView: {
		marginVertical: 10,
		paddingHorizontal: 10
	},

	ingredientsList: {},

	modalImg: {
		width: '100%',
		height: 300,
		resizeMode: 'contain',
		transform: [ { scale: 1 } ]
	},

	img: {
		width: Dimensions.get('window').width / 1.2,
		height: Dimensions.get('window').height / 4,
		borderRadius: 10,
		alignSelf: 'center',
		justifyContent: 'center'
	},

	source: {
		color: Scheme.anchorText,
		fontStyle: 'italic',
		alignSelf: 'flex-end',
		marginHorizontal: Dimensions.get('window').width / 10,
		marginVertical: 10
	},

	heading: {
		fontSize: 25,
		fontWeight: 'bold',
		color: Scheme.labelText,
		paddingHorizontal: 10
	},

	modal: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#211a23',
		justifyContent: 'center'
	},

	modalClose: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 50
	}
});
