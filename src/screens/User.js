import React, { useState, useEffect, useContext } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { TextInput, Title, Button, useTheme } from 'react-native-paper'

import { BASE_URL } from '../api'
import { saveStoreData } from '../utils/AsyncStorage'
import { UserContext } from '../store/context'

export default function User({ route, navigation }) {
	const [stateUser, setStateUser] = useContext(UserContext)
	const { params } = route
	const { colors } = useTheme()

	const [email, setEmail] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [nickname, setNickname] = useState('')
	const [tel, setTel] = useState('')
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setEmail(params?.user.email)
		setFirstName(params?.user.firstName)
		setLastName(params?.user.lastName)
		setNickname(params?.user.nickname)
		setTel(params?.user.tel)
	}, [params])

	const savePostUser = () => {
		const obj = {
			email,
			firstName,
			lastName,
			tel,
			nickname,
		}
		setLoading(true)
		fetch(`${BASE_URL}/user/${params?._id}`, {
			method: 'put',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${params?.token}`,
			},
			body: JSON.stringify(obj),
		})
			.then((data) => data.json())
			.then((updatedUser) => {
				console.log('updatedUser', updatedUser)
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
			<Title>Edit user info {params?.user.firstName}</Title>
			<TextInput
				label={'first name'}
				defaultValue={params?.user.firstName}
				mode='outlined'
				dense
				clearButtonMode='always'
				onChangeText={(name) => setFirstName(name)}
			/>
			<TextInput
				label={'last name'}
				defaultValue={params?.user.lastName}
				mode='outlined'
				dense
				clearButtonMode='always'
				onChangeText={(name) => setLastName(name)}
			/>
			<TextInput
				dense
				mode='outlined'
				placeholder='nickname'
				defaultValue={params?.user.nickname}
				onChangeText={(text) => setNickname(text)}
			/>
			<TextInput
				dense
				mode='outlined'
				placeholder='tel*'
				defaultValue={params?.user.tel}
				onChangeText={(text) => setTel(text)}
			/>
			<TextInput
				dense
				mode='outlined'
				placeholder='email*'
				defaultValue={params?.user.email}
				onChangeText={(text) => setEmail(text)}
				autoCapitalize='none'
			/>
			<Button
				marginTop={10}
				mode='contained'
				color={colors.green}
				icon={'tab'}
				loading={loading}
				disabled={loading}
				onPress={() => savePostUser()}>
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
	)
}

const styles = StyleSheet.create({
	container: {
		margin: 20,
	},
})
