import React, { useContext } from 'react'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { FontAwesome } from '@expo/vector-icons'
import { Text, View } from 'react-native'
import { useTheme } from 'react-native-paper'

import MarkerContent from './MarkerContent'
import { UserContext } from '../store/context'

export default function MarkerComponent({ index, post }) {
	const [stateUser, setStateUser] = useContext(UserContext)
	const { colors } = useTheme()
	// console.log('post', post)
	return (
		<Marker
			coordinate={{
				latitude: post?.postedBy?.coords?.lat,
				longitude: post?.postedBy?.coords?.lng,
			}}
			key={index}
			// draggable
			// pinColor={colors.red}
			// image={{
			// 	uri: ``,
			// 	width: 8,
			// 	height: 8,
			// 	scale: 0.3,
			// }}
			// calloutOffset={{ x: 30, y: 50 }} // offset
		>
			{/* <Text style={{ backgroundColor: '#fff' }}>Hello there</Text> */}
			<MarkerContent post={post} />
		</Marker>
	)
}
