import { result } from 'lodash'
import React, { useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import { loadImageFromGallery } from '../../logic/ChangeAvatar'




export default function UserLogged(foundDataUser, setLoading, setLoadingText) {

    const changeAvatarUser = async () => {
        const result = await loadImageFromGallery([1, 1]).then(result => result)
            .catch(console.error("error en load avatar"));
        if (result) {

        }

    }


    return (
        <View>
            <Avatar
                rounded
                size="large"
                onPress={changeAvatarUser}
                source={
                    foundDataUser.avatar ? { uri: foundDataUser.avatar } : require("../../assets/avatar-default.jpg")
                }
            />
            <View style={styles.infoUser}>
                <Text>
                    {
                        foundDataUser.name ? foundDataUser.name : "anónimo"
                    }
                </Text>
                <Text>{foundDataUser.username}</Text>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#f9f9f9",
        paddingVertical: 30
    },
    infoUser: {
        marginLeft: 20
    },
    infoName: {
        fontWeight: "bold",
        paddingBottom: 5
    }
})
