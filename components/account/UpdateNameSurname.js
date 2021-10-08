
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Input } from 'react-native-elements'

import { validateNameSurname, validateCompareSameName } from '../../validations/ValidatesForm'
import { updateUser, getCurrentUser } from '../../service/Service'

export default function UpdateNameSurname({ dataUser, setShowModal, toastRef, setReloadUser }) {

    if (!dataUser) return

    const [newName, setNewName] = useState("")
    const [newSurname, setNewSurname] = useState(dataUser.surname)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    let resultUpdate = null

    const onSubmit = async () => {

        const confirmIsvalidNameSurname = validateNameSurname(newName, newSurname)
        const compareOldNewName = validateCompareSameName(dataUser.name, newName)

        if (!confirmIsvalidNameSurname.isValid) {
            setError(null)
            setError(confirmIsvalidNameSurname.message)
            return
        }

        if (!compareOldNewName.isValid) {
            setError(null)
            setError(compareOldNewName.message)
            return
        }

        setLoading(true)
        dataUser.name = newName
        dataUser.surname = newSurname
        try {
            const userlogged = await getCurrentUser()
            const { token } = userlogged
            resultUpdate = await updateUser(dataUser, token)

        } catch (error) {
            setError(error.message)
        }


        setLoading(false)
        if (!resultUpdate) {
            setError("No se pudo actualizar nombre y apellido")
            return
        }

        setReloadUser(true)
        toastRef.current.show("Se ha actualizado nombre y apellidos", 3000)
        setShowModal(false)

    }




    return (
        <View>
            <Input
                placeholders="Actualiza el nombre"
                containerStyle={styles.input}
                defaultValue={dataUser.name}
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
                defaultValue={dataUser.surname}
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
