import AsyncStorage from '@react-native-async-storage/async-storage'

export const saveStoreData = async (storageKey = 'user', value) => {
	try {
		const jsonValue = JSON.stringify(value)
		await AsyncStorage.setItem(storageKey, jsonValue)
	} catch (e) {
		// saving error
		console.error('Error storeData: ' + e)
	}
}

export const getStoreData = async (storageKey) => {
	try {
		const data = await AsyncStorage.getItem(storageKey)
		return JSON.parse(data)
	} catch (e) {
		// saving error
		console.error('Error getStoreData: ' + e)
	}
}
