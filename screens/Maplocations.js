import React from 'react'
import { StyleSheet, View } from 'react-native'
import MyMap from '../components/mapcomponets/MyMap'


export default function Maplocations() {
    return (
        //afegir scroll lateral
        //a aadlocation s'ha de fixar a la cantonada dreta de la pantalla
        <View style={styles.container}>
            <MyMap>

            </MyMap>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }

})
