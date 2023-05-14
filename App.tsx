import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet,Image, Dimensions } from 'react-native';
import Card from "./components/Card"
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <Card/>
    </GestureHandlerRootView>
  );
}


