
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'


const baseURL = "http://192.168.18.57:8080/api/"
const TOKEN = "token"

export const userLogin = async (data) => {

    try {
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            timeout: 5000
        };
        const result = await axios.post(baseURL + "login", data, config)
        try {
            await SecureStore.setItemAsync(TOKEN, result.token)
        } catch (error) {
            return error.message
        }
        return result
    } catch (error) {
        return error.message
    }

}

export const FindUser = async (user) => {

    try {
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': user.bearer + user.token
            },
            timeout: 5000
        };
        user = await axios.get(baseURL + "users", user, config)
        return user
    } catch (error) {
        return error.message
    }


}

export const Registrar = async (data) => {
    let result
    try {
        result = await axios.post(baseURL + "users", data).then(res => res.data);

    } catch (error) {
        return error
    }
    return result
}


export const isUserLogged = async () => {
    const res = {
        token: "",
        isLogged: false,
        err: ""
    }

    try {
        res.token = await SecureStore.getItemAsync(TOKEN,)
        res.isLogged = true
    } catch (error) {
        res.err = error.message
        res.isLogged = false
    }


    return res
}

export const closeSession = async () => {

    await SecureStore.deleteItemAsync(TOKEN)

}

export const setTokenUser = async (userToken) => {
    await SecureStore.setItemAsync(TOKEN, userToken)
}

export const updateUser = async (user, authorizeToken) => {
    //logica de actualizar usuario
}

