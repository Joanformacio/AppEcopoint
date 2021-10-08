import { View, Text, StyleSheet } from 'react-native'
import MapView from 'react-native-maps'

export default function MyMap({ locations }) {
    return (
        <MapView
            style={styles.stylemap}
        >
            <MapView.Marker />
        </MapView>
    )
}

const styles = StyleSheet.create({
    stylemap: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});

