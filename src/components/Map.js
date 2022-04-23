import React, { useState, useEffect, useRef, useContext } from 'react'
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
import * as Location from 'expo-location'
import { Card, Paragraph, Title, Avatar, Button } from 'react-native-paper'
import { View, Text, ScrollView, Dimensions, StyleSheet, TouchableOpacity, Platform } from 'react-native'

import { BASE_URL } from '../api'
import { UserContext } from '../store/context'
import MarkerComponent from './MarkerComponent'
import { uploadImageFilter } from '../utils/filters/uploadImageFilter'

const initialCoords = {
	lat: 42.03508453490926,
	lng: -87.91168817008241,
	latitudeDelta: 0.025,
	longitudeDelta: 0.05,
}

export default function Map({ navigation }) {
	const [stateUser, setStateUser] = useContext(UserContext)
	const [paddingStyle, setPadding] = useState(0) // show showMyLocation button
	const [region, setRegion] = useState(initialCoords)
	const [posts, setPosts] = useState([])
	const [errorMsg, setErrorMsg] = useState(null)

	// console.log('stateUser', stateUser)

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
			fetch(`${BASE_URL}/posts`, {
				method: 'get',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${stateUser?.token}`,
				},
			})
				.then((json) => json.json())
				.then((data) => {
					// get all coords
					// const newCoords = data?.map((x) => x.postedBy.coords)
					// setCoords(newCoords)

					setPosts(data) // all posts

					// get user coords for initial region
					const getUserInitialCoords = data.filter((elem) => elem.postedBy._id === stateUser._id)
					setRegion(getUserInitialCoords.coords)
				})
				.catch((err) => console.log(err))
		})
		return unsubscribe
	}, [navigation])

	return (
		<View style={{ flex: 1 }}>
			<MapView
				ref={mapRef}
				// provider={PROVIDER_GOOGLE}
				userInterfaceStyle='dark'
				region={{
					// latitude: 42.0428291,
					// longitude: -87.8599282,
					latitude: stateUser?._id ? +stateUser?.user?.coords?.lat : +initialCoords.lat,
					longitude: stateUser?._id ? +stateUser?.user?.coords?.lng : +initialCoords.lng,
					latitudeDelta: initialCoords.longitudeDelta,
					longitudeDelta: initialCoords.longitudeDelta,
				}}
				style={{
					...StyleSheet.absoluteFillObject,
					paddingBottom: paddingStyle,
				}}
				animateToRegion={{
					region: { latitude: region?.lat, longitude: region?.lng, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
					duration: 300,
				}}
				zoomEnabled={true}
				zoomControlEnabled={true}
				scrollEnabled={true}
				zoomTapEnabled={true}
				showsMyLocationButton={true}
				loadingEnabled
				onMapReady={() => {
					console.log('Map ready')
					setPadding(100)
				}}>
				{posts?.map((post, index) => (
					<MarkerComponent key={index} post={post} />
				))}
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
		zIndex: 10,
	},
	map: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
	},
	mapStyle: {
		flex: 1,
		marginLeft: 3,
	},
	carousel: {
		position: 'absolute',
		// bottom: Platform.OS === 'ios' ? 90 : 80,
		bottom: 10,
		paddingHorizontal: 10,
		borderWidth: 1,
	},
	carouselItem: {
		// flexDirection: 'row',
		borderRadius: 20,
		marginHorizontal: 20,
		backgroundColor: '#fff',
	},
})
