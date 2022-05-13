import React, { useContext, useState, useCallback } from 'react'
import { Text, ScrollView, View } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import { BASE_URL } from '../api'
import { UserContext } from '../store/context'
import PostItem from '../components/PostItem'

export default function FavoriteScreen({ navigation }) {
	const [stateUser, setStateUser] = useContext(UserContext)
	const [posts, setPosts] = useState([''])

	useFocusEffect(
		useCallback(() => {
			const unsubscribe = fetch(`${BASE_URL}/posts`, {
				method: 'get',
				headers: {
					'Content-Type': 'application/json',
				},
			})
				.then((json) => json.json())
				.then((data) => {
					setPosts(data)
				})
				.catch((err) => console.log(err))

			return () => unsubscribe
		}, [])
	)

	return (
		<ScrollView contentContainerStyle={{ alignItems: 'center' }}>
			{posts.length ? (
				posts?.map((elem) => {
					// console.log('posts', posts)
					if (elem?.likes?.includes(stateUser?._id)) {
						return (
							<View style={{ width: '87%' }} key={elem._id}>
								<PostItem
									postId={elem?._id}
									uri={elem?.images}
									title={elem?.title}
									description={elem?.description}
									key={elem._id}
									post={elem}
								/>
							</View>
						)
					}
				})
			) : (
				<Text>You don't have any posts yet</Text>
			)}
		</ScrollView>
	)
}
