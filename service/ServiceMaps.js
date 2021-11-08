import axios from 'axios'

const baseURL = "http://192.168.18.57:8080/api/"

export const getallLocations= async()=>{
    try {
        const dataLocations = await axios.post(baseURL + "login", data, config)

        const locations = dataLocations.data

        return locations

    } catch (error) {
        console.error(" when get all locations", error)
    }
}

export const saveImageLocation = async(Image){
    try {
        const res = await axios.post(baseURL+ "urlsaveimage",Image)
    } catch (error) {
        console.error(" when save image", error)
    }
    
    if (res!=null){
        console.log(res.data)
        return res.data
    } 
}
