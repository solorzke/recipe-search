import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import ListItem from '../components/listitem';
import Img from '../assets/images/card.png';

export default class Results extends Component {
	render() {
		const payload = this.props.navigation.getParam('data', () => {
			return this.props.navigation.goBack();
		});

		return (
			<View style={styles.mainView}>
				<ScrollView>
					<ListItem title={'Hello'} subtitle={'there'} img={Img} calories={123} />
					<ListItem title={'Hello'} subtitle={'there'} img={Img} calories={123} />
					<ListItem title={'Hello'} subtitle={'there'} img={Img} calories={123} />
					<ListItem title={'Hello'} subtitle={'there'} img={Img} calories={123} />
					<ListItem title={'Hello'} subtitle={'there'} img={Img} calories={123} />
					<ListItem title={'Hello'} subtitle={'there'} img={Img} calories={123} />
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	mainView: {
		flex: 1,
		width: '100%'
	}
});
