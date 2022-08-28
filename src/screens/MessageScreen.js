import { View, Text, TextInput, Button, ScrollView } from 'react-native'
import React, { useEffect, useState, useCallback, useContext } from 'react'

import { UserContext } from '../store/context'
import { ChatList } from '../components/ChatList'

const MessageScreen = () => {
	const [stateUser, setStateUser] = useContext(UserContext)
	const [contacts, setContacts] = useState([])
	const [currentUser, setCurrentUser] = useState([])
	const [currentUserImage, setCurrentUserImage] = useState(undefined)
	const [currentUserName, setCurrentUserName] = useState(undefined)
	const [currentSelectedChat, setCurrentSelectedChat] = useState(undefined)


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

export default MessageScreen
