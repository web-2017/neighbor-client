import { View, Text, TextInput, Button, ScrollView } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { io } from 'socket.io-client'
import { UserContext } from '../store/context'
const ChatScreen = () => {
	const [stateUser, setStateUser] = useContext(UserContext)
	const [value, setValue] = useState('')
	const [messages, setMessages] = useState([])
	const socket = io('http://localhost:4001')
	// client-side
	useEffect(() => {
		socket.on('output-messages', (data) => {
			console.log('msg client output-messages', data)
			setMessages(data)
		})
	}, [])

	const sendMessage = () => {
		socket.on('message', (data) => {
			console.log('message data', data)
			socket.emit('chatmessage', { name: stateUser._id, message: value })
			console.log('chatmessage', data)
			setValue('')
		})
	}

	return (
		<ScrollView style={{ flex: 1 }}>
			<View>
				<Text>ChatScreen</Text>

				<View style={{ flexDirection: 'row' }}>
					<TextInput
						value={value}
						onChangeText={setValue}
						placeholder='message'
						style={{ flex: 1, borderColor: '#000' }}
					/>

					<Button onPress={() => sendMessage()} title='Send' />
				</View>
			</View>
		</ScrollView>
	)
}

export default ChatScreen
