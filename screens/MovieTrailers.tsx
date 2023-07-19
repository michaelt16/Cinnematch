import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { View, Text, StyleSheet, Image,ScrollView,Dimensions} from 'react-native';
import {API_KEY} from "@env"
import YoutubePlayer from 'react-native-youtube-iframe';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
interface TrailerProps{
    route:{
        params:{
            title:string,
            id:Number
        }
    }
}

const youtubeLink = "https://www.youtube.com/watch?v="

export default function MovieTrailers({route}:TrailerProps):JSX.Element{
    const {id}= route.params
    const [youtubeId, setYoutubeId]= useState(String)
    const [videoType,setVideoType]=useState(String)
    useEffect(()=>{
        axios
        .get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`)
        .then((resp) => resp.data)
        .then((data) => {
          for ( let i = 0 ; i < data.results.length ; i++ ){
           
            if(data.results[i].type ==="Trailer"){
                setVideoType(data.results[i].name)
                console.log(`${youtubeLink}${data.results[i].key}`)
                setYoutubeId(data.results[i].key)
                return;
            }
          }
        });
    })
    
    return(
        <View style={styles.container}>
            <View style={styles.topArea}>
                <Text style={styles.textColor}><FontAwesomeIcon  icon={faArrowLeft} size={32} color="#b4b4b4" /></Text>
                
            </View>
            <YoutubePlayer  
             height={200}
             play={true}
             videoId={youtubeId}
             />

             <View style={styles.middleArea}> 
                <Text style={styles.textColor}>{route.params.title} - {videoType}</Text>
             </View>

             <View style={styles.bottomArea}> 
                <Text style={[styles.textColor,styles.textBorder]}> Overview</Text>
                <Text style={[styles.textColor,styles.textBorder]}> Genres</Text>
                <Text style={[styles.textColor,styles.textBorder]}> Top Cast</Text>
               
             </View>
            
        </View>
    )
    
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "#161213",
    },
    textColor:{
        color:"white"
    },
    topArea:{
        padding:20,
        flexDirection:'row',
        alignContent:'space-between'
    },
    middleArea:{
        padding:20,
        backgroundColor:"#221e1f",
        borderBottomColor:"#272727",
        borderBottomWidth:2
        
        
    },
    bottomArea:{
        padding:20,
        backgroundColor:"#221e1f",
        borderBottomColor:"#272727",
        borderBottomWidth:2,
        flexDirection:'row',
        
    },
    textBorder:{
        borderColor:"#b8b7b7",
        borderWidth:2,
        borderRadius:10,
        padding:15,
        width:200,
        overflow:'scroll',
        marginRight:20
    }

})

