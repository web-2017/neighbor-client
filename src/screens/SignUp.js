import { Link } from '@react-navigation/native'
import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text } from 'react-native'

import { TextInput, Button, useTheme, Snackbar } from 'react-native-paper'
import TextCustom from '../components/TextCustom'

export default function SignUp() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [loading, setLoading] = useState(false)
	const [visible, setVisible] = useState(true)
	const [error, setError] = useState(null)

	const { colors } = useTheme()

	const onDismissSnackBar = () => {
		console.log('11')
	}

	const saveUserHandler = () => {
		const obj = {
			firstName,
			lastName,
			email,
			password,
		}
		console.log(obj)
	}

	return (
		<View style={styles.container}>
			<Snackbar
				visible={visible}
				onDismiss={onDismissSnackBar}
				action={{
					label: 'Undo',
					onPress: () => {
						setVisible(false)
					},
				}}>
				{error}
			</Snackbar>
			<TextInput
				mode='outlined'
				placeholder='first name'
				defaultValue={firstName}
				onChangeText={(text) => setFirstName(text)}
			/>
			<TextInput
				mode='outlined'
				placeholder='last name'
				defaultValue={lastName}
				onChangeText={(text) => setLastName(text)}
			/>
			<TextInput mode='outlined' placeholder='email' defaultValue={email} onChangeText={(text) => setEmail(text)} />
			<TextInput
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
				onPress={saveUserHandler}>
				LogIn
			</Button>
			<TextCustom>
				Already have account?{' '}
				<Link style={{ color: colors.blue, fontWeight: '800' }} to={{ screen: 'signup' }}>
					Log In
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
