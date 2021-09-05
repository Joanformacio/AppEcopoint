import React, { useState, useCallback } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useFocusEffect } from '@react-navigation/native';
import { result, set } from 'lodash';
import { isUserLogged, FindUser } from '../../service/Service';
import LoginForm from '../../components/account/LoginForm'
import UserScreen from './UserScreen'



export default function Login() {
    const navigation = useNavigation()
    const [isLogin, setIsLogin] = useState(null)
    const [user, setUser] = useState()



    useFocusEffect(
        useCallback(() => {
            async function isLogged() {
                try {
                    return await isUserLogged()
                } catch (err) {
                    console.log(err.message)
                }
            }
            const result = isLogged()
            console.log("llamada desde usefocus" + result)
        }, [])
    )
    setUser(user)


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
                        <LoginForm setUser={setUser} navigation={navigation} setIsLogin={setIsLogin} />
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
