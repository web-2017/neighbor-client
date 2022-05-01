import React from 'react'
import { StyleSheet, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

export default function ZoomControl({ mapZoom, setMapZoom }) {
	return (
		<View style={styles.zoomButtons}>
			<View style={{ ...styles.zoomBtn, marginBottom: 20 }}>
				<FontAwesome onPress={() => setMapZoom(Math.abs(mapZoom - 0.1))} size={25} name='plus' color={'#fff'} />
			</View>
			<View style={{ ...styles.zoomBtn }}>
				<FontAwesome onPress={() => setMapZoom(Math.abs(mapZoom + 0.1))} size={25} name='minus' color={'#fff'} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	zoomButtons: {
		position: 'absolute',
		right: 20,
		top: 20,
	},
	zoomBtn: {
		padding: 7,
		borderRadius: 8,
	},
})
