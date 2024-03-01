import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { useUser } from '../usuario';
import { TouchableOpacity, ScrollView, Image, View, TextInput, Button, Text, StyleSheet } from 'react-native';

// Reemplaza con la URL de tu imagen de portada del login
const profilePicture = "https://as1.ftcdn.net/v2/jpg/05/57/55/38/1000_F_557553817_wzlRUvRrcsyVSkFg8g3YuwhXMZTprjlB.jpg";

const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useUser();

  const handleLogin = () => {
    if (loginUser(username, password)) {
      Toast.show({
        type: 'success',
        text1: 'Credenciales correctas',
        position: 'bottom',
        visibilityTime: 3000,
      });
      onLogin(); 
    } else {
      Toast.show({
        type: 'error',
        text1: 'Credenciales incorrectas',
        position: 'bottom',
        visibilityTime: 3000,
      });
    }
  };

  const handleRegisterNavigation = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Image source={{ }} style={[styles.image, StyleSheet.absoluteFill]} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.login}>
          <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
          <Text style={styles.title}>ConsultaMóvil</Text>
          <Text style={styles.subtitle}>Tu puerta virtual a un cuidado más cercano</Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="Correo Electrónico" 
            value={username}
            onChangeText={text => setUsername(text)} />
          </View>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry={true} 
             value={password}
             onChangeText={text => setPassword(text)} />
          </View>
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate(handleRegisterNavigation)} style={styles.buttonSecondary}>
            <Text style={styles.buttonTextSecondary} >Regístrate</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
      image: {
        flex: 1,
        width: '100%'
      },
      login: {
        width: '100%',
        maxWidth: 400,
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      profilePicture: {
        width: 200,
        height: 160,
        borderRadius: 40,
        marginBottom: 16,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
      },
      subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 32,
      },
      inputContainer: {
        width: '100%',
        marginBottom: 16,
      },
      input: {
        height: 50,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        paddingHorizontal: 15,
        fontSize: 16,
        width: '100%',
      },
      button: {
        backgroundColor: '#7b97e1',
        paddingVertical: 15,
        width: '100%',
        borderRadius: 5,
        marginBottom: 12,
      },
      buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 17,
        fontWeight: '600',
      },
      buttonSecondary: {
        paddingVertical: 15,
        width: '100%',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd'
      },
      buttonTextSecondary: {
        color: '#6792EB',
        textAlign: 'center',
        fontSize: 17,
        fontWeight: '600',
      },
});

export default LoginScreen;
