import React, { useEffect, useState, useContext } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import * as Location from 'expo-location'
import { Button, Paragraph, useTheme, Title } from 'react-native-paper'
import { AntDesign } from '@expo/vector-icons'

import { saveStoreData } from '../utils/AsyncStorage'
import { BASE_URL } from '../api'
import { UserContext } from '../store/context'

export default function Profile({ navigation }) {
	const [stateUser, setStateUser] = useContext(UserContext)
	const [address, setAddress] = useState(null)
	const [location, setLocation] = useState([])
	const [loading, setLoading] = useState(false)
	const [errorMsg, setErrorMsg] = useState(null)

	const { colors } = useTheme()

	useEffect(() => {
		console.log('stateUser', stateUser)
		;(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync()
			if (status !== 'granted') {
				setErrorMsg('Permission to access location was denied')
				return
			}

			let location = await Location.getCurrentPositionAsync({})
			// console.log(location)
			setLocation(location)
			saveStoreData('userLocation', JSON.stringify(location))
		})()
	}, [])

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', async () => {
			fetch(`${BASE_URL}/user/${stateUser._id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${stateUser?.token}`,
				},
			})
				.then((jsonData) => jsonData.json())
				.then((data) => {
					setAddress(data.user)
					saveStoreData('user', { _id: stateUser._id, token: stateUser.token, user: data.user })
					setStateUser({ _id: stateUser._id, token: stateUser.token, user: data.user })
				})
		})

		return unsubscribe
	}, [])

	return (
		<View style={styles.container}>
			{/* <Title style={{ textAlign: 'center' }}>My info</Title> */}
			<Paragraph>
				Name: {address?.firstName} {address?.lastName}
			</Paragraph>
			<Paragraph>
				Nickname: {address?.nickname} {address?.lastName}
			</Paragraph>
			<Paragraph>Email: {address?.email}</Paragraph>
			<Paragraph>Tel: + {address?.tel}</Paragraph>
			{address?.address && <Paragraph>Location: {address?.address}</Paragraph>}

			<Button
				color={colors.blue}
				mode='contained'
				icon={() => <AntDesign name='edit' size={24} color={colors.primary} />}
				onPress={() => navigation.navigate({ name: 'user', params: stateUser })}>
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
