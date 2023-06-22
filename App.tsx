import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet,Image, Dimensions } from 'react-native';
import Card from "./components/Card"
import Favorites from './components/Favorites';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MovieTrailers from './components/MovieTrailers';

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
       </Stack.Navigator>
    </NavigationContainer>
  );
}


