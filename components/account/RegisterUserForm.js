import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import validateemail from '../../validations/ValidateEmail'

export default function RegisterUserForm() {
    const [showPassword, setShowPassword] = useState("false")
    const [formData, setFormData] = useState(initialsValues)

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.value })
    }

    return (
        <View>

        </View>
    )
}

const initialsValues = () => {
    return { email: "", password: "", confirm: "" }
}

const styles = StyleSheet.create({})
