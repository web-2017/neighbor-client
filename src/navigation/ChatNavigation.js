import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import ChatScreen from '../screens/ChatScreen'

const Stack = createStackNavigator()

export default function ChatNavigation() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: true }}>
			<Stack.Screen name='Chat' component={ChatScreen} />
		</Stack.Navigator>
	)
}
