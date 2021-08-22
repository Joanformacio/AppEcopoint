import React, { useState } from 'react'
import { StyleSheet, Text, View, _View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Botton } from 'react-native-elements'

export default function UserLogged() {
    const navigation = useNavigation()

    const [loading, setLoading] = useState(false)
    const [loadingText, setLoadingText] = useState("")
    const [user, setUser] = useState(null)
    const [reaload, setReload] = useState(false)

    return (
        <View style={styles.container}>
            {
                user && (
                    <View>
                        info user
                    </View>

                )
            }
            <Botton
                title="Cerrar Sesion"
                buttonStyle={styles.btnCloseSession}
                titleStyle={styles.btnCloseSessionTitle}
                onPress={() => { navigation.navigate("maplocations") }}
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
