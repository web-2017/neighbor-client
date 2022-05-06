import React, { useEffect, useContext, useState } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { Subheading, Chip, useTheme, FAB } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'

import { BASE_URL } from '../api'
import PostItem from '../components/PostItem'
import { UserContext } from '../store/context'

export default function Posts({ navigation, params }) {
	const [stateUser, setStateUser] = useContext(UserContext)
	const [posts, setPosts] = useState([])
	const { colors } = useTheme()

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
					// console.log('my-posts', data)
					setPosts(data)
				})
				.catch((err) => console.log(err))
		})
		return unsubscribe
	}, [navigation])

	return (
		<View style={{ flex: 1 }}>
			<Chip mode='flat' icon='information' style={{ padding: 10, marginBottom: 10 }}>
				{posts && posts.length} Posts
			</Chip>
			<ScrollView contentContainerStyle={styles.container}>
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
				</View>
			</ScrollView>

			<FAB
				style={{ ...styles.button, backgroundColor: colors.green }}
				theme='light'
				icon='plus'
				onPress={() => navigation.navigate('create')}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 5,
		flexGrow: 1,
	},
	button: {
		position: 'absolute',
		margin: 16,
		right: 0,
		bottom: 0,
	},
})
