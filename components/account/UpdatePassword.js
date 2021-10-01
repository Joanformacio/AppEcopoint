import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { isEmpty, size } from 'lodash'




export default function UpdatePassword({ setShowModal, toastRef }) {
    const [newPassword, setNewPassword] = useState(null)
    const [currentPassword, setCurrentPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [errorNewPassword, setErrorNewPassword] = useState(null)
    const [errorCurrentPassword, setErrorCurrentPassword] = useState(null)
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setloading] = useState(false)

    const onSubmit = async () => {
        if (!validateForm) {
            return
        }

        setloading(true)
        // aqui ponems la logica backend:
        // conprobar primero que el usuario es el correcto
        // deberemos restituir la sesion para que el usuario se loguee de nuevo
        setloading(false)

        //comprobar que la modificacion es correcta

        toastRef.current.show("Se ha actualizado tu contraseña, debes loguearte de nuevo")
        setShowModal(false)

    }


    const validateForm = () => {
        setErrorNewPassword(null)
        setErrorCurrentPassword(null)
        setErrorConfirmPassword(null)

        let isValid = true

        if (isEmpty(currentPassword)) {
            setErrorCurrentPassword("Introduce tu contraseña actual")
            isValid = false
        }

        if (size(newPassword) < 6) {
            setErrorNewPassword("Introduce un password de como minimo 6 caracteres")
            isValid = false
        }

        if (size(confirmPassword) < 6) {
            setErrorNewPassword("Introduce un password de como minimo 6 caracteres")
            isValid = false
        }

        if (newPassword !== confirmPassword) {
            setErrorNewPassword("las contraseñas deben coincidir")
            setErrorConfirmPassword("las contraseñas deben coincidir")
            isValid = false
        }

        if (newPassword === currentPassword) {
            setErrorNewPassword("Introduce una contraseña distinta a tu contraseña actual")
            setErrorConfirmPassword("Introduce una contraseña distinta a tu contraseña actual")
            isValid = false
        }

        return isValid
    }

    return (
        <View style={styles.view}>
            <Input
                placeholder="Introduce tu contraseña actual"
                containerStyle={styles.input}
                defaoultValue={currentPassword}
                onChange={(e) => setCurrentPassword(e.nativeEvent.text)}
                errorMessage={errorCurrentPassword}
                password={true}
                secureTextEntry={!showPassword}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={{ color: "#c2c2c2" }}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />
            <Input
                placeholder="Introduce tu nueva contraseña "
                containerStyle={styles.input}
                defaoultValue={newPassword}
                onChange={(e) => setNewPassword(e.nativeEvent.text)}
                errorMessage={errorNewPassword}
                password={true}
                secureTextEntry={!showPassword}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={{ color: "#c2c2c2" }}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />
            <Input
                placeholder="repite la nueva contraseña"
                containerStyle={styles.input}
                defaoultValue={confirmPassword}
                onChange={(e) => setConfirmPassword(e.nativeEvent.text)}
                errorMessage={errorConfirmPassword}
                password={true}
                secureTextEntry={!showPassword}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={{ color: "#c2c2c2" }}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />
            <Button
                title="Cambiar Contraseña"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={loading}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        paddingVertical: 10
    },
    input: {
        marginBottom: 10
    },
    btnContainer: {
        width: "95%"
    },
    btn: {
        backgroundColor: "#442484"
    }

})
