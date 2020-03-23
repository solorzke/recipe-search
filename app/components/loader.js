import React from 'react';
import { View, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import Noodles from '../assets/animations/noodles.json';

const Loader = (props) => {
	return (
		<View style={{ alignItems: 'center' }}>
			<LottieView source={Noodles} progress={0.5} autoPlay={true} style={{ width: 110, height: 110 }} loop />
			<Text style={{ fontSize: 18 }}>{props.text}</Text>
		</View>
	);
};

export default Loader;
