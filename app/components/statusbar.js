import React from 'react';
import { View, StatusBar } from 'react-native';

const Status = (props) => {
	return (
		<View
			//To set the background color in IOS Status Bar also
			style={{
				backgroundColor: '#11508e',
				height: Platform.OS === 'ios' ? 20 : 0
			}}
		>
			<StatusBar
				barStyle={props.barStyle}
				// dark-content, light-content and default
				hidden={false}
				//To hide statusBar
				backgroundColor={'#11508e'}
				//Background color of statusBar
				translucent={false}
				//allowing light, but not detailed shapes
				networkActivityIndicatorVisible={true}
			/>
		</View>
	);
};

export default Status;
