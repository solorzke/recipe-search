import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { WebView } from 'react-native-webview';

export default class SpoonacularWebView extends Component {
	render() {
		return (
			<SafeAreaView style={styles.mainView}>
				<WebView source={{ uri: 'https://spoonacular.com/' }} onMessage={this.onMessage} />
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	mainView: {
		flex: 1
	}
});
