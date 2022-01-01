import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import LogIn from '../screens/LogIn'
import Profile from '../screens/Profile'
import SignUp from '../screens/SignUp'

const Stack = createStackNavigator()

export default function ProfileNavigation() {
	return (
		<Stack.Navigator>
			<Stack.Screen root='login' name='logIn' component={LogIn} />
			<Stack.Screen name='profile' component={Profile} />
			<Stack.Screen name='signup' component={SignUp} />
		</Stack.Navigator>
	)
}
