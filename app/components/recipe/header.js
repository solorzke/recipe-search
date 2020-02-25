import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Header = (props) => {
	return (
		<View style={styles.mainView}>
			<View style={styles.titleView}>
				<Text style={styles.title}>{props.label}</Text>
				<Text style={{ color: '#1976d2' }}>By: {props.source}</Text>
			</View>
			<View style={styles.shareView}>
				<TouchableOpacity onPress={props.bookmarkOptions[0]}>
					<Icon name={props.bookmarkOptions[1]} size={35} color={props.bookmarkOptions[2]} />
					<Text style={styles.mediaText}>Save</Text>
				</TouchableOpacity>
				<TouchableOpacity>
					<Icon name={'share'} size={35} color="gray" />
					<Text style={styles.mediaText}>Share</Text>
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
	},

	mediaText: {
		fontSize: 12,
		color: 'black',
		alignSelf: 'center'
	}
});
export default Header;
