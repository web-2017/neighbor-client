import React, { useContext, useState, useEffect } from 'react'
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native'
import { Button, Caption, Paragraph, Title, useTheme } from 'react-native-paper'

import { BASE_URL } from '../api'
import { UserContext } from '../store/context'
import { uploadImageFilter } from '../utils/filters/uploadImageFilter'

export default function Post({ route, navigation }) {
	const { postId, postedBy } = route.params
	const { colors } = useTheme()
	const [stateUser, setStateUser] = useContext(UserContext)
	const [post, setPost] = useState('')
	const [loading, setLoading] = useState(false)

	// console.log('stateUser', stateUser?._id)
	console.log('postedBy', route.params)

	const deletePostHandler = (postId) => {
		console.log('postId', postId)
		fetch(`${BASE_URL}/post/${postId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${stateUser?.token}`,
			},
		})
			.then((json) => navigation.goBack())
			.catch((err) => console.log(err))
	}

	useEffect(() => {
		if (postId) {
			;(() => {
				fetch(`${BASE_URL}/post/${postId}`, {
					method: 'get',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${stateUser?.token}`,
					},
				})
					.then((jsonValue) => jsonValue.json())
					.then((data) => {
						console.log('data', data)
						setPost(data)
					})
					.catch((err) => {
						console.log('err', err)
					})
			})()
		}
	}, [postId])
	/**
	 * @description formatDate format createAt date
	 * @param  {date} currDate - current date api
	 */
	const formatDate = (currDate) => {
		if (!currDate) return
		const today = new Date(currDate)
		const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' }
		const date = today.toLocaleDateString('en-En', options)
		return date
	}

	return (
		<ScrollView>
			<View>
				{post?.images && (
					<Image
						style={styles.stretch}
						loadingIndicatorSource={post?.images[0]}
						source={{ uri: `${uploadImageFilter(`${BASE_URL}/${post?.images[0]}`)}` }}
					/>
				)}
			</View>
			<View style={styles.container}>
				<Caption>Created: {formatDate(post?.createdAt)}</Caption>
				<Title>Title: {post?.title}</Title>
				<Paragraph>Price: {post?.price}</Paragraph>
				<Paragraph>Address {stateUser?.user?.coords?.address}</Paragraph>
				<Paragraph>Description: {post?.description}</Paragraph>
				{stateUser?._id === post?.postedBy && (
					<View style={styles.btnContainer}>
						<Button
							// title='Choose Photo'
							icon={'pencil'}
							onPress={() => navigation.navigate('editPost', { post })}
							mode='outlined'
							color={colors.green}
							loading={loading}
							style={{ marginVertical: 20 }}>
							Edit Post
						</Button>
						<Button
							// title='Choose Photo'
							icon={'delete'}
							onPress={() => deletePostHandler(postId)}
							mode='outlined'
							color={colors.alert}
							loading={loading}
							style={{ marginVertical: 20 }}>
							Delete Post
						</Button>
					</View>
				)}
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		margin: 20,
	},
	stretch: {
		width: '100%',
		height: 200,
		resizeMode: 'stretch',
	},
	btnContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
})
