import React, { useState, useRef, useCallback, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import Toast from 'react-native-easy-toast'

import Loading from '../../components/Loading'
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
    const [realoadUser, setReloadUser] = useState(false)
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
        const current = await getCurrentUser().then(res => res)
        const { nombreUsuario: username, token } = current
        setCurrentUser(prevCurrent => ({ ...prevCurrent, username, token }))
        return
    }

    const getDataUser = useCallback(async () => {
        try {
            const user = await FindUser(currentUser).then(res => res)
            if (user.status === 200) {
                setDataUser(prevDataUser => ({ ...prevDataUser, ...user.data }))
            }


        } catch (error) {
            console.error(error.message)
        }


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
                            setReloadUser={setReloadUser}
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
            <Toast ref={toastRef} position="center" opacity={0.9} />
            <Loading isVisible={loading} text={loadingText} />
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