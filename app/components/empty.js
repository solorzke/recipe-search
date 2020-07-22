import React from 'react';
import { View, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

/* Return a view that notifies the list is empty whenever no ingredients have been added */
const Empty = () => {
	return (
		<View style={{ padding: 20, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' }}>
			<MaterialIcons name={'shopping-basket'} size={40} color={'grey'} />
			<Text style={{ color: 'grey', fontSize: 16, paddingVertical: 15 }}>List Is Empty</Text>
		</View>
	);
};

export default Empty;
