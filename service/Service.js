
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import { result } from 'lodash'



const baseURL = "http://192.168.18.57:8080/api/"
const USER = "user"


export const userLogin = async (data) => {


    let config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }

    };
    try {
        const res = await axios.post(baseURL + "login", data, config)

        const user = res.data

        if (user) {
            await SecureStore.setItemAsync(USER, JSON.stringify(user))

        }
        return res.data

    } catch (error) {
        console.error(" when login", error)
    }

}

export const FindUser = async (user) => {
    const data = {
        username: ""
    }

    if (user != null || user != undefined) {
        const { username, token } = user
        let myToken = 'Bearer '.concat(token)

        data.username = JSON.stringify(username)
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `${myToken}`
            }
        }

        try {

            const response = await axios.get(baseURL + "users", config)

            return response
        } catch (error) {
            return error.message
        }
    } else {
        console.log("User", user)
    }


}

export const Registrar = async (data) => {
    let result
    try {
        result = await axios.post(baseURL + "users", data).then(res => res);
        return result
    } catch (error) {
        return error
    }

}


export const isUserLogged = async () => {
    let isLogged = false

    try {
        let user = await SecureStore.getItemAsync(USER,).then(res => res)

        if (user) isLogged = true

    } catch (error) {
        console.error(error)

    }

    return isLogged

}

export const closeSession = async () => {

    try {
        return await SecureStore.deleteItemAsync(USER).then(res => {
            console.log("close session")
        })
    } catch (error) {
        console.error("Error in close session", error)
    }

}

export const getAvatarUser = async (params) => {
    //Solicitut de la imatge del usuari
    let userAvatar = params.userAvatar
    return await axios({
        method: 'GET',
        url: `${baseURL}` + 'users/avatar/',
        params: {
            userAvatar,
            username
        }
    })

}

export const saveAvatarUsuari = async (imatge, nomavatar) => {
    //codi guardar imatge
}

export const getCurrentUser = async () => {
    let user = {}
    try {
        user = await SecureStore.getItemAsync(USER,).then(res => res)
    } catch (error) {
        console.error("Error get current user storage", error)
    }

    return JSON.parse(user)
}

export const updateUser = async (userData, token) => {
    console.log(userData)

    const responseStatus = {
        success: "",
        response: null
    }
    if (userData) {

        let myToken = 'Bearer '.concat(token)


        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `${myToken}`
            }
        }

        try {

            responseStatus.response = await axios.put(baseURL + "users", userData, config).then(res => res)
            console.log("users put: ", responseStatus.response)
            responseStatus.success = "true"
            return responseStatus
        } catch (error) {
            responseStatus.success = "false"
            responseStatus.response = error.message
            return responseStatus
        }
    } else {
        responseStatus.success = "false"
        return responseStatus
    }

}

