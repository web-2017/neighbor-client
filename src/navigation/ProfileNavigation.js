import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { UserContext } from '../store/context'
import LogInScreen from '../screens/LogInScreen'
import SignUpScreen from '../screens/SignUpScreen'
import UserScreen from '../screens/UserScreen'
import GoogleSearchLocation from '../screens/GoogleSearchLocation'
import Sidebar from './Sidebar'

const Stack = createStackNavigator()

export default function ProfileNavigation() {
	const [stateUser, setStateUser] = useContext(UserContext)
	// console.log('stateUser', stateUser)

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			{stateUser?._id ? (
				<Stack.Group>
					<Stack.Screen name='profileNavigator' component={Sidebar} />
					<Stack.Group screenOptions={{ presentation: 'modal' }}>
						<Stack.Screen name='user' component={UserScreen} />
					</Stack.Group>
				</Stack.Group>
			) : (
				<Stack.Group>
					<Stack.Screen
						name='login'
						component={LogInScreen}
						options={{
							title: 'LogIn',
						}}
					/>
					<Stack.Screen
						name='signup'
						component={SignUpScreen}
						options={{
							title: 'SignUp',
						}}
					/>
					<Stack.Group screenOptions={{ presentation: 'modal' }}>
						<Stack.Screen name='googleSearchScreen' component={GoogleSearchLocation} />
					</Stack.Group>
				</Stack.Group>
			)}
		</Stack.Navigator>
	)
}
