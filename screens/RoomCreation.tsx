import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';

interface RoomCreationProps{
  route:{
    params:{
      username:string,
      icon:string,

    }
  },navigation: NavigationProp<any>;
   
}
export default function RoomCreation({route,navigation}: RoomCreationProps ): JSX.Element {
  const handleJoinRoom = () => {
    // Handle logic for joining a room
    console.log('Joining a room');
  };

  const handleCreateRoom = () => {
    // Handle logic for creating a room
    console.log('Creating a room');
  };

  return (
    <View style={styles.container}>
      
       <View style={styles.userContainer}>
        <SvgXml xml={route.params.icon} style={styles.iconCircle}/>
        <Text style={styles.userText}>Hi, {route.params.username}</Text>
        
       </View>

      
      <TouchableOpacity style={styles.button} onPress={handleJoinRoom}>
        <Text style={styles.buttonText}>Join Room</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleCreateRoom}>
        <Text style={styles.buttonText}>Create Room</Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    
  },
  button: {

    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 4,
    marginBottom: 16,
    width: '80%',
    alignItems: 'center',
  },
  buttonContainer:{ },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  userContainer:{
    
    alignItems: 'flex-start',
    flexDirection:'row'
    
  },
  iconCircle: {
    width: 100,
    height: 100,
    // marginRight:200,
    marginBottom:200,
    backgroundColor: 'gray',
    
  },
  
  userText:{
    paddingLeft:30,
    padding:12
  }
});


