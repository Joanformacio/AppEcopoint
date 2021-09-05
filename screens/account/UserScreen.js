import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Button } from 'react-native-elements'
import Toast from 'react-native-easy-toast'

import UserLogged from '../../components/account/UserLogged'
import AccountOptions from '../../components/account/AccountOptions'
import { closeSession, FindUser } from './../../service/Service';

export default function UserScreen({ user, navigation, setIsLogin }) {
    const toastRef = useRef()

    const [loading, setLoading] = useState(false)
    const [loadingText, setLoadingText] = useState("")
    const [reaload, setReload] = useState(false)
    const [foundDataUser, setFoundDataUser] = useState();

    const toCloseSessionuser = () => {
        try {
            closeSession()
            setIsLogin(false)
        } catch { (console.error()) }


    }

    useEffect(() => {
        if (user !== null) {
            const getUser = async () => {
                await FindUser(user).then(res => {
                    if (res != null) { setFoundDataUser(res) }
                })
            }
            getUser()
        }

    }, [])

    return (
        <View style={styles.container}>
            {
                user && (
                    <View>
                        <UserLogged
                            foundDataUser={foundDataUser}
                            setLoading={setLoading}
                            setLoadingText={setLoadingText}
                        />
                        <AccountOptions
                            user={user}
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