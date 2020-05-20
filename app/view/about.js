import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Image, Platform } from 'react-native';
import Share from 'react-native-share';
import Heading from '../assets/images/3255.jpg';
import ContactIcon from 'react-native-vector-icons/Entypo';
import HeadBar from '../components/head';
import Status from '../components/statusbar';
import SMIcon from 'react-native-vector-icons/FontAwesome5';
import { Linking } from 'react-native';
const Scheme = require('../assets/schemes/scheme');

export default class AboutScreen extends Component {
	/* Open the social media applications (if any) available on the user's phone to our social media page */
	onShare = (social_app, bool) => {
		const shareOptions = {
			title: 'Check out this app!',
			message: 'The app is called Recipe Search',
			email: 'mailto:email@example.com',
			failOnCancel: false,
			url: 'http://onelink.to/rtkhtd', //<--- change later when app is ready for distro in app/play stores
			social: this.openSocialApp(social_app)
		};
		return !bool ? Share.open(shareOptions) : Share.shareSingle(shareOptions);
	};

	/* Open the maps application when clicking 'Location address' */
	onMaps = (lat, lon) => {
		const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
		const latLng = `${lat},${lon}`;
		const label = 'Recipe Search: Headquarters';
		const url = Platform.select({
			ios: `${scheme}${label}@${latLng}`,
			android: `${scheme}${latLng}(${label})`
		});
		Linking.openURL(url);
	};

	/* For which application to open */
	openSocialApp = (name) => {
		switch (name) {
			case 'TWITTER':
				return Share.Social.TWITTER;
			case 'FACEBOOK':
				return Share.Social.FACEBOOK;
			case 'LINKEDIN':
				return Share.Social.INSTAGRAM;
			case 'EMAIL':
				return Share.Social.EMAIL;
		}
	};

	render() {
		return (
			<View style={styles.mainView}>
				<Status barStyle={'light-content'} />
				<HeadBar name={'About Us'} onPress={() => this.props.navigation.toggleDrawer()} />
				<ScrollView>
					<View style={styles.headerView}>
						<Image source={Heading} resizeMode={'repeat'} />
					</View>
					<View style={{ backgroundColor: Scheme.title }}>
						<TouchableOpacity
							style={styles.contactBtn}
							onPress={() => Linking.openURL('mailto:example@gmail.com?subject=example&body=example')}
						>
							<ContactIcon name={'mail-with-circle'} size={70} color={'#E0115F'} />
						</TouchableOpacity>
						<View style={styles.paragraphView}>
							<Text style={styles.title}>What Is Recipe Search?</Text>
							<Text style={styles.paragraph}>
								Recipe Search is a mobile application that aims to deliver top quality recipes based on
								the list of ingredients you provide to it. Thanks to Spoonacular's recipe services,
								we're able to match any type of recipe that you wish to find from their vast library of
								up-to-date recipes. Should you wish to save a recipe that you enjoyed cooking, you can
								bookmark it into this application.
							</Text>
						</View>
						<View style={styles.paragraphView}>
							<Text style={styles.title}>Our Goal</Text>
							<Text style={styles.paragraph}>
								Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
								has been the industry's standard dummy text ever since the 1500s, when an unknown
								printer took a galley of type and scrambled it to make a type specimen book. It has
								survived not only five centuries, but also the leap into electronic typesetting,
								remaining essentially unchanged.
							</Text>
						</View>
						<View style={styles.paragraphView}>
							<Text style={styles.title}>Who We Are?</Text>
							<Text style={styles.paragraph}>
								Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
								has been the industry's standard dummy text ever since the 1500s, when an unknown
								printer took a galley of type and scrambled it to make a type specimen book. It has
								survived not only five centuries, but also the leap into electronic typesetting,
								remaining essentially unchanged.
							</Text>
						</View>
						<View style={styles.footer}>
							<View style={styles.socialMediaView}>
								<Text style={styles.socialMediaTitle}>Social Media</Text>
								<View style={{ flexDirection: 'row', paddingBottom: 10 }}>
									<TouchableOpacity
										style={styles.socialMediaBtn}
										onPress={() => this.onShare('TWITTER', true)}
									>
										<SMIcon name={'twitter-square'} color={'#00CED1'} size={30} />
										<Text style={{ color: '#1976d2' }}>Twitter</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={styles.socialMediaBtn}
										onPress={() => this.onShare('FACEBOOK', true)}
									>
										<SMIcon name={'facebook-square'} color={'#1976d2'} size={30} />
										<Text style={{ color: '#1976d2' }}>Facebook</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={styles.socialMediaBtn}
										onPress={() => this.onShare('LINKEDIN', true)}
									>
										<SMIcon name={'instagram'} color={'#000'} size={30} />
										<Text style={{ color: '#1976d2' }}>Instagram</Text>
									</TouchableOpacity>
								</View>
							</View>
							<View style={styles.paragraphView}>
								<Text style={{ padding: 5 }}>
									Email:{' '}
									<Text
										style={styles.detail}
										onPress={() => Linking.openURL('mailto:example@gmail.com')}
									>
										email@example.com
									</Text>
								</Text>
								<Text style={{ padding: 5 }}>
									Location:{' '}
									<Text onPress={() => this.onMaps(40.7986, -74.2391)} style={styles.detail}>
										West Orange, NJ 07052
									</Text>
								</Text>
								<Text style={{ padding: 5 }}>{new Date().getFullYear()} | © Solorzke Designs</Text>
							</View>
						</View>
					</View>
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	mainView: {
		flex: 1,
		width: '100%'
	},

	detail: {
		color: '#1976d2'
	},

	headerView: {
		backgroundColor: '#E8E8E8',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: Dimensions.get('window').height / 3
	},

	footer: {
		backgroundColor: Scheme.subBackground,
		flexDirection: 'column'
	},

	paragraphView: {
		marginHorizontal: 10,
		marginTop: 20,
		padding: 10

		// shadowColor: '#BEBEBE',
		// shadowOffset: {
		// 	width: 0.5
		// },
		// shadowOpacity: 1,
		// borderRadius: 5
	},

	socialMediaView: {
		backgroundColor: Scheme.subBackground
	},

	paragraph: {
		color: '#fff',
		fontSize: 15,
		textAlign: 'justify'
	},

	title: {
		fontSize: 25,
		paddingBottom: 20,
		// color: '#E0115F',
		color: Scheme.textLight,
		fontWeight: 'bold',
		alignSelf: 'center'
	},

	socialMediaTitle: {
		fontSize: 25,
		paddingVertical: 20,
		// color: '#E0115F',
		color: '#fff',
		fontWeight: 'bold',
		alignSelf: 'center',
		color: Scheme.textDark
	},

	contactBtn: {
		position: 'absolute',
		alignSelf: 'flex-end',
		right: 5,
		top: -30,
		height: 71,
		backgroundColor: '#E8E8E8',
		borderRadius: 60
	},

	socialMediaBtn: {
		flex: 1,
		alignItems: 'center'
	}
});
