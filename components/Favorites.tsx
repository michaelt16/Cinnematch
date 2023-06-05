import React from 'react';
import { View, Text, StyleSheet, Image,ScrollView } from 'react-native';

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
  };
}
const imageLink = "https://image.tmdb.org/t/p/w500/"

export default function Favorites({ route }: FavoritesProps): JSX.Element {
  const { favorites } = route.params
  return (
    <View>
       <View style={styles.topSpace} />
    <ScrollView contentContainerStyle={{paddingBottom:100}}>
      
    <View style={{flex:1, flexDirection:"row", flexWrap:"wrap"}}>
      {favorites.map((movie) => (
        <View style={styles.itemContainer}>
          <Image style={styles.image}source={{ uri: imageLink + movie.poster_path }} alt='poster'></Image>
          {/* <Text key={movie.id}>{movie.title}</Text> */}
        </View>
        
      ))}
    </View>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  topSpace: {
    height: 100,
    backgroundColor: 'white',
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
