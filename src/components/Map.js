import React, { useState, useEffect, useRef, useContext } from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import * as Location from 'expo-location'
import { View, StyleSheet, Alert } from 'react-native'

import { useTheme } from 'react-native-paper'

import { BASE_URL } from '../api'
import { UserContext } from '../store/context'
import MarkerComponent from './MarkerComponent'
import ZoomControl from './ZoomControl'
import NavigationButton from './NavigationButton'
import CarouselSlider from './CarouselSlider'

const initialCoords = {
	lat: 42.03508453490926,
	lng: -87.91168817008241,
	latitudeDelta: 0.03,
	longitudeDelta: 0.02,
}

export default function Map({ navigation }) {
	const [stateUser, setStateUser] = useContext(UserContext)
	const [paddingStyle, setPadding] = useState(0) // show showMyLocation button
	const [region, setRegion] = useState(initialCoords)
	const [posts, setPosts] = useState([])
	const [errorMsg, setErrorMsg] = useState(null)
	const [mapZoom, setMapZoom] = useState(0.03)
	const { colors } = useTheme()

	// console.log('stateUser', stateUser)

	const mapRef = useRef()

	// Permission
	useEffect(() => {
		;(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync()
			if (status !== 'granted') {
				setErrorMsg('Permission to access location was denied')
				return
			}

			let location = await Location.getCurrentPositionAsync({})

			if (location) {
				setRegion({ lat: location?.coords?.latitude, lng: location?.coords.longitude })
			} else {
				Alert.alert('Error - current location', 'Please go to setting and turn on location')
			}
		})()
	}, [])

	// get all posts/coords on focus screen
	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			fetch(`${BASE_URL}/posts`, {
				method: 'get',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${stateUser?.token}`,
				},
			})
				.then((json) => json.json())
				.then((data) => {
					// get only 1 post of each user for show on map
					const filteredId = data.map((o) => o.postedBy._id)
					const filteredData = data.filter((elem, index) => !filteredId.includes(elem.postedBy._id, index + 1))

					setPosts(filteredData) // all posts

					// get user coords for initial region
					if (stateUser?._id) {
						const getUserInitialCoords = data.filter((elem) => elem.postedBy._id === stateUser._id)
						setRegion(getUserInitialCoords.coords)
					}
				})
				.catch((err) => console.log(err))
		})
		return unsubscribe
	}, [navigation])

	const getCurrentLocation = async () => {
		try {
			let location = await Location.getCurrentPositionAsync({})
			// console.log(location)
			setRegion({
				lat: location?.coords?.latitude,
				lng: location?.coords.longitude,
			})
			setMapZoom(0.03)
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<View style={{ flex: 1 }}>
			<MapView
				ref={mapRef}
				// provider={PROVIDER_GOOGLE}
				userInterfaceStyle='dark'
				region={{
					latitude: stateUser?._id ? stateUser?.user?.coords?.lat : region?.lat,
					longitude: stateUser?._id ? stateUser?.user?.coords?.lng : region?.lng,
					latitudeDelta: mapZoom,
					longitudeDelta: initialCoords.longitudeDelta,
				}}
				style={{
					...StyleSheet.absoluteFillObject,
					paddingBottom: paddingStyle,
				}}
				animateToRegion={{
					region: { latitude: region?.lat, longitude: region?.lng, latitudeDelta: 0.03, longitudeDelta: 0.03 },
					duration: 300,
				}}
				zoomTapEnabled={true}
				showsMyLocationButton={true}
				onMapReady={() => {
					console.log('Map ready')
					setPadding(100)
				}}>
				{posts?.map((post, index) => (
					<MarkerComponent key={index} post={post} />
				))}
			</MapView>
			<NavigationButton getCurrentLocation={getCurrentLocation} />
			<ZoomControl mapZoom={mapZoom} setMapZoom={setMapZoom} />
			<CarouselSlider setRegion={setRegion} posts={posts} navigation={navigation} />
		</View>
	)
}
