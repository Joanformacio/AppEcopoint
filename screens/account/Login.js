import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useFocusEffect } from '@react-navigation/native';

import { isUserLogged } from '../../service/Service';
import LoginForm from '../../components/account/LoginForm'
import UserScreen from './UserScreen'



export default function Login() {
    const navigation = useNavigation()
    const [isLogin, setIsLogin] = useState(null)
    const [user, setUser] = useState({
        bearer: "",
        token: "",
        username: ""
    })


    console.log(user)
    useFocusEffect(
        useCallback(() => {
            async function getUserLogged() {
                try {
                    const res = await isUserLogged().then(res => res)

                    setIsLogin(res)

                } catch (error) {
                    console.error(error)
                }
            }
            try {
                getUserLogged()

            } catch (error) {
                console.error("No esta logueado", error)
            }


        }, [])

    )



    return (
        <KeyboardAwareScrollView>
            <Image
                source={require("../../assets/environment.jpg")}
                resizeMode="contain"
                style={styles.image}
            />
            <View>
                {
                    isLogin ? <UserScreen user={user} navigation={navigation} setIsLogin={setIsLogin} /> :
                        <LoginForm setUser={setUser} user={user} navigation={navigation} />
                }

                <CreateAccount />
            </View>
        </KeyboardAwareScrollView>

    )
}

function CreateAccount() {

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
