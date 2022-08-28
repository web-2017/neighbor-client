import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import MessageScreen from '../screens/MessageScreen'

const Stack = createStackNavigator()

export default function MessageNavigation() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: true }}>
			<Stack.Screen name='MessageScreen' component={MessageScreen} />
		</Stack.Navigator>
	)
}
