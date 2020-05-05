import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, ImageBackground } from 'react-native';
import Heading from '../assets/images/5351.jpg';
import Icon from 'react-native-vector-icons/AntDesign';
import Card from '../components/faqcard';

export default class FAQ extends Component {
	render() {
		return (
			<View style={styles.mainView}>
				<ScrollView>
					<View style={{ borderBottomColor: '#11508e', borderBottomWidth: 5 }}>
						<ImageBackground source={Heading} style={styles.headerView}>
							<Text style={styles.heading}>Frequently Asked Questions</Text>
						</ImageBackground>
						<View style={styles.question}>
							<Icon name={'questioncircle'} color={'#fff'} size={50} style={{ top: 1 }} />
						</View>
					</View>
					<View style={styles.contentView}>
						<Card
							type={'q'}
							text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'}
						/>
						<Card
							type={'a'}
							text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'}
						/>
						<Card
							type={'q'}
							text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'}
						/>
						<Card
							type={'a'}
							text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'}
						/>
						<Card
							type={'q'}
							text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'}
						/>
						<Card
							type={'a'}
							text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'}
						/>
						<Card
							type={'q'}
							text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'}
						/>
						<Card
							type={'a'}
							text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'}
						/>
						<Card
							type={'q'}
							text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'}
						/>
						<Card
							type={'a'}
							text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'}
						/>
					</View>
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	mainView: {
		width: '100%'
	},

	headerView: {
		backgroundColor: '#E8E8E8',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: Dimensions.get('window').height / 5
	},

	heading: {
		fontSize: 20,
		color: '#fff',
		fontWeight: 'bold'
	},

	question: {
		position: 'absolute',
		alignSelf: 'center',
		bottom: -35,
		backgroundColor: '#11508e',
		padding: 10,
		borderRadius: 40
	},

	contentView: {
		paddingTop: 20
	}
});
