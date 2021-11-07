import React from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import MapView from 'react-native-maps'
import AddLocation from './AddLocation'

export default function MyMap({ locations }) {
    return (
        <MapView
            style={styles.stylemap}
        >
            <MapView.Marker
                coordinate={{
                    latitude: 37.78825,
                    longitude: -122.4324
                }}
                title={"title"}
                description={"description"}
            />
            <AddLocation />
        </MapView>
    )
}

const styles = StyleSheet.create({
    stylemap: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
});

