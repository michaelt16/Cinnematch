import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Button, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import {collection, getFirestore,addDoc,getDocs, DocumentData, query, orderBy, Timestamp} from 'firebase/firestore'
import {firestore} from "../../../config/firebase"
import { useUser } from '../../../utils/MyContext';
import { faPaperPlane} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

interface Chat{
    sender:string,
    message:string,
    timestamp:Timestamp
}
export default function ChatScreen(): JSX.Element {
    console.log("USER:",useUser().email)
    const [chatInput,setChatInput] = useState({
        sender:useUser().email,
        message:"",
        timestamp: Timestamp.now()
    })
    const [chatData,setChatData] =useState<DocumentData[]>([])
    const usersCollection = collection(firestore,'Chat')
    const sendMessage = async (e: { preventDefault: () => void; })=>{
        e.preventDefault()
        const timestamp = Timestamp.now()

        const chatInputWithTimeStamp ={
            ...chatInput,
            timestamp
        }
        console.log("sending message")
        try{
            await addDoc (usersCollection,chatInputWithTimeStamp)
            getCollectionData()
        }catch(e){
            console.log("error")
        }
        
    }   
    const getCollectionData = async () => {
        try{
            const snapshot = await getDocs(query(usersCollection, orderBy('timestamp', 'asc')));
            const data = snapshot.docs.map(doc => doc.data())
            setChatData(data)
            return data
           
            
        }catch(e){
            console.error(e)
        }
      };

      useEffect(()=>{
        getCollectionData()
    },[]) 

    const handleInputChange = (text:string) => {
        setChatInput(prevState => ({
          ...prevState,
          message: text
        }));
      }
    console.log(chatInput)
    const handleCss = (chat:DocumentData,styles: any)=>{
        if(useUser().email === chat.sender){
            return styles.myTextBubble
        }else{
           
            return styles.theyTextBubble
        }
    }
    
    return(
       <View style={styles.container}>
            <View style={styles.topArea}>
                <Text style={styles.textColor} >Chat</Text>
            </View>
            <ScrollView style={styles.chatContainer} >
            {chatData.map((chat, index) => {
                
                return(
                    <Text style={[styles.textColor,handleCss(chat,styles)]}key={index}>{chat.message}</Text>
                )
            })}
        </ScrollView>
        
        <TextInput 
            value={chatInput.message}
            onChangeText={handleInputChange}
            style={styles.input}
        ></TextInput>
         <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                <FontAwesomeIcon style={styles.textColor} icon={faPaperPlane}size={25}></FontAwesomeIcon> 
        </TouchableOpacity>
       
        
       </View>
    )
}
const styles = StyleSheet.create({
    container:{
        backgroundColor: "#161213",
        
    },
     
    textColor:{
        color:"#e7e7e7",
    },
    topArea:{
        padding:20,
        borderBottomColor:"black",
        borderBottomWidth:3
    },
    myTextBubble:{
        margin:10,
        padding:10,
        backgroundColor:"red",
        alignSelf: 'flex-end',
        borderRadius:10,
        borderBottomRightRadius:2,
        
        
    },
    theyTextBubble:{
        margin:10,
        padding:10,
        backgroundColor:"blue",
        borderRadius:10,
        borderBottomLeftRadius:2,
        alignSelf:"flex-start"
    },
    chatContainer:{
        height:600
    }, 

    input:{
        borderWidth: 1,
        borderColor: "#221e1f",
        width:340,
        marginLeft:8,
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
        marginBottom: 45,
        backgroundColor:"#221e1f",
        color:"#e7e7e7",
    },

    sendButton:{
        position:"absolute",
        color:"white",
        top:675,
        left:310
    }
    
})