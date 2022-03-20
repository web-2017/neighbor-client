import { useTheme } from 'react-native-paper'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { NavigationContainer } from '@react-navigation/native'

import ProfileNavigation from './ProfileNavigation'
import Home from '../screens/Home'
import PostNavigation from './PostNavigation'

export const Tab = createBottomTabNavigator()

function BottomTabNavigation() {
	const { colors } = useTheme()

	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={{
					tabBarActiveTintColor: colors.red,
					tabBarInactiveTintColor: 'gray',
					// tabBarInactiveBackgroundColor: 'green',
					// tabBarActiveBackgroundColor: colors.accent,
					// tabBarBadge: 1, numbers
					headerShown: false,
				}}>
				<Tab.Screen
					name='home'
					component={Home}
					options={{
						tabBarLabel: 'Home',
						tabBarIcon: ({ color }) => <MaterialCommunityIcons name='home' color={color} size={20} />,
						headerShown: false,
					}}
				/>
				<Tab.Screen
					name='posts'
					component={PostNavigation}
					options={{
						headerShown: false,
						tabBarLabel: 'posts',
						tabBarIcon: ({ color }) => <MaterialCommunityIcons name='post' color={color} size={20} />,
					}}
				/>
				<Tab.Screen
					name='Profile'
					component={ProfileNavigation}
					options={{
						tabBarLabel: 'Profile',
						tabBarIcon: ({ color }) => <MaterialCommunityIcons name='account' color={color} size={20} />,
					}}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	)
}
export default BottomTabNavigation
