import React, { useState, useEffect, useContext } from 'react'
import { Link } from '@react-navigation/native'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { TextInput, Button, useTheme, Snackbar } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import { setUserReducer } from '../store/reducers/userReducer'

import TextCustom from '../components/TextCustom'
import { BASE_URL } from '../api'
import { saveStoreData } from '../utils/AsyncStorage'
import { UserContext } from '../store/context'

const fakeUser = {
	email: 'webdevelope2017@gmail.com',
	password: 'addqdd',
}

export default function LogIn({ navigation }) {
	const dispatch = useDispatch()

	const [stateUser, setStateUser] = useContext(UserContext)

	const [email, setEmail] = useState(process.env.NODE_ENV === 'development' ? fakeUser.email : '')
	const [password, setPassword] = useState(process.env.NODE_ENV === 'development' ? fakeUser.password : '')
	const [loading, setLoading] = useState(false)
	const [visible, setVisible] = useState(false)
	const [message, setMessage] = useState(null)
	const [error, setError] = useState(false)

	const { colors } = useTheme()

	const onDismissSnackBar = () => {
		console.log('onDismissSnackBar')
	}

	const logInHandler = async () => {
		setLoading(true)

		try {
			const response = await fetch(`${BASE_URL}/signin`, {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			})

			const data = await response.json()

			setError(false)
			setVisible(true)
			setLoading(false)
			saveStoreData('user', data) // save data to AsyncStorage
			setStateUser(data) // save UserContext

			// console.log(data)

			dispatch(setUserReducer(data)) // set data to AsyncStorage

			if (response.status === 200) {
				setError(false)
				setMessage('Welcome ' + data.user.firstName)

				navigation.navigate('profileNavigator')
				return
			} else {
				setError(true)
				setError(true)
				return setMessage(data.message)
			}
		} catch (error) {
			setError(error)
			setMessage(error.message)
			setLoading(false)
		} finally {
			setLoading(false)
		}
	}

	return (
		<View style={styles.container}>
			<Snackbar
				style={{ backgroundColor: error ? colors.alert : colors.green }}
				visible={visible}
				onDismiss={onDismissSnackBar}
				action={{
					label: 'close',
					onPress: () => {
						setVisible(!visible)
					},
				}}>
				{message}
			</Snackbar>
			<TextInput
				autoCapitalize='none'
				mode='outlined'
				placeholder='email'
				defaultValue={email}
				onChangeText={(text) => setEmail(text)}
			/>
			<TextInput
				autoCapitalize='none'
				mode='outlined'
				placeholder='password'
				defaultValue={password}
				onChangeText={(text) => setPassword(text)}
			/>
			<TouchableOpacity onPress={() => logInHandler()}>
				<Button
					title='LogIn'
					mode='contained'
					color={colors.green}
					style={styles.btn}
					loading={loading}
					disabled={loading}>
					LogIn
				</Button>
			</TouchableOpacity>

			<TextCustom>
				Don't have an account yet?{' '}
				<Link style={{ color: colors.alert, fontWeight: '600' }} to={{ screen: 'signup' }}>
					Register now
				</Link>
			</TextCustom>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		marginHorizontal: 30,
	},
	btn: {
		marginVertical: 10,
	},
})
