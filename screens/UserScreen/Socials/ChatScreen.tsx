import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import {collection, getFirestore,addDoc,getDocs} from 'firebase/firestore'
import {firestore} from "../../../config/firebase"


export default function ChatScreen(): JSX.Element {
    console.log(firestore)
    const [chatInput,setChatInput] = useState({
        sender:"",
        message:"",
        timestamp: new Date()
    })
    const usersCollection = collection(firestore,'Chat')
    

    const getCollectionData = async () => {
        try{
            const snapshot = await getDocs(usersCollection);
            const data = snapshot.docs.map(doc => doc.data())
            console.log("test",data);
        }catch(e){
            console.error(e)
        }
      };
      
      getCollectionData();
   
    const handleInputChange = (text:string) => {
        setChatInput(prevState => ({
          ...prevState,
          message: text
        }));
      }
    console.log(chatInput)
    const sendMessage = async (e: { preventDefault: () => void; })=>{
        e.preventDefault()
        try{
            await addDoc (usersCollection,chatInput)
        }catch(e){
            console.log("error")
        }
        
    }   
    return(
       <View>
        <Text>CHat</Text>
            <TextInput 
            value={chatInput.message}
            onChangeText={handleInputChange}
            style={styles.input}
            ></TextInput>
            
            <Button title="SendChat" onPress={sendMessage} />
       </View>
    )
}
const styles = StyleSheet.create({


    input:{
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
        marginBottom: 20,
    }
    
})