const DEFAULT_PROFILE_AVATAR_LINK = '/static/images/profile-avatar-placeholder.svg'
const DEFAULT_PROFILE_COVER_LINK = '/static/images/profile-cover-placeholder.jpg'

export const getAvatarLink = (user) => {
    if (user.avatar) {
        return user.avatar.src
    }
    return null
}

export const getProfileCoverLink = (user) => {
    if (user.profileCover) {
        return user.profileCover.src
    }
    return DEFAULT_PROFILE_COVER_LINK
}

export const resetFileInput = (e) => {
    e.target.type = 'text'
    e.target.type = 'file'
}