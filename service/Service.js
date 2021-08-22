
import axios from 'react-native-axios';
//import { } from '@env';

/*const NODE_ENV = process.env.NODE_ENV || 'development'
require('dotenv').config({
    path: `.env.${NODE_ENV}`
})*/

const baseURL = "http://localhost:8080/api/"


export const userLogin = async (data) => {
    let token
    try {
        token = await axios.post(baseURL + "login", data).then(res => res.data);
    } catch (error) {
        return false
    }
    return token
}






