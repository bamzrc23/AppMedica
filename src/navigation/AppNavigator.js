import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


//screens
import HomeScreen from '../screens/HomeScreen';
import NotificationScreen from '../screens/NotificationScreen';
import CalendarScreen from '../screens/CalendarScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SignatureScreen from '../screens/SignatureScreen';
import DocumentScannerScreen from '../screens/DocumentScannerScreen';
import MenstrualControlMenuScreen from '../screens/MenstrualControlMenuScreen';

// Importa el hook useUser de tu contexto
import { useUser } from '../usuario';

const Tab = createMaterialBottomTabNavigator();

const handleLogout = () => {
  logout(); 
  navigation.navigate('LoginScreen');
};

function MyTabs(){
  const { currentUser } = useUser();
  const { user } = useUser();

  
  return(
    <Tab.Navigator initialRouteName='home' activeColor='#3e2465' inactiveColor="#ffffff" barStyle={{ backgroundColor : '#8384ee' }}>
       {/* Condiciona para paciente */}
      {currentUser.rol === 'paciente' && (
      <Tab.Screen name="Home" component={HomeScreen} options={{
        tabBarLabel: 'Inicio',
        tabBarIcon: ({ color }) => (
          <Ionicons name='home' size={28} color={color} />
        ),
      }} />
      )}
      
      {currentUser.rol === 'paciente' && (
        <Tab.Screen name="Notification" component={NotificationScreen} options={{
          tabBarLabel: 'Alertas',
          tabBarIcon: ({ color }) => (
            <Ionicons name='notifications' size={28} color={color} />
          ),
        }} />
      )}
      {currentUser.rol === 'paciente' &&(
      <Tab.Screen name="Calendar" component={CalendarScreen} options={{
        tabBarLabel: 'Agendar',
        tabBarIcon: ({color}) => (
          <Ionicons name="calendar" size={28} color={color} />
        ),
      }}/>
      )}
      {currentUser.rol === 'paciente' && (
      <Tab.Screen name="Profile" component={ProfileScreen} options={{
        tabBarLabel: 'Perfil',
        tabBarIcon: ({color}) => (
          <FontAwesome name='user' size={28} color={color} />
        ),
      }}/>
      )}

      {/* Condiciona para asistente medico */}
      {currentUser.rol === 'asistente' && (
      <Tab.Screen name="firmar" component={SignatureScreen} options={{
        tabBarLabel: 'Firmar',
        tabBarIcon: ({ color }) => (
          <FontAwesome5  name='file-signature' size={28} color={color} />
        ),
      }} />
      )}

      {currentUser.rol === 'asistente' && (
      <Tab.Screen name="subir" component={DocumentScannerScreen} options={{
        tabBarLabel: 'Cargar',
        tabBarIcon: ({ color }) => (
          <FontAwesome5  name='file-upload' size={28} color={color} />
        ),
      }} />
      )}

      {currentUser.rol === 'paciente' && (
      <Tab.Screen name="control" component={MenstrualControlMenuScreen} options={{
        tabBarLabel: 'Control',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons  name='calendar-heart' size={28} color={color} />
        ),
      }} />
      )}

    </Tab.Navigator>
    
  )
}


export default function AppNavigator(){
  return(
    <NavigationContainer>
        <MyTabs />
    </NavigationContainer>
  )
};
