import React, { useState } from 'react'
import { View, Text, TextInput } from 'react-native'
import { Button, useTheme } from 'react-native-paper'

export default function Create() {
	const [text, setText] = useState('')
	const { colors } = useTheme()
	return (
		<View>
			<Text>Create</Text>
			<Button icon='map' mode='contained' color={colors.brown} onPress={() => console.log('Pressed')}>
				Add my location
			</Button>
		</View>
	)
}
