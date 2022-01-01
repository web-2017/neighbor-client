import { Link } from '@react-navigation/native'
import React from 'react'
import { Button, Text, View, SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function User({ route, navigation }) {
	// const navigation = useNavigation()
	const { params } = route
	console.log(params)
	return (
		<SafeAreaView>
			<View>
				<Text>User</Text>
				<Button onPress={() => navigation.goBack()} title='back' />
			</View>
		</SafeAreaView>
	)
}
