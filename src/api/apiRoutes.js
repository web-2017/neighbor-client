const hostname = 'http://localhost:4000/v1'
const chatHostName = 'http://localhost:4001'
export const registerRoute = `${hostname}/signup`
export const logInRoute = `${hostname}/signin`
export const postsRoute = `${hostname}/posts`
export const myPostsRoute = `${hostname}/my-posts`
export const getAllUsersRoute = `${hostname}/users`
export const chatSendMessageRoute = `${chatHostName}/add-message`
export const chatReceiveMessageRoute = `${chatHostName}/get-message`
export const chatSetAvatarRoute = `${chatHostName}/set-avatar`
