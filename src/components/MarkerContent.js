import React from 'react'
import { Alert, Image, View, Text, Dimensions, StyleSheet } from 'react-native'
import { Callout, PROVIDER_GOOGLE } from 'react-native-maps'

import { Paragraph, Avatar, Divider, Button, useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

import { BASE_URL } from '../api'
import { isImageExist } from '../utils/filters/uploadImageFilter'

const screen = Dimensions.get('screen')
const date = new Date().toLocaleDateString('en-US')

export default function MarkerContent({ post }) {
	const { colors } = useTheme()
	const navigation = useNavigation()
	return (
		<Callout
			style={styles.callout}
			onPress={() => {
				navigation.navigate('post', { postId: post?._id, postedBy: post?.postedBy?._id })
			}}>
			<Text style={styles.title}>{post?.title}</Text>
			<Divider />

			<View style={styles.calloutContainer}>
				<View>
					<Paragraph></Paragraph>
					<Text style={styles.text}>Date: {date}</Text>
					<Paragraph style={{ ...styles.text }}>
						Price: <Text style={{ fontWeight: '600' }}>{post?.price} $</Text>
					</Paragraph>
					<Button color={colors.brown} compact style={{ marginTop: 10 }} mode='contained'>
						More...
					</Button>
				</View>
				<View>
					{/* <Avatar.Text size={55} label={'JD'} /> */}
					<Avatar.Image size={125} source={{ uri: isImageExist(post?.images) }} />
				</View>
			</View>
		</Callout>
	)
}

const styles = StyleSheet.create({
	callout: {
		width: screen.width / 1.3,
		maxWidth: 300,
		overflow: 'hidden',
		borderRadius: 12,
		backgroundColor: '#fff',
	},
	title: {
		fontSize: 16,
		fontWeight: 'bold',
		textAlign: 'center',
		marginVertical: 10,
	},

	calloutContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginHorizontal: 8,
		marginVertical: 10,
	},
	text: {
		fontSize: 15,
	},
})
