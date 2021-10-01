import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'

import { userLogin } from '../../service/Service'
import Loading from '../Loading'

export default function LoginForm({ navigation }) {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({ username: "", password: "" })
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [loading, setLoading] = useState(null)




    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })

    }

    const doLogear = async () => {


        if (!validateData) {
            return;
        }
        setLoading(true)

        try {

            await userLogin(formData).then(res => res)

        } catch (error) {

            console.log(error.message)
        }
        console.log("loginform")
        setLoading(false)


        navigation.navigate("userGuest")
    }

    const validateData = () => {
        let isValid = true
        let isValidEmail = isValidateEmail(formData.username)
        let isValidPassword = isValidatePassword(formData.password)

        if (!isValidEmail.isValid) {
            setErrorEmail(isValidEmail.message)
            isValid = isValidEmail.isValid
        }

        if (!isValidPassword.isValid) {
            setErrorPassword(isValidPassword.message)
            isValid = isValidPassword.isValid
        }

        return isValid
    }



    return (
        <View style={styles.container}>
            <Input
                containerStyle={styles.input}
                placeholder="Ingresa tu email..."
                onChange={(e) => onChange(e, "username")}
                keyboardType="email-address"
                errorMessage={errorEmail}
                defaultValue={formData.email}
            />
            <Input
                containerStyle={styles.input}
                placeholder="Ingresa tu contraseña..."
                onChange={(e) => onChange(e, "password")}
                errorMessage={errorPassword}
                defaultValue={formData.password}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.icon}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />

            <Button
                title="Sing In.."
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={doLogear}
            />
            <Loading isVisible={loading} text="Iniciando Sesión..." />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30
    },
    input: {
        width: "100%"
    },
    btnContainer: {
        marginTop: 20,
        width: "95%",
        alignSelf: "center"
    },
    btn: {
        backgroundColor: "#442484"
    },
    icon: {
        color: "#c1c1c1"
    }
})
