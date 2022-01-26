import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Posts from '../screens/Posts'
import Post from '../screens/Post'
import EditPost from '../screens/EditPost'

const Stack = createStackNavigator()

export default function PostNavigation() {
	return (
		<Stack.Navigator>
			<Stack.Screen name='allposts' component={Posts} options={{ headerShown: true, title: 'Posts' }} />
			<Stack.Screen name='post' component={Post} options={{ headerShown: true }} />
			<Stack.Group screenOptions={{ presentation: 'modal' }}>
				<Stack.Screen name='editPost' component={EditPost} />
			</Stack.Group>
		</Stack.Navigator>
	)
}
