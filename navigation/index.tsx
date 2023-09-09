import React from "react"
import UserStack from "./userStack"
import AuthStack from "./authStack"
import { Text, View } from "react-native"
import app from '../config/firebase';
import{useAuth} from "../hooks/useAuth"

export default function RootNavigation() : JSX.Element {
    const { user } = useAuth();
    console.log(user)
    
    return user ? <UserStack/> : <AuthStack/> 
   
}