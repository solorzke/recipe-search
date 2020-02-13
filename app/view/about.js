import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HeadBar from '../components/head';
import Status from '../components/statusbar';

export default class AboutScreen extends Component {
	render() {
		return (
			<View style={styles.mainView}>
				<Status color={'#000'} barStyle={'light-content'} />
				<HeadBar name={'About Us'} onPress={() => this.props.navigation.toggleDrawer()} />
				<ScrollView style={styles.container}>
					<View style={styles.headerView}>
						<Icon name="pets" size={70} color="#000" />
					</View>
					<View style={styles.container}>
						<Text style={styles.title}>What Is Recipe Search?</Text>
						<Text style={styles.paragraph}>
							Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
							been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
							galley of type and scrambled it to make a type specimen book. It has survived not only five
							centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
						</Text>
						<Text style={styles.title}>Our Goal</Text>
						<Text style={styles.paragraph}>
							Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
							been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
							galley of type and scrambled it to make a type specimen book. It has survived not only five
							centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
						</Text>
						<Text style={styles.title}>Who We Are?</Text>
						<Text style={styles.paragraph}>
							Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
							been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
							galley of type and scrambled it to make a type specimen book. It has survived not only five
							centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
						</Text>
					</View>
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

	headerView: {
		backgroundColor: '#E8E8E8',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		flex: 2
	},

	container: {
		flex: 1
	},

	paragraph: {
		paddingVertical: 5,
		color: '#fff',
		fontSize: 14
	},

	title: {
		fontSize: 25,
		color: '#f58426',
		fontWeight: 'bold'
	}
});
