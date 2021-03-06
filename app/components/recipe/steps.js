import React, { Component } from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import StepNumber from '../stepimg';
const Scheme = require('../../assets/schemes/scheme');

EmptyInstruction = ({ source, url }) => {
	return (
		<View>
			<Text style={styles.instructionTitle}>Instruction:</Text>
			<View style={styles.instructionBlock}>
				<StepNumber number={1} />
				<Text style={styles.instructionText}>
					For more information, check out{' '}
					<Text style={{ color: Scheme.anchorText }} onPress={() => Linking.openURL(url)}>
						{source}
					</Text>'s recipe page.
				</Text>
			</View>
		</View>
	);
};

Instruction = ({ index, item }) => {
	return (
		<View style={styles.instructionBlock} key={index.toString()}>
			<StepNumber number={index + 1} />
			<Text style={styles.instructionText}>{item}</Text>
		</View>
	);
};

export default class Steps extends Component {
	/* Return a new view that describes every step from the recipe */
	renderSteps = (steps) => {
		let data = [];
		if (steps[0] == false) return <EmptyInstruction source={this.props.source} url={this.props.url} />;
		for (let step of steps) {
			const name = this.retrieveInstructionName(step);
			const instructions = this.retrieveInstructions(step);
			data.push(
				<View>
					<Text style={styles.instructionTitle}>{name}</Text>
					{instructions.map((item, index) => <Instruction index={index} item={item} />)}
				</View>
			);
		}
		return data;
	};

	/* Retrieve the instruction name without modifying the existing array */
	retrieveInstructionName = (step) => {
		return step[0]['name'];
	};

	/* Retrieve all the instructions in the array without modifying it */
	retrieveInstructions = (step) => {
		if (step.length < 1) return [ 'For more information, check the source.' ];
		let data = [];
		step.sort((a, b) => a.number - b.number);
		for (let i = 1; i < step.length; i++) if (step[i]['number'] === i) data.push(step[i]['instruction']);
		return data;
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
		color: Scheme.labelText,
		paddingHorizontal: 10
	},
	stepsView: {
		marginVertical: 10,
		paddingHorizontal: 10
	},

	instructionBlock: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		paddingVertical: 10
	},

	instructionText: {
		paddingHorizontal: 20,
		width: '95%'
	},

	instructionTitle: {
		fontSize: 20
	}
});
