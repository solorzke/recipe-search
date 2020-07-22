import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, Animated, Easing } from 'react-native';
import WeightWatchersLogo from '../../assets/images/ww.png';
import LottieView from 'lottie-react-native';
import Reward from '../../assets/animations/reward.json';
const Scheme = require('../../assets/schemes/scheme');

export default class WeightWatchersSection extends Component {
	render() {
		return (
			<View style={styles.mainView}>
				<Text style={styles.heading}>Weight Watchers</Text>
				<View style={styles.column}>
					<View style={{ width: '100%' }}>
						<LottieView source={Reward} progress={0.5} autoPlay={true} style={styles.anim} />
					</View>
					<View
						style={{
							width: '100%',
							flexDirection: 'row',
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<View style={{ backgroundColor: '#3ea0cc', borderRadius: 50 }}>
							<Image source={WeightWatchersLogo} style={styles.img} />
						</View>
						<Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }}>
							Smart Points: <Text style={{ color: '#cc0b59' }}>{this.props.points}</Text>
						</Text>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	mainView: {
		borderBottomWidth: 1,
		borderBottomColor: '#ddd',
		paddingBottom: 10
	},

	heading: {
		fontSize: 25,
		fontWeight: 'bold',
		color: Scheme.labelText,
		padding: 10
	},

	column: {
		flexDirection: 'column',
		backgroundColor: '#3ea0cc',
		borderRadius: 40,
		marginHorizontal: 10,
		paddingBottom: 10
	},
	img: {
		width: 50,
		height: 50
	},

	anim: {
		width: 150,
		height: 150,
		alignSelf: 'center'
	}
});

// constructor(props) {
// 	super(props);
// 	this.progress1 = new Animated.Value(0);
// 	this.state = {
// 		progress: new Animated.Value(0)
// 	};
// }
// componentDidMount() {
// 	this.load();
// 	Animated.timing(this.state.progress, {
// 		toValue: 1,
// 		duration: 4000,
// 		easing: Easing.linear
// 	}).start();
// 	// Or set a specific startFrame and endFrame with:
// }

// load() {
// 	this.progress1.setValue(0);
// 	Animated.timing(this.progress1, {
// 		toValue: 1,
// 		duration: 2000,
// 		easing: Easing.linear
// 	}).start(() => this.load());
// }
