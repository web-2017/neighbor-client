import React, { useState, useRef, useEffect } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { Paragraph, Title, useTheme, Button } from 'react-native-paper'
import { Text, View, Alert } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { setUserReducer } from '../store/reducers/userReducer'
import { BASE_URL } from '../api'
import { keys } from '../api/keys'

export default function GoogleSearchLocation({ route, navigation }) {
	const [coords, setCoords] = useState(null)
	const [loading, setLoading] = useState(false)
	const { colors } = useTheme()
	const ref = useRef()

	const dispatch = useDispatch()

	useEffect(() => {
		route?.params?.address && ref.current?.setCoordsText(route?.params?.address)
	}, [])

	// const postUpdateAddress = () => {
	// 	if (address) {
	// 		setLoading(true)
	// 		fetch(`${BASE_URL}/user/${userId}`, {
	// 			method: 'put',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 				Authorization: `Bearer ${token}`,
	// 			},
	// 			body: JSON.stringify({ address: address.address, coords: { lat: address.lat, lng: address.lng } }),
	// 		})
	// 			.then((json) => json.json())
	// 			.then((data) => {
	// 				console.log('data', data)
	// 			})
	// 			.catch((err) => Alert.alert('Error', err))
	// 			.finally(() => {
	// 				setLoading(false)
	// 				navigation.goBack()
	// 			})
	// 	}
	// }

	// const saveLocationHandler = () => {
	// 	if (address) {
	// 		Alert.alert('Save your location', 'This address will be attached to all your ads', [
	// 			{
	// 				text: 'Cancel',
	// 				onPress: () => console.log('Cancel'),
	// 				style: 'cancel',
	// 			},
	// 			{ text: 'OK', onPress: () => postUpdateAddress() },
	// 		])
	// 	}
	// }

	return (
		<>
			<Title style={{ marginHorizontal: 20, textAlign: 'center', color: colors.primary }}>
				Please don't forget indicate number of your building
			</Title>
			{loading ? (
				<Title>Please wait, Loading...</Title>
			) : (
				<GooglePlacesAutocomplete
					ref={ref}
					suppressDefaultStyles={false}
					query={{
						key: keys.GOOGLE_MAP_KEY,
						language: 'en',
						components: 'country:us',
					}}
					// style={{
					// 	borderWidth: 1,
					// 	borderColor: 'red',
					// }}
					placeholder='Search'
					fetchDetails={true} // fetch with details coords
					onPress={(data, details = null) => {
						// console.log('details', details.geometry.location)
						// console.log('data.description', data.description)
						setCoords({
							address: data.description,
							lat: details.geometry.location.lat,
							lng: details.geometry.location.lng,
						})

						// navigation.goBack()
						// saveLocationHandler()
					}}
					minLength={2}
					onFail={(error) => console.error(error)}
					// currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
				/>
			)}

			<View>
				<Button
					onPress={() => {
						dispatch(setUserReducer(coords))
						navigation.navigate('signup')
					}}
					style={{ alignContent: 'flex-end', marginBottom: 20 }}
					mode='contained'>
					Save location
				</Button>
			</View>
		</>
	)
}
