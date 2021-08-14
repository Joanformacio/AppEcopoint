import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'react-native-elements'

import Maplocations from '../screens/Maplocations'
import Account from '../screens/Account'

const Tab = createBottomTabNavigator()

export default function Navigation() {
    const screenOptions = (route, color) => {
        let iconName
        switch (route.name) {
            case "maplocations":
                iconName = "map-marker"
                break;
            case "account":
                iconName = "account-arrow-right"
                break;

        }

        return (
            <Icon
                type="material-community"
                name={iconName}
                color={color}
            />
        )
    }
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="account"
                screenOptions={{
                    inactiveTintColor: "#9bbfeb",
                    activeTintColor: "#478de1"
                }}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color }) => screenOptions(route, color)
                })}
            >
                <Tab.Screen
                    name="maplocations"
                    component={Maplocations}
                    options={{ title: "Map" }}

                />
                <Tab.Screen
                    name="account"
                    component={Account}
                    options={{ title: "Account" }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
