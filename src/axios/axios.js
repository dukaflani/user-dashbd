// Axios Import
import axios from 'axios'


export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL
})

export const api2 = axios.create({
    baseURL: process.env.NEXT_PUBLIC_NEXT_URL
})




// API Getter Functions
export const loginUser = async (loginInfo) => {
    const response = await api.post(`/auth/jwt/create`, loginInfo)
    return response.data
}


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

export const addVideo = async ( { accessToken, ...videoDetails } ) => {
    const access_token = accessToken
    const video_details = videoDetails

    const response = await api.post(`/store/videos/`, video_details, {
        headers: {
            // 'Content-Type': 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: access_token 
        },
    })
    return response.data
}

export const editVideo = async ( { accessToken, id, ...videoDetails } ) => {
    const access_token = accessToken
    const video_details = videoDetails
    const video_id = id

    const response = await api.put(`/store/videos/${video_id}/`, video_details, {
        headers: {
            // 'Content-Type': 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: access_token 
        },
    })
    return response.data
}

export const deleteVideo = async ( { id, accessToken } ) => {
    const access_token = accessToken
    const video_id = id

    const response = await api.delete(`/store/videos/${video_id}/`, {
        headers: {
            // 'Content-Type': 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: access_token 
        },
    })
    return response.data
}


export const getUserProducts = async ( userID ) => {
    const currentUserId = userID?.queryKey[1]
    const response = await api.get(`/store/products/?user=${currentUserId}`)
    return response.data
}


export const addProduct = async ( { accessToken, ...productDetails } ) => {
    const access_token = accessToken
    const product_details = productDetails

    const response = await api.post(`/store/products/`, product_details, {
        headers: {
            // 'Content-Type': 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: access_token 
        },
    })
    return response.data
}


export const editProduct = async ( { accessToken, id, ...productDetails } ) => {
    const access_token = accessToken
    const product_details = productDetails
    const product_id = id

    const response = await api.put(`/store/products/${product_id}/`, product_details, {
        headers: {
            // 'Content-Type': 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: access_token 
        },
    })
    return response.data
}

export const deleteProduct = async ( { id, accessToken } ) => {
    const access_token = accessToken
    const product_id = id

    const response = await api.delete(`/store/products/${product_id}/`, {
        headers: {
            // 'Content-Type': 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: access_token 
        },
    })
    return response.data
}


export const getUserEvents = async ( userID ) => {
    const currentUserId = userID?.queryKey[1]
    const response = await api.get(`/store/events/?user=${currentUserId}`)
    return response.data
}


export const addEvent = async ( { accessToken, ...eventDetails } ) => {
    const access_token = accessToken
    const event_details = eventDetails

    const response = await api.post(`/store/events/`, event_details, {
        headers: {
            // 'Content-Type': 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: access_token 
        },
    })
    return response.data
}


export const editEvent = async ( { accessToken, id, ...eventDetails } ) => {
    const access_token = accessToken
    const event_details = eventDetails
    const event_id = id

    const response = await api.put(`/store/events/${event_id}/`, event_details, {
        headers: {
            // 'Content-Type': 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: access_token 
        },
    })
    return response.data
}


export const deleteEvent = async ( { id, accessToken } ) => {
    const access_token = accessToken
    const event_id = id

    const response = await api.delete(`/store/events/${event_id}/`, {
        headers: {
            // 'Content-Type': 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: access_token 
        },
    })
    return response.data
}


export const getUserMediaTours = async ( userID ) => {
    const currentUserId = userID?.queryKey[1]
    const response = await api.get(`/store/media-tour/?user=${currentUserId}`)
    return response.data
}


export const addMediaTour = async ( { accessToken, ...mediatourDetails } ) => {
    const access_token = accessToken
    const mediatour_details = mediatourDetails

    const response = await api.post(`/store/media-tour/`, mediatour_details, {
        headers: {
            // 'Content-Type': 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: access_token 
        },
    })
    return response.data
}


export const editMediaTour = async ( { accessToken, id, ...mediatourDetails } ) => {
    const access_token = accessToken
    const mediatour_details = mediatourDetails
    const mediatour_id = id

    const response = await api.put(`/store/media-tour/${mediatour_id}/`, mediatour_details, {
        headers: {
            // 'Content-Type': 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: access_token 
        },
    })
    return response.data
}


export const deleteMediaTour = async ( { id, accessToken } ) => {
    const access_token = accessToken
    const mediatour_id = id

    const response = await api.delete(`/store/media-tour/${mediatour_id}/`, {
        headers: {
            // 'Content-Type': 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: access_token 
        },
    })
    return response.data
}


export const getUserLyrics = async ( userID ) => {
    const currentUserId = userID?.queryKey[1]
    const response = await api.get(`/store/lyrics/?user=${currentUserId}`)
    return response.data
}


export const addLyrics = async ( { accessToken, ...lyricsDetails } ) => {
    const access_token = accessToken
    const lyrics_details = lyricsDetails

    const response = await api.post(`/store/lyrics/`, lyrics_details, {
        headers: {
            // 'Content-Type': 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: access_token 
        },
    })
    return response.data
}


export const editLyrics = async ( { accessToken, id, ...lyricsDetails } ) => {
    const access_token = accessToken
    const lyrics_details = lyricsDetails
    const lyrics_id = id

    const response = await api.put(`/store/lyrics/${lyrics_id}/`, lyrics_details, {
        headers: {
            // 'Content-Type': 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: access_token 
        },
    })
    return response.data
}


export const deleteLyrics = async ( { id, accessToken } ) => {
    const access_token = accessToken
    const lyrics_id = id

    const response = await api.delete(`/store/lyrics/${lyrics_id}/`, {
        headers: {
            // 'Content-Type': 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: access_token 
        },
    })
    return response.data
}


export const addLyricsVerse = async ( { accessToken, ...lyricsVerseDetails } ) => {
    const access_token = accessToken
    const lyricsVerse_details = lyricsVerseDetails

    const response = await api.post(`/store/lyrics-verse/`, lyricsVerse_details, {
        headers: {
            // 'Content-Type': 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: access_token 
        },
    })
    return response.data
}


export const getUserStreamingLinks = async ( userID ) => {
    const currentUserId = userID?.queryKey[1]
    const response = await api.get(`/store/streaming-links/?user=${currentUserId}`)
    return response.data
}


export const addStreamingLinks = async ( { accessToken, ...streamingLinksDetails } ) => {
    const access_token = accessToken
    const streamingLinks_details = streamingLinksDetails

    const response = await api.post(`/store/streaming-links/`, streamingLinks_details, {
        headers: {
            // 'Content-Type': 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: access_token 
        },
    })
    return response.data
}


export const deleteStreamingLinks = async ( { id, accessToken } ) => {
    const access_token = accessToken
    const streamingLinks_id = id

    const response = await api.delete(`/store/streaming-links/${streamingLinks_id}/`, {
        headers: {
            // 'Content-Type': 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: access_token 
        },
    })
    return response.data
}


export const addStreamingLinkItem = async ( { accessToken, ...streamingLinkItemDetails } ) => {
    const access_token = accessToken
    const streamingLinkItem_details = streamingLinkItemDetails

    const response = await api.post(`/store/streaming-link/`, streamingLinkItem_details, {
        headers: {
            // 'Content-Type': 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: access_token 
        },
    })
    return response.data
}


export const getUserSkizaTunes = async ( userID ) => {
    const currentUserId = userID?.queryKey[1]
    const response = await api.get(`/store/skiza-tunes/?user=${currentUserId}`)
    return response.data
}


export const addSkizaTunes = async ( { accessToken, ...skizaTunesDetails } ) => {
    const access_token = accessToken
    const skizaTunes_details = skizaTunesDetails

    const response = await api.post(`/store/skiza-tunes/`, skizaTunes_details, {
        headers: {
            // 'Content-Type': 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: access_token 
        },
    })
    return response.data
}


export const deleteSkizaTunes = async ( { id, accessToken } ) => {
    const access_token = accessToken
    const skizaTunes_id = id

    const response = await api.delete(`/store/skiza-tunes/${skizaTunes_id}/`, {
        headers: {
            // 'Content-Type': 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: access_token 
        },
    })
    return response.data
}


export const addSkizaTuneItem = async ( { accessToken, ...skizaTuneItemDetails } ) => {
    const access_token = accessToken
    const skizaTuneItem_details = skizaTuneItemDetails

    const response = await api.post(`/store/skiza-tune/`, skizaTuneItem_details, {
        headers: {
            // 'Content-Type': 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: access_token 
        },
    })
    return response.data
}


export const getUserMusicCollections = async ( userID ) => {
    const currentUserId = userID?.queryKey[1]
    const response = await api.get(`/store/album/?user=${currentUserId}`)
    return response.data
}


export const addMusicCollection = async ( { accessToken, ...musicCollectionDetails } ) => {
    const access_token = accessToken
    const musicCollection_details = musicCollectionDetails

    const response = await api.post(`/store/album/`, musicCollection_details, {
        headers: {
            // 'Content-Type': 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: access_token 
        },
    })
    return response.data
}


export const deleteMusicCollection = async ( { id, accessToken } ) => {
    const access_token = accessToken
    const musicCollection_id = id

    const response = await api.delete(`/store/album/${musicCollection_id}/`, {
        headers: {
            // 'Content-Type': 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: access_token 
        },
    })
    return response.data
}


export const addMusicCollectionItem = async ( { accessToken, ...musicCollectionItemDetails } ) => {
    const access_token = accessToken
    const musicCollectionItem_details = musicCollectionItemDetails

    const response = await api.post(`/store/album-track/`, musicCollectionItem_details, {
        headers: {
            // 'Content-Type': 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: access_token 
        },
    })
    return response.data
}


export const getGenres = async ( ) => {
    const response = await api.get(`/store/genre/`)
    return response.data
}


export const getProfileAnalytics = async ( profileID ) => {
    const year = new Date().getFullYear()
    const profile_id = profileID?.queryKey[1]
    const response = await api.get(`/store/user-profile-analytics/${profile_id}/?jan=${year}-01&feb=${year}-02&mar=${year}-03&apr=${year}-04&may=${year}-05&jun=${year}-06&jul=${year}-07&aug=${year}-08&sep=${year}-09&oct=${year}-10&nov=${year}-11&dec=${year}-12`)
    return response.data
}


export const getViewsByCountry = async ( profileID ) => {
    const profile_id = profileID?.queryKey[1]
    const response = await api.get(`/store/views-by-country/?pid=${profile_id}`)
    return response.data
}


export const getViewsByReferrer = async ( profileID ) => {
    const profile_id = profileID?.queryKey[1]
    const response = await api.get(`/store/views-by-referrer/?pid=${profile_id}`)
    return response.data
}

export const getStreamingViewsByPlatform = async ( profileID ) => {
    const profile_id = profileID?.queryKey[1]
    const response = await api.get(`/store/streaming-views-by-platform/?pid=${profile_id}`)
    return response.data
}