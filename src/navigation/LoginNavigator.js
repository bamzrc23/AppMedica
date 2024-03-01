import React from 'react';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import LoginScreen from '../screens/LoginScreen';
import RegistreScreen from '../screens/RegisterSreen';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

function MyTabs(){
    return(
        <Stack.Navigator>
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='Register' component={RegistreScreen} />
        </Stack.Navigator>
    )
}

export default function LoginNavigator(){
    return(
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    )
}