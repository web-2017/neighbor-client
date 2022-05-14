import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { io } from 'socket.io-client'

const ChatScreen = () => {
	const socket = io('http://localhost:4001')
	// client-side
	useEffect(() => {
		socket.on('hello', (arg) => {
			console.log('connect.id', arg) // x8WIv7-mJelg7on_ALbx
			// console.log('connect.id', socket.id) // x8WIv7-mJelg7on_ALbx

			socket.emit('hello1', 'world2')
		})
	}, [])

	return (
		<View>
			<Text>ChatScreen</Text>
		</View>
	)
}

export default ChatScreen
