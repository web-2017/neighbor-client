import React, {useEffect, useState} from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'

export default function SendMessageScreen({route}) {
    const {params} = route
    // console.log(params);

    const sendMessage = async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/like`, {
				method: 'put',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${stateUser?.token}`,
				},
				body: JSON.stringify({
					postId: postId,
				}),
			})

			const data = await response.json()
			setPost(data)
        } catch (error) {
            console.error(error);
        }
    }
  return (
    <View>
        <Text variant="displayLarge">Display Large s</Text>
    </View>
  )
}
