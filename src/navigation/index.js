import { useContext } from 'react'
import { useTheme } from 'react-native-paper'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { NavigationContainer } from '@react-navigation/native'

import ProfileNavigation from './ProfileNavigation'
import PostNavigation from './PostNavigation'
import HomeNavigation from './HomeNavigation'
import FavoriteNavigation from './FavoriteNavigation'
import { UserContext } from '../store/context'

export const Tab = createBottomTabNavigator()

function BottomTabNavigation() {
	const { colors } = useTheme()
	const [stateUser, setStateUser] = useContext(UserContext)

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
					component={HomeNavigation}
					options={{
						tabBarLabel: 'Home',
						tabBarIcon: ({ color }) => <MaterialCommunityIcons name='home' color={color} size={20} />,
						headerShown: false,
					}}
				/>
				{stateUser?._id && (
					<Tab.Screen
						name='ads'
						component={PostNavigation}
						options={{
							headerShown: false,
							tabBarLabel: 'My Ads',
							tabBarIcon: ({ color }) => <MaterialCommunityIcons name='post' color={color} size={20} />,
						}}
					/>
				)}
				<Tab.Screen
					name='favorites'
					component={FavoriteNavigation}
					options={{
						tabBarLabel: 'Favorite',
						tabBarIcon: ({ color }) => <MaterialCommunityIcons name='heart' color={color} size={20} />,
					}}
				/>
				<Tab.Screen
					name='profile'
					component={ProfileNavigation}
					options={{
						tabBarLabel: !stateUser?._id ? 'LogIn' : 'Profile',
						tabBarIcon: ({ color }) => <MaterialCommunityIcons name='account' color={color} size={20} />,
					}}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	)
}
export default BottomTabNavigation
