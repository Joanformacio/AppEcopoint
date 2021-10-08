import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Button, Icon } from 'react-native-elements'

export default function AddLocation() {
    return (
        <Image
            source={require('../../assets/addLocation.png')}
        />
    )
}

const styles = StyleSheet.create({
    image: {
        width: 50,
        height: 50,
        borderRadius: 100,
        opacity: .5
    },
})
