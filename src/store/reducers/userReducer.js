import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	firstName: '',
	lastName: '',
	nickname: '',
	role: 'user',
	email: '',
	tel: '',
	address: '',
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserReducer: (state, action) => {
			state = action.payload
		},
		updateAddress: (state, action) => {
			state = { ...state, address: action.payload }
		},
	},
})

// Action creators are generated for each case reducer function
export const { setUserReducer, updateAddress } = userSlice.actions

export default userSlice.reducer
