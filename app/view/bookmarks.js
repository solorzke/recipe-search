import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import ListItem from '../components/listitem';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Foundation';
import HeadBar from '../components/head';
import Status from '../components/statusbar';
import Loader from '../components/loader';

export default class Results extends Component {
	state = {
		focused: this.props.navigation.isFocused(),
		loading: true,
		load: true,
		empty: true,
		size: 0
	};

	componentDidMount() {
		this.checkCache((bool, length) => {
			this.setState({ loading: false });
			if (bool) {
				this.parseJson((payload) => {
					this.setState({
						empty: false,
						load: false,
						data: payload,
						size: length
					});
				});
			}
		});
	}

	// componentDidUpdate() {
	// 	this.checkCache((bool, length) => {
	// 		if (length !== this.state.size) {
	// 			console.warn('loop');
	// 			this.parseJson((payload) => {
	// 				this.setState({
	// 					empty: false,
	// 					load: false,
	// 					data: payload,
	// 					size: length
	// 				});
	// 			});
	// 		}
	// 	});
	// }

	/* Shorten the title of the recipe by adding 3 dots  */
	sliceString = (str, limit) => {
		if (str.length > limit) {
			return str.slice(0, limit - 1) + '...';
		} else {
			return str;
		}
	};

	/* Check if there are any cache recipes available */
	checkCache = async (callback) => {
		try {
			const keys = await AsyncStorage.getAllKeys();
			callback(keys.length > 0, keys.length);
		} catch (error) {
			console.log('An error occurred reading the cache repository');
			throw new ErrorEvent(error);
		}
	};

	/* Parse the objects that were stringified in cache back to JSON readible code and push them to an array */
	parseJson = async (callback) => {
		try {
			let data = [];
			const keys = await AsyncStorage.getAllKeys();
			for (let key of keys) {
				const value = await AsyncStorage.getItem(key);
				const payload = JSON.parse(value);
				data.push(payload);
			}
			if (typeof callback === 'function') {
				callback(data);
			}
		} catch (error) {
			console.log('An error occurred: ' + error);
			throw new ErrorEvent(error);
		}
	};

	/* Return appropriate view givent the context of the cache repo */
	returnView = (bool) => {
		if (bool === false) {
			const results = this.state.data.map((recipe, index) => {
				const labels =
					recipe['healthLabels'].length !== 0 ? recipe['healthLabels'].join(', ') : 'Delicious & Nutritional';
				return (
					<ListItem
						id={'key' + index}
						title={this.sliceString(recipe['label'], 50)}
						subtitle={this.sliceString(labels, 60)}
						img={recipe['image']}
						rating={recipe['ww']}
						onPress={() => this.props.navigation.navigate('Recipe', { food: recipe })}
					/>
				);
			});

			return results.length > 0 ? (
				<View style={styles.mainView}>
					<Status barStyle={'light-content'} />
					<HeadBar name={'Bookmarks'} onPress={() => this.props.navigation.toggleDrawer()} />
					<ScrollView>{results}</ScrollView>
				</View>
			) : (
				<View style={styles.mainView}>
					<Status barStyle={'light-content'} />
					<HeadBar name={'Bookmarks'} onPress={() => this.props.navigation.toggleDrawer()} />
					<View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', flex: 1 }}>
						<Icon name={'book-bookmark'} size={50} color={'grey'} />
						<Text>No Bookmarks Available, yet.</Text>
					</View>
				</View>
			);
		} else {
			return (
				<View style={styles.mainView}>
					<Status barStyle={'light-content'} />
					<HeadBar name={'Bookmarks'} onPress={() => this.props.navigation.toggleDrawer()} />
					<View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', flex: 1 }}>
						<Icon name={'book-bookmark'} size={50} color={'grey'} />
						<Text>No Bookmarks Available, yet.</Text>
					</View>
				</View>
			);
		}
	};

	render() {
		return (
			<View style={styles.mainView}>
				{this.returnView(this.state.load)}
				{this.state.loading && <Loader text={'Checking for Bookmarks'} />}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	mainView: {
		flex: 1,
		width: '100%'
	}
});
