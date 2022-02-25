import React, { useState, useEffect, useContext } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { Paragraph, Title, useTheme } from 'react-native-paper'
import { BASE_URL } from '../api'

import { keys } from '../api/keys'
import { UserContext } from '../store/context'

export default function EditAddress({ navigation }) {
	const { colors } = useTheme()
	const [stateUser, setStateUser] = useContext(UserContext)

	const checkAddress = (props) => {
		if (props) {
			fetch(`${BASE_URL}/user/${stateUser?._id}`, {
				method: 'put',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${stateUser?.token}`,
				},
				body: JSON.stringify({ ad }),
			})
				.then((data) => data.json())
				.then((updatedUser) => {
					// console.log('updatedUser', updatedUser)
					saveStoreData('user', { _id: stateUser._id, token: stateUser.token, user: updatedUser })
					setStateUser({ _id: stateUser._id, token: stateUser.token, user: updatedUser })
					navigation.goBack()
				})
				.catch((err) => {
					console.log('err: ', err)
					setLoading(false)
				})
				.finally(() => setLoading(false))
		}
	}

	return (
		<>
			<Title style={{ marginHorizontal: 20, textAlign: 'center', color: colors.primary }}>
				Please don't forget indicate number of your building
			</Title>

			<GooglePlacesAutocomplete
				suppressDefaultStyles={false}
				// style={{ borderWidth: 1, borderColor: 'red' }}
				placeholder='Search'
				onPress={(data, details = null) => {
					// console.log('data', data.description)
					checkAddress(data.description)
				}}
				query={{
					key: keys.GOOGLE_MAP_KEY,
					language: 'en',
				}}
			/>
		</>
	)
}
