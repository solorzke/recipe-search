import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import HTML from 'react-native-render-html';

const tagStyles = {
	tagsStyles: {
		a: {
			color: '#000',
			textDecorationLine: 'none'
		},
		p: {
			paddingVertical: 10
		}
	}
};

export default class SummarySection extends Component {
	render() {
		console.log(this.props.summary);
		return (
			<View style={styles.mainView}>
				<Text style={styles.heading}>Summary</Text>
				<View style={styles.summaryView}>
					<HTML html={this.props.summary} imagesMaxWidth={Dimensions.get('window').width} {...tagStyles} />
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	mainView: {
		borderBottomWidth: 1,
		borderBottomColor: '#ddd'
	},

	heading: {
		fontSize: 25,
		fontWeight: 'bold',
		color: '#E0115F',
		paddingHorizontal: 10,
		paddingVertical: 10
	},

	summaryView: {
		paddingHorizontal: 10,
		paddingBottom: 10
	}
});
