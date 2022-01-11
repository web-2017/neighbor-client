import React, { useEffect, useState, useContext } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import * as Location from 'expo-location'
import { Button, Caption, useTheme, Title } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AntDesign } from '@expo/vector-icons'

import { saveStoreData } from '../utils/AsyncStorage'
import { BASE_URL } from '../api'
import { UserContext } from '../store/context'

export default function Profile({ navigation }) {
	const [stateUser, setStateUser] = useContext(UserContext)
	const [location, setLocation] = useState(null)
	const [errorMsg, setErrorMsg] = useState(null)

	const { user } = stateUser ?? ''
	const { colors } = useTheme()
	useEffect(() => {
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

	// useEffect(() => {
	// 	;(async () => {
	// 		fetch(`${BASE_URL}/user/${stateUser._id}`, {
	// 			method: 'GET',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 				Authorization: `Bearer ${stateUser?.token}`,
	// 			},
	// 		})
	// 			.then((jsonData) => jsonData.json())
	// 			.then((data) => {
	// 				console.log(data)
	// 			})
	// 	})()
	// }, [])

	return (
		<View style={styles.container}>
			{/* <Title style={{ textAlign: 'center' }}>My info</Title> */}
			<Caption>
				Name: {user?.firstName} {user?.lastName}
			</Caption>
			<Caption>
				Nickname: {user?.nickname} {user?.lastName}
			</Caption>
			<Caption>Email: {user?.email}</Caption>
			<Caption>Tel: + {user?.tel}</Caption>
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
