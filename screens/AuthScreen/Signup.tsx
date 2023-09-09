import React, { useState } from"react"
import { Text, TextInput, View } from "react-native"

export default function Login():JSX.Element{

    const [email, setEmail]= useState('Email')
    const [password, setPassword]= useState('Password')
    return(
        <View>

            <Text>Signup</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
            ></TextInput>
              <TextInput
                value={password}
                onChangeText={setPassword}
            ></TextInput>
        </View>
    )
} 