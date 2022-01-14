import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Button, useTheme, Snackbar, TextInput, Title } from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker'

import { BASE_URL } from '../api'
import SnackBarCustom from '../components/SnackBarCustom'
import { UserContext } from '../store/context'

export default function Create() {
	const { colors } = useTheme()
	const [stateUser, setStateUser] = useContext(UserContext)

	const [title, setTitle] = useState('')
	const [price, setPrice] = useState('')
	const [description, setDescription] = useState('')
	const [imagePath, setImagePath] = useState('')
	const [isVisible, setIsVisible] = useState(false)
	const [message, setMessage] = useState(null)
	const [isError, setIsError] = useState(false)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		;(async () => {
			if (Platform.OS !== 'web') {
				const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
				if (status !== 'granted') {
					alert('Sorry, we need camera roll permissions to make this work!')
				}
			}
		})()
	}, [])

	const handleChoosePhoto = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
			allowsMultipleSelection: true,
			base64: false,
			allowsEditing: true,
		})

		console.log('handleChoosePhoto', result)

		if (!result.cancelled) {
			setImagePath(result.uri)
		}
	}

	const handleUploadPhoto = async () => {
		const formData = new FormData()
		formData.append('photo', {
			name: new Date() + '_photo',
			user: 1,
			type: 'image/jpg',
			uri: imagePath,
		})

		fetch(`${BASE_URL}/uploads`, {
			method: 'POST',
			headers: {
				// Accept: 'application/json',
				'Content-Type': 'multipart/form-data',
				authorization: `Bearer ${stateUser?.token}`,
			},
			body: formData,
		})
			.then((response) => response.json())
			.then((response) => {
				console.log('response uploads', response)
			})
			.catch((error) => {
				console.log('error', error)
			})
	}

	// const createPost = async () => {
	// 	try {
	// 		const response = await fetch(`${BASE_URL}/create`, {
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 				Authorization: `Bearer ${stateUser?.token}`,
	// 			},
	// 			body: JSON.stringify({ title, price, description, imgPath }),
	// 		})
	// 	} catch (err) {
	// 		setIsError(false)
	// 		setLoading(false)
	// 		setMessage(err.message)
	// 		console.error(err)
	// 	}
	// }

	return (
		<View style={styles.container}>
			<Title style={{ textAlign: 'center', marginVertical: 30 }}>Create New Post</Title>
			<SnackBarCustom message={message} visible={isVisible} error={isError} setVisible={setIsVisible} />
			<TextInput
				autoCapitalize='none'
				mode='outlined'
				placeholder='title'
				defaultValue={title}
				onChangeText={(text) => setTitle(text)}
			/>
			<TextInput
				autoCapitalize='none'
				mode='outlined'
				placeholder='price'
				defaultValue={price}
				onChangeText={(text) => setPrice(text)}
			/>
			<TextInput
				autoCapitalize='none'
				mode='outlined'
				placeholder='description'
				defaultValue={description}
				onChangeText={(text) => setDescription(text)}
			/>

			{imagePath ? (
				<View>
					<Image source={{ uri: imagePath }} style={{ width: 300, height: 300 }} />
					<Button title='Upload Photo' onPress={handleUploadPhoto}>
						Upload Photo
					</Button>
				</View>
			) : null}

			<Button
				title='Choose Photo'
				icon={'camera'}
				onPress={handleChoosePhoto}
				mode='contained'
				color={colors.brown}
				style={styles.btn}
				loading={loading}>
				Choose photo
			</Button>
			<Button
				mode='contained'
				color={colors.green}
				style={styles.btn}
				loading={loading}
				onPress={() => createPost()}
				disabled={loading}>
				Create Post
			</Button>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 30,
	},
	btn: {
		marginVertical: 10,
	},
})
