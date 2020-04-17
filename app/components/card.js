import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import LottieView from 'lottie-react-native';

const Card = (props) => {
	return (
		<View style={styles.mainView}>
			<TouchableOpacity style={styles.container} onPress={props.onPress}>
				<View style={props.background}>
					{props.animate && (
						<LottieView source={props.animation} progress={0.5} autoPlay={true} style={styles.anim} />
					)}
					{!props.animate && (
						<Image
							source={{ uri: props.img }}
							style={styles.background}
							resizeMode={'stretch'}
							accessibilityLabel={'Random Recipe'}
							defaultSource={('../assets/images/photo.png', '100%', 200)}
						/>
					)}
				</View>
				<Text style={styles.title}>{props.title}</Text>
				<Text style={styles.subtitle}>{props.subtitle}</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	mainView: {
		flex: 1,
		width: '100%'
	},

	anim: {
		width: 150,
		height: 150
	},

	background: {
		width: '100%',
		height: 200,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10
	},

	container: {
		justifyContent: 'center',
		flexDirection: 'column',
		borderWidth: 1,
		borderRadius: 10,
		borderColor: '#E8E8E8',
		backgroundColor: '#E8E8E8',
		marginHorizontal: 5,
		marginVertical: 10,
		shadowColor: '#000',
		shadowOffset: {
			height: 3,
			width: 3
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,

		elevation: 2
	},

	title: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#1976d2',
		marginVertical: 10,
		marginHorizontal: 10
	},

	subtitle: {
		fontSize: 15,
		color: '#f58426',
		marginVertical: 10,
		marginHorizontal: 10
	}
});

export default Card;
