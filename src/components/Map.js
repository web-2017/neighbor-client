import React, { useState, useEffect, useRef } from 'react'
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
import * as Location from 'expo-location'
import { View, Text, TextInput, Dimensions, StyleSheet, TouchableOpacity, Alert, Permissions } from 'react-native'

import MarkerComponent from './MarkerComponent'

const initialCoords = [
	{ lat: 42.03508453490926, long: -87.91168817008241 },
	{ lat: 42.04605315115955, long: -87.86093266932191 },
]

export default function Map({ navigation }) {
	const [paddingTop, setPaddingTop] = useState(0)
	const [coords, setCoords] = useState(initialCoords)
	const [location, setLocation] = useState(null)
	const [errorMsg, setErrorMsg] = useState(null)

	const mapRef = useRef()
	// console.log(mapRef.current)

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

	return (
		<View style={{ paddingBottom: paddingTop }}>
			<MapView
				ref={mapRef}
				userInterfaceStyle='light'
				region={{
					latitude: 42.03508453490926,
					longitude: -87.91168817008241,
					latitudeDelta: 0.02,
					longitudeDelta: 0.002,
				}}
				animateToRegion={{ region: { latitude: 42.03508453490926, longitude: -87.91168817008241 }, duration: 300 }}
				// provider={PROVIDER_GOOGLE}
				// customMapStyle={styles.mapStyle}
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
			<View style={{ position: 'absolute', top: 30, width: '100%' }}>
				<TextInput
					style={{
						borderRadius: 10,
						margin: 10,
						color: '#000',
						borderColor: '#666',
						backgroundColor: '#FFF',
						borderWidth: 1,
						height: 45,
						paddingHorizontal: 10,
						fontSize: 18,
					}}
					placeholder={'Search'}
					placeholderTextColor={'#666'}
				/>
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
