import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Steps extends Component {
	/* Return a new view that describes every step from the recipe */
	renderSteps = (steps) => {
		let data = [];
		for (let step of steps) {
			let obj = { name: step[0]['name'] };
			if (step.length > 1) {
				for (let i = 1; i < step.length; i++) {
					obj['step' + i] = { number: step[i]['number'], instruction: step[i]['instruction'] };
				}
				data.push(obj);
			} else {
				data.push({ ...obj, number: 1, instruction: 'Check the source page for more information' });
				break;
			}
		}
		return data;
	};

	render() {
		const steps = this.props.steps;
		console.warn(this.renderSteps(steps));
		return (
			<View style={styles.mainView}>
				<Text style={styles.heading}>Steps</Text>
				<View style={styles.stepsView}>
					<Text>hello</Text>
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
		paddingHorizontal: 10
	},
	stepsView: {
		marginVertical: 10,
		paddingHorizontal: 10
	}
});
