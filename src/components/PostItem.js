import { View, Text } from 'react-native'
import { List, Avatar, Divider, Card, Title, Paragraph, Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

import { BASE_URL } from '../api'
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

	const LeftContent = (props) => <Avatar.Icon {...props} icon='folder' />
	return (
		<>
			<Card mode='elevated'>
				<Card.Title title={title} subtitle={post?.price + ' $'} left={LeftContent} />
				<Card.Content>
					{/* <Title>{title}</Title> */}
					<Paragraph>{description}</Paragraph>
				</Card.Content>
				<Card.Cover source={{ uri: isImageExist(uri) }} />
				<Card.Actions>
					<Button onPress={() => navigation.navigate('post', { postId: post?._id })}>Read more</Button>
				</Card.Actions>
			</Card>

			{/* <List.Item
				onPress={() => navigation.navigate('post', { postId: post?._id })}
				title={title}
				description={description}
				left={(props) => <Avatar.Image style={{ alignSelf: 'center' }} size={70} source={{ uri: isImageExist(uri) }} />}
				right={(props) => <List.Icon {...props} icon='eye' />}
			/>
			<Divider />*/}
		</>
	)
}
