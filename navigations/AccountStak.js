import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import UserScreen from '../screens/account/UserScreen'
import Login from '../screens/account/Login'
import Register from '../screens/account/Register'
import UserGuest from '../screens/account/UserGuest'

//import RecoverPassword from '../screens/account/RecoverPassword'

const Stack = createStackNavigator()

export default function AccountStack() {
    return (
        <Stack.Navigator
            initialRouteName="userGuest"
        >
            <Stack.Screen
                name="userGuest"
                component={UserGuest}
                options={{ title: "Iniciar Sesión" }}
            />
            <Stack.Screen
                name="login"
                component={Login}
                options={{ title: "Login" }}
            />
            <Stack.Screen
                name="register"
                component={Register}
                options={{ title: "Registrar Usuario" }}
            />
            <Stack.Screen
                name="userscreen"
                component={UserScreen}
                options={{ title: "Usuario" }}
            />

        </Stack.Navigator>
    )
}
