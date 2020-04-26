import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import HeadBar from '../components/head';
import Status from '../components/statusbar';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Settings extends Component {
	render() {
		return (
			<View style={styles.mainView}>
				<Status barStyle={'light-content'} />
				<HeadBar name={'Settings'} onPress={() => this.props.navigation.toggleDrawer()} />
				<ScrollView style={styles.container}>
					<TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate('Privacy')}>
						<Entypo name={'lock'} size={25} color={'#1976d2'} style={{ paddingRight: 10 }} />
						<View>
							<Text style={styles.title}>Privacy Policy</Text>
							<Text style={styles.subtitle}>Review our policy concerning your security</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate('Version')}>
						<Ionicons
							name={Platform.OS === 'ios' ? 'ios-apps' : 'md-appstore'}
							size={25}
							color={'#1976d2'}
							style={{ paddingRight: 10 }}
						/>
						<View>
							<Text style={styles.title}>Version</Text>
							<Text style={styles.subtitle}>Application Version, Last updated</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate('API')}>
						<Ionicons
							name={Platform.OS === 'ios' ? 'ios-cloud' : 'md-cloud'}
							size={25}
							color={'#1976d2'}
							style={{ paddingRight: 10 }}
						/>
						<View>
							<Text style={styles.title}>API</Text>
							<Text style={styles.subtitle}>List of API services in use</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate('Terms')}>
						<Ionicons
							name={Platform.OS === 'ios' ? 'ios-document' : 'md-document'}
							size={25}
							color={'#1976d2'}
							style={{ paddingRight: 12.5 }}
						/>
						<View>
							<Text style={styles.title}>Terms and Conditions</Text>
							<Text style={styles.subtitle}>Review our agreement with use of this application</Text>
						</View>
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
		backgroundColor: '#fff'
	},

	container: {
		flex: 1
	},

	item: {
		height: 100,
		width: '100%',
		borderBottomWidth: 1,
		borderColor: '#E8E8E8',
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 10
	},

	title: {
		color: '#1976d2',
		fontSize: 20
	},

	subtitle: {
		color: '#000',
		fontSize: 15
	}
});
