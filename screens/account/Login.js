import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import LoginForm from '../../components/account/LoginForm'


export default function Login() {
    return (
        <KeyboardAwareScrollView>
            <Image
                source={require("../../assets/environment.jpg")}
                resizeMode="contain"
                style={styles.image}
            />
            <View>
                <LoginForm />
                <CreateAccount />
            </View>
        </KeyboardAwareScrollView>

    )
}

function CreateAccount() {
    const navigation = useNavigation()
    return (
        <Text
            style={styles.register}
            onPress={() => navigation.navigate("register")}
        >
            ¿Aún no tienes cuenta?{" "}
            <Text style={styles.bntRegister}>
                Registrate
            </Text>
        </Text>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 150,
        width: "100%",
        marginBottom: 20
    },
    container: {
        marginHorizontal: 40
    },
    divider: {
        backgroundColor: "#442484",
        margin: 40
    },
    register: {
        marginTop: 15,
        marginHorizontal: 10,
        alignSelf: "center"
    },
    bntRegister: {
        color: "#442484",
        fontWeight: "bold"
    }

})
