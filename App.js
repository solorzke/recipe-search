import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import Home from './app/view/home';
import SearchScreen from './app/view/search';
import SearchByScreen from './app/view/searchby';
import SearchByLabels from './app/view/searchbylabel';
import SettingsScreen from './app/view/settings';
import AboutScreen from './app/view/about';
import ResultsScreen from './app/view/results';
import RecipeScreen from './app/view/recipe';
import BookmarkScreen from './app/view/bookmarks';
import PrivacyPolicyScreen from './app/view/privacy';
import TermsScreen from './app/view/terms';
import VersionScreen from './app/view/version';
import FAQScreen from './app/view/faq';
import SpoonacularWebViewScreen from './app/view/api';
import Icon from 'react-native-vector-icons/FontAwesome';
const Scheme = require('./app/assets/schemes/scheme');

const Drawer = createDrawerNavigator();

const HomeStack = () => {
	const Stack = createStackNavigator();
	return (
		<Stack.Navigator>
			<Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
			<Stack.Screen
				options={({ navigation, route }) => ({
					headerShown: true,
					headerStyle: { backgroundColor: Scheme.actionBar },
					headerTintColor: '#fff'
				})}
				name="Search By"
				component={SearchByScreen}
			/>
			<Stack.Screen
				options={({ navigation, route }) => ({
					headerShown: true,
					headerStyle: { backgroundColor: Scheme.actionBar },
					headerTintColor: '#fff'
				})}
				name="Search"
				component={SearchScreen}
			/>
			<Stack.Screen
				options={({ navigation, route }) => ({
					headerShown: true,
					headerStyle: { backgroundColor: Scheme.actionBar },
					headerTintColor: '#fff'
				})}
				name="Labels"
				component={SearchByLabels}
			/>
			<Stack.Screen
				options={({ navigation, route }) => ({
					headerShown: true,
					headerStyle: { backgroundColor: Scheme.actionBar },
					headerTintColor: '#fff'
				})}
				name="Results"
				component={ResultsScreen}
			/>
			<Stack.Screen
				options={({ navigation, route }) => ({
					headerShown: true,
					headerStyle: { backgroundColor: Scheme.actionBar },
					headerTintColor: '#fff'
				})}
				name="Recipe"
				component={RecipeScreen}
			/>
			<Stack.Screen
				options={({ navigation, route }) => ({
					headerShown: true,
					headerStyle: { backgroundColor: Scheme.actionBar },
					headerTintColor: '#fff'
				})}
				name="FAQ"
				component={FAQScreen}
			/>
		</Stack.Navigator>
	);
};

const SettingStack = () => {
	const Stack = createStackNavigator();
	return (
		<Stack.Navigator>
			<Stack.Screen options={{ headerShown: false }} name="Settings" component={SettingsScreen} />
			<Stack.Screen
				name="Privacy"
				component={PrivacyPolicyScreen}
				options={({ navigation, route }) => ({
					headerShown: true,
					headerStyle: { backgroundColor: Scheme.actionBar },
					headerTintColor: '#fff'
				})}
			/>
			<Stack.Screen
				name="Terms"
				component={TermsScreen}
				options={({ navigation, route }) => ({
					headerShown: true,
					headerStyle: { backgroundColor: Scheme.actionBar },
					headerTintColor: '#fff'
				})}
			/>
			<Stack.Screen
				name="Version"
				component={VersionScreen}
				options={({ navigation, route }) => ({
					headerShown: true,
					headerStyle: { backgroundColor: Scheme.actionBar },
					headerTintColor: '#fff'
				})}
			/>
			<Stack.Screen
				name="Spoonacular"
				component={SpoonacularWebViewScreen}
				options={({ navigation, route }) => ({
					headerShown: true,
					headerStyle: { backgroundColor: Scheme.actionBar },
					headerTintColor: '#fff'
				})}
			/>
		</Stack.Navigator>
	);
};

const BookmarkStack = () => {
	const Stack = createStackNavigator();
	return (
		<Stack.Navigator>
			<Stack.Screen options={{ headerShown: false }} name="Bookmarks" component={BookmarkScreen} />
			<Stack.Screen
				options={({ navigation, route }) => ({
					headerShown: true,
					headerStyle: { backgroundColor: Scheme.actionBar },
					headerTintColor: '#fff'
				})}
				name="Recipe"
				component={RecipeScreen}
			/>
		</Stack.Navigator>
	);
};

const App = () => {
	useEffect(() => {
		SplashScreen.hide();
	}, []);
	return (
		<NavigationContainer>
			<Drawer.Navigator
				initialRouteName="Home"
				drawerType="slide"
				drawerContentOptions={{ activeTintColor: '#BFC0C0', labelStyle: { color: '#fff' } }}
				drawerStyle={{ backgroundColor: Scheme.actionBar }}
			>
				<Drawer.Screen
					name="Home"
					component={HomeStack}
					options={{ drawerIcon: (config) => <Icon size={20} name={'home'} color={'#fff'} /> }}
				/>
				<Drawer.Screen
					name="Settings"
					component={SettingStack}
					options={{ drawerIcon: (config) => <Icon size={18} name={'gears'} color={'#fff'} /> }}
				/>
				<Drawer.Screen
					name="About Us"
					component={AboutScreen}
					options={{ drawerIcon: (config) => <Icon size={20} name={'info-circle'} color={'#fff'} /> }}
				/>
				<Drawer.Screen
					name="Bookmarks"
					component={BookmarkStack}
					options={{
						drawerIcon: (config) => <Icon size={20} name={'bookmark'} color={'#fff'} />,
						unmountOnBlur: true
					}}
				/>
			</Drawer.Navigator>
		</NavigationContainer>
	);
};

export default App;
