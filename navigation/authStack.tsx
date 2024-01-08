import { View, Text, StyleSheet,Image, Dimensions, StatusBar} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/AuthScreen/Login';
import Signup from '../screens/AuthScreen/Signup';


const Stack = createNativeStackNavigator();
export default function UserStack(): JSX.Element {
    return(
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
           name="Login"
           component={Login}
         />   
         <Stack.Screen
           name="Signup"
           component={Signup}
         />     

        </Stack.Navigator>
     </NavigationContainer>

    )
}