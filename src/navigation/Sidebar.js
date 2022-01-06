import React, { useContext } from 'react'
import { useTheme } from 'react-native-paper'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import { MaterialIcons } from '@expo/vector-icons'
import { DrawerActions } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { UserContext } from '../store/context'
import Profile from '../screens/Profile'
import Create from '../screens/Create'
import LogIn from '../screens/LogIn'
import SignUp from '../screens/SignUp'

const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()

function ProfileNavigation() {
	const [stateUser, setStateUser] = useContext(UserContext)
	const { colors } = useTheme()

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			{stateUser?.token ? (
				<Stack.Screen name='profile' component={Profile} />
			) : (
				<Stack.Screen root='login' name='login' component={LogIn} />
			)}
			<Stack.Screen name='signup' component={SignUp} />
		</Stack.Navigator>
	)
}

export default function SidebarNavigation({ navigation }) {
	const [stateUser, setStateUser] = useContext(UserContext)
	const { colors } = useTheme()

	// options for Drawer screen
	const drawerScreenOption = () => {
		return {
			headerRight: () => {
				return stateUser?.token ? (
					<MaterialIcons
						name='exit-to-app'
						size={24}
						color={colors.alert}
						style={{ paddingRight: 20 }}
						onPress={() => {
							setStateUser(null)
							AsyncStorage.clear()
						}}
					/>
				) : null
			},
			headerLeft: () => {
				return (
					<MaterialIcons
						name='menu'
						size={24}
						color={colors.blue}
						style={{ paddingLeft: 20 }}
						onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
					/>
				)
			},
		}
	}

	return (
		<Drawer.Navigator screenOptions={drawerScreenOption}>
			{stateUser?.token ? (
				<Drawer.Group>
					<Drawer.Screen
						name='profile'
						component={Profile}
						root='profile'
						options={{
							title: 'Profile',
						}}
					/>
					<Drawer.Screen
						name='Create'
						component={Create}
						options={{
							title: 'Create',
						}}
					/>
				</Drawer.Group>
			) : (
				<Drawer.Group>
					<Drawer.Screen
						name='login'
						component={LogIn}
						options={{
							title: 'LogIn',
						}}
					/>
					<Drawer.Screen
						name='signup'
						component={SignUp}
						options={{
							title: 'SignUp',
						}}
					/>
				</Drawer.Group>
			)}
		</Drawer.Navigator>
	)
}
