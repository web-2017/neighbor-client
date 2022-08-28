import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Link } from '@react-navigation/native'
import { TextInput, Button, useTheme, Snackbar, Text } from 'react-native-paper'
import { useSelector } from 'react-redux'

import TextCustom from '../components/TextCustom'
import { registerRoute } from '../api/apiRoutes'

export default function SignUp({ navigation }) {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [repeatPassword, setRepeatPassword] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [coords, setCoords] = useState({ address: '' })
	const [nickname, setNickname] = useState('')
	const [tel, setTel] = useState('')
	const [loading, setLoading] = useState(false)
	const [visible, setVisible] = useState(false)
	const [message, setMessage] = useState(null)
	const [error, setError] = useState(false)

	const user = useSelector((state) => state.user)

	useEffect(() => {
		if (user) {
			setCoords(user)
		}
	}, [user])

	const { colors } = useTheme()

	const saveUserHandler = async () => {
		// if empty
		if (!firstName && !lastName && !email && !password && !repeatPassword && !tel && !coords.address) {
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
			coords: {
				address: coords.address,
				lat: coords.lat,
				lng: coords.lng,
			},
		}

		setLoading(true)

		await fetch(registerRoute, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(obj),
		})
			.then((data) => data.json())
			.then((data) => {
				if (data.error) {
					setVisible(true)
					setError(true)
					setLoading(false)
					return setMessage('Error, ' + data.error)
				}
				setVisible(true)
				setMessage('Success, please LogIn')

				setTimeout(() => {
					setLoading(false)
					setError(false)
					setVisible(false)
					navigation.navigate('login')
				}, 500)
			})
			.catch((e) => {
				setError(e)
				setMessage(e.message)
				setLoading(false)
			})
			.finally(() => setLoading(false))
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
			<TouchableOpacity
				style={styles.address}
				mode='outlined'
				onPress={(text) => navigation.navigate('googleSearchScreen')}>
				<Text style={{ color: colors.primary }}>{coords?.address ? coords?.address : 'Set Address'}</Text>
			</TouchableOpacity>

			<Button
				mode='contained'
				disabled={loading}
				color={colors.green}
				style={styles.btn}
				loading={loading}
				onPress={() => saveUserHandler()}>
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
	address: {
		marginTop: 10,
		borderWidth: 1,
		padding: 10,
		borderColor: '#888',
	},
})
