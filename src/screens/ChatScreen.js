import { View, Text, TextInput, Button, ScrollView } from 'react-native'
import React, { useEffect, useState, useCallback, useContext } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { io } from 'socket.io-client'

import { UserContext } from '../store/context'
import { ChatList } from '../components/ChatList'
import { getAllUsersRoute } from '../api/apiRoutes'
const ChatScreen = () => {
	const [stateUser, setStateUser] = useContext(UserContext)
	const [contacts, setContacts] = useState([])
	const [currentUser, setCurrentUser] = useState([])
	const [currentUserImage, setCurrentUserImage] = useState(undefined)
	const [currentUserName, setCurrentUserName] = useState(undefined)
	const [currentSelectedChat, setCurrentSelectedChat] = useState(undefined)

	const socket = io('http://localhost:4001')

	useFocusEffect(
		useCallback(() => {
			const unsubscribe = fetch(`${getAllUsersRoute}/${stateUser._id}`, {
				method: 'get',
				headers: {
					'Content-Type': 'application/json',
				},
			})
				.then((json) => json.json())
				.then((data) => {
					console.log('users', data)
					setContacts(data)
				})
				.catch((err) => console.log(err))

			return () => unsubscribe
		}, [])
	)

	return (
		<ScrollView style={{ flex: 1 }}>
			<ChatList
				contacts={contacts}
				currentSelectedChat={currentSelectedChat}
				setCurrentSelectedChat={setCurrentSelectedChat}
				currentUserName={currentUserName}
				setCurrentUserName={setCurrentUserName}
				currentUserImage={currentUserImage}
				setCurrentUserImage={setCurrentUserImage}
			/>
		</ScrollView>
	)
}

export default ChatScreen
