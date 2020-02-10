import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './app/view/home';
import SettingsScreen from './app/view/settings';

const Drawer = createDrawerNavigator();
const App = () => {
	return (
		<NavigationContainer>
			<Drawer.Navigator initialRouteName="Home">
				<Drawer.Screen name="Home" component={Home} />
				<Drawer.Screen name="Settings" component={SettingsScreen} />
			</Drawer.Navigator>
		</NavigationContainer>
	);
};

export default App;
