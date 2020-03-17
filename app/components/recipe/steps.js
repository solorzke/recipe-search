import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StepNumber from '../stepimg';

export default class Steps extends Component {
	/* Return a new view that describes every step from the recipe */
	renderSteps = (steps) => {
		let data = [];
		if (steps[0] !== false) {
			for (let step of steps) {
				const name = this.retrieveInstructionName(step);
				const instructions = this.retrieveInstructions(step);
				data.push(
					<View>
						<Text style={styles.instructionTitle}>{name}</Text>
						{instructions.map((item, index) => {
							return (
								<View style={styles.instructionBlock}>
									<StepNumber number={index + 1} />
									<Text style={styles.instructionText}>{item}</Text>
								</View>
							);
						})}
					</View>
				);
			}
			return data;
		} else {
			return (
				<View>
					<Text style={styles.instructionTitle}>Instruction:</Text>
					<View style={styles.instructionBlock}>
						<StepNumber number={1} />
						<Text style={styles.instructionText}>
							For more information, check out {this.props.source}'s recipe page.
						</Text>
					</View>
				</View>
			);
		}
	};

	/* Retrieve the instruction name without modifying the existing array */
	retrieveInstructionName = (step) => {
		return step[0]['name'];
	};

	/* Retrieve all the instructions in the array without modifying it */
	retrieveInstructions = (step) => {
		if (step.length > 1) {
			let data = [];
			step.sort((a, b) => {
				return a.number - b.number;
			});
			for (let i = 1; i < step.length; i++) {
				if (step[i]['number'] === i) {
					data.push(step[i]['instruction']);
				}
			}
			return data;
		} else {
			return [ 'For more information, check the source.' ];
		}
	};

	render() {
		const steps = this.props.steps;
		const stepsView = this.renderSteps(steps);
		return (
			<View style={styles.mainView}>
				<Text style={styles.heading}>Steps</Text>
				<View style={styles.stepsView}>{stepsView}</View>
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
	},

	instructionBlock: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 10
	},

	instructionText: {
		paddingHorizontal: 20
	},

	instructionTitle: {
		fontSize: 20
	}
});
