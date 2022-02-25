import React, { useState, useEffect, useRef } from 'react'
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
import * as Location from 'expo-location'
import { View, Text, TextInput, Dimensions, StyleSheet, TouchableOpacity, Alert, Permissions } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

import MarkerComponent from './MarkerComponent'
import { keys } from '../api/keys'

const latitudeDelta = 0.025
const longitudeDelta = 0.025

const initialCoords = [
	{ lat: 42.03508453490926, long: -87.91168817008241 },
	{ lat: 42.04605315115955, long: -87.86093266932191 },
]

export default function Map({ navigation }) {
	const [paddingTop, setPaddingTop] = useState(0)
	const [coords, setCoords] = useState(initialCoords)
	const [location, setLocation] = useState([])
	const [errorMsg, setErrorMsg] = useState(null)
	const [currentAddress, setCurrentAddress] = useState(null)
	const [searchString, setSearchString] = useState('https://maps.googleapis.com/maps/api/geocode/json?address=')
	const GOOGLE_PACES_API_BASE_URL = 'https://maps.googleapis.com/maps/api/place'

	const mapRef = useRef()

	useEffect(() => {
		;(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync()
			if (status !== 'granted') {
				setErrorMsg('Permission to access location was denied')
				return
			}

			let location = await Location.getCurrentPositionAsync({})
			setLocation(location)
			// console.log(location)
		})()
	}, [])

	useEffect(() => {
		if (currentAddress) {
			getCurrentAddressHandler(currentAddress)
		}
	}, [currentAddress])

	const getCurrentAddressHandler = (coords) => {
		fetch(`${searchString}=${coords}&key=${keys.GOOGLE_MAP_KEY}`)
			.then((response) => response.json())
			.then((responseJson) => {
				const { location } = responseJson.results[0].geometry
				console.log(location)
				setLocation(location)
			})
	}

	return (
		<View style={{ paddingBottom: paddingTop }}>
			<MapView
				ref={mapRef}
				userInterfaceStyle='light'
				region={{
					latitude: 42.03508453490926,
					longitude: -87.91168817008241,
					latitudeDelta: latitudeDelta,
					longitudeDelta: longitudeDelta,
				}}
				animateToRegion={{ region: { latitude: 42.03508453490926, longitude: -87.91168817008241 }, duration: 300 }}
				// provider={PROVIDER_GOOGLE}
				zoomEnabled={true}
				zoomControlEnabled={true}
				showsUserLocation={true}
				showsMyLocationButton={true}
				scrollEnabled={true}
				loadingEnabled
				style={styles.map}
				onMapReady={() => {
					console.log('Map ready')
					setPaddingTop(300)
				}}>
				{coords && coords.map((coords, index) => <MarkerComponent key={index} coords={coords} />)}
			</MapView>
			<View style={{ position: 'absolute', top: 100, width: '100%' }}>
				<Text>{location && `${location.lat} ${location.lng}`}</Text>
				<View
					style={{
						borderRadius: 10,
						margin: 10,
						color: '#000',
						borderColor: '#666',
						backgroundColor: '#FFF',
						borderWidth: 1,
						// height: 45,
						paddingHorizontal: 10,
						fontSize: 18,
					}}>
					<GooglePlacesAutocomplete
						placeholder='Search'
						onPress={(data, details = null) => {
							// 'details' is provided when fetchDetails = true
							console.log('data', data.description)
							setCurrentAddress(data.description)
							// console.log('details', details.types[1])
						}}
						query={{
							key: keys.GOOGLE_MAP_KEY,
							language: 'en',
						}}
					/>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	map: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
	},
	mapStyle: {
		flex: 1,
		marginLeft: 3,
	},
})
