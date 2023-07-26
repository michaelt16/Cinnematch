import { Dimensions,View,Text,Image, StyleSheet, Button, Pressable, StatusBar } from "react-native";
import React, { useState, useContext } from 'react';
import { textSpanEnd } from "typescript";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faWindowMaximize, faStar, faTicket, faQrcode, faUser} from "@fortawesome/free-solid-svg-icons";
import { TouchableOpacity } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import MyContext from "../utils/MyContext";

interface MovieData {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }


  interface NavBarProps {
    // favorites: MovieData[];
    navigation: NavigationProp<any>;
  }

export default function NavBar ({ navigation }: NavBarProps): JSX.Element{
    
    const favorites = useContext(MyContext);

    const handleBrowse = ()=>{
        navigation.navigate("Card")
    }

    const handleFavorites = ()=> {
        console.log("handling favorites")
        navigation.navigate('Favorites',{favorites:favorites})
    }
    const handleNowPlaying = ()=>{
        navigation.navigate('NowPlaying',{favorites:favorites})
    }

    const handleProfile = () =>{
        navigation.navigate('Profile',{favorites:favorites})
    }

    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={handleBrowse}>
            <View style={styles.labelContainer} >
                <FontAwesomeIcon style={styles.icon}icon={faWindowMaximize} size={25}></FontAwesomeIcon>
                <Text style={styles.text}>Browse</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleFavorites}> 
            <View style={styles.labelContainer}>
                <FontAwesomeIcon style={styles.iconFavorites} icon={faStar}size={25}></FontAwesomeIcon>
                <Text style={styles.text}>Favorites</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNowPlaying}>
            <View style={styles.labelContainer}>
                <FontAwesomeIcon style={styles.iconTicket} icon={faTicket}size={25}></FontAwesomeIcon>
                <Text style={styles.text}>Now Playing</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleProfile}>
            <View style={styles.labelContainer}>
                <FontAwesomeIcon style={styles.iconScan} icon={faQrcode}size={25}></FontAwesomeIcon>
                <Text style={styles.text}>Scan</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleProfile}>
            <View style={styles.labelContainer}>
                <FontAwesomeIcon style={styles.icon} icon={faUser}size={25}></FontAwesomeIcon>
                <Text style={styles.text}>Profile</Text>
            </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection:"row",
        borderBottomWidth:4,
      },
    
    labelContainer:{
        alignContent:"space-between",
        padding:12,
    },
    text:{
        color:"#a4a4a4",
        
        fontSize:13
    },  
    icon:{
        color:"#a4a4a4",
        position:"relative",
        marginLeft:7
        
    },
    iconFavorites:{
        color:"#a4a4a4",
        position:"relative",
        marginLeft:12
        
    },
    iconTicket:{
        color:"#a4a4a4",
        position:"relative",
        marginLeft:20
        
    },
    iconScan:{
        color:"#a4a4a4",
        position:"relative",
        marginLeft:2
    }

})