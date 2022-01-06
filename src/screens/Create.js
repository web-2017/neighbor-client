import React, { useState } from 'react'
import { View, Text, TextInput } from 'react-native'

export default function Create() {
	const [text, setText] = useState('')
	return (
		<View>
			<Text>Create</Text>
			<TextInput label='Text' mode='outlined' placeholder='hello' value={text} onChangeText={(text) => setText(text)} />
		</View>
	)
}
