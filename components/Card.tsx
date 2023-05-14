import { Dimensions,View,Text,Image, StyleSheet } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faX, faHeart } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from "react";
import { ScrollView, Swipeable ,PanGestureHandler} from "react-native-gesture-handler";
import Animated,{runOnJS, runOnUI, useAnimatedGestureHandler,useAnimatedStyle, useSharedValue} from "react-native-reanimated"
import { withSpring } from "react-native-reanimated";
import axios from "axios";
const {width,height} = Dimensions.get("window")
const φ = (1 + Math.sqrt(5)) / 2;
const deltaX = width / 2;
const w = width - 32;
const h = w * φ;

const mockData = [
  require("../assets/antman-poster.jpg"),
  require("../assets/jaws-poster.jpg"),
  require("../assets/endgame-poster.jpg"),
  
  
];

axios({method:'get',url:'$https://api.themoviedb.org/3/movie/550?{} '})


export default function Card(): JSX.Element {
    const [currentIndex,setCurrentIndex]= useState(0)
    // const onSwipeLeft = () => {
    //   if (currentIndex < mockData.length - 1) {
    //     setCurrentIndex(currentIndex + 1);
    //   }
    // };
  
    // const onSwipeRight = () => {
    //   if (currentIndex > 0) {
    //     setCurrentIndex(currentIndex - 1);
    //   }
     
    // };
    const handleSwipeRight = () => {
      if (currentIndex < mockData.length - 1) {
        setCurrentIndex(currentIndex+1);
      }else{
        setCurrentIndex(0)
      }
    };
  
    const handleSwipeLeft = () => {
      if (currentIndex < mockData.length - 1) {
        setCurrentIndex(currentIndex+1);
      }else{
        setCurrentIndex(0)
      }
    }
    const translateX =  useSharedValue(0)
    const swipeGestureHandler = useAnimatedGestureHandler({
      onStart:(e)=>{
        console.log(e.translationX)
        console.log("Start")
      },
      onActive:(e)=>{ 
        translateX.value = e.translationX
        
        console.log("active")
      },
      onEnd:(e)=>{
        console.log(e.translationX)
        if(e.translationX>0){
          console.log("right")
          translateX.value = withSpring(0)
          runOnJS(handleSwipeRight)();
         
        }else if (e.translationX<0){
          console.log("left")
          translateX.value = withSpring(0)
          runOnJS(handleSwipeLeft)();
        }
        translateX.value = withSpring(0)
        console.log("end")
      }
    })
   
    const rStyle = useAnimatedStyle(()=>{
      return{
        transform:[{
          translateX: translateX.value
        }],
      }
    })
    return (
      <View
      style={[
        styles.container,
        {
          flexDirection: 'column',
        },
      ]}>
      <View style={{flex: 1}}>
        
      </View>
      <View style={[{flex: 8,justifyContent:"center", alignItems:"center"}]} >
        <Animated.Image style={[styles.poster,rStyle]}source={mockData[currentIndex]}></Animated.Image>
      </View>

      <PanGestureHandler onGestureEvent={swipeGestureHandler}>
        <Animated.View style={[styles.hitbox,rStyle]}/>
      </PanGestureHandler>
      <View style={{flex: 1,flexDirection:"row",justifyContent:"space-evenly",paddingBottom:25}}>
          <View style={styles.circle}>
            <FontAwesomeIcon  icon={faX} size={32} color="#ec5288" />
          </View>
          <View style={styles.circle}>
            <FontAwesomeIcon  icon={faHeart} size={32} color="#6ee3b4" />
          </View>
      </View>
    </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fbfaff",
    },
    poster:{
      width:w,
      height:h,
      borderRadius:20
      
    },
    circle:{
      width: 64,
      height: 64,
      borderRadius: 32,
      padding: 12,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      shadowColor: "gray",
      shadowOffset: { width: 1, height: 1 }
    },
    hitbox:{
      position:"absolute",
      width:w,
      height:h,
      // backgroundColor:"red",
      top:100,
      left:16
      
    }
  })
