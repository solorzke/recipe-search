import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Linking, Modal, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';

export default class List extends Component {
	state = {
		modal: false
	};

	/* Dynamically create Views for each Ingredient Item */
	produceItems = (items) => {
		return items.map((item, index) => {
			<View
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
		if (this.state.modal) {
			this.setState({
				modal: false
			});
		} else {
			this.setState({
				modal: true
			});
		}
	};

	/* Handles the state change when the gesture is over. */
	onZoomStateChange = (event) => {
		/* ACTIVE is used to check whether the event is still active or not */
		if (event.nativeEvent.oldState === State.ACTIVE) {
			/* Set the initial scale value when the animation is done. */
			Animated.spring(this.scale, {
				toValue: 1,
				useNativeDriver: true
			}).start();
		}
	};

	render() {
		/* Dynamically create Views for each Ingredient Item */
		let items = this.props.ingredients.map((item, index) => {
			return (
				<View style={{ flexDirection: 'row', paddingVertical: 5 }}>
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

		/* Animate the scaling and handle the onZoomEvent for the PinchGesture on Modal */
		scale = new Animated.Value(1);
		onZoomEvent = Animated.event(
			[
				{
					nativeEvent: { scale: this.scale }
				}
			],
			{
				useNativeDriver: true
			}
		);

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
							<PinchGestureHandler
								onGestureEvent={this.onZoomEvent}
								onHandlerStateChange={this.onZoomStateChange}
							>
								<Animated.Image source={{ uri: this.props.img }} style={styles.modalImg} />
							</PinchGestureHandler>
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
		color: '#1976d2',
		fontStyle: 'italic',
		alignSelf: 'flex-end',
		marginHorizontal: Dimensions.get('window').width / 10,
		marginVertical: 10
	},

	heading: {
		fontSize: 25,
		fontWeight: 'bold',
		color: '#E0115F',
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
