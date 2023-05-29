export const isAdminOrArtist = ( currentUser ) => {
    return ['ADMIN', 'ARTIST'].includes(currentUser?.role)
}

export const isVendor = ( currentUser ) => {
    return ['VENDOR'].includes(currentUser?.role)
}

export const isPromoter = ( currentUser ) => {
    return ['PROMOTER'].includes(currentUser?.role)
}
