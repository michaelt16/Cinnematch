 import { View, Text, StyleSheet,Image, Dimensions, StatusBar} from 'react-native';
 import { SafeAreaView } from 'react-native-safe-area-context';
import Card from "./screens/Card"
import Favorites from './screens/Favorites';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MovieTrailers from './screens/MovieTrailers';
import ChatScreen from './screens/ChatScreen';
import IconPickerScreen from './screens/IconPickerScreen';
import RoomCreation from './screens/RoomCreation';
import Customize from './screens/Customize';
import NowPlaying from './screens/NowPlaying';
import Profile from './screens/Profile';

const Stack = createNativeStackNavigator();
export default function App(): JSX.Element {
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
            name="IconPickerScreen"
            component={IconPickerScreen}
          />
          <Stack.Screen
            name="Customize"
            component={Customize}
          />
           <Stack.Screen
            name="RoomCreation"
            component={RoomCreation}
          />
            
          <Stack.Screen
            name="Favorites"
            component={Favorites}
          />
          <Stack.Screen
            name="MovieTrailers"
            component={MovieTrailers}
            />

          <Stack.Screen
            name="ChatScreen"
            component={ChatScreen}
          />

         
       </Stack.Navigator>
    </NavigationContainer>
  );
}


