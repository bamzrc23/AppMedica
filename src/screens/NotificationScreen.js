import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const NotificationScreen = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/usuarios')
      .then((response) => response.json())
      .then((data) => setUsuarios(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
        <Text>No tienes notificaciones...</Text>
     
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  usuarioItem: {
    marginVertical: 10,
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    width: '100%',
  },
  usuarioText: {
    fontSize: 16,
    color: '#333',
  },
});

export default NotificationScreen;


