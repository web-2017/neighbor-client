import React, { useEffect, useContext, useState } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { Subheading, Title, Chip, Colors, useTheme, Button } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'

import { BASE_URL } from '../api'
import PostItem from '../components/PostItem'
import { UserContext } from '../store/context'

export default function Posts({ navigation, params }) {
	const [stateUser, setStateUser] = useContext(UserContext)
	const [posts, setPosts] = useState([])
	const { colors } = useTheme()
	const { user, isLoading } = useSelector((state) => state)

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
					console.log('my-posts', data)
					setPosts(data)
				})
				.catch((err) => console.log(err))
		})
		return unsubscribe
	}, [navigation])

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Chip mode='flat' icon='information' style={{ padding: 10, marginBottom: 10 }}>
				{posts && posts.length} Posts
			</Chip>
			<View style={styles.container}>
				{posts.length ? (
					posts?.map((elem) => {
						// console.log('posts', posts)
						return (
							<PostItem
								postId={elem?._id}
								uri={elem?.images}
								title={elem?.title}
								description={elem?.description}
								key={elem._id}
								post={elem}
							/>
						)
					})
				) : (
					<Text>You don't have any posts yet</Text>
				)}
				<View
					style={{
						...styles.button,
						flexDirection: 'row',
					}}>
					<Button
						icon='plus'
						style={{
							backgroundColor: colors.blue,
							flexGrow: 1,
						}}
						mode='contained'
						dark={true}
						onPress={() => navigation.navigate('create')}>
						Add Post
					</Button>
				</View>
			</View>
		</ScrollView>
	)
}
const styles = StyleSheet.create({
	container: {
		marginHorizontal: 15,
		flexGrow: 1,
	},
	button: {
		position: 'absolute',
		left: 0,
		bottom: 0,
		marginBottom: 10,
	},
})
