import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal } from 'react-native';
import { useUser } from '../usuario'; 
import { FontAwesome } from '@expo/vector-icons'; 

const HomeScreen = () => {
  const { currentUser } = useUser(); 
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState({});

  if (!currentUser) {
    return <View style={styles.container}><Text>Cargando usuario...</Text></View>;
  }

  const openPrescriptionModal = (prescription) => {
    setSelectedPrescription(prescription);
    setModalVisible(true);
  };

  return (
    <ScrollView style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image source={{ uri: selectedPrescription.imageUrl }} style={{ width: 300, height: 300 }} />
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Citas Agendadas</Text>
        {currentUser.appointments && currentUser.appointments.map((appointment, index) => (
          <View style={styles.item} key={index}>
            <Text style={styles.itemTitle}>{appointment.date}</Text>
            <Text style={styles.itemSubtitle}>{appointment.time}</Text>
            <Text style={styles.itemContent}>{appointment.doctor}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: '#E1BEE7' }]}>
        <Text style={[styles.sectionTitle, { color: '#6A1B9A' }]}>Recetas</Text>
        {currentUser.prescriptions && currentUser.prescriptions.map((prescription, index) => (
          <View style={styles.item} key={index}>
            <Text style={styles.itemTitle}>{prescription.recetaDescription}</Text>
            <Text style={styles.itemSubtitle}>{prescription.medicoReceta}</Text>
            <TouchableOpacity onPress={() => openPrescriptionModal(prescription)} style={styles.viewButton}>
              <Text style={styles.viewButtonText}>Visualizar</Text>
              <FontAwesome name="eye" size={24} color="#6A1B9A" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: '#FCE4EC' }]}>
        <Text style={[styles.sectionTitle, { color: '#AD1457' }]}>Facturas</Text>
        {currentUser.invoices && currentUser.invoices.length > 0 ? (
          currentUser.invoices.map((invoice, index) => (
            <View style={styles.item} key={index}>
              <Text style={styles.itemTitle}>Factura {index + 1}</Text>
              {/* lógica para visualizar la factura */}
              <TouchableOpacity style={styles.viewButton}>
                <Text style={styles.viewButtonText}>Visualizar</Text>
                <FontAwesome name="eye" size={24} color="#AD1457" />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.noDataText}>No hay facturas disponibles...</Text>
        )}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  container: {
    padding: 13,
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  section: {
    backgroundColor: '#EDE7F6',
    margin: 10,
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#5E35B1',
  },
  item: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5E35B1',
  },
  itemSubtitle: {
    fontSize: 16,
    color: '#7E57C2', 
  },
  itemContent: {
    fontSize: 16,
    color: '#673AB7', 
  },
});

export default HomeScreen;
