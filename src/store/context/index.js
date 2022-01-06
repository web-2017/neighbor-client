import React, { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Context
export const UserContext = createContext(null)

// Provider
export const UserProvider = ({ children }) => {
	const [stateUser, setStateUser] = useState([])

	useEffect(() => {
		;(async () => {
			const isUserStorage = await AsyncStorage.getItem('user')

			if (typeof isUserStorage === 'string') {
				setStateUser(JSON.parse(isUserStorage))
			}
		})()
	}, [])

	return <UserContext.Provider value={[stateUser, setStateUser]}>{children}</UserContext.Provider>
}
