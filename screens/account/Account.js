import React, { useState, useCallback } from 'react'
import { StyleSheet } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { userlogin } from './../../service/Service'
import Loading from '../../components/Loading'
import UserGuest from './UserGuest'
import UserLogged from '../../components/account/UserLogged'


export default function Acount() {
    const [login, setLogin] = useState(false)

    useFocusEffect(
        useCallback(() => {
            const islogued = false
            islogued ? setLogin(true) : setLogin(false)
        }, [])
    )

    if (login == null) {
        return <Loading isVisible={true} text="cargando..." />
    }

    return login ? <UserLogged /> : <UserGuest />
}


