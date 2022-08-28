import { View, Text } from 'react-native'
import { List, Paragraph } from 'react-native-paper'
import React, { useContext, useEffect, useState } from 'react'

import { UserContext } from '../store/context'
export const ChatItem = ({
	contacts,
	currentSelectedChat,
	setCurrentSelectedChat,
	currentUserName,
	setCurrentUserName,
	currentUserImage,
	setCurrentUserImage,
}) => {
	const [stateUser, setStateUser] = useContext(UserContext)

	useEffect(() => {
		if (stateUser?._id) {
			console.log(stateUser)

			setCurrentUserImage(stateUser?.user?.avatarImage)
			setCurrentUserName(stateUser?.user?.username)
		}
	}, [])

	return (
		<View>
			<List.Item
				onPress={() => console.log('hello')}
				title={'ddd'}
				description='dasfasfasddasfasfasddasfasfasddasfasfasddasfasfasd'
				left={() => <List.Icon icon='folder' />}
				// right={() => <List.Icon icon='star' />}
				right={() => {
					return (
						<View>
							<Paragraph style={{ color: '#444', marginTop: 5 }}>2 days ago</Paragraph>
						</View>
					)
				}}
			/>
		</View>
	)
}
