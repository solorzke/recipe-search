import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class QuestionCard extends Component {
	returnView = (bool, text) => {
		if (bool === 'q') {
			return (
				<View style={styles.questionView}>
					<Text style={{ fontSize: 30, color: 'grey' }}>Q</Text>
					<View style={styles.q_box}>
						<Text style={styles.questionText}>{text}</Text>
					</View>
				</View>
			);
		} else {
			return (
				<View style={styles.answerView}>
					<Text style={{ fontSize: 30, color: '#11508e' }}>A</Text>
					<View style={styles.a_box}>
						<Text style={styles.answerText}>{text}</Text>
						<View style={styles.triangle} />
					</View>
				</View>
			);
		}
	};

	render() {
		return <View style={styles.mainView}>{this.returnView(this.props.type, this.props.text)}</View>;
	}
}

const styles = StyleSheet.create({
	mainView: {
		width: '100%',
		paddingVertical: 10
	},

	questionView: {
		flexDirection: 'row',
		margin: 10
	},

	questionText: {
		fontSize: 14,
		color: 'grey',
		alignSelf: 'center',
		paddingLeft: 10
	},

	answerView: {
		flexDirection: 'row-reverse',
		margin: 10,
		alignItems: 'center'
	},

	answerText: {
		fontSize: 14,
		color: '#fff',
		alignSelf: 'center',
		padding: 10
	},

	q_box: {
		borderLeftWidth: 2,
		borderLeftColor: 'grey',
		justifyContent: 'center',
		marginHorizontal: 15
	},

	a_box: {
		backgroundColor: '#11508e',
		justifyContent: 'center',
		marginHorizontal: 15,
		borderRadius: 5
	},

	triangle: {
		transform: [ { rotateZ: '45deg' } ],
		width: 8,
		height: 8,
		backgroundColor: '#11508e',
		marginTop: -4,
		position: 'absolute',
		alignSelf: 'flex-end',
		right: -3
	}
});
