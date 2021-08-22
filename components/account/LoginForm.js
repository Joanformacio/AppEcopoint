import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { userLogin } from '../../service/Service'

import Loading from '../Loading'

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState("false")
    const [formData, setFormData] = useState(initialsValues)
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation()

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.value })
    }

    const doLogear = () => {

        if (!validateData) {
            return;
        }
        setLoading(true)
        let isLogin = userLogin(formData)
        setLoading(false)

        if (!isLogin) {
            setErrorEmail("This user is not registar")
            return
        }

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
                onChange={(e) => onChange(e, "email")}
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
                title="Logger"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={() => doLogear()}
            />
            <Loading isVisible={loading} text="Iniciando Sesión..." />
        </View>
    )
}
const initialsValues = () => {
    return { email: "", password: "" }
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
