import * as ImagePicker from 'expo-image-picker';
import { camera } from 'expo-camera';
import { Alert } from 'react-native'


export const loadImageFromGallery = async (array) => {
    const response = { status: false, image: null }

    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: array
    })
    if (result.cancelled) {
        return response
    }
    response.status = true
    response.image = result.uri
    return response
}