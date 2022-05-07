import React, { useContext, useState, useEffect } from 'react'
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native'
import { Button, Caption, Chip, Paragraph, Title, useTheme } from 'react-native-paper'
import { AntDesign } from '@expo/vector-icons'

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

	const deletePostHandler = (postId) => {
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
						// console.log('data', data)
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

	const addToFavorites = async () => {
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
			console.log(data)
		} catch (err) {
			console.log(err)
		}
	}

	const removeFromFavorites = async () => {
		try {
			const response = await fetch(`${BASE_URL}/unlike`, {
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
			console.log(data)
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<ScrollView>
			<View>
				{post?.images ? (
					<Image
						style={styles.stretch}
						loadingIndicatorSource={post?.images[0]}
						source={{ uri: `${uploadImageFilter(`${BASE_URL}/${post?.images[0]}`)}` }}
					/>
				) : (
					<Image style={styles.stretch} source={require('../../assets/img.jpg')} />
				)}
			</View>
			<View style={styles.container}>
				<Caption>Created: {formatDate(post?.createdAt)}</Caption>
				<Title>Title: {post?.title}</Title>
				<Paragraph>Price: {post?.price}</Paragraph>
				<Paragraph>Address {stateUser?.user?.coords?.address}</Paragraph>
				<Paragraph>Description: {post?.description}</Paragraph>
				<View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '100%' }}>
					{stateUser?._id !== post?.postedBy && (
						<View>
							{post?.likes?.includes(stateUser?._id) ? (
								<AntDesign name='heart' size={24} color={colors.alert} onPress={() => removeFromFavorites(postId)} />
							) : (
								<AntDesign name='hearto' size={24} color={colors.alert} onPress={() => addToFavorites(postId)} />
							)}
						</View>
					)}
				</View>
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
