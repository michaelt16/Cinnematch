import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image,ScrollView, Dimensions } from 'react-native';
import NavBar from '../../../components/NavBar';
import { NavigationProp } from '@react-navigation/native';
import {MyContext} from '../../../utils/MyContext';
import axios from 'axios';
import {API_KEY} from "@env"
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
  
  interface NowPlayingProps {
    route: {
      params: {
        favorites: MovieData[];
      };
    },
    navigation: NavigationProp<any>
  }
  const {width,height} = Dimensions.get("window")
  const φ = (1 + Math.sqrt(5)) / 2;
  const deltaX = width / 2;
  const w = width - 20;
  const h = w * φ;
  const imageLink = "https://image.tmdb.org/t/p/original/"

 
export default function NowPlaying ({navigation,route}:NowPlayingProps) :JSX.Element {
    const favorited = route.params.favorites
    const [movieDataArr, setMovieDataArr] = useState<MovieData[]>([]);
    
    useEffect(() => {
      
      axios
        .get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`)
        .then((resp) => resp.data)
        .then((data) => {
          //b-a for descending
          const sortedMovies = data.results.sort(
            (a:MovieData, b:MovieData) => b.vote_average - a.vote_average
          );

          const movieArr: MovieData[] = []
          sortedMovies.forEach((movie:MovieData) => {
            movieArr.push(movie)
            
          });
          setMovieDataArr(movieArr)
        });
    }, []);
    
    const handleDetails = (movie : MovieData ) => {
      
     navigation.navigate('MovieTrailers',{movieData: movie})
    }
   
    return(
        <View style={styles.container}>
        <View style={styles.topSpace}>
          <Text style={[styles.textColor, styles.headerSize]}>Now Playing</Text>
        </View>
          <ScrollView contentContainerStyle={styles.posterContainer} >
            {movieDataArr.map((movie)=>{
              return(
                <View>
                <TouchableOpacity onPress={()=>handleDetails(movie)}>
                  <Image style={styles.poster}source={{ uri: imageLink + movie?.backdrop_path }} resizeMode='contain'></Image>
                  <View style={styles.underPoster}>
                    <View style={styles.movieTitleWidth}>
                   <Text style={[styles.textColor,]}>{movie.title}</Text>
                   </View>
                    <Text style={[styles.textColor,styles.rating]}> {movie.vote_average.toFixed(1)}</Text>
                  </View>
                </TouchableOpacity>
                </View>
              )
               
            })}

          </ScrollView>
            <MyContext.Provider value={favorited}>
                    <NavBar navigation={navigation}/>
            </MyContext.Provider>
        </View>
    )
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: "#161213",
  },
  headerSize:{
    fontSize:30,
    marginTop:30,
    marginLeft:20,
  },
  textColor:{

    color:"#e7e7e7",
    
},
topSpace: {
  padding:10,
  flexDirection:'row',
  alignContent:'space-between'
  
},
  posterContainer:{
    justifyContent:"center",
    alignItems:"center",
  },
  poster:{
    width:w,
    height:192,
  },
  underPoster:{
    backgroundColor:"#221e1f",
    marginBottom:20,
    padding:20,
    flexDirection:"row",
    flexWrap:"wrap"
  },
  movieTitleWidth:{
    width:235
  },
  rating:{
    position:"absolute",
    top:13,
    left:265,
    backgroundColor:"#161213",
    width:48,
    height:35,
    padding:8,
    paddingLeft:10,
    borderRadius:10,
    
  }

})