import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../screens/Home'
import Post from '../screens/Post'
import EditPost from '../screens/EditPost'
import { constants } from '../config/constants'

const Stack = createStackNavigator()

export default function HomeNavigation() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: true }}>
			<Stack.Screen name='Home' component={Home} options={{ title: constants.logoTitle }} />
			<Stack.Screen name='post' component={Post} />
			<Stack.Screen name='editPost' component={EditPost} />
		</Stack.Navigator>
	)
}
