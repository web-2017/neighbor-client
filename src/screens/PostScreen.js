import React, { useContext, useState, useEffect } from 'react'
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native'
import { Button, Caption, Paragraph, Title, useTheme, Banner } from 'react-native-paper'
import { Feather, AntDesign, Entypo, MaterialIcons, Foundation, FontAwesome } from '@expo/vector-icons'

import { BASE_URL } from '../api'
import { UserContext } from '../store/context'
import { uploadImageFilter, formatDateHandler } from '../utils/filters'

export default function Post({ route, navigation }) {
	const { postId } = route.params
	const { colors } = useTheme()
	const [stateUser, setStateUser] = useContext(UserContext)
	const [post, setPost] = useState('')
	const [loading, setLoading] = useState(false)
	const [visible, setVisible] = useState(true)
	const [isCurrentUser, setIsCurrentUser] = useState(stateUser?._id === post?.postedBy?._id)

	// console.log('stateUser', stateUser)
	// console.log('post', post)

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
			if (response.status === 200) {
				// navigation.goBack()
			}
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<ScrollView>
			<View>
				{post?.images ? (
					<Image style={styles.stretch} source={{ uri: `${uploadImageFilter(`${BASE_URL}/${post?.images[0]}`)}` }} />
				) : (
					<Image style={styles.stretch} source={require('../../assets/img.jpg')} />
				)}
			</View>

			<View style={styles.container}>
				<Banner
					visible={visible}
					style={{ backgroundColor: colors.accent }}
					actions={[
						{
							label: 'Close',
							onPress: () => setVisible(false),
						},
						// {
						// 	label: 'Learn more',
						// 	onPress: () => setVisible(false),
						// },
					]}
					icon={({ size }) => (
						<Feather
							name='alert-triangle'
							size={30}
							color='black'
							style={{
								width: size,
								height: size,
							}}
						/>
					)}>
					Never pay using any gift cards and exercise caution if someone wants to ship you an item after you have paid.
				</Banner>
				<Caption>Created: {formatDateHandler(post?.createdAt)}</Caption>
				<Title style={{ color: colors.primary }}>{post?.title?.toUpperCase()}</Title>
				<Paragraph>
					{post?.price} {post?.price !== 0 && <Foundation name='dollar' size={17} color={colors.primary} />}
				</Paragraph>
				<Paragraph>
					<Entypo name='address' size={15} color={colors.primary} /> {post?.postedBy?.coords?.address}
				</Paragraph>
				<Paragraph>
					<Entypo name='user' size={15} color={colors.primary} /> {post?.postedBy?.firstName}
				</Paragraph>
				<Paragraph>
					<Entypo name='email' size={15} color={colors.primary} /> {post?.postedBy?.email}
				</Paragraph>
				<Paragraph>
					<FontAwesome name='phone' size={15} color={colors.primary} /> {post?.postedBy?.tel}
				</Paragraph>
				<Paragraph style={{ color: colors.gray }}>
					<MaterialIcons name='description' size={15} color={colors.primary} />
					{post?.description}
				</Paragraph>
				<View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '100%', marginVertical: 20 }}>
					{!isCurrentUser && 
					<Button
						color={colors.green}
						icon="send" 
						mode="contained" 
						onPress={() => navigation.navigate('sendMessage', { post })}>
						send message
					</Button>}
					{!isCurrentUser && stateUser?._id && (
						<View style={{marginLeft: 10}}>
							{post?.likes?.includes(stateUser?._id) ? (
								<AntDesign name='heart' size={24} color={colors.alert} onPress={() => removeFromFavorites(postId)} />
							) : (
								<AntDesign name='hearto' size={24} color={colors.alert} onPress={() => addToFavorites(postId)} />
							)}
						</View>
					)}
				</View>
				{isCurrentUser && (
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
