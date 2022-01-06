import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigation } from '@react-navigation/native'
import { View, StyleSheet } from 'react-native'
import { TextInput, Button, useTheme, Snackbar } from 'react-native-paper'

import TextCustom from '../components/TextCustom'
import { BASE_URL } from '../api'
import { saveStoreData } from '../utils/AsyncStorage'
import { UserContext } from '../store/context'

const fakeUser = {
	email: 'webdevelope2017@gmail.com',
	password: 'addqdd',
}

export default function LogIn() {
	const [stateUser, setStateUser] = useContext(UserContext)
	const [email, setEmail] = useState(process.env.NODE_ENV === 'development' ? fakeUser.email : '')
	const [password, setPassword] = useState(process.env.NODE_ENV === 'development' ? fakeUser.password : '')
	const [loading, setLoading] = useState(false)
	const [visible, setVisible] = useState(false)
	const [message, setMessage] = useState(null)
	const [error, setError] = useState(false)

	const { colors } = useTheme()
	const navigation = useNavigation()

	const onDismissSnackBar = () => {
		console.log('onDismissSnackBar')
	}

	const logInHandler = async () => {
		setLoading(true)

		await fetch(`${BASE_URL}/signin`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({ email, password }),
		})
			.then((data) => data.json())
			.then((data) => {
				setError(false)
				setVisible(true)
				setLoading(false)

				// save data to AsyncStorage
				saveStoreData('user', data)
				setStateUser(data)

				if (data?.message) {
					// if error
					setError(true)
					setError(true)
					return setMessage(data.message)
				} else {
					// if success
					setError(false)
					setMessage('Welcome ' + data.user.firstName)

					navigation.navigate('profile')
				}
			})
			.catch((e) => {
				setError(e)
				setMessage(e.message)
				setLoading(false)
			})
			.finally(() => {
				setLoading(false)
			})
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
			<Button
				title='LogIn'
				mode='contained'
				color={colors.green}
				style={styles.btn}
				loading={loading}
				onPress={() => logInHandler()}>
				LogIn
			</Button>
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
