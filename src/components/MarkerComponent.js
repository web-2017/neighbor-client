import React, { useContext } from 'react'
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
import { FontAwesome } from '@expo/vector-icons'
import { Text } from 'react-native'
import { useTheme, Avatar } from 'react-native-paper'

import MarkerContent from './MarkerContent'
import { UserContext } from '../store/context'

export default function MarkerComponent({ coords, index }) {
	console.log('coords', coords)
	const [stateUser, setStateUser] = useContext(UserContext)
	const { colors } = useTheme()

	return (
		<Marker
			// onPress={() => Alert.alert('alarm', 'dasfds')}
			coordinate={{ latitude: coords.lat, longitude: coords.lng }}
			title={'Hello'}
			draggable
			key={index}
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

			<MarkerContent user={stateUser} />
		</Marker>
	)
}
