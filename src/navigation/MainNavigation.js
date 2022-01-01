import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../screens/Home'
import User from '../screens/User'

const Stack = createStackNavigator()

export default function MainNavigation() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name='home' component={Home} />
			<Stack.Screen screenOptions={{ presentation: 'modal' }} name='user' component={User} />
		</Stack.Navigator>
	)
}
