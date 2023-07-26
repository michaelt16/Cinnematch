import React from 'react';
import { View, Text, StyleSheet, Image,ScrollView } from 'react-native';
import NavBar from '../components/NavBar';
import { NavigationProp } from '@react-navigation/native';
import MyContext from '../utils/MyContext';
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

interface FavoritesProps {
  route: {
    params: {
      favorites: MovieData[];
    };
  },
  navigation: NavigationProp<any>
}
const imageLink = "https://image.tmdb.org/t/p/original/"

export default function Favorites({ route , navigation }: FavoritesProps): JSX.Element {
  const { favorites } = route.params
  console.log("test",favorites)
  return (
    <View style={styles.container}>
       <View style={styles.topSpace}>
          <Text style={styles.textColor}>Favorites</Text>
        </View>
      <ScrollView contentContainerStyle={{paddingBottom:100}}>
        
      <View style={{ flexDirection:"row", flexWrap:"wrap"}}>
        {favorites.map((movie) => (
          <View style={styles.itemContainer}>
            <Image style={styles.image}source={{ uri: imageLink + movie.poster_path }} alt='poster'></Image> 
            {/* <Text key={movie.id}>{movie.title}</Text> */}
          </View>
          
        ))}
        
      </View>
      </ScrollView>
      <MyContext.Provider value={favorites}>
          <NavBar navigation={navigation}/>
      </MyContext.Provider>
      </View>
  );
}

const styles = StyleSheet.create({

  container:{
      flex:1,
      backgroundColor: "#161213",
  },
  textColor:{

      color:"#e7e7e7",
      fontSize:30,
      marginTop:30,
      marginLeft:20,
  },
  topSpace: {
    padding:10,
        flexDirection:'row',
        alignContent:'space-between'
    
  },
  itemContainer: {
   
    width: "50%", 
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 20,
    
    
  },
  image:{
    width: 140,
    height: 200,
    resizeMode: 'contain',
    borderRadius:10
  }
});
