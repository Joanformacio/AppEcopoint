
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { isEmpty } from 'lodash'
import { Button, Input } from 'react-native-elements'

import { } from '../../service/Service'

export default function UpdateNameSurname({ user, setShowModal, toastRef, setReloadUser }) {

    if (!user) return

    const [newName, setNewName] = useState(null)
    const [newSurname, setNewSurname] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const onsubmit = async () => {

        if (!validateForm(newName, "Nombre")) {
            return
        }

        if (!validateForm(newSurname, "Apellido")) {
            return
        }

        setLoading(true)
        user.name = newName
        user.surname = newSurname
        let resultUpdate = await updateUser(user)

        setLoading(false)
        if (resultUpdate !== "service to back end") {
            setError("No se pudo actualizar el nombre")
            return
        }

        setReloadUser(true)
        toastRef.current.show("Se ha actualizado el nombre", 3000)
        setShowModal(false)

    }

    const validateForm = ({ campo, tipo }) => {
        setError(null)
        if (isEmpty(campo)) {
            setError(`Debes ingresar  ${tipo}.`)
            return false
        }

        return true

    }


    return (
        <View>
            <Input
                placeholders="Actualiza el nombre"
                containerStyle={styles.input}
                defaultValue={name}
                onChange={(e) => setNewName(e.nativeEvent.text)}
                errorMessage={error}
                rightIcon={{
                    type: "material-community",
                    name: "account-circle-outline",
                    color: "#c2c2c2"
                }}
            />
            <Input
                placeholders="Actualiza el apellido"
                containerStyle={styles.input}
                defaultValue={name}
                onChange={(e) => setNewSurname(e.nativeEvent.text)}
                errorMessage={error}
                rightIcon={{
                    type: "material-community",
                    name: "account-circle-outline",
                    color: "#c2c2c2"
                }}
            />
            <Button
                title="Cambiar Nombre"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onsubmit}
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
