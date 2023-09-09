import { Dimensions,View,Text,Image, StyleSheet, Button, Pressable, StatusBar } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faX, faHeart } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from "react";
import { ScrollView, Swipeable ,PanGestureHandler, TapGestureHandler} from "react-native-gesture-handler";
import Animated,{interpolate, runOnJS, runOnUI, useAnimatedGestureHandler,useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated"
import { withSpring } from "react-native-reanimated";
import {API_KEY} from "@env"
import axios from "axios";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationProp } from '@react-navigation/native';
import NavBar from "../../../components/NavBar";
import {MyContext} from "../../../utils/MyContext";
const {width,height} = Dimensions.get("window")
const φ = (1 + Math.sqrt(5)) / 2;
const deltaX = width / 2;
const w = width - 80;
const h = w * φ;
const imageLink = "https://image.tmdb.org/t/p/original/"


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
interface GenreId{
  id:number
}
interface MovieCards{
  navigation: NavigationProp<any>,
  route:{
    params:{
       genreId: GenreId[]
    }
}
}
export default function Card({navigation,route}: MovieCards): JSX.Element {
    const [favorited,setFavorites]= useState<MovieData[]>([])
    const [currentIndex,setCurrentIndex]= useState(0)
    const [movieData, setMovieData] = useState<MovieData|null>();
   
    const selectedGenreId: GenreId[] = route.params.genreId

    const genreIds = selectedGenreId.join(',');
    useEffect(() => {
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreIds}`)
        .then((resp) => resp.data)
        .then((data) => {
          console.log(data.results.length)
          if(data.results[currentIndex].poster_path !== undefined){
           setMovieData(data.results[currentIndex]);
          }
        });
    }, [currentIndex]);
    
    useEffect(() => {
      console.log(favorited); 
    }, [favorited]);

    const handleSwipeRight = () => {
        setCurrentIndex(currentIndex + 1);
        if (movieData != null) {
          setFavorites([...favorited, movieData]);
        }
      
    };
    
    const handleSwipeLeft = () => {
        setCurrentIndex(currentIndex + 1);
    };
    

    const handleSwipe =(translationX : number)=>{
      if(translationX>100){
        console.log("right")
        translateX.value = withSpring(0)
        runOnJS(handleSwipeRight)();
        
      }else if (translationX<-100){
        console.log("left")
        translateX.value = withSpring(0)
        runOnJS(handleSwipeLeft)();
        
      }
      translateX.value = withSpring(0)
      console.log("end")
      
    }
    const handlePress = ()=>{
      console.log("pressed")
      spin.value = spin.value ? 0 : 1
    }
    
    const spin = useSharedValue<number>(0)
    const frontSpinAnimation = useAnimatedStyle(()=>{
      const spinVal = interpolate(spin.value,[0,1],[0,180])
      return{
        transform:[
          {
            rotateY: withTiming(`${spinVal}deg`, { duration: 500 })
          }
        ]
      }
    })

    const backSpinAnimation = useAnimatedStyle(()=>{
      const spinVal = interpolate(spin.value,[0,1],[180,360])
      return{
        transform:[
          {
            rotateY: withTiming(`${spinVal}deg`, { duration: 500 })
          }
        ]
      }
    })
    const translateX =  useSharedValue<number>(0)
    const horizontalSwipeAnimation = useAnimatedStyle(()=>{
      return{
        transform:[{
          translateX: translateX.value 
        }],
      }
    })

    const translateY = useSharedValue<number>(0)
    const verticalSwipeAnimation = useAnimatedStyle(()=>{
      return{
        transform:[
          {
            translateY: translateY.value
          }
        ]
      }
    })

    const xGestureHandler = useAnimatedGestureHandler({
      onStart:(e)=>{
        console.log(e.translationX)
        console.log("Start")
        
      },
      onActive:(e)=>{ 
        translateX.value = e.translationX
        console.log(e.translationY)
        console.log("active")
      },
      onEnd:(e)=>{
        runOnJS(handleSwipe)(e.translationX)
      }
    })
    const handleNavigation = function (navigation:NavigationProp<any>){
      navigation.navigate('MovieTrailers',{movieData:movieData})
      
    }
    const yGestureHandler = useAnimatedGestureHandler({
      onStart:(e)=>{
        console.log(e.translationY)
        console.log("Start")
        
      },
      onActive:(e)=>{ 
        translateY.value = e.translationY
        console.log(e.translationY)
        console.log("active")
      },
      onEnd:(e)=>{
        console.log(e.translationY)
        if (e.translationY<-100){
          console.log("up")
          translateY.value = withSpring(0,{overshootClamping:true})
          runOnJS(handleNavigation)(navigation)
        }else{
          translateY.value = withSpring(0,{overshootClamping:true})
        }
        
      
      }
    })
   
    
  
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        
      <View style={[styles.container]}>
      <View style={styles.topSpace}>
        
        </View>
      <TapGestureHandler numberOfTaps={1} onActivated={handlePress}>
        <Animated.View style={[styles.front,frontSpinAnimation]} >
          <PanGestureHandler onGestureEvent={xGestureHandler}>
            <Animated.Image style={[styles.poster,horizontalSwipeAnimation,verticalSwipeAnimation]}source={{ uri: imageLink + movieData?.poster_path }} ></Animated.Image>
          </PanGestureHandler>
        </Animated.View>
      </TapGestureHandler> 

      <TapGestureHandler numberOfTaps={1} onActivated={handlePress}>
        <Animated.View style={[styles.back,backSpinAnimation,verticalSwipeAnimation]} >
          <PanGestureHandler onGestureEvent={yGestureHandler} >
            <Animated.View style={[styles.hitbox]} >
            <Animated.Image style={[styles.poster,{opacity:0.2}]}source={{ uri: imageLink + movieData?.poster_path }} ></Animated.Image>
              <Text style={styles.title}>{movieData?.title}</Text>
              <Text style={styles.description}>{movieData?.overview}</Text>
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </TapGestureHandler> 
      
      
      <View style={{flex:1,flexDirection:"row",justifyContent:"space-evenly"}}>
          <View style={styles.circle}>
            <FontAwesomeIcon  icon={faX} size={32} color="#ec5288" />
          </View>
          <View style={styles.circle}>
            <FontAwesomeIcon  icon={faHeart} size={32} color="#6ee3b4" />
          </View>
      </View>
      
    </View>
    </GestureHandlerRootView>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#161213",
    },
    header:{
      position:"absolute",
      color:"#e7e7e7",
      fontSize:30,
      marginTop:30,
      marginLeft:20,
      
    }, topSpace: {
      backgroundColor:"#221e1f",
      width:1000,
      height:70
      
    },
    poster:{
      width:w,
      height:h,
      borderRadius:20,
      borderColor:"#2a2a2a",
      borderWidth:4,
    },
    circle:{
      width: 64,
      height: 64,
      borderRadius: 32,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#2a2a2a",
      shadowColor: "gray",
      shadowOffset: { width: 1, height: 1 },
      borderColor:"#383435",
      borderWidth:4
    },
    hitbox:{
      position:"absolute",
      width:w,
      height:h,
      // backgroundColor: '#1d1d29',
      borderRadius:20,
      
    },
    button:{
      
      width:120,
      height:40,
      paddingLeft:30,
      borderRadius:80,
    },
    front:{
      flex: 6,
      justifyContent:"center",
      alignItems:"center",
      
    },
    back:{
      position:"absolute",
      width:w,
      height:h,
      top:110,
      left:40,
      // marginTop:80,
      borderRadius:20,
      padding:10,
      backfaceVisibility: "hidden",
      backgroundColor:"#1d1d29",
      borderColor:"#2a2a2a",
      borderWidth:4,
    },
    title:{
      padding:20,
      position:"absolute",
      color:"#f0f0f0",
      fontSize:20, 
      fontWeight:"bold"
    },
    description:{
      padding:20,
      paddingTop:80,
      position:"absolute",
      color:"white"
    },

  })