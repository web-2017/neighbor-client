import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import PostsScreen from '../screens/PostsScreen'
import PostScreen from '../screens/PostScreen'
import EditPost from '../screens/EditPost'
import Create from '../screens/Create'
import GoogleSearchLocation from '../screens/GoogleSearchLocation'
import { configNavigationAnimation } from './configNavigation'

const Stack = createStackNavigator()

export default function PostNavigation() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name='allposts'
				component={PostsScreen}
				options={{
					headerShown: true,
					title: 'My Posts',
					transitionSpec: {
						open: configNavigationAnimation,
						close: configNavigationAnimation,
					},
				}}
			/>
			<Stack.Screen
				name='create'
				component={Create}
				options={{
					headerShown: true,
					title: 'Create Post',
					transitionSpec: {
						open: configNavigationAnimation,
						close: configNavigationAnimation,
					},
				}}
			/>
			<Stack.Screen
				name='post'
				component={PostScreen}
				options={{
					headerShown: true,
					transitionSpec: {
						open: configNavigationAnimation,
						close: configNavigationAnimation,
					},
				}}
			/>
			<Stack.Group screenOptions={{ presentation: 'modal' }}>
				<Stack.Screen name='googleSearchLocation' component={GoogleSearchLocation} />
			</Stack.Group>
			<Stack.Group screenOptions={{ presentation: 'modal' }}>
				<Stack.Screen name='editPost' component={EditPost} />
			</Stack.Group>
		</Stack.Navigator>
	)
}
