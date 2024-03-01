import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useUser } from '../usuario'; 
import { useNavigation } from '@react-navigation/native'; 

const ProfileScreen = () => {
  const { currentUser: user } = useUser(); 
  const navigation = useNavigation(); 

  if (!user) {
    // Mostrar algo mientras el usuario no está definido o redirigir al login
    return <View><Text>Cargando usuario...</Text></View>;
  }

  // Función para manejar la navegación al hacer clic en un botón
 const handleNavigate = (screenName) => {
    navigation.navigate(screenName);
  };



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Reemplaza con la imagen de perfil del usuario */}
        <Image source={{ uri: user.profilePictureUrl }} style={styles.profilePicture} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.phoneNumber}>{user.phoneNumber}</Text>
      </View>
      <View style={styles.toolSection}>
        <Text style={styles.toolSectionTitle}>Herramientas</Text>
        <View  style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => handleNavigate('MenstrualControl')} style={styles.button}>
            <Image source={require('../img/ciclo-menstrual.png')} style={styles.icon} />
            <Text style={styles.buttonText}>Control Menstrual</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigate('MenstrualControlMenu')} style={[styles.button, styles.buttonRight]}>
            <Image source={require('../img/recordatorio.png')} style={styles.icon} />
            <Text style={styles.buttonText}>Recordatorio</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#8384ee', 
    paddingBottom: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  phoneNumber: {
    color: 'white',
    fontSize: 18,
    marginTop: 5,
  },
  toolSection: {
    padding: 20,
  },
  toolSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#EDE7F6',
    padding: 10,
    borderRadius: 10,
    marginRight: 5,
  },
  buttonRight: {
    marginLeft: 5,
  },
  buttonText: {
    marginTop: 5,
  },
  icon: {
    width: 50,
    height: 50,
  },
});

export default ProfileScreen;