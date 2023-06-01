import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    pageChanged: null,
}


const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        pageHasChanged: (state, action) => {
            state.pageChanged = action.payload
        },
    }
})

export default navigationSlice.reducer
export const { pageHasChanged } = navigationSlice.actions
