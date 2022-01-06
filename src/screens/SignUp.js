import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Link, useNavigation } from '@react-navigation/native'
import { TextInput, Button, useTheme, Snackbar } from 'react-native-paper'

import TextCustom from '../components/TextCustom'
import { BASE_URL } from '../api'

export default function SignUp() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [repeatPassword, setRepeatPassword] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [nickname, setNickname] = useState('')
	const [tel, setTel] = useState('')
	const [loading, setLoading] = useState(false)
	const [visible, setVisible] = useState(false)
	const [message, setMessage] = useState(null)
	const [error, setError] = useState(false)

	const navigation = useNavigation()
	// navigation.navigate('profile')

	const { colors } = useTheme()

	const saveUserHandler = async () => {
		// if empty
		if (!firstName && !lastName && !email && !password && !repeatPassword && !tel) {
			setError(true)
			setLoading(false)
			setVisible(true)
			return setMessage('All fields are required!')
		}

		if (password !== repeatPassword) {
			setError(true)
			setLoading(false)
			setVisible(true)
			return setMessage('Password mismatch!')
		}

		if (password.length <= 5) {
			setError(true)
			setLoading(false)
			setVisible(true)
			return setMessage('Password must be at least 6 characters!')
		}

		const obj = {
			firstName,
			lastName,
			nickname,
			tel,
			email,
			password,
		}
		console.log(obj)

		setLoading(true)

		await fetch(`${BASE_URL}/signup`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(obj),
		})
			.then((data) => data.json())
			.then(async (data) => {
				setError(false)
				setVisible(true)
				setLoading(false)
				// if error
				if (data.message) {
					setError(false)
					setError(true)

					return setMessage(data.message)
				} else {
					// success
					setError(false)
					setMessage('Welcome ' + data.user.firstName)

					console.log('11')
					navigation.navigate('profile')
				}
			})
			.catch((e) => {
				setError(e)
				setMessage(e.message)
				setLoading(false)
			})
	}

	return (
		<View style={styles.container}>
			<Snackbar
				style={{ backgroundColor: error ? colors.alert : colors.green }}
				visible={visible}
				onDismiss={() => {}}
				action={{
					label: 'close',
					onPress: () => {
						setVisible(!visible)
					},
				}}>
				{message}
			</Snackbar>
			<TextInput
				mode='outlined'
				placeholder='first name*'
				defaultValue={firstName}
				onChangeText={(text) => setFirstName(text)}
				dense
				clearButtonMode='always'
			/>
			<TextInput
				dense
				mode='outlined'
				placeholder='last name*'
				defaultValue={lastName}
				onChangeText={(text) => setLastName(text)}
			/>
			<TextInput
				dense
				mode='outlined'
				placeholder='nickname'
				defaultValue={nickname}
				onChangeText={(text) => setNickname(text)}
			/>
			<TextInput dense mode='outlined' placeholder='tel*' defaultValue={tel} onChangeText={(text) => setTel(text)} />
			<TextInput
				dense
				mode='outlined'
				placeholder='email*'
				defaultValue={email}
				onChangeText={(text) => setEmail(text)}
				autoCapitalize='none'
			/>
			<TextInput
				dense
				mode='outlined'
				placeholder='password*'
				defaultValue={password}
				onChangeText={(text) => setPassword(text)}
				autoCapitalize='none'
			/>
			<TextInput
				dense
				mode='outlined'
				placeholder='repeat password*'
				defaultValue={repeatPassword}
				onChangeText={(text) => setRepeatPassword(text)}
				autoCapitalize='none'
			/>
			<Button mode='contained' color={colors.green} style={styles.btn} loading={loading} onPress={saveUserHandler}>
				Sign Up
			</Button>
			<TextCustom>
				Already have account?{' '}
				<Link style={{ color: colors.blue, fontWeight: '800' }} to={{ screen: 'login' }}>
					Login
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
