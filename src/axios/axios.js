// Axios Import
import axios from 'axios'


export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL
})

export const api2 = axios.create({
    baseURL: process.env.NEXT_PUBLIC_NEXT_URL
})


export const getRefreshToken = async () => {
    const response = await api2.get(`/api/hello`)
    return response.data.token
}

export const renewAccessToken = async (currentRefreshToken) => {
    const refreshToken = currentRefreshToken?.queryKey[1]
    const response = await api.post(`/auth/jwt/refresh/`, refreshToken)
    return response.data
}


export const getCurrentUser = async ( token ) => {
    const accessToken = token?.queryKey[1]
    const response = await api.get(`/auth/users/me/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken 
        }
    })
    return response.data
}


export const getUserProfile = async ( userID ) => {
    const currentUserId = userID?.queryKey[1]
    const response = await api.get(`/store/user-profile/?user=${currentUserId}`)
    return response.data
}

export const getUserVideos = async ( userID ) => {
    const currentUserId = userID?.queryKey[1]
    const response = await api.get(`/store/videos-no-pagination/?user=${currentUserId}`)
    return response.data
}

