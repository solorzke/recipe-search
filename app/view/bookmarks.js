import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import ListItem from '../components/listitem';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HeadBar from '../components/head';
import Status from '../components/statusbar';
import Loader from '../components/loader';
import Footer from '../components/footer';
const Scheme = require('../assets/schemes/scheme');

Header = ({ resultsNumber }) => {
	return (
		<View style={{ borderBottomColor: 'gray', borderBottomWidth: 1 }}>
			<Text style={styles.bookmarkResults}>{resultsNumber} saved recipes.</Text>
		</View>
	);
};

/* Return a view that notifies the list is empty whenever no ingredients have been added */
Empty = () => {
	return (
		<View style={{ padding: 20, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' }}>
			<MaterialIcons name={'shopping-basket'} size={40} color={'grey'} />
			<Text style={{ color: 'grey', fontSize: 16, paddingVertical: 15 }}>List Is Empty</Text>
		</View>
	);
};

export default class Bookmarks extends Component {
	constructor(props) {
		super(props);
		this.state = {
			focused: this.props.navigation.isFocused(),
			loading: true,
			load: true,
			empty: true,
			size: 0,
			refresh: false,
			data: []
		};
	}

	componentDidMount() {
		this.sub = this.props.navigation.addListener('focus', () => {
			console.log('Bookmark Screen is focused...');
			this.checkCache((bool, length) => {
				this.setRefreshState(true, false);
				if (!bool) return;
				this.parseJson((payload) => {
					this.setCacheCheckState(false, false, payload, length, false);
				});
			});
		});

		this.unsub = this.props.navigation.addListener('blur', () => {
			console.log('Bookmark is not focused...');
			this.setRefreshState(true, false);
		});
	}

	/* Set the state for the loading screen */
	setRefreshState = (refreshBool, loadingBool) => {
		this.setState({
			refresh: refreshBool,
			loading: loadingBool
		});
	};

	/* Set whether to check the cache for saved recipes or not */
	setCacheCheckState = (isEmpty, isLoad, payload, isLength, isLoading) => {
		this.setState({
			empty: isEmpty,
			load: isLoad,
			data: payload,
			size: isLength,
			loading: isLoading
		});
	};

	/* Shorten the title of the recipe by adding 3 dots  */
	sliceString = (str, limit) => {
		return str.length > limit ? str.slice(0, limit - 1) + '...' : str;
	};

	/* Check if there are any cache recipes available */
	checkCache = async (callback) => {
		try {
			const keys = await AsyncStorage.getAllKeys();
			callback(keys.length > 0, keys.length);
		} catch (error) {
			console.log('An error occurred reading the cache repository');
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
			typeof callback === 'function' ? callback(data) : null;
		} catch (error) {
			console.log('An error occurred: ' + error);
		}
	};

	/* Set a placeholder for subtitle in case the source is non-existent */
	setSource = (source) => {
		return source.length !== 0 ? `Source: ${source}` : 'Source: Spoonacular.com';
	};

	render() {
		return (
			<View style={styles.mainView}>
				<Status barStyle={'light-content'} />
				<HeadBar name={'Bookmarks'} onPress={() => this.props.navigation.toggleDrawer()} />
				<FlatList
					ListHeaderComponent={<Header resultsNumber={this.state.size} />}
					ListEmptyComponent={<Empty />}
					ListFooterComponent={<Footer />}
					data={this.state.data}
					contentContainerStyle={{ flexGrow: 1 }}
					keyExtractor={(y, z) => z.toString()}
					ListFooterComponentStyle={{ flex: 1, justifyContent: 'flex-end' }}
					renderItem={(recipe) => {
						return (
							<ListItem
								title={this.sliceString(recipe['item']['label'], 50)}
								subtitle={this.sliceString(this.setSource(recipe['item']['source']), 60)}
								img={recipe['item']['image']}
								rating={recipe['item']['ww']}
								onPress={() => this.props.navigation.navigate('Recipe', { food: recipe['item'] })}
							/>
						);
					}}
				/>
				{/* {this.state.loading && <Loader text={'Checking for Bookmarks'} />} */}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	mainView: {
		flex: 1,
		width: '100%',
		backgroundColor: Scheme.subBackground
	},

	bookmarkResults: {
		color: 'gray',
		fontSize: 13,
		textAlign: 'left',
		padding: 10
	}
});
