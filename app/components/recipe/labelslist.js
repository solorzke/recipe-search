import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Labels extends Component {
	produceLabels = (items) => {
		return items.map((item, index) => (
			<View>
				<Text>{item}</Text>
			</View>
		));
	};

	render() {
		return (
			<View style={styles.mainView}>
				<Text style={styles.heading}>Health Labels</Text>
				<ScrollView horizontal={true} style={styles.boxView}>
					<View style={styles.box}>
						<FlatList
							data={this.props.dietItems}
							renderItem={({ item }) => (
								<Text
									style={{
										padding: 10,
										fontSize: 20
									}}
								>
									{item}
								</Text>
							)}
							numColumns={2}
							horizontal={false}
							ListHeaderComponent={<Text style={styles.label}>Diet</Text>}
						/>
					</View>
					<View style={styles.box}>
						<FlatList
							data={this.props.healthItems}
							renderItem={({ item }) => (
								<Text
									style={{
										paddingVertical: 10,
										paddingHorizontal: 20,
										fontSize: 20,
										textAlign: 'left'
									}}
								>
									{item}
								</Text>
							)}
							numColumns={2}
							horizontal={false}
							ListHeaderComponent={<Text style={styles.label}>Health</Text>}
						/>
					</View>
					<View style={styles.box}>
						<FlatList
							data={this.props.cautionItems}
							renderItem={({ item }) => (
								<Text
									style={{
										padding: 10,
										fontSize: 20
									}}
								>
									{item}
								</Text>
							)}
							numColumns={2}
							horizontal={false}
							ListHeaderComponent={<Text style={styles.label}>Cautions</Text>}
						/>
					</View>
				</ScrollView>
				<View style={styles.horizontalEllipsis}>
					<Icon name="brightness-1" size={8} color="black" />
					<Icon name="brightness-1" size={8} color="black" />
					<Icon name="brightness-1" size={8} color="black" />
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	mainView: {
		width: '100%'
	},

	heading: {
		fontSize: 25,
		fontWeight: 'bold',
		color: 'red',
		paddingHorizontal: 10
	},

	boxView: {
		height: 200,
		width: '100%',
		backgroundColor: 'gray'
	},

	box: {
		width: Dimensions.get('window').width - 20,
		borderWidth: 1,
		borderColor: '#000',
		backgroundColor: '#E8E8E8',
		margin: 10,
		borderRadius: 10
	},

	label: {
		textAlign: 'center',
		fontSize: 25,
		color: '#000',
		textDecorationLine: 'underline'
	},

	horizontalEllipsis: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center'
	},

	labelText: {
		width: '100%',
		textAlign: 'center'
	}
});
