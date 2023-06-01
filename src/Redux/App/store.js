import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Features/auth/authSlice"
import navigationReducer from "../Features/navigation/navigationSlice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        navigation: navigationReducer,
    }
})


export default store