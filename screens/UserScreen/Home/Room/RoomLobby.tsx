import React, { useEffect, useState } from "react";
import { NavigationProp, PreventRemoveContext } from '@react-navigation/native';
import { View, Text, TextInput, Button, StyleSheet, Dimensions } from 'react-native';
import CheckBox from 'expo-checkbox';
import axios from "axios";
import {API_KEY} from "@env"
import { TouchableOpacity } from "react-native";
import {firestore} from "../../../../config/firebase"
import { useUser } from '../../../../utils/MyContext';
import {collection, getFirestore,addDoc,getDocs, DocumentData, query, orderBy, Timestamp,setDoc} from 'firebase/firestore'
import { ScrollView } from "react-native-gesture-handler";


export default function RoomLobby ({navigation}:NavigationProp<any>) : JSX.Element {
    return(
        <View>
            
        </View>
    )

}