import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Animated, TouchableOpacity, Image, FlatList, Easing } from 'react-native'
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
		return (
			<TouchableOpacity
				style={{ ...styles.carouselItem }}
				onPress={() => setRegion({ lat: item?.postedBy?.coords?.lat, lng: item?.postedBy?.coords?.lng })}>
				<View style={{ flex: 1 }}>
					<Image style={{ height: '100%', width: 100 }} source={{ uri: isImageExist(item?.images) }} />
				</View>
				<View style={{ ...styles.carouselContent }}>
					<View>
						<Text>
							<AntDesign name='' /> {sliceStringFilter(item?.title, 15)}
						</Text>
						<Text>
							<Entypo name='price-tag' size={13} color={colors.alert} />{' '}
							{item?.price === 0 ? 'Free' : item?.price + '$'}
						</Text>
						<Text>
							<Feather name='file-text' size={13} color={colors.primary} /> {sliceStringFilter(item?.description, 30)}
						</Text>
					</View>
					<Button mode='outlined' color={colors.red} onPress={() => navigation.navigate('post', { postId: item?._id })}>
						More...
					</Button>
				</View>
			</TouchableOpacity>
		)
	}

	return (
		<Animated.View
			style={{ ...styles.carousel, transform: [{ translateY: transition }], backgroundColor: colors.blue }}>
			<Title
				style={{ alignSelf: 'center' }}
				onPress={() => (swipePosition === 0 ? setSwipePositionState(150) : setSwipePositionState(0))}>
				Filter <FontAwesome name={`arrow-${swipePosition === 0 ? 'up' : 'down'}`} size={20} color={'#fff'} />
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
		backgroundColor: '#ffffff',
		bottom: 0,
		height: 200,
		alignSelf: 'center',
		width: '90%',
		borderRadius: 4,
	},
	carouselItem: {
		width: 250,
		flexDirection: 'row',
		marginHorizontal: 10,
		borderWidth: 1,
		borderColor: '#3e3e3e67',
		borderRadius: 4,
		overflow: 'hidden',
		backgroundColor: '#ffffffe7',
	},
	carouselContent: {
		flexDirection: 'column',
		justifyContent: 'space-between',
		flexShrink: 1,
		flex: 1.2,
		padding: 5,
	},
})
