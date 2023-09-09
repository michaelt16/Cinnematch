import React, { useContext, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import NavBar from '../../../components/NavBar';
import { UserContext } from '../../../utils/MyContext';

interface RoomCreationProps{
  route:{
    params:{
      username:string,
      icon:string,

    }
  },navigation: NavigationProp<any>;
   
}
export default function RoomCreation({route,navigation}: RoomCreationProps ): JSX.Element {
  const [user,setUser] = useState({ username: route.params.username, icon: route.params.icon });
  const [roomNumber, setRoomNumber] = useState("")
  
  const handleJoinRoom = () => {
    // Handle logic for joining a room
    console.log('Joining a room');
  };

  const handleCreateRoom = () => {
    // Handle logic for creating a room
    console.log('Creating a room');
    navigation.navigate("RoomSettings")
  };
    console.log("context",user)
  return (
    <View style={styles.container}>
        <View style={styles.topSpace}>
        <Text style={styles.header}>Home</Text>
        </View>
       <View style={styles.userContainer}>
        <View style={styles.iconCircle}>
        <SvgXml xml={route.params.icon} />
        </View>
        <Text style={styles.userText}>Hi, {route.params.username}</Text>
        
       </View>

      <View style={styles.buttonContainer}>

        <Text style={styles.text}>Join a Room</Text>
        <View style={styles.joinRoomContainer}>
          <TextInput
            value={roomNumber}
            onChangeText={setRoomNumber}
            style={styles.input}
          />
          <TouchableOpacity style={styles.joinRoomButton} onPress={handleJoinRoom}>
            <Text style={styles.text}>Join Room</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleCreateRoom}>
          <Text style={styles.text}>Create Room</Text>
        </TouchableOpacity>
        
      </View>
      <UserContext.Provider value={user}>
         <NavBar navigation={navigation}/>
      </UserContext.Provider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161213",
  },
  header:{   
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
  userContainer:{
    
    alignItems: 'flex-start',
    flexDirection:'row',
    padding:20
    
  },
  button: {
    backgroundColor: '#0ea5e9',
    padding: 12,
    borderRadius: 4,
    marginBottom: 16,
    width: '80%',
    alignItems: 'center',
  },
  joinRoomContainer:{
    alignItems: 'flex-start',
    flexDirection:'row',
    
  },
  joinRoomButton:{
    backgroundColor: '#0ea5e9',
    padding: 12,
    borderRadius: 4,
    marginBottom: 16,
    width: '30%',
    alignItems: 'center',
    marginLeft:10
  },
  buttonContainer:{ 
    paddingLeft:45,
    paddingTop:40,
    height:410
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
 
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 50,
    backgroundColor: '#0ea5e9', 
    overflow:"hidden",
    borderColor:"#4e5880",
    borderWidth:4,
  },
  userText:{
    paddingLeft:30,
    paddingTop:35,
    padding:12,
    fontSize:25,
    color:"white"
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor:"white",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginBottom: 20,
    width:170
  },
});


