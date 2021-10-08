
import React, { useState, useEffect } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import { result } from 'lodash'
import { loadImageFromGallery } from '../../logic/getImagePhone'
import { getAvatarUser } from '../../service/Service'




export default function UserLogged({ dataUser, setLoading, setLoadingText }) {
    const { avatar, username, name, surname, id } = dataUser
    const [urlavatar, setUrlavatar] = useState(null)

    let urlStorage = "file:///data/user/0/host.exp.exponent/cache/ExperienceData/UNVERIFIED-192.168.18.57-ecopoint/ImagePicker/"
    const params = { userAvatar: avatar, username }

    /*useEffect(() => {
        const getImageavatar = async () => {
            const imageAvatar = await getAvatarUser(params).then(res => res)
            console.log(imageAvatar)
        }
        getImageavatar()
    }, [])*/

    const loadAvatarUser = async () => {
        try {
            let result = await loadImageFromGallery([1, 1]).then(result => result)

            const { status, url } = result

            if (!status) {
                return
            }
            setLoadingText(prevText => { prevText, "Actualizando imagen.." })
            setUrlavatar(prevurl => ({ prevurl, ...url }))
            console.log(urlavatar)

        } catch (error) {
            console.error(error)
        }


    }


    return (
        <View style={styles.container}>
            <Avatar
                rounded
                size="large"
                onPress={loadAvatarUser}
                source={
                    urlavatar ? { uri: urlavatar.uri } : require("../../assets/avatar-default.jpg")
                }
            />
            <View style={styles.infoUser}>
                <Text style={styles.infoName}>
                    {
                        name ? name : "anónimo"
                    }
                </Text>
                <Text>{username}</Text>
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
