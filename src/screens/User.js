import React, { useState, useEffect, useContext, useFocusEffect } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { TextInput, Title, Button, useTheme } from 'react-native-paper'

import { BASE_URL } from '../api'
import { saveStoreData } from '../utils/AsyncStorage'
import { UserContext } from '../store/context'

export default function User({ route, navigation }) {
	const [stateUser, setStateUser] = useContext(UserContext)
	const { user } = route?.params
	const { colors } = useTheme()

	const [email, setEmail] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [nickname, setNickname] = useState('')
	const [tel, setTel] = useState('')
	const [loading, setLoading] = useState(false)
	useEffect(() => {
		setEmail(user?.email)
		setFirstName(user?.firstName)
		setLastName(user?.lastName)
		setNickname(user?.nickname)
		setNickname(user?.address)
		setTel(user.tel)
	}, [route?.params])

	const saveUserHandler = () => {
		const obj = {
			email,
			firstName,
			lastName,
			tel,
			nickname,
		}
		setLoading(true)

		fetch(`${BASE_URL}/user/${route?.params?._id}`, {
			method: 'put',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${route?.params?.token}`,
			},
			body: JSON.stringify(obj),
		})
			.then((data) => data.json())
			.then((updatedUser) => {
				saveStoreData('user', { _id: stateUser._id, token: stateUser.token, user: updatedUser })
				setStateUser({ _id: stateUser._id, token: stateUser.token, user: updatedUser })
				navigation.goBack()
			})
			.catch((err) => {
				console.log('err: ', err)
				setLoading(false)
			})
			.finally(() => setLoading(false))
	}

	return (
		<View style={styles.container}>
			<Title>Edit user info {user.firstName}</Title>
			<TextInput
				label={'first name'}
				defaultValue={user.firstName}
				mode='outlined'
				dense
				clearButtonMode='always'
				onChangeText={(name) => setFirstName(name)}
			/>
			<TextInput
				label={'last name'}
				defaultValue={user.lastName}
				mode='outlined'
				dense
				clearButtonMode='always'
				onChangeText={(name) => setLastName(name)}
			/>
			<TextInput
				dense
				mode='outlined'
				placeholder='nickname'
				defaultValue={user.nickname}
				onChangeText={(text) => setNickname(text)}
			/>
			<TextInput
				dense
				mode='outlined'
				placeholder='tel*'
				defaultValue={user.tel}
				onChangeText={(text) => setTel(text)}
			/>
			<TextInput
				dense
				mode='outlined'
				placeholder='email*'
				defaultValue={user.email}
				onChangeText={(text) => setEmail(text)}
				autoCapitalize='none'
			/>
			<View>
				{user?.address && (
					<TextInput
						dense
						multiline
						mode='outlined'
						placeholder='address'
						disabled
						defaultValue={user?.address}
						onChangeText={(text) => setEmail(text)}
						autoCapitalize='none'
					/>
				)}

				<Button
					marginTop={10}
					mode='contained'
					color={user?.address ? colors.blue : colors.red}
					icon={'map'}
					loading={loading}
					disabled={loading}
					onPress={() => navigation.navigate('location', { userId: `${route?.params?._id}`, token: stateUser.token })}>
					{user?.address ? 'Edit location' : 'Add location !!!'}
				</Button>
				<Button
					marginTop={10}
					mode='contained'
					color={colors.green}
					icon={'tab'}
					loading={loading}
					disabled={loading}
					onPress={() => saveUserHandler()}>
					Update user
				</Button>
				<Button
					marginTop={10}
					mode='contained'
					color={colors.alert}
					icon={'cancel'}
					dark
					disabled={loading}
					onPress={() => navigation.goBack()}>
					Cancel
				</Button>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		margin: 20,
	},
})
