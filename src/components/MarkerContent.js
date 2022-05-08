import React from 'react'
import { Alert, Image, View, Text, Dimensions, StyleSheet } from 'react-native'
import { Callout, PROVIDER_GOOGLE } from 'react-native-maps'

import { Paragraph, Avatar, Divider, Button, useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

import { sliceStringFilter } from '../utils/filters'
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
			<Text style={styles.title}>{sliceStringFilter(post[0]?.title, 20)}</Text>
			<Divider />
			<View style={styles.contentContainer}>
				<View style={styles.leftSide}>
					<View style={{ alignContent: 'center' }}>
						<Text style={styles.text}>Date: {date}</Text>
						<Paragraph style={{ ...styles.text }}>
							Price: <Text style={{ fontWeight: '600' }}>{post?.price} $</Text>
						</Paragraph>
						<Text style={{ flexShrink: 1 }}>{sliceStringFilter(post?.description, 50)}</Text>
						<Button color={colors.alert} compact style={{ marginTop: 10 }} mode='contained'>
							More...
						</Button>
					</View>
				</View>
				<View style={styles.rightSide}>
					{/* <Avatar.Text size={55} label={'JD'} /> */}
					<Image style={{ height: '100%', width: '100%' }} source={{ uri: isImageExist(post?.images) }} />
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
	leftSide: {
		flex: 2,
		marginHorizontal: 8,
		marginVertical: 10,
	},
	rightSide: {
		flex: 1,
		marginHorizontal: 8,
		marginVertical: 10,
	},
	contentContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	text: {
		fontSize: 15,
	},
})
