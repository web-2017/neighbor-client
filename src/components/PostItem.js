import { Avatar, Divider, Card, Paragraph, Button, Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

import { isImageExist, formatDateHandler } from '../utils/filters'

export default function PostItem({
	title = 'Title',
	description = 'Item description',
	uri = 'https://robohash.org/robert',
	postId,
	post,
}) {
	const navigation = useNavigation()
	console.log('post', post)

	const LeftContent = (props) => <Avatar.Icon {...props} icon='post' />

	return (
		<>
			<Card mode='elevated'>
				<Card.Title
					title={title}
					subtitle={post?.price + ' $ ' + formatDateHandler(post?.createdAt)}
					left={LeftContent}
				/>
				<Card.Content>
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
