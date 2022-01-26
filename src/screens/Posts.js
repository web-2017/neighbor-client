import React, { useEffect, useContext, useState } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { Subheading, Title } from 'react-native-paper'

import { BASE_URL } from '../api'
import PostItem from '../components/PostItem'
import { UserContext } from '../store/context'

export default function Posts({ navigation, params }) {
	const [stateUser, setStateUser] = useContext(UserContext)
	const [posts, setPosts] = useState([])

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			fetch(`${BASE_URL}/my-posts`, {
				method: 'get',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${stateUser?.token}`,
				},
			})
				.then((json) => json.json())
				.then((data) => {
					setPosts(data)
					// console.log('data', posts)
				})
				.catch((err) => console.log(err))
		})
		return unsubscribe
	}, [navigation])

	return (
		<ScrollView style={styles.container}>
			<View>
				<Subheading>{posts && posts.length} Posts </Subheading>
				{posts.length ? (
					posts?.map((elem) => (
						<PostItem
							postId={elem?._id}
							uri={elem?.images}
							title={elem?.title}
							description={elem?.description}
							key={elem._id}
							post={elem}
						/>
					))
				) : (
					<Text>You don't have any posts</Text>
				)}
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 30,
	},
})
