import React from 'react'
import { StyleSheet, Image } from 'react-native'



export default function AddLocation() {
    return (
        <Image
            style={styles.iconlocation}
            source={require('./../../assets/addlocation.png')}
        />
    )
}

const styles = StyleSheet.create({
    iconlocation: {
        width: 40,
        height: 40,
        borderRadius: 100,
        bottom: 80,
        right: 20,
        opacity: 0.7,
        position: "absolute",
    },
})
