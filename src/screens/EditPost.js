import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import { Button, useTheme, TextInput, Title, Paragraph, Dialog, Portal } from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker'

import { BASE_URL } from '../api'
import { UserContext } from '../store/context'
import { uploadImageFilter } from '../utils/filters/uploadImageFilter'

export default function EditPost({ navigation, route }) {
	const { post } = route.params
	const { colors } = useTheme()
	const [stateUser, setStateUser] = useContext(UserContext)

	const [title, setTitle] = useState('')
	const [price, setPrice] = useState('0')
	const [description, setDescription] = useState('')
	const [photo, setPhoto] = useState('')
	const [imgPath, setImgPath] = useState(null)
	const [isVisible, setIsVisible] = useState(false)
	const [message, setMessage] = useState(null)
	const [isError, setIsError] = useState(false)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		console.log(11, post)
		if (post) {
			setTitle(post?.title)
			setPrice(post?.price.toString())
			setDescription(post?.description)
		}
	}, [post])

	useEffect(() => {
		if (imgPath) {
			updatePostHandler() // if image come from data, create new Post
		}
	}, [imgPath])

	// upload image
	const handleChoosePhoto = async () => {
		setLoading(true)
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
			allowsMultipleSelection: true,
			base64: false,
			allowsEditing: true,
		})
		if (!result.cancelled) {
			setPhoto(result.uri)
			setLoading(false)
		} else {
			setLoading(false)
			setPhoto('')
		}
	}

	const handleUploadPhoto = async () => {
		setLoading(true)

		if (!title && !description && !price) {
			setLoading(false)
			setIsVisible(true)
			setMessage('All fields are required')
			return
		}

		const formData = new FormData()
		formData.append('photo', {
			name: new Date() + '_photo',
			type: 'image/jpg',
			uri: photo,
		})

		fetch(`${BASE_URL}/uploads`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'multipart/form-data',
				authorization: `Bearer ${stateUser?.token}`,
			},
			body: formData,
		})
			.then((response) => response.json())
			.then((response) => {
				console.log('response data', response)
				setImgPath(response.uri)
				setLoading(false)
			})
			.catch((error) => {
				console.log('error', error)
			})
			.finally(() => setLoading(false))
	}

	const updatePostHandler = async () => {
		if (!title && !description) {
			setLoading(false)
			setIsVisible(true)
			setMessage('The title and price fields are required')
			return
		}

		try {
			const response = await fetch(`${BASE_URL}/post`, {
				method: 'put',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${stateUser?.token}`,
				},
				body: JSON.stringify({ title, price, description, images: imgPath ? imgPath : undefined, postId: post?._id }),
			})

			const data = await response.json()

			console.log('updated Post', data)

			if (response.status === 200) {
				setIsError(false)
				setLoading(false)
				setIsVisible(true)
				setMessage('Updated post success!')
				setImgPath(null)
				navigation.navigate('allposts')
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
			<View style={styles.container}>
				<Portal>
					<Dialog visible={isVisible} onDismiss={() => setIsVisible(false)}>
						<Dialog.Title>{isError ? 'Error' : 'Success'}</Dialog.Title>
						<Dialog.Content>
							<Paragraph style={{ color: isError ? colors.alert : colors.green, fontSize: 20 }}>{message}!!!</Paragraph>
						</Dialog.Content>
						<Dialog.Actions>
							<Button onPress={() => setIsVisible(false)} mode='contained'>
								Close
							</Button>
						</Dialog.Actions>
					</Dialog>
				</Portal>
				<Title style={{ textAlign: 'center', marginVertical: 30 }}>Edit post</Title>
				<TextInput
					clearButtonMode='always'
					autoCapitalize='none'
					mode='outlined'
					placeholder='title'
					value={title}
					onChangeText={(text) => setTitle(text)}
				/>
				<TextInput
					clearButtonMode='always'
					autoCapitalize='none'
					mode='outlined'
					placeholder='price'
					value={price}
					onChangeText={(text) => setPrice(text.replace(/[^0-9]/g, ''))}
				/>
				<TextInput
					autoCapitalize='none'
					clearButtonMode='always'
					mode='outlined'
					placeholder='description'
					value={description}
					onChangeText={(text) => setDescription(text)}
				/>
				{photo ? (
					<View>
						<Image
							loadingIndicatorSource={photo || imgPath}
							source={{ uri: photo ? photo : uploadImageFilter(`${BASE_URL}/${imgPath}`) }}
							style={{ width: '80%', height: 200, marginVertical: 10, alignSelf: 'center', borderRadius: 20 }}
						/>

						<Button
							title='Upload Photo'
							onPress={() => {
								setImgPath('')
								setPhoto('')
								setIsVisible(false)
							}}
							mode='contained'
							icon={'close'}
							dark
							color={colors.alert}>
							Clear
						</Button>
					</View>
				) : (
					<Button
						icon={'camera'}
						onPress={() => handleChoosePhoto()}
						mode='contained'
						color={colors.brown}
						style={styles.btn}
						loading={loading}>
						change photo
					</Button>
				)}

				<Button
					mode='contained'
					color={colors.green}
					style={styles.btn}
					loading={loading}
					onPress={() => (photo ? handleUploadPhoto() : updatePostHandler())}
					disabled={loading}>
					Update Post
				</Button>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 30,
	},
	btn: {
		marginVertical: 10,
	},
	btnContainer: {
		justifyContent: 'space-around',
		flexDirection: 'row',
	},
})
