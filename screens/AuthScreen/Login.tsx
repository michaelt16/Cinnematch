import { NavigationProp } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithCredential} from "firebase/auth";
// import auth from "../../config/firebase"
// import firebase from '../../config/firebase';
import { WEB_CLIENT_ID, MOCK_PASSWORD }from "@env"
import firebase from 'firebase/app';
import 'firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {auth} from '../../config/firebase';
import * as Google from 'expo-google-app-auth'
import Home from '../UserScreen/Home/Home';
import navigation from '../../navigation';
// GoogleSignin.configure({
//   webClientId: WEB_CLIENT_ID,
// });

interface LoginProps{
 navigation :NavigationProp<any>
}
export default function LoginPage () : JSX.Element {
  const [email, setEmail] = useState('michaeltandyo@gmail.com');
  const [password, setPassword] = useState(MOCK_PASSWORD);

  // async function signInWithGoogleAsync() {
  //   try {
  //     const result = await Google.logInAsync({
  //       androidClientId: '<YOUR_ANDROID_CLIENT_ID>',
  //       iosClientId: '<YOUR_IOS_CLIENT_ID>',
  //       scopes: ['profile', 'email'],
  //     });
  
  //     if (result.type === 'success') {
        
  //       const { idToken } = result;
      
  //       const googleCredential = GoogleAuthProvider.credential(idToken);
        
  //       return signInWithCredential(auth,googleCredential);
  //     } else {
  //       return { cancelled: true };
  //     }
  //   } catch (e) {
  //     return { error: true };
  //   }
  // }
   async function handleLogin (){
    // handle login logic here
    if (email !== "" && password !== ""){
      console.log("test")
    try{
      await signInWithEmailAndPassword(auth,email,password)
    } catch (e) {
      console.log('error')
    }

  };
}

// const handleGoogleLogin =()=>{
//   console.log("login with google")
//   onGoogleButtonPress().then(() => console.log('Signed in with Google!'))
// }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email:</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />
      <Text style={styles.label}>Password:</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        
      />
      <Button title="Login" onPress={handleLogin} />

      <Button title="Sign in with Google" />

    </View>
  );

}
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginBottom: 20,
  },
});




