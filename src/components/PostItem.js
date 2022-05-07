import { Avatar, Divider, Card, Paragraph, Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

import { isImageExist } from '../utils/filters/uploadImageFilter'

export default function PostItem({
	title = 'Title',
	description = 'Item description',
	uri = 'https://robohash.org/robert',
	postId,
	post,
}) {
	const navigation = useNavigation()
	// console.log('post', title)

	const LeftContent = (props) => <Avatar.Icon {...props} icon='post' />

	return (
		<>
			<Card mode='elevated' style={{ marginVertical: 10 }}>
				<Card.Title title={title} subtitle={post?.price + ' $'} left={LeftContent} />
				<Card.Content>
					{/* <Title>{title}</Title> */}
					<Paragraph>{description}</Paragraph>
				</Card.Content>
				<Card.Cover source={{ uri: isImageExist(uri) }} />
				<Card.Actions style={{ justifyContent: 'space-between' }}>
					<Button onPress={() => navigation.navigate('post', { postId: post?._id })}>Read more</Button>
				</Card.Actions>
			</Card>

			<Divider style={{ marginVertical: 10 }} />
		</>
	)
}
