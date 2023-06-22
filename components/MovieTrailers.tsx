import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { View, Text, StyleSheet, Image,ScrollView,Dimensions} from 'react-native';
import {API_KEY} from "@env"
import YoutubePlayer from 'react-native-youtube-iframe';
interface TrailerProps{
    route:{
        params:{
            id:Number
        }
    }
}

const youtubeLink = "https://www.youtube.com/watch?v="

export default function MovieTrailers({route}:TrailerProps):JSX.Element{
    const {id}= route.params
    const [youtubeId, setYoutubeId]= useState(String)
    useEffect(()=>{
        axios
        .get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`)
        .then((resp) => resp.data)
        .then((data) => {
          for ( let i = 0 ; i < data.results.length ; i++ ){
            if(data.results[i].type ==="Trailer"){
                console.log(`${youtubeLink}${data.results[i].key}`)
                setYoutubeId(data.results[i].key)
                return;
            }
          }
        });
    })
    
    return(
        <View>
            <YoutubePlayer  
             height={300}
             play={true}
             videoId={youtubeId}

             />
            
        </View>
    )
    
}

