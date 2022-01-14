import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../screens/Home'
import Post from '../screens/Post'

const Stack = createStackNavigator()

export default function MainNavigation() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name='home'
				component={Home}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen screenOptions={{ presentation: 'modal' }} name='post' component={Post} />
		</Stack.Navigator>
	)
}
