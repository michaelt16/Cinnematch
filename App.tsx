 import { View, Text, StyleSheet,Image, Dimensions, StatusBar} from 'react-native';
 import { SafeAreaView } from 'react-native-safe-area-context';
import Card from "./screens/Card"
import Favorites from './screens/Favorites';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MovieTrailers from './screens/MovieTrailers';
import ChatScreen from './screens/ChatScreen';

const Stack = createNativeStackNavigator();
export default function App(): JSX.Element {
  return (
    
    <NavigationContainer>
      
        
      
       <Stack.Navigator  
          screenOptions={{
              headerShown: false,
              header: () => null,
              contentStyle: { backgroundColor: 'white' },
            }}>
          
            <Stack.Screen
            name="Card"
            component={Card}
           
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


