import { TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'

export default function NavigationButton({ getCurrentLocation }) {
	return (
		<TouchableOpacity onPress={() => getCurrentLocation()} style={styles.mapNavigationContainer}>
			<FontAwesome size={30} name='location-arrow' color={'#fff'} />
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	mapNavigationContainer: {
		position: 'absolute',
		right: 25,
		top: 140,
	},
})
