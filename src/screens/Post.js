import React, { useContext, useState, useEffect } from 'react'
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native'
import { Button, Caption, Paragraph, Title, useTheme } from 'react-native-paper'
import Carousel from 'react-native-snap-carousel'

import { BASE_URL } from '../api'
import { UserContext } from '../store/context'
import { uploadImageFilter } from '../utils/filters/uploadImageFilter'

export default function Post({ route, navigation }) {
	const { postId } = route.params
	const { colors } = useTheme()
	const [stateUser, setStateUser] = useContext(UserContext)
	const [post, setPost] = useState('')
	const [loading, setLoading] = useState(false)
	const [isEdit, setIsEdit] = useState(false)
	const [isError, setIsError] = useState(false)
	const [message, setMessage] = useState('')

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

	const editPostHandler = async () => {
		setIsEdit(true)
		try {
			if (response.status === 200) {
				setIsError(false)
				setLoading(false)
				setIsVisible(true)
				setMessage('New post created!')
			} else {
				setLoading(false)
			}
		} catch (err) {
			setIsError(false)
			setLoading(false)
			setIsVisible(true)
			setMessage(err.message)
			console.error(err)
		}
	}

	return (
		<ScrollView>
			<View style={styles.imageContainer}>
				{post?.images && (
					<Image
						style={styles.stretch}
						loadingIndicatorSource={post?.images[0]}
						source={{ uri: `${uploadImageFilter(`${BASE_URL}/${post?.images[0]}`)}` }}
					/>
				)}
			</View>
			<View style={styles.container}>
				<Caption>Created: {formatDate(post.createdAt)}</Caption>
				<Title>Title: {post?.title}</Title>
				<Paragraph>Price: {post?.price}</Paragraph>
				<Paragraph>Address {stateUser?.user?.address}</Paragraph>
				<Paragraph>Description: {post?.description}</Paragraph>
				<Button
					// title='Choose Photo'
					icon={'pencil'}
					onPress={() => navigation.navigate('editPost', { post })}
					mode='contained'
					color={colors.primary}
					loading={loading}
					style={{ marginVertical: 20 }}>
					Edit Post
				</Button>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	imageContainer: {},
	container: {
		margin: 20,
	},
	stretch: {
		width: '100%',
		height: 200,
		resizeMode: 'stretch',
	},
})
