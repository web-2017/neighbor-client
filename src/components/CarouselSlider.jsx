import React, { useState, useRef, useEffect } from 'react'
import {
	View,
	Text,
	StyleSheet,
	Animated,
	TouchableOpacity,
	Image,
	FlatList,
	Easing,
} from 'react-native'
import { Button, Divider, Title, useTheme } from 'react-native-paper'
import { FontAwesome, AntDesign, Entypo, Feather } from '@expo/vector-icons'

import { isImageExist } from '../utils/filters/uploadImageFilter'
import { sliceStringFilter } from '../utils/filters'

export default function CarouselSlider({ posts, setRegion, navigation }) {
	const [swipePosition, setSwipePositionState] = useState(150)

	useEffect(() => {
		Animated.timing(transition, {
			toValue: swipePosition,
			duration: 400,
			easing: Easing.elastic(1.2),
			useNativeDriver: true,
		}).start()
	}, [swipePosition])

	const transition = useRef(new Animated.Value(swipePosition)).current
	const { colors } = useTheme()

	const renderItem = ({ item }) => {
		console.log(123, item?.postedBy?.coords?.lat)
		return (
			<TouchableOpacity
				style={{ ...styles.carouselItem }}
				onPress={() =>
					setRegion({
						lat: item?.postedBy?.coords?.lat,
						lng: item?.postedBy?.coords?.lng,
					})
				}
			>
				<View style={{ flex: 1 }}>
					<Image
						style={{ height: '100%', width: 100 }}
						source={{ uri: isImageExist(item?.images) }}
					/>
				</View>
				<View style={{ ...styles.carouselContent }}>
					<View>
						<Text style={{ fontSize: 18, paddingBottom: 5 }}>
							{sliceStringFilter(item?.title, 10)}
						</Text>
						<Text
							style={{ fontSize: 17, paddingBottom: 5, fontWeight: 'bold' }}
						>
							<Entypo name="price-tag" size={15} color={colors.blue} />{' '}
							{item?.price === 0 ? 'Free' : item?.price + '$'}
						</Text>
						<Text>
							<Feather name="file-text" size={13} color={colors.primary} />{' '}
							{sliceStringFilter(item?.description, 25)}
						</Text>
					</View>
					<Button
						mode="text"
						color={colors.red}
						onPress={() => navigation.navigate('post', { postId: item?._id })}
					>
						More...
					</Button>
				</View>
			</TouchableOpacity>
		)
	}

	return (
		<Animated.View
			style={{
				...styles.carousel,
				transform: [{ translateY: transition }],
				backgroundColor: '#fff',
			}}
		>
			<Title
				style={{ ...styles.swipeBtn, color: colors.primary }}
				onPress={() =>
					swipePosition === 0
						? setSwipePositionState(150)
						: setSwipePositionState(0)
				}
			>
				Press
				<AntDesign
					name={`arrow${swipePosition === 0 ? 'down' : 'up'}`}
					size={15}
					color={colors.primary}
					style={{ marginLeft: 10 }}
				/>
			</Title>
			<Divider />
			<FlatList
				data={posts}
				renderItem={renderItem}
				keyExtractor={(item, index) => index.toString()}
				horizontal
				contentContainerStyle={{ margin: 10, marginLeft: 0 }}
			/>
		</Animated.View>
	)
}

const styles = StyleSheet.create({
	carousel: {
		position: 'absolute',
		bottom: 0,
		height: 200,
		alignSelf: 'center',
		width: '98%',
		borderRadius: 4,
		zIndex: 1,
	},
	swipeBtn: {
		alignSelf: 'center',
		fontSize: 17,
		backgroundColor: '#fff',
		padding: 6,
		borderRadius: 6,
		overflow: 'hidden',
		textTransform: 'uppercase',
	},
	carouselItem: {
		width: 250,
		flexDirection: 'row',
		marginHorizontal: 10,

		borderRadius: 4,
		// overflow: 'hidden',
		backgroundColor: '#ffffffe7',

		// shadowColor: '#000',
		// shadowOffset: {
		// 	width: 0,
		// 	height: 3,
		// },
		// shadowOpacity: 0.3,
		// shadowRadius: 4.65,
		// elevation: 7,
	},
	carouselContent: {
		flexDirection: 'column',
		justifyContent: 'space-between',
		flexShrink: 1,
		flex: 1.2,
		padding: 5,
	},
})
