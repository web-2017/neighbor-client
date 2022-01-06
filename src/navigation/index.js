import { useContext } from 'react'
import { useTheme } from 'react-native-paper'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import { UserContext } from '../store/context/index'
import MainNavigation from './MainNavigation'
import SidebarNavigation from './Sidebar'

const Stack = createStackNavigator()
const Tab = createMaterialBottomTabNavigator()

function BottomTabNavigation() {
	const [stateUser, setStateUser] = useContext(UserContext)
	const { colors } = useTheme()

	return (
		<NavigationContainer>
			<Tab.Navigator
				activeColor={colors.accent}
				inactiveColor={colors.gray}
				barStyle={{ backgroundColor: colors.primary }}>
				<Stack.Group>
					<Tab.Screen
						name='Home'
						component={MainNavigation}
						options={{
							tabBarLabel: 'Home',
							tabBarIcon: ({ color }) => <MaterialCommunityIcons name='home' color={color} size={20} />,
						}}
					/>

					<Tab.Screen
						// screenOptions={{ headerShown: false }}
						name='ProfileTab'
						options={{ title: 'Profile' }}
						component={SidebarNavigation}
						options={{
							tabBarLabel: 'Profile',
							tabBarIcon: ({ color }) => <MaterialCommunityIcons name='account' color={color} size={20} />,
						}}
					/>
				</Stack.Group>
			</Tab.Navigator>
		</NavigationContainer>
	)
}
export default BottomTabNavigation
