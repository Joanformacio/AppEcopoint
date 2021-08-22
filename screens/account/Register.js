import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function Register() {
    return (
        <KeyboardAwareScrollView>
            <Image
                source={require("../../assets/environment.jpg")}
            />
            <RegisterUserForm />
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 150,
        width: "100%",
        marginTop: 20
    }
})
