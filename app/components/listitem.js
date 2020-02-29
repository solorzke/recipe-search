import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import WeightWatchersLogo from '../assets/images/ww.png';

const ListItem = (props) => {
	return (
		<TouchableOpacity style={styles.mainView} onPress={props.onPress} key={props.id}>
			<View style={styles.imgView}>
				<Image source={{ uri: props.img }} style={styles.img} />
			</View>
			<View style={styles.textView}>
				<View style={{ flexDirection: 'row', alignSelf: 'flex-end', paddingRight: 10 }}>
					<Image style={{ height: 25, width: 25 }} source={WeightWatchersLogo} />
					<Text style={{ alignSelf: 'center' }}>Points: {props.rating}</Text>
				</View>
				<Text style={styles.title}>{props.title}</Text>
				<Text style={styles.subtitle}>{props.subtitle}</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	mainView: {
		width: '100%',
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderBottomColor: 'gray'
	},

	imgView: {
		flex: 1,
		padding: 10
	},

	textView: {
		flex: 3,
		justifyContent: 'center',
		paddingLeft: 10
	},

	img: {
		width: 100,
		height: 100,
		borderRadius: 200,
		borderWidth: 3,
		borderColor: '#000'
	},

	title: {
		fontSize: 20,
		color: '#1976d2',
		paddingBottom: 10,
		textTransform: 'capitalize'
	},

	subtitle: {
		fontSize: 13,
		color: '#E63462',
		paddingBottom: 5,
		textTransform: 'capitalize'
	},
	calories: {
		textAlign: 'right',
		paddingRight: 10
	}
});

export default ListItem;
