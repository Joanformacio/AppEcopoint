import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'

import { userLogin, setTokenUser } from '../../service/Service'
import Loading from '../Loading'

export default function LoginForm({ setUser, navigation, setIsLogin }) {
    const [showPassword, setShowPassword] = useState("false")
    const [formData, setFormData] = useState({ username: "", password: "" })
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [loading, setLoading] = useState(null)



    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })

    }

    const doLogear = async () => {
        let result

        if (!validateData) {
            return;
        }
        setLoading(true)

        result = await userLogin(formData).then((res) => {
            setTokenUser(res.token)
            setIsLogin(true)


        })
            .catch((err) => { setErrorEmail(err.message) })
        setUser(result)


        setLoading(false)

        navigation.navigate("account")
    }

    const validateData = () => {
        let isValid = true
        let isValidEmail = validateEmail(formData.email)
        let isValidPassword = validatePassword(formData.password)

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
                onPress={() => doLogear()}
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
