import React from 'react';
import { View, Text } from 'react-native';
import Spinner from 'react-native-spinkit';

const Loader = (props) => {
	return (
		<View style={{ alignItems: 'center' }}>
			<Spinner color={props.color} size={100} type={'9CubeGrid'} />
			<Text style={{ fontSize: 18 }}>{props.text}</Text>
		</View>
	);
};

export default Loader;
