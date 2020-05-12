import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { WebView } from 'react-native-webview';

const INJECTED_JAVASCRIPT = `(function() {
    window.ReactNativeWebView.postMessage(JSON.stringify(window.location));
})();`;

export default class SpoonacularWebView extends Component {
	render() {
		return (
			<SafeAreaView style={styles.mainView}>
				<WebView
					source={{ uri: 'https://spoonacular.com/' }}
					injectedJavaScript={INJECTED_JAVASCRIPT}
					onMessage={this.onMessage}
				/>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	mainView: {
		flex: 1
	}
});
