import { httpService } from './http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update,
    changeImage
}

window.userService = userService


function getUsers() {
    return httpService.get(`user`)
}

async function getById(userId) {
    const user = await httpService.get(`user/${userId}`)
    return user
}

function remove(userId) {
    return httpService.delete(`user/${userId}`)
}

async function update({ _id, imgUrl }) {
    const user = await httpService.put(`user/${_id}`, { _id, imgUrl })
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}

async function login(userCred) {
    try {
        const user = await httpService.post('auth/login', userCred)
        if (user) {
            return saveLocalUser(user)
        } else {
            console.log('wrong pw or email')
        }
    } catch (err) {
        console.error(err)
    }
}

async function signup(userCred) {
    try {
        const user = await httpService.post('auth/signup', userCred)
        return saveLocalUser(user)
    }
    catch (err) { console.error(err) }
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    const FB = window.FB
    FB.logout(function(response) {
      })
    return await httpService.post('auth/logout')
}

async function changeImage(img) {
    const user = getLoggedinUser()
    if (!user) throw new Error('Not loggedin')
    user.imgUrl = img
    try {
        await update(user)
        return user.imgUrl
    }
    catch (err) {
        console.error(err)
    }
}

function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl  }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}



