import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import FavoriteScreen from '../screens/FavoriteScreen'

const Stack = createStackNavigator()

export default function FavoriteNavigation() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: true }}>
			<Stack.Screen name='Favorite' component={FavoriteScreen} />
		</Stack.Navigator>
	)
}
