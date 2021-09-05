import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Button, Icon, Input } from 'react-native-elements'
import { validateEmail, validatePassword, validateConfirm } from '../../validations/ValidatesForm'
import { Registrar } from '../../service/Service'
import Loading from '../Loading'

export default function RegisterUserForm() {
    const [showPassword, setShowPassword] = useState("false")
    const [formData, setFormData] = useState(initialsValues)
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [errorNewuser, setErrorNewuser] = useState("")
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation()

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })

    }

    const doRegistrar = async () => {
        const newUser = {
            username: null,
            password: null
        }

        if (!validateData) {
            return;
        }

        newUser.username = formData.username
        newUser.password = formData.password

        setLoading(true)

        const result = await Registrar(newUser)
        if (!result) {
            setErrorNewuser(result.error)
            return
        }
        setLoading(false)
        navigation.navigate("account", { screen: "userGuest" })
    }

    const validateData = () => {
        let isValid = true
        let isValidEmail = validateEmail(formData.username)
        let isValidPassword = validatePassword(formData.password)
        let isValidConfirm = validateConfirm(formData.confirm, formData.password)
        if (!isValidEmail.isValid) {
            setErrorEmail(isValidEmail.message)
            isValid = isValidEmail.isValid
        }

        if (!isValidPassword.isValid) {
            setErrorPassword(isValidPassword.message)
            isValid = isValidPassword.isValid
        }

        if (!isValidConfirm.isValid) {
            setErrorConfirm(isValidConfirm)
            isValid = isValidConfirm.isValid
        }

        return isValid
    }

    return (
        <View style={styles.form}>
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
            <Input
                containerStyle={styles.input}
                placeholder="Confirma tu contraseña..."
                onChange={(e) => onChange(e, "confirm")}
                errorMessage={errorPassword}
                defaultValue={formData.confirm}
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
                title="Registrar Nuevo Usuario"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                errorMessage={errorNewuser}
                onPress={() => doRegistrar()}
            />
            <Loading isVisible={loading} text="registrando usuario..." />
        </View>
    )
}

const initialsValues = () => {
    return { username: "", password: "", confirm: "" }
}

const styles = StyleSheet.create({
    form: {
        marginTop: 30
    },
    input: {
        marginTop: 15,
        width: "95%",
        alignSelf: "center"
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
