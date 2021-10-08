import * as ImagePicker from 'expo-image-picker';
import { camera } from 'expo-camera';
import { Alert } from 'react-native'


export const loadImageFromGallery = async (array) => {
    const response = { status: false, url: null }

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return response
    }

    const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: array
    })



    if (result.cancelled) {
        return response
    } else {
        response.status = true
        response.url = result
    }

    return response
}