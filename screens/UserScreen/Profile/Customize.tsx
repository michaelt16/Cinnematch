import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { createAvatar } from '@dicebear/core';
import { funEmoji, lorelei } from '@dicebear/collection';
import { SvgXml } from 'react-native-svg';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
interface IconProps{
    route:{
        params:{
            icon:string,
            position:Array<number>,
            updateAvatar:(newAvatar:string)=>void,
            updatePos: (newPosArr:Array<number>) =>void
        }
    },
    navigation: NavigationProp<any>;
   
}

export default  function Customize({route,navigation}:IconProps):JSX.Element {
    console.log(route.params.position)
    const [hairIndex,setHairIndex] = useState(route.params.position[0])
    const [eyesIndex,setEyesIndex] =useState(route.params.position[1])
    const [noseIndex,setNoseIndex] =useState(route.params.position[2])
    const [mouthIndex,setMouthIndex] =useState(route.params.position[3])
    const [totalVariants,setTotalVariants]=useState(48)
    

    const variantsArray = Array.from({ length: totalVariants }, (_, index) => `variant${(index + 1).toString().padStart(2, '0')}`) as Options;
    const mouthArray = [] as Options;
    const hairVariant = variantsArray[hairIndex - 1];
    const eyesVariant = variantsArray[eyesIndex - 1];
    const noseVariant = variantsArray[noseIndex - 1];
    
   

   
    for (let i = 1; i <= 18; i++) {
    const happyEmotion = `happy${i.toString().padStart(2, '0')}`;
    mouthArray.push(happyEmotion);
    }

    mouthArray.splice(18); 

    for (let i = 1; i <= 9; i++) {
        const sadEmotion = `sad${i.toString().padStart(2, '0')}`;
        mouthArray.push(sadEmotion);
    }

    console.log("MOUTH INDEX",mouthIndex)
    const mouthVariant = mouthArray[mouthIndex - 1];

    const avatar = createAvatar(lorelei, {
    hair: [hairVariant],
    eyes:[eyesVariant],
    nose:[noseVariant],
    eyebrows:["variant07"],
    head:["variant04"],
    mouth:[mouthVariant]
    }).toString();

    const handleHairRight = ()=>{
        console.log("hair right")
        if(hairIndex === 48){
          setHairIndex(1)
        }else{
            setHairIndex(hairIndex+1)
        }
        
    }
    const handleHairLeft = ()=>{
        console.log("hair right")
        if(hairIndex === 1){
            setHairIndex(48)
          }else{
              setHairIndex(hairIndex-1)
          }
    }
    const handleEyesRight = ()=>{
        console.log("eyes right")
        if(eyesIndex === 24){
            setEyesIndex(1)
        }else{
            setEyesIndex(eyesIndex+1)
        }
        
    }
    const handleEyesLeft = ()=>{
        console.log("eyes left")
        if(noseIndex === 1){
            setEyesIndex(24)
          }else{
            setEyesIndex(eyesIndex-1)
          }
    }

    const handleNoseRight = ()=>{
        console.log("nose right")
        if(noseIndex === 6){
            setNoseIndex(1)
        }else{
            setNoseIndex(noseIndex+1)
        }
        
    }
    const handleNoseLeft = ()=>{
        console.log("nose left")
        if(noseIndex === 1){
            setNoseIndex(6)
          }else{
            setNoseIndex(noseIndex-1)
          }
    }
    const handleMouthRight = ()=>{
        console.log("mouth right")
        if(mouthIndex===27){
            setMouthIndex(1)
        }else{
            setMouthIndex(mouthIndex+1)
        }
        
        
    }
    const handleMouthLeft = ()=>{
        console.log("mouth left")
        if(mouthIndex === 1){
            setMouthIndex(27)
          }else{
            setMouthIndex(mouthIndex-1)
          }
    }
    
    
    const handleProceed = ()=>{
        let newPosArr =[hairIndex,eyesIndex,noseIndex,mouthIndex]
        console.log("NEW", newPosArr)
        route.params.updateAvatar(avatar)
        route.params.updatePos(newPosArr)
        console.log("test")
        navigation.navigate("IconPickerScreen")
        
    }
  return (
    <View style={styles.container}> 
        <SvgXml xml={avatar} style={styles.iconCircle} />
        <View style={styles.customizerContainer}>
          <View style={styles.arrowContainer}>
                <Text style={styles.inputText}>Hair : </Text>
                <TouchableOpacity style= {styles.arrowSize} onPress={handleHairLeft}>
                <FontAwesomeIcon  icon={faArrowLeft} size={32} />
                </TouchableOpacity>
                <Text style={styles.inputText}>{hairIndex}</Text>
                <TouchableOpacity style= {styles.arrowSize}onPress={handleHairRight}>
                <FontAwesomeIcon  icon={faArrowRight} size={32} />
                </TouchableOpacity>
          </View>

          <View style={styles.arrowContainer}>
                <Text style={styles.inputText}>Eyes : </Text>
                <TouchableOpacity style= {styles.arrowSize} onPress={handleEyesLeft}>
                <FontAwesomeIcon  icon={faArrowLeft} size={32} />
                </TouchableOpacity>
                <Text style={styles.inputText}>{eyesIndex}</Text>
                <TouchableOpacity style= {styles.arrowSize} onPress={handleEyesRight}>
                <FontAwesomeIcon  icon={faArrowRight} size={32} />
                </TouchableOpacity>
          </View>

          <View style={styles.arrowContainer}>
                <Text style={styles.inputText}>Nose : </Text>
                <TouchableOpacity style= {styles.arrowSize} onPress={handleNoseLeft} >
                <FontAwesomeIcon  icon={faArrowLeft} size={32} />
                </TouchableOpacity>
                <Text style={styles.inputText}>{noseIndex}</Text>
                <TouchableOpacity style= {styles.arrowSize} onPress={handleNoseRight}>
                <FontAwesomeIcon  icon={faArrowRight} size={32} />
                </TouchableOpacity>
          </View>

          <View style={styles.arrowContainer}>
                <Text style={styles.inputText}>Mouth : </Text>
                <TouchableOpacity style= {styles.arrowSize} onPress={handleMouthLeft}>
                <FontAwesomeIcon  icon={faArrowLeft} size={32} />
                </TouchableOpacity>
                <Text style={styles.inputText}>{mouthIndex}</Text>
                <TouchableOpacity style= {styles.arrowSize} onPress={handleMouthRight}>
                <FontAwesomeIcon  icon={faArrowRight} size={32} />
                </TouchableOpacity>
          </View>  
        </View>
        <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleProceed}>
         <Text style={styles.buttonText} >Proceed</Text>
        
         </TouchableOpacity>
         </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        
    },
    iconCircle: {
        marginBottom:280,
        width: 200,
        height: 200,
        borderRadius: 50,
        backgroundColor: 'gray',
        
      },
    customizerContainer:{
        paddingTop:230,
        position:'absolute'
    },
    arrowContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
       
        borderStyle: 'dotted',
        borderWidth: 1,
        borderRadius: 1,
       
    
    },
    arrowSize:{
       padding:20
    },
    inputText: {
        marginHorizontal: 10,
        fontSize: 24,
      },
    buttonContainer:{
        bottom:50,
        position:'absolute'
    },
    button: {
        backgroundColor: 'blue',
        justifyContent:"center",
        flexDirection:"row",
        paddingTop:20,
        borderRadius: 8,
        width:180,
        height:60, 
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});


