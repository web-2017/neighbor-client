import React, { useState, useEffect, useRef, useContext } from 'react'
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
import * as Location from 'expo-location'
import { View, Text, TextInput, Dimensions, StyleSheet, TouchableOpacity, Alert, Permissions } from 'react-native'

import { BASE_URL } from '../api'
import { UserContext } from '../store/context'
import MarkerComponent from './MarkerComponent'

const latitudeDelta = 0.025
const longitudeDelta = 0.05

const initialCoords = {
	lat: 42.03508453490926,
	lng: -87.91168817008241,
	latitudeDelta: 0.025,
	longitudeDelta: 0.05,
}

export default function Map({ navigation }) {
	const [stateUser, setStateUser] = useContext(UserContext)
	const [paddingStyle, setPadding] = useState(0) // show showMyLocation button
	const [coords, setCoords] = useState([initialCoords])
	const [region, setRegion] = useState(initialCoords)
	const [errorMsg, setErrorMsg] = useState(null)

	const mapRef = useRef()

	useEffect(() => {
		;(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync()
			if (status !== 'granted') {
				setErrorMsg('Permission to access location was denied')
				return
			}

			let location = await Location.getCurrentPositionAsync({})
		})()
	}, [])

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			fetch(`${BASE_URL}/all-posts`, {
				method: 'get',
			})
				.then((json) => json.json())
				.then((data) => {
					console.log('newPosts', data)
					const newCoords = data?.map((x) => {
						return x.postedBy.coords
					})
					setCoords(newCoords)
					// console.log('map data', newCoords)
				})
				.catch((err) => console.log(err))
		})
		return unsubscribe
	}, [navigation])

	return (
		<View style={{ flex: 1 }}>
			<MapView
				ref={mapRef}
				provider={PROVIDER_GOOGLE}
				userInterfaceStyle='dark'
				initialRegion={{
					latitude: region.lat,
					longitude: region.lng,
					latitudeDelta: region.latitudeDelta,
					longitudeDelta: region.longitudeDelta,
				}}
				showsUserLocation={true}
				// zoomEnabled={true}
				showsMyLocationButton={true}
				style={{
					...StyleSheet.absoluteFillObject,
					paddingBottom: paddingStyle,
				}}
				// animateToRegion={{
				// 	region: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
				// 	duration: 300,
				// }}
				zoomEnabled={true}
				zoomControlEnabled={true}
				scrollEnabled={true}
				loadingEnabled
				onMapReady={() => {
					console.log('Map ready')
					setPadding(100)
				}}>
				{coords && coords.map((coords, index) => <MarkerComponent key={index} coords={coords} />)}
			</MapView>
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
