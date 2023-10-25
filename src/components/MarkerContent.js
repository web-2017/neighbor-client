import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'

import { Alert, Image, View, Text, Dimensions, StyleSheet } from 'react-native'
import { Callout, PROVIDER_GOOGLE } from 'react-native-maps'

import {
	Paragraph,
	Avatar,
	Divider,
	Button,
	useTheme,
} from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

import {
	calculateDaysAgo,
	formatDateHandler,
	sliceStringFilter,
} from '../utils/filters'
import { isImageExist } from '../utils/filters/uploadImageFilter'

const screen = Dimensions.get('screen')
const date = new Date().toLocaleDateString('en-US')

export default function MarkerContent({ post }) {
	console.log(post)

	const { colors } = useTheme()
	const navigation = useNavigation()
	return (
		<Callout
			style={styles.callout}
			onPress={() => {
				navigation.navigate('post', {
					postId: post?._id,
					postedBy: post?.postedBy?._id,
				})
			}}
		>
			<Text style={{ ...styles.title, color: colors.primary }}>
				{sliceStringFilter(post?.title, 20)}
			</Text>
			<Divider />
			<View style={styles.contentContainer}>
				<View style={styles.leftSide}>
					<View style={{ alignContent: 'center' }}>
						<Text style={{ ...styles.text, color: colors.primary }}>
							Created: {calculateDaysAgo(post?.createdAt)}
						</Text>
						<Paragraph style={{ ...styles.text, color: colors.primary }}>
							Price: <Text style={{ fontWeight: '800' }}>{post?.price} $</Text>
						</Paragraph>
						<Text style={{ flexShrink: 1, color: colors.primary }}>
							{sliceStringFilter(post?.description, 50)}
						</Text>
						<Button
							textColor={colors.blue}
							compact
							contentStyle={{ flexDirection: 'row-reverse' }}
							style={{ marginTop: 10 }}
							mode="outlined"
							icon={() => (
								<AntDesign name="forward" color={colors.blue} size={14} />
							)}
							name="prev"
						>
							More...
						</Button>
					</View>
				</View>
				<View style={styles.rightSide}>
					{/* <Avatar.Text size={55} label={'JD'} /> */}
					<Image
						style={{ height: 120, width: '100%', borderRadius: 8 }}
						source={{ uri: isImageExist(post?.images) }}
					/>
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
		textTransform: 'uppercase',
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
