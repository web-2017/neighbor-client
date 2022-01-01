import { Link } from '@react-navigation/native'
import React from 'react'
import { Button, Text, View } from 'react-native'

export default function Profile() {
	return (
		<View>
			<Text>Profile</Text>
			<Button onPress={() => navigation.navigate('LogIn')} title='Log In' />
		</View>
	)
}
