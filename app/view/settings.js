import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import HeadBar from '../components/head';
import Status from '../components/statusbar';

export default class Settings extends Component {
	render() {
		return (
			<View style={styles.mainView}>
				<Status color={'#000'} barStyle={'light-content'} />
				<HeadBar name={'Settings'} onPress={() => this.props.navigation.toggleDrawer()} />
				<ScrollView style={styles.container}>
					<TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate('Privacy')}>
						<Text style={styles.title}>Privacy Policy</Text>
						<Text style={styles.subtitle} />
					</TouchableOpacity>
					<TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate('Version')}>
						<Text style={styles.title}>Version</Text>
						<Text style={styles.subtitle} />
					</TouchableOpacity>
					<TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate('API')}>
						<Text style={styles.title}>API</Text>
						<Text style={styles.subtitle} />
					</TouchableOpacity>
					<TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate('Terms')}>
						<Text style={styles.title}>Terms and Conditions</Text>
						<Text style={styles.subtitle} />
					</TouchableOpacity>
					<TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate('Terms')}>
						<Text style={styles.title}>Contact Us</Text>
						<Text style={styles.subtitle} />
					</TouchableOpacity>
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	mainView: {
		flex: 1,
		width: '100%',
		backgroundColor: '#DDD'
	},

	container: {
		flex: 1
	},

	item: {
		height: 50,
		width: '100%',
		borderBottomWidth: 1,
		borderColor: '#E8E8E8',
		flexDirection: 'column'
	},

	title: {
		color: '#1976d2',
		fontSize: 20
	},

	subtitle: {
		color: '#f58426',
		fontSize: 15
	}
});
