import { TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'

export default function NavigationButton({ getCurrentLocation }) {
	return (
		<TouchableOpacity onPress={() => getCurrentLocation()} style={styles.mapNavigationContainer}>
			<FontAwesome size={40} name='location-arrow' color={'#fff'} />
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	mapNavigationContainer: {
		position: 'absolute',
		bottom: 30,
		right: 30,
	},
})
