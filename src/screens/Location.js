import React, { useState } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { Paragraph, Title, useTheme, Button } from 'react-native-paper'
import { Text, View, Alert } from 'react-native'

import { BASE_URL } from '../api'
import { keys } from '../api/keys'

export default function Location({ route, navigation }) {
	const { userId, token } = route?.params
	const [address, setAddress] = useState(null)
	const [loading, setLoading] = useState(false)
	const { colors } = useTheme()

	const postUpdateAddress = () => {
		if (address) {
			setLoading(true)
			fetch(`${BASE_URL}/user/${userId}`, {
				method: 'put',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ address: address }),
			})
				.then((json) => json.json())
				.then((data) => {
					console.log('data', data)
				})
				.catch((err) => Alert.alert('Error', err))
				.finally(() => {
					setLoading(false)
					navigation.navigate('profile')
				})
		}
	}

	const saveLocationHandler = () => {
		if (address) {
			Alert.alert('Save your location', 'Warning, this address will be attached to all your ads', [
				{
					text: 'Cancel',
					onPress: () => console.log('Cancel'),
					style: 'cancel',
				},
				{ text: 'OK', onPress: () => postUpdateAddress() },
			])
		}
	}

	return (
		<>
			<Title style={{ marginHorizontal: 20, textAlign: 'center', color: colors.primary }}>
				Please don't forget indicate number of your building
			</Title>
			{loading ? (
				<Title>Please wait, Loading...</Title>
			) : (
				<GooglePlacesAutocomplete
					suppressDefaultStyles={false}
					// style={{ borderWidth: 1, borderColor: 'red' }}
					placeholder='Search'
					onPress={(data, details = null) => {
						setAddress(data.description)
						saveLocationHandler()
					}}
					query={{
						key: keys.GOOGLE_MAP_KEY,
						language: 'en',
					}}
				/>
			)}

			<View>
				<Button
					onPress={() => saveLocationHandler()}
					style={{ alignContent: 'flex-end', marginBottom: 20 }}
					mode='contained'>
					Save location
				</Button>
			</View>
		</>
	)
}
