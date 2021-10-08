import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'
import { map } from 'lodash'

import Modal from '../Modal'
import UpdateNameSurname from './UpdateNameSurname'
import UpdatePassword from '../account/UpdatePassword'


export default function AccountOptions({ dataUser, toastRef, setReloadUser }) {
    const [showModal, setShowModal] = useState(false)
    const [renderComponent, setRenderComponent] = useState(null)

    const generateOptions = () => {
        return [
            {
                title: "Change your name and surname",
                iconNameLeft: "account-circle",
                iconColorLeft: "#a7bfd3",
                iconNameRight: "chevron-right",
                iconColorRight: "#a7bfd3",
                onPress: () => selectedComponent("namesurname")

            },
            {
                title: "Change your password",
                iconNameLeft: "account-circle",
                iconColorLeft: "#a7bfd3",
                iconNameRight: "chevron-right",
                iconColorRight: "#a7bfd3",
                onPress: () => selectedComponent("password")

            },

        ]
    }



    const selectedComponent = (key) => {
        switch (key) {
            case "namesurname":
                setRenderComponent(
                    <UpdateNameSurname
                        dataUser={dataUser}
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                        setReloadUser={setReloadUser}

                    />
                )
                break;

            case "password":
                setRenderComponent(
                    <UpdatePassword
                        dataUser={dataUser}
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                        setReloadUser={setReloadUser}
                    />
                )
                break;
        }
        setShowModal(true)
    }

    const menuOptions = generateOptions()
    return (
        <View>
            {
                map(menuOptions, (menu, index) => (
                    <ListItem
                        key={index}
                        style={styles.menuItem}
                        onPress={menu.onPress}
                    >
                        <Icon
                            type="material-community"
                            name={menu.iconNameLeft}
                            color={menu.iconColorLeft}
                        />
                        <ListItem.Content>
                            <ListItem.Title>{menu.title}</ListItem.Title>
                        </ListItem.Content>
                        <Icon
                            type="material-community"
                            name={menu.iconNameRight}
                            color={menu.iconColorRight}
                        />
                    </ListItem>
                ))
            }

            <Modal isVisible={showModal} setVisible={setShowModal}>
                {
                    renderComponent
                }
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    menuItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#a7bfd3"
    }
})
