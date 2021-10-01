import React, { useState, useRef, useCallback, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-easy-toast'

import UserLogged from '../../components/account/UserLogged'
import AccountOptions from '../../components/account/AccountOptions'
import { closeSession, FindUser, getCurrentUser } from './../../service/Service';

const initialUser = {
    username: "",
    token: ""
}

const initialDataUser = {
    id: "",
    username: "",
    name: "",
    surname: "",
    avatar: ""
}

export default function UserScreen({ navigation }) {
    const toastRef = useRef()

    const [loading, setLoading] = useState(false)
    const [loadingText, setLoadingText] = useState("")
    const [reaload, setReload] = useState(false)
    const [currentUser, setCurrentUser] = useState(initialUser)
    const [dataUser, setDataUser] = useState(initialDataUser)


    const toCloseSessionuser = () => {

        try {
            closeSession().then(res => res)
            navigation.navigate("userGuest")

        } catch (error) {
            console.error(error)
        }

    }
    const getUserLogged = async () => {
        return await getCurrentUser().then((current) => {
            const { nombreUsuario: username, token } = current
            setCurrentUser(prevCurrent => ({ ...prevCurrent, username, token }))
        })
        return
    }

    const getDataUser = useCallback(async () => {
        return await FindUser(currentUser).then((user) => {

            const { avatar, username, name, surname, id } = user.data
            setDataUser({ ...dataUser, avatar, username, name, surname, id })

        })


    })

    useEffect(() => {
        try {
            getUserLogged()
        } catch (error) {
            console.error(error.message)
        }

    }, [])

    useEffect(() => {
        try {
            getDataUser()
        } catch (error) {
            console.error(error.message)
        }

    }, [currentUser?.username])




    return (
        <View style={styles.container}>
            {
                dataUser && (
                    <View>
                        <UserLogged
                            dataUser={dataUser}
                            setLoading={setLoading}
                            setLoadingText={setLoadingText}
                        />
                        <AccountOptions
                            dataUser={dataUser}
                            toastRef={toastRef}
                            setReload={setReload}
                        />
                    </View>
                )
            }
            <Button
                title="Cerrar Sesion"
                buttonStyle={styles.btnCloseSession}
                titleStyle={styles.btnCloseSessionTitle}
                onPress={toCloseSessionuser}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: "100%",
        backgroundColor: "#f9f9f9"
    },
    btnCloseSession: {
        marginTop: 30,
        borderRadius: 5,
        backgroundColor: "#FFFFFF",
        borderTopWidth: 1,
        borderTopColor: "#442484",
        borderBottomWidth: 1,
        borderBottomColor: "#442484",
        paddingVertical: 10
    },
    btnCloseSessionTitle: {
        color: "#442484"
    }
})