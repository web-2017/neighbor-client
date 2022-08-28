import * as React from 'react'
import { View } from 'react-native'
import { List, Paragraph, Divider } from 'react-native-paper'

import { ChatItem } from './ChatItem'

export const ChatList = ({
	contacts,
	currentSelectedChat,
	setCurrentSelectedChat,
	currentUserName,
	setCurrentUserName,
	currentUserImage,
	setCurrentUserImage,
}) => {
	const ChangeCurrentChat = (index, contact) => {
		return (
			<>
				{
					<ChatItem
						contacts={contacts}
						currentSelectedChat={currentSelectedChat}
						setCurrentSelectedChat={setCurrentSelectedChat}
						currentUserName={currentUserName}
						setCurrentUserName={setCurrentUserName}
						currentUserImage={currentUserImage}
						setCurrentUserImage={setCurrentUserImage}
					/>
				}
			</>
		)
	}
	return (
		<List.Section>
			<List.Subheader>Chats</List.Subheader>
			<ChangeCurrentChat />
		</List.Section>
	)
}
