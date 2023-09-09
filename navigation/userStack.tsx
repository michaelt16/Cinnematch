import { View, Text, StyleSheet,Image, Dimensions, StatusBar} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from "../screens/UserScreen/Movies/Card"
import Favorites from '../screens/UserScreen/Movies/Favorites';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MovieTrailers from '../screens/UserScreen/Movies/MovieTrailers';
import ChatScreen from '../screens/UserScreen/Socials/ChatScreen';
import IconPickerScreen from '../screens/UserScreen/Profile/IconPickerScreen';
import RoomCreation from '../screens/UserScreen/Home/Home';
import Customize from '../screens/UserScreen/Profile/Customize';
import NowPlaying from '../screens/UserScreen/Movies/NowPlaying';
import Profile from '../screens/UserScreen/Profile/Profile';
import Home from '../screens/UserScreen/Home/Home';
import RoomSettings from '../screens/UserScreen/Home/RoomSettings';

const Stack = createNativeStackNavigator();
export default function UserStack(): JSX.Element {
 return (
   
   <NavigationContainer>
      <StatusBar
       backgroundColor="#161213"
       barStyle="light-content"
     />
           
     
      <Stack.Navigator  
         screenOptions={{
             headerShown: false,
             header: () => null,
             contentStyle: { backgroundColor: 'white' },
             animation:"none"
             
           }}>
            

          <Stack.Screen
           name="ChatScreen"
           component={ChatScreen}
         />

          <Stack.Screen
           name="IconPickerScreen"
           component={IconPickerScreen}
         />
             <Stack.Screen
           name="Home"
           component={Home}
         />
         <Stack.Screen
           name="RoomSettings"
           component={RoomSettings}
         />

           
         <Stack.Screen
           name="Customize"
           component={Customize}
         />
          
           <Stack.Screen
           name="Card"
           component={Card}
         /> 
           <Stack.Screen
           name="NowPlaying"
           component={NowPlaying}
         /> 
         <Stack.Screen
           name="Profile"
           component={Profile}
         />
         
           
         <Stack.Screen
           name="Favorites"
           component={Favorites}
         />
         <Stack.Screen
           name="MovieTrailers"
           component={MovieTrailers}
           />

         

        
      </Stack.Navigator>
   </NavigationContainer>
 );
}


