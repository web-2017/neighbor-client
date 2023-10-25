import React from 'react'
import { Text } from 'react-native'
import { useTheme } from 'react-native-paper'
import { createStackNavigator } from '@react-navigation/stack'

import HomeScreen from '../screens/HomeScreen'
import PostScreen from '../screens/PostScreen'
import EditPost from '../screens/EditPost'
import { constants } from '../config/constants'
import { configNavigationAnimation } from './configNavigation'

const Stack = createStackNavigator()

export default function HomeNavigation() {
	const { colors } = useTheme()
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: true,
				tabBarLabelStyle: { fontSize: 20 },
				tabBarItemStyle: { width: 100 },
				tabBarStyle: { backgroundColor: 'powderblue' },
			}}
		>
			<Stack.Screen
				name="Home"
				component={HomeScreen}
				options={{
					// title: constants.logoTitle,
					transitionSpec: {
						open: configNavigationAnimation,
						close: configNavigationAnimation,
					},
					headerTitle: () => (
						<Text style={{ fontSize: 20, color: colors.primary }}>
							{constants.logoTitle.toUpperCase()}
						</Text>
					),
				}}
			/>
			<Stack.Screen
				options={{
					transitionSpec: {
						open: configNavigationAnimation,
						close: configNavigationAnimation,
					},
				}}
				name="post"
				component={PostScreen}
			/>
			<Stack.Screen name="editPost" component={EditPost} />
		</Stack.Navigator>
	)
}
