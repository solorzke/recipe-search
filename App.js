import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './app/view/home';
import SearchScreen from './app/view/search';
import SettingsScreen from './app/view/settings';
import AboutScreen from './app/view/about';
import ResultsScreen from './app/view/results';
import RecipeScreen from './app/view/recipe';

const Drawer = createDrawerNavigator();

const HomeStack = () => {
	const Stack = createStackNavigator();
	return (
		<Stack.Navigator>
			<Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
			<Stack.Screen
				options={({ navigation, route }) => ({
					headerShown: true,
					headerStyle: { backgroundColor: '#1976d2' },
					headerTintColor: '#fff'
				})}
				name="Search"
				component={SearchScreen}
			/>
			<Stack.Screen
				options={({ navigation, route }) => ({
					headerShown: true,
					headerStyle: { backgroundColor: '#1976d2' },
					headerTintColor: '#fff'
				})}
				name="Results"
				component={ResultsScreen}
			/>
			<Stack.Screen
				options={({ navigation, route }) => ({
					headerShown: true,
					headerStyle: { backgroundColor: '#1976d2' },
					headerTintColor: '#fff'
				})}
				name="Recipe"
				component={RecipeScreen}
			/>
		</Stack.Navigator>
	);
};

const SettingStack = () => {
	const Stack = createStackNavigator();
	return (
		<Stack.Navigator headerMode="none">
			<Stack.Screen name="Settings" component={SettingsScreen} />
		</Stack.Navigator>
	);
};

const BookmarkStack = () => {
	const Stack = createStackNavigator();
	return (
		<Stack.Navigator>
			<Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
		</Stack.Navigator>
	);
};

const App = () => {
	return (
		<NavigationContainer>
			<Drawer.Navigator
				initialRouteName="Home"
				drawerType="slide"
				drawerContentOptions={{ activeTintColor: 'cyan', labelStyle: { color: '#fff' } }}
				drawerStyle={{ backgroundColor: '#1976d2' }}
			>
				<Drawer.Screen name="Home" component={HomeStack} />
				<Drawer.Screen name="Settings" component={SettingStack} />
				<Drawer.Screen name="About Us" component={AboutScreen} />
				<Drawer.Screen name="Bookmarks" component={BookmarkStack} />
			</Drawer.Navigator>
		</NavigationContainer>
	);
};

export default App;
