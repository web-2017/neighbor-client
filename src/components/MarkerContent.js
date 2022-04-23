import React from 'react'
import { Alert, Image, View, Text, Dimensions, StyleSheet } from 'react-native'
import { Callout } from 'react-native-maps'
import { Paragraph, Avatar, Divider, Button, useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

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
			<Text style={styles.title}>{post?.postedBy?.nickname}</Text>
			<Divider />

			<View style={styles.calloutContainer}>
				<View>
					<Paragraph style={styles.text}>Title: Sell iPhone 12</Paragraph>
					<Text style={styles.text}>Date: {date}</Text>
					<Paragraph style={{ ...styles.text }}>
						Price: <Text style={{ fontWeight: '600' }}>400$</Text>
					</Paragraph>
					<Button color={colors.brown} compact style={{ marginTop: 10 }} mode='contained'>
						More...
					</Button>
				</View>
				<View>
					{/* <Avatar.Text size={55} label={'JD'} /> */}
					<Avatar.Image
						size={125}
						source={{ uri: 'https://icdn.digitaltrends.com/image/digitaltrends/iphone-12-mini-black-back-in-hand.jpg' }}
					/>
				</View>
			</View>
		</Callout>
	)
}

const styles = StyleSheet.create({
	callout: {
		width: screen.width / 1.3,
		borderRadius: 12,
		backgroundColor: '#ccc9',
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
