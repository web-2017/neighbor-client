import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'

export default function MainContainer(props) {
	return <SafeAreaView style={styles.container}>{props.children}</SafeAreaView>
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
})
