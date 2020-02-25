import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Header = (props) => {
	return (
		<View style={styles.mainView}>
			<View style={styles.titleView}>
				<Text style={styles.title}>{props.label}</Text>
			</View>
			<View style={styles.shareView}>
				<TouchableOpacity>
					<Icon name={props.bookmark} size={35} color="gray" />
				</TouchableOpacity>
				<TouchableOpacity>
					<Icon name={'share'} size={35} color="gray" />
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	mainView: {
		width: '100%',
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderBottomColor: '#DDD',
		height: 100
	},

	titleView: {
		flex: 3,
		paddingLeft: 10,
		paddingVertical: 10,
		alignSelf: 'center'
	},

	shareView: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center'
	},

	title: {
		fontSize: 25,
		fontWeight: 'bold'
	}
});
export default Header;
