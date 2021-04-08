const DEFAULT_PROFILE_AVATAR_LINK = '../images/profile-avatar-placeholder.png'
const DEFAULT_PROFILE_COVER_LINK = '../images/profile-cover-placeholder.png'

export const getAvatarLink = user => {
    if (!user.avatar) {
        return DEFAULT_PROFILE_AVATAR_LINK;
    }
    return user.avatar.src;
}

export const getProfileCoverLink = user => {
    if (!user.profileCover) {
        return DEFAULT_PROFILE_COVER_LINK;
    }
    return user.profileCover.src;
}
