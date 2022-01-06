import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { useTheme } from 'react-native-paper'

import { UserContext } from '../store/context'
import LogIn from '../screens/LogIn'
import Profile from '../screens/Profile'
import SignUp from '../screens/SignUp'

const Stack = createStackNavigator()

export default function ProfileNavigation() {
	const [stateUser, setStateUser] = useContext(UserContext)
	const { colors } = useTheme()

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			{/* if user exist go to profile*/}
			{stateUser?.token ? (
				<Stack.Screen name='profile' component={Profile} />
			) : (
				<Stack.Screen root='login' name='logIn' component={LogIn} />
			)}
			<Stack.Screen name='signup' component={SignUp} />
		</Stack.Navigator>
	)
}
