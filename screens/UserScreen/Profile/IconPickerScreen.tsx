import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Button } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { createAvatar } from '@dicebear/core';
import { funEmoji, lorelei } from '@dicebear/collection';
import { SvgXml } from 'react-native-svg';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../../utils/MyContext';

export default  function IconPickerScreen({navigation}: { navigation: NavigationProp<any> }):JSX.Element {
  
  const [username, setUsername] = useState('');
  const [posArr, setPosArr]= useState([1,1,1,1])
  const [avatar, setAvatar] = useState(createAvatar(lorelei, {
    seed: 'Willow',
    
  }).toString())
  const handleProceed = () => {
    console.log('Proceeding with username:', username);
    
    if(username!== ""){
      navigation.navigate('Home')
      
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
  
  return (
    
    <View style={styles.container}>
      <View style={styles.iconPickerContainer}>
        <View style={styles.iconCircle}>
        <SvgXml xml={avatar} />
        </View>
        <TouchableOpacity onPress={handleCustomize} style={styles.pen}>
          <FontAwesomeIcon  icon={faPen} size={32} />
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
      />

      <TouchableOpacity style={styles.button} onPress={handleProceed}>
        <Text style={styles.buttonText}>Proceed</Text>
      </TouchableOpacity>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: "#161213",
  },
  iconPickerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
  },
  
  iconCircle: {
    width: 200,
    height: 200,
    position:'relative',
    borderRadius: 50,
    backgroundColor: '#0ea5e9', 
    overflow:"hidden",
    borderColor:"#4e5880",
    borderWidth:8,
  },
  pen:{
    right:8,
    top:10,
    position:"absolute"
  },
  input: {
    width: '60%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 28,
    marginBottom: 16,
    backgroundColor:"white"
  },
  button: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});


