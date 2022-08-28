import React, { useEffect, useState, useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import * as Location from 'expo-location'
import { Button, Paragraph, useTheme, Title } from 'react-native-paper'
import { AntDesign } from '@expo/vector-icons'

import { saveStoreData } from '../utils/AsyncStorage'
import { BASE_URL } from '../api'
import { UserContext } from '../store/context'

export default function Profile({ navigation }) {
	const [stateUser, setStateUser] = useContext(UserContext)

	const [errorMsg, setErrorMsg] = useState(null)
	const [user, setUser] = useState(null)

	const { colors } = useTheme()

	useEffect(() => {
		;(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync()
			if (status !== 'granted') {
				setErrorMsg('Permission to access location was denied')
				return
			}
		})()
	}, [])

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', async () => {
			fetch(`${BASE_URL}/user/${stateUser?._id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${stateUser?.token}`,
				},
			})
				.then((jsonData) => jsonData.json())
				.then((data) => {
					setUser(data.user)
					// saveStoreData('user', { _id: data._id, token: stateUser.token, user: data.user }) //set AsyncStorage data
					// setStateUser({ _id: stateUser._id, token: stateUser.token, user: data.user }) // set UserContext
				})
		})

		return unsubscribe
	}, [])

	return (
		<View style={styles.container}>
			{/* <Title style={{ textAlign: 'center' }}>My info</Title> */}
			<Paragraph>
				<AntDesign name='user' /> {user?.firstName} {user?.lastName}
			</Paragraph>
			<Paragraph>
				<AntDesign name='info' /> Profile id: {user?._id}
			</Paragraph>
			{/* <Paragraph>{user?.nickname}</Paragraph> */}
			<Paragraph>
				<AntDesign name='mail' /> {user?.email}
			</Paragraph>
			<Paragraph>
				<AntDesign name='phone' /> {user?.tel}
			</Paragraph>
			<Paragraph>
				<AntDesign name='home' /> {user?.coords?.address}
			</Paragraph>
			<Button
				style={{ marginVertical: 10 }}
				color={colors.blue}
				mode='text'
				icon={() => <AntDesign name='edit' size={24} color={colors.primary} />}
				onPress={() => navigation.navigate({ name: 'user', params: { user: user } })}>
				edit
			</Button>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		margin: 10,
	},
})
