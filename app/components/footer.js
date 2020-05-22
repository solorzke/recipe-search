import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';

/* Return Footer View for FlatList */
Footer = () => {
	return (
		<View style={styles.footer}>
			<Text style={{ color: 'grey' }} onPress={() => Linking.openURL('https://www.spoonacular.com')}>
				Powered By Spoonacular
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	footer: {
		alignItems: 'center',
		width: '100%',
		paddingVertical: 10
	}
});

export default Footer;
