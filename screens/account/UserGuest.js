import React from 'react'
import { StyleSheet, ScrollView, Text, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Button } from 'react-native-elements'

export default function UserGuest() {
    const navigation = useNavigation()

    return (
        <ScrollView
            centerContext
            style={styles.viewBody}
        >
            <Image
                source={require("./../../assets/environment.jpg")}
                resizaMode="contain"
                style={styles.image}
            />
            <Text style={styles.title}>Consulta tu perfil</Text>
            <Button
                style={styles.button}
                title="Ver tu perfil"
                onPress={() => navigation.navigate("login")}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        marginHorizontal: 30
    },
    image: {
        height: 150,
        width: 150,
        marginBottom: 10,
        marginTop: 30,
        marginHorizontal: 100,
    },
    title: {
        fontWeight: "bold",
        fontSize: 19,
        marginVertical: 10,
        textAlign: "center"
    },
    button: {
        backgroundColor: "#442484"
    }
})
