import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import NavBar from '../../../components/NavBar';
import { NavigationProp } from '@react-navigation/native';
import { createAvatar } from '@dicebear/core';
import { lorelei } from '@dicebear/collection';
import { SvgXml } from 'react-native-svg';
import { ScrollView } from 'react-native-gesture-handler';
import {MovieContext} from '../../../utils/MyContext';
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
  
interface ProfileProps {
    route: {
      params: {
        favorites: MovieData[];
      };
    },
    navigation: NavigationProp<any>
  }
  const {width,height} = Dimensions.get("window")
  const φ = (1 + Math.sqrt(5)) / 2;
  const w = width - 20;
  const h = w * φ;
export default function Profile ({ navigation ,route }: ProfileProps): JSX.Element{
  const [username, setUsername] = useState('');
  const [posArr, setPosArr]= useState([1,1,1,1])
  const [avatar, setAvatar] = useState(createAvatar(lorelei, {
    seed: 'Willow',
    
  }).toString())
  const favorited = route.params.favorites
  const handleProceed = () => {
    console.log('Proceeding with username:', username);
    
    if(username!== ""){
      navigation.navigate('RoomCreation')
    }
  };
  
  
  
  const handleCustomize = ()=>{
    console.log("customizing")
    navigation.navigate("Customize",{icon:avatar, position:posArr, updateAvatar,updatePos})
  }
  
  const updatePos = (newPosArr: Array<number>)=>{
    console.log(posArr)
    setPosArr(newPosArr)
   
  }
  const updateAvatar = (newAvatar: string) => {
    
    setAvatar(newAvatar)
  };
    return(
        <View style={styles.container}>
            <View style={styles.topSpace}>
                <Text style={[styles.textColor, styles.headerSize]}>Profile</Text>
            </View>
            <ScrollView>
            <View style={styles.firstRow}>
                <View style={ styles.iconCircle}>
                    <SvgXml xml={avatar} />
                </View>

                {/* <TouchableOpacity onPress={handleCustomize} style={styles.pen}>
                <FontAwesomeIcon  icon={faPen} size={32} />
                </TouchableOpacity> */}
                <Text style={[styles.textColor,styles.username]}>mahkel</Text>
            </View>
            <View style={styles.boxContainer}>
                <Text style ={[styles.textColor,styles.subHeaderText]}>Top Genres</Text>
                <View style={styles.genresLowerArea}>
                  <View style={styles.genreContainer}>
                      <Text style ={[styles.textColor,styles.genresText]}>Action</Text>
                  </View>
                  <View style={styles.genreContainer}>
                      <Text style ={[styles.textColor,styles.genresText]}>Comedy</Text>
                  </View>
                  <View style={styles.genreContainer}>
                      <Text style ={[styles.textColor,styles.genresText]}>Adventure</Text>
                  </View>
                  <View style={styles.genreContainer}>
                      <Text style ={[styles.textColor,styles.genresText]}>Thriller</Text>
                  </View>
                </View>
            </View> 

            <View style={styles.boxContainer}>
                <Text style ={[styles.textColor,styles.subHeaderText]}>Completed</Text>
               
            </View>      
            </ScrollView>    
            <MovieContext.Provider value={favorited}>
                <NavBar navigation={navigation}/>
            </MovieContext.Provider>
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
    firstRow:{
        paddingTop:10,
        paddingLeft:110,
        
        
    },
    iconCircle: {
        width: 140,
        height: 140,
        borderRadius: 50,
        backgroundColor: '#0ea5e9', 
        overflow:"hidden",
        borderColor:"#4e5880",
        borderWidth:4,
      },
      username:{
        fontSize:20,
        marginLeft:25,
        padding:10,
        paddingBottom:30
      },
      boxContainer:{
        width:w,
        height:250,
        marginLeft:10,
        
        backgroundColor:"#221e1f",
        borderRadius:9,
        marginBottom:25
        
        
      },
      subHeaderText:{
        fontSize:20,
        paddingLeft:25,
        paddingTop:20,
        paddingBottom:12
        
      },
      genresLowerArea:{
        flexDirection:"row",
        flexWrap:"wrap",
      },
      genreContainer:{
        width:100,
        height:50,
        borderRadius:35,
        backgroundColor:"#353132",
        justifyContent:"center",
        alignItems:"center",
        marginTop:10,
        marginLeft:10
      },
      
      genresText:{
        
      },
      completedContainer:{
        width:w,
        height:250,
        marginLeft:10,
        backgroundColor:"#221e1f",
        borderRadius:9,
      }

})