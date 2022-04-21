import { View, Text } from 'react-native'
import { List, Avatar, Divider } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

import { BASE_URL } from '../api'
import { uploadImageFilter } from '../utils/filters/uploadImageFilter'
export default function PostItem({
	title = 'Title',
	description = 'Item description',
	uri = 'https://robohash.org/robert',
	postId,
	post,
}) {
	const navigation = useNavigation()
	// console.log('post', title)
	/**
	 * @function isImageExist - check if image exist, if not set default pic
	 * @param  {Array} url - List avatars
	 */
	const isImageExist = (url) => {
		return url ? uploadImageFilter(`${BASE_URL}/${url[0]}`) : 'https://robohash.org/robert'
	}
	return (
		<>
			<List.Item
				onPress={() => navigation.navigate('post', { postId: post?._id })}
				title={title}
				description={description}
				left={(props) => <Avatar.Image style={{ alignSelf: 'center' }} size={70} source={{ uri: isImageExist(uri) }} />}
				right={(props) => <List.Icon {...props} icon='eye' />}
			/>
			<Divider />
		</>
	)
}
