import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/* Return Footer View for FlatList */
Footer = () => {
	return (
		<View style={styles.footer}>
			<Text style={{ color: 'grey' }}>Powered By Spoonacular.com</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	footer: {
		alignItems: 'center',
		width: '100%',
		paddingBottom: 10
	}
});

export default Footer;
