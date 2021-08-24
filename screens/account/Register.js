import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RegisterUserForm from '../../components/account/RegisterUserForm'

export default function Register() {
    return (
        <KeyboardAwareScrollView>
            <Image
                source={require("../../assets/environment.jpg")}
                resizeMode="contain"
                style={styles.image}
            />
            <RegisterUserForm />
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 150,
        width: "100%",
        marginBottom: 10,
        marginTop: 10
    }
})
