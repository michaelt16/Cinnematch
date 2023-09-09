 import { View, Text, StyleSheet,Image, Dimensions, StatusBar} from 'react-native';
 import { SafeAreaView } from 'react-native-safe-area-context';
import Card from "./screens/UserScreen/Movies/Card"
import Favorites from './screens/UserScreen/Movies/Favorites';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RootNavigation from './navigation';


const Stack = createNativeStackNavigator();
export default function App(): JSX.Element {
  return (
   <RootNavigation/>
  );
}


