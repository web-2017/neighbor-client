import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons'
import { Title } from 'react-native-paper'
const Support = () => {
	return (
		<View style={{ flex: 1, alignSelf: 'center', justifyContent: 'center' }}>
			<Title style={{ alignSelf: 'center' }}>Any question?</Title>

			<Text style={{ fontSize: 24 }}>
				<Entypo name='email' size={24} color='black' /> webdevelope2017@gmail.com
			</Text>
		</View>
	)
}

export default Support

const styles = StyleSheet.create({})
