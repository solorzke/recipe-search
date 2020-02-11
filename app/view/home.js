import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import Header from '../components/header';
import HeadBar from '../components/head';
import Status from '../components/statusbar';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';

export default class Home extends Component {
	render() {
		return (
			<View style={styles.mainView}>
				<Status color={'#000'} barStyle={'light-content'} />
				<HeadBar name={'Home'} onPress={() => this.props.navigation.toggleDrawer()} />
				<Header name={'Start Cooking'} date={'Jan 01, 2020'} />
				<View style={styles.buttonView}>
					<AwesomeButtonRick
						backgroundColor={'orange'}
						borderRadius={400}
						height={200}
						width={200}
						style={styles.button}
						type="primary"
						textSize={30}
					>
						Start
					</AwesomeButtonRick>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	mainView: {
		flex: 1,
		width: '100%'
	},

	buttonView: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'center'
	},

	button: {
		justifyContent: 'center',
		alignItems: 'center'
		// backgroundColor: 'gold',
		// height: 300,
		// width: 300, //The Width must be the same as the height
		// borderRadius: 400
	}
});
