import { useContext } from 'react'
import { useTheme } from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons'
import { DrawerActions } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createDrawerNavigator } from '@react-navigation/drawer'

import { UserContext } from '../store/context'
import Profile from '../screens/Profile'
import Support from '../screens/Support'

const Drawer = createDrawerNavigator()

export default function Sidebar({ navigation }) {
	const [stateUser, setStateUser] = useContext(UserContext)
	const { colors } = useTheme()

	// options for Drawer screen
	const drawerScreenOption = () => {
		return {
			drawerStyle: {
				backgroundColor: colors.gray,
				width: 240,
			},
			drawerType: 'slide',
			headerRight: () => {
				return stateUser?._id ? (
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
					name='support'
					component={Support}
					options={{
						title: 'Support',
					}}
				/>
			</Drawer.Group>
		</Drawer.Navigator>
	)
}
