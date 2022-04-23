import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import User from '../screens/User'
import Home from '../screens/Home'

const Stack = createStackNavigator()

export default function HomeNavigation() {
	return (
		<Stack.Navigator>
			<Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
			<Stack.Screen name='create' component={User} options={{ headerShown: true }} />
		</Stack.Navigator>
	)
}
