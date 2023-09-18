import React, { useEffect, useState } from "react";
import { NavigationProp, PreventRemoveContext } from '@react-navigation/native';
import { View, Text, TextInput, Button, StyleSheet, Dimensions } from 'react-native';
import CheckBox from 'expo-checkbox';
import axios from "axios";
import {API_KEY} from "@env"
import { TouchableOpacity } from "react-native";
import {firestore} from "../../../config/firebase"
import { useUser } from '../../../utils/MyContext';
import {collection, getFirestore,addDoc,getDocs, DocumentData, query, orderBy, Timestamp,setDoc} from 'firebase/firestore'
import { ScrollView } from "react-native-gesture-handler";
//this is the settings selection screen
interface RoomSettingsProps{
    navigation :NavigationProp<any>,
}
interface Genre {
    name: string;
    id: number;
}
interface RoomInfo{
  user:string,
  genresSelected:Array<string>
}
const {width,height} = Dimensions.get("window")
const φ = (1 + Math.sqrt(5)) / 2;
const w = width - 20;
const h = w * φ;   


export default function RoomSettings ({navigation}:RoomSettingsProps) : JSX.Element {
    const [chosenGenreArr, setGenreArr] = useState<number[]>([]);
    const[genresInfo,setGenresInfo]= useState([{name:"",id:0, selected:false}])
    const [roomInfo, setRoomInfo] = useState({
      user: useUser().email,
      genresSelected: chosenGenreArr,
    })
    const [roomId,setRoomId]=useState("")
    useEffect(()=>{
      generateRandomRoomNumber(4)
    },[])

    useEffect(() => {
      if (roomId) {
        const createRoomCollection = collection(firestore, roomId);
        const sendRoomInfo = async () =>{
          try{  
            const newRoomInfo = {
              ...roomInfo,
              genresSelected: chosenGenreArr,
            };
            setRoomInfo(newRoomInfo);
            await addDoc(createRoomCollection,roomInfo)
          }catch(e){
            console.log(e)
          }
        }
        sendRoomInfo()
      }
    }, [roomId,chosenGenreArr]);

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
        .then((resp)=>resp.data)
        .then((data)=>{
            setGenresInfo(
                data.genres.map((genre: Genre) => ({
                  ...genre,
                  selected: false,
                })));
    })},[]);

    const handleToggle = (id: number) => {
      
        setGenresInfo((prevGenresInfo) =>
          prevGenresInfo.map((genre) =>
            genre.id === id ? { ...genre, selected: !genre.selected } : genre,
          ),
        );
        setGenreArr((prevChosenGenreArr) => {
          if (prevChosenGenreArr.includes(id)) {
            return prevChosenGenreArr.filter((genreId) => genreId !== id);
          } else {
            return [...prevChosenGenreArr, id];
          }
        });
      };
    
    const handleProceed = ()=>{
        console.log("test",chosenGenreArr)
        navigation.navigate("Card",{genreId:chosenGenreArr})
    }

    const generateRandomRoomNumber = (num: number)=>{
     
      const alphabet ="ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
      let result = ""
      for (let i = 0;i < num;i++){
        result+=alphabet[Math.floor(Math.random() * alphabet.length)]
      }
      setRoomId(result)
    }
      
    // const getRoomInfo = async ()=>{
    //   try{
    //     const snapshot = await getDocs(createRoomCollection);
    //     const data = snapshot.docs.map(doc => doc.data())
        
    //     return data
       
        
    //   }catch(e){
    //       console.error(e)
    //   }
    // }
 
        
    return(
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={[styles.textColor,styles.headerSize]}>Create a room</Text>
            </View>
            < View>
              <Text style={[styles.textColor,styles.roomNumber]}>{roomId}</Text>
            </View>
            <View style={styles.topSpace}>
                <Text style={[styles.textColor, styles.secondHeaderSize]}>Choose Genre(s)</Text>
            </View>
            <View style={styles.boxContainer}>
               
                {genresInfo.map((genre)=>{
                    return(
                        <View key={genre.id}>
                            <View style={styles.genresContainer}>
                                <CheckBox
                                  value={genre.selected}
                                  onValueChange={() => handleToggle(genre.id)}
                                  style={styles.checkbox}
                                />
                                <Text style={[styles.textColor,styles.genresSize]}>{genre.name}</Text>
                            </View>
                        </View>
                    )
                })}
                
            </View>
            <TouchableOpacity onPress={handleProceed}>
                <View style={styles.button}>
                    <Text style={styles.textColor}>Swipe!</Text>
                </View>
            </TouchableOpacity>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      paddingTop:35,
      backgroundColor: "#161213",
      height:750
    },
    headerContainer:{
        paddingBottom:10,
        justifyContent:"center",
        alignItems:"center",
        flexDirection:'row',
    },
    topSpace: {
        padding:10,
        paddingLeft:17
        
      },
    textColor:{
        color:"white"
    },
    headerSize:{
        fontSize:30
    },
    secondHeaderSize:{
        fontSize:18
    },
    boxContainer:{
        width:w,
        height:450,
        marginLeft:10,
        backgroundColor:"#221e1f",
        borderRadius:9,
        marginBottom:25,
        flexDirection:"row",
        flexWrap:"wrap",
        
      },
      genresContainer:{
        flexDirection:"row",
        flexWrap:"wrap",
        padding:10,
        alignItems: 'center'     
      },
      checkbox:{
        borderColor:"white",
        margin:10,
        padding:10
      },
      genresSize:{
        fontSize:12
      },
      
      button:{
        width:100,
        height:40,
        backgroundColor:"#0ea5e9",
        padding:10,
        paddingLeft:23,
        borderRadius:10,
        marginLeft:140
      },
      roomNumber:{
        marginLeft:20,
        fontSize:40
      }

})
