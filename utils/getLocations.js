import * as Location from 'expo-location';

export const getCurrentLocations = async () => {
    const response = { status: false, location: { longitude: null, latitude: null, latitudeDelta: 0.001, longitudeDelta: 0.001 }, msg: "" }
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        response.msg = 'Permission to access location was denied'

        return response
    }
    response.status = status
    response.msg = 'You have acces location'
    try {
        const position = await Location.getCurrentPositionAsync({});
        response.location.latitude = position.coords.latitude
        response.location.longitude = position.coords.longitude
    } catch (error) {
        console.error(error.message)
    }


    return response

}