import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { View, Text, StyleSheet, Image,ScrollView,Dimensions, Touchable} from 'react-native';
import {API_KEY} from "@env"
import YoutubePlayer from 'react-native-youtube-iframe';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { TouchableOpacity } from 'react-native';

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
  
  interface CreditsData {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
  }
  
interface TrailerProps{
    route:{
        params:{
           movieData: MovieData
        }
    }
}
const imageLink = "https://image.tmdb.org/t/p/original/"
const youtubeLink = "https://www.youtube.com/watch?v="

export default function MovieTrailers({route}:TrailerProps):JSX.Element{
    const id: number = route.params.movieData.id
    console.log(id)
    const title:string = route.params.movieData.title
    const overview:string = route.params.movieData.overview
    const genres:number[] = route.params.movieData.genre_ids
    const [currentPage,setCurrentPage]= useState("overview")
    const [youtubeId, setYoutubeId]= useState(String)
    const [videoType,setVideoType]=useState(String)
    const [creditsData, setCreditsData] = useState<CreditsData[]>();
    useEffect(() => {
        Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`),
        ])
          .then(([videosResponse, creditsResponse]) => {
            // handle videos response
            const videosData = videosResponse.data;
            for (let i = 0; i < videosData.results.length; i++) {
              if (videosData.results[i].type === "Trailer") {
                setVideoType(videosData.results[i].name);
                console.log(`${youtubeLink}${videosData.results[i].key}`);
                setYoutubeId(videosData.results[i].key);
                break;
              }
            }
      
            // handle credits response
            const creditsRespData = creditsResponse.data;
            const creditsArr = []
            for (let i = 0; i <17;i++){
                creditsArr.push(creditsRespData.cast[i])
            }
            setCreditsData(creditsArr) 
           
            
          });
      }, []);
      
      
      
    const handleOverview = () =>{
        setCurrentPage("overview")
    }
    const handleGenres = () => {
        setCurrentPage("genres")
    }
    const handleTopCast = () => {
        setCurrentPage("topcast")
    }
    const displayTopCast = ()=>{
        console.log(creditsData)
        return(
            
            <ScrollView  horizontal={true} >
                     
            {creditsData?.map((data)=>{
               return(
                   <View style={styles.topCastContainer}>
                      <TouchableOpacity>
                       <Image style={styles.topCastImage}source={{ uri: imageLink + data.profile_path }}></Image>
                       <Text style={[styles.textColor,styles.castNameText]}>{data.name}</Text>
                       <Text style={[styles.textColor,styles.characterNameText]}>{data.character}</Text>
                       </TouchableOpacity>
                   </View>
               )
              
            })}  
       </ScrollView>
           
        )
    }
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
                <Text style={styles.textColor}>{title} - {videoType}</Text>
             </View>
                
             <View style={styles.bottomArea}> 
             <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <TouchableOpacity onPress={handleOverview}>
                <Text style={[styles.textColor,styles.textBorder]}> Overview</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleGenres}>
                <Text style={[styles.textColor,styles.textBorder]}> Genres</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleTopCast}>
                <Text style={[styles.textColor,styles.textBorder]}> Top Cast</Text>
                </TouchableOpacity>
                </ScrollView>  
             </View>

             <View style={styles.infoArea}>
                 {currentPage === "overview" && <Text style={styles.textColor}>{overview}</Text>}
                 {currentPage === "genres" && <Text style={styles.textColor}>{genres}</Text>}
                 {currentPage === "topcast" && displayTopCast()}
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
        width:100,
        overflow:'scroll',
        marginRight:20
    },
    infoArea:{
        padding:20
    },
    topCastContainer:{
        height:300,
        width:159,
        alignItems:"center"
        
    },
    topCastImage:{
        width:120,
        height:120,
        borderRadius:100,
       
        
    },
    castNameText:{
        marginTop:10,
        fontSize:20,
    },
    characterNameText:{
        fontSize:12
    }

})

