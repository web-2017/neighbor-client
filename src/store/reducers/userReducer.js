import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	firstName: '',
	lastName: '',
	nickname: '',
	role: '',
	email: '',
	tel: '',
	coords: {},
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		// setUserReducer: (state, action) => {
		// 	state = action.payload
		// 	return state
		// },
		setUserReducer: (state, action) => (state = action.payload),

		updateUserReducer: (state, action) => [...state, action.payload],
	},
})

// Action creators are generated for each case reducer function
export const { setUserReducer, updateUserReducer } = userSlice.actions

export default userSlice.reducer
