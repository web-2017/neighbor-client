import React from 'react'
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
import { FontAwesome } from '@expo/vector-icons'
import { Text } from 'react-native'
import { useTheme, Avatar } from 'react-native-paper'

import MyCustomMarkerView from './MyCustomMarkerView'

export default function MarkerComponent({ coords }) {
	const { colors } = useTheme()

	return (
		<Marker
			// onPress={() => Alert.alert('alarm', 'dasfds')}
			animateMarkerToCoordinate={{ latitude: coords.lat, longitude: coords.long }}
			coordinate={{ latitude: coords.lat, longitude: coords.long }}
			title={'afads'}
			// pinColor={colors.alert}
			// image={{
			// 	uri: ``,
			// 	width: 8,
			// 	height: 8,
			// 	scale: 1,
			// }}
			zoomEnabled={true}
			// calloutOffset={{ x: 30, y: 50 }} // offset
			description='afasfdasd'>
			{/* <Text style={{ backgroundColor: '#fff' }}>Hello there</Text> */}
			{/* <Avatar.Text size={55} label={'JD'} /> */}

			<MyCustomMarkerView />
		</Marker>
	)
}
