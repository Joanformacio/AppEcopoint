
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'



const baseURL = "http://192.168.18.57:8080/api/"
const TOKEN = "token"

export const userLogin = async (data) => {


    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }

    };
    try {
        return await axios.post(baseURL + "login", data, config).then((res) => {
            const { bearer, nombreUsuario, token } = res.data

            if (token) {
                SecureStore.setItemAsync(TOKEN, JSON.stringify(token))
            }
            const responseUser = {
                bearer,
                username: nombreUsuario,
                token
            }

            return responseUser
        })
    } catch (error) {
        console.error(" when login", error)
    }



}

export const FindUser = async (user) => {

    if (user != null || user != undefined) {
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': user.bearer + user.token
            },
            timeout: 5000
        };
        try {

            const result = await axios.get(baseURL + "users", user, config)

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
        let token = await SecureStore.getItemAsync(TOKEN,).then(res => res)

        if (token) isLogged = true

    } catch (error) {
        console.error(error)

    }

    return isLogged

}

export const closeSession = async () => {

    try {
        return await SecureStore.deleteItemAsync(TOKEN).then(res => {
            console.log("close session")
        })
    } catch (error) {
        console.error("Error in close session", error)
    }

}

export const setTokenUser = async (userToken) => {
    await SecureStore.setItemAsync(TOKEN, userToken)
}

export const updateUser = async (user, authorizeToken) => {
    //logica de actualizar usuario
}

