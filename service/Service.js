
import axios from 'axios'



const baseURL = "http://localhost:8080/api/"


export const userLogin = async (data) => {
    var config = {
        headers: { 'Content-Type': 'application/json' },
        timeout: 5000
    };

    let result

    result = await axios.post(baseURL + "login", data, config)
        .then(res => res.data)
        .catch(err => console.log(err))
    //console.log(result)

    return result
}

export const Registrar = async (data) => {
    let result
    try {
        result = await axios.post(baseURL + "users", data).then(res => res.data);
        console.log(result);
    } catch (error) {
        return error
    }
    return result
}






