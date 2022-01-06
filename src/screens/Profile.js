import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import * as Location from 'expo-location'

export default function Profile() {
	const [location, setLocation] = useState(null)
	const [errorMsg, setErrorMsg] = useState(null)
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
		})()
	}, [])
	return (
		<View>
			<Text>Profile</Text>
		</View>
	)
}
