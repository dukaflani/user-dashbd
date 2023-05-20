import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    token: '',
    userInfo: null,
    profileInfo: null,
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateToken: (state, action) => {
            state.token = `JWT ${action.payload}`
        },
        updateUserInfo: (state, action) => {
            state.userInfo = action.payload
        },
        updateProfileInfo: (state, action) => {
            state.profileInfo = action.payload
        },
        logOut: (state) => {
            state.token = ''
            state.userInfo = null
            state.profileInfo = null
        }
    }
})

export default authSlice.reducer
export const { updateToken, updateUserInfo, logOut, updateProfileInfo } = authSlice.actions
