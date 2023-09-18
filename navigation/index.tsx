import React from "react"
import UserStack from "./userStack"
import AuthStack from "./authStack"
import{useAuth} from "../hooks/useAuth"
import { UserContext } from "../utils/MyContext";

export default function RootNavigation() : JSX.Element {
    const { user } = useAuth();
    console.log(user)
    
    return (
        <UserContext.Provider value={user}>
            {user ? <UserStack/> : <AuthStack/>}
        </UserContext.Provider>
    );
   
}