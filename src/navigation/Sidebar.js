import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { UserContext } from '../store/context'
import LogIn from '../screens/LogIn'
import SignUp from '../screens/SignUp'
import User from '../screens/User'
import Post from '../screens/Post'
import SidebarDrawerNavigation from './SidebarDrawerNavigation'

const Stack = createStackNavigator()

export default function ProfileNavigation() {
	const [stateUser, setStateUser] = useContext(UserContext)

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			{stateUser?._id ? (
				<Stack.Group>
					<Stack.Screen name='profileNavigator' component={SidebarDrawerNavigation} />

					<Stack.Group screenOptions={{ presentation: 'modal' }}>
						<Stack.Screen name='user' component={User} />
					</Stack.Group>
				</Stack.Group>
			) : (
				<Stack.Group>
					<Stack.Screen
						name='login'
						component={LogIn}
						options={{
							title: 'LogIn',
						}}
					/>
					<Stack.Screen
						name='signup'
						component={SignUp}
						options={{
							title: 'SignUp',
						}}
					/>
				</Stack.Group>
			)}
		</Stack.Navigator>
	)
}
