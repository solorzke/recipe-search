import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
const Scheme = require('../assets/schemes/scheme');

const Status = (props) => {
	return (
		<SafeAreaView
			//To set the background color in IOS Status Bar also
			style={{
				backgroundColor: Scheme.actionBar,
				height: Platform.OS === 'ios' ? 20 : 0
			}}
		>
			<StatusBar
				barStyle={props.barStyle}
				// dark-content, light-content and default
				hidden={false}
				//To hide statusBar
				backgroundColor={Scheme.actionBar}
				//Background color of statusBar
				translucent={false}
				//allowing light, but not detailed shapes
				networkActivityIndicatorVisible={true}
			/>
		</SafeAreaView>
	);
};

export default Status;
