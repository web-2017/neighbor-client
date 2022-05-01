import React, { useState, useEffect, useRef, useContext } from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import * as Location from 'expo-location'
import { View, Dimensions, StyleSheet } from 'react-native'

import { BASE_URL } from '../api'
import { UserContext } from '../store/context'
import MarkerComponent from './MarkerComponent'

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
					// get all coords
					// const newCoords = data?.map((x) => x.postedBy.coords)
					// setCoords(newCoords)
					setPosts(data) // all posts

					const uniqPost = data.map((elem) => {
						console.log('uniqPost11')
					})

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

	return (
		<View style={{ flex: 1 }}>
			<MapView
				ref={mapRef}
				// provider={PROVIDER_GOOGLE}
				userInterfaceStyle='dark'
				region={{
					latitude: stateUser?._id ? stateUser?.user?.coords?.lat : region?.lat,
					longitude: stateUser?._id ? stateUser?.user?.coords?.lng : region?.lng,
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
				onMapReady={() => {
					console.log('Map ready')
					setPadding(100)
				}}>
				{posts?.map((post, index) => {
					// const newPost = new Set([post.postedBy?._id])
					return <MarkerComponent key={index} post={post} />
				})}
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
})
