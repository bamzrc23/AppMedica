import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Button, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker';


const CalendarScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('14:00');
  const [selectedType, setSelectedType] = useState('Salud Ginecológica');
  const [appointments, setAppointments] = useState([]);
  const [markedDates, setMarkedDates] = useState({});

  // función para gestionar el guardar y actualizar una cita
  const saveAppointment = () => {
    const newAppointment = {
      date: selectedDate,
      time: selectedTime,
      type: selectedType,
      
    };
    
    if (editingIndex !== null) {
      const updatedAppointments = [...appointments];
      updatedAppointments[editingIndex] = newAppointment;
      setAppointments(updatedAppointments);
      setEditingIndex(null);
    } else {
      setAppointments([...appointments, newAppointment]);
    }

    const newMarkedDates = {
      ...markedDates,
      [selectedDate]: { selected: true, marked: true, selectedColor: 'purple' },
    };
    setMarkedDates(newMarkedDates);

    setShowModal(false);
  };

  //cancelar una cita
  const cancelAppointment = () => {
    setShowModal(false);
    setEditingIndex(null);
  };

  // editar una cita existente
  const editAppointment = (index) => {
    setEditingIndex(index);
    setSelectedDate(appointments[index].date);
    setSelectedTime(appointments[index].time);
    setSelectedType(appointments[index].type);
    setShowModal(true);
  };

  // eliminar una cita de la lista
  const deleteAppointment = (index) => {
    const updatedAppointments = [...appointments];
    updatedAppointments.splice(index, 1);
    setAppointments(updatedAppointments);
    setMarkedDates({
      ...markedDates,
      [appointments[index].date]: { selected: false, marked: false }
    });
  };

  return (
    <View style={styles.container}>
        <View style={styles.containerTitle}>
          <Text  style={styles.title}>Selecione una fecha</Text> 
          <View style={styles.ordenar}>
          <View style={styles.referencia}>
          <Text style={styles.dot}></Text>
          <Text>Citas</Text>
          </View>
          <View style={styles.referencia}>
          <Text style={styles.dot2}></Text>
          <Text>Agenda llena</Text>
          </View> 
          </View>  
        </View>
      <Calendar
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
          setShowModal(true);
        }}
        markedDates={markedDates}
      />
      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Agendar Cita</Text>
            <Text style={styles.modalLabel}>Fecha: {selectedDate}</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedTime}
                onValueChange={(itemValue) => setSelectedTime(itemValue)}>
                {/* Opciones de hora de cita */}
                <Picker.Item label="14:00" value="14:00" />
                <Picker.Item label="15:00" value="15:00" />
                <Picker.Item label="16:00" value="16:00" />
                <Picker.Item label="17:00" value="17:00" />
              </Picker>
            </View>
            <View style={styles.pickerContainer}>
              <Picker backgroundColor='red'
                selectedValue={selectedType}
                onValueChange={(itemValue) => setSelectedType(itemValue)}>
                {/* Opciones de tipo de cita */}
                <Picker.Item label="Salud Ginecológica" value="Salud Ginecológica" />
                <Picker.Item label="Anticoncepcion" value="Anticoncepcion" />
                <Picker.Item label="Embarazo y maternidad" value="Embarazo y maternidad" />
              </Picker>
            </View>
            <View style={styles.buttonContainer}>
              <Button color={'#7b97e1'} title="Guardar" onPress={saveAppointment} />
              <Button color={'#c1b2d3'} title="Cancelar" onPress={cancelAppointment} />
            </View>
          </View>
        </View>
      </Modal>
      <ScrollView style={styles.appointmentsList}>
        {appointments.map((appointment, index) => (
          <View key={index} style={styles.appointmentItem}>
            <Text>{appointment.date} - {appointment.time}</Text>
            <Text>{appointment.type}</Text>
            <View style={styles.buttonsContainer}>
              <Button color={'#dac0c1'} title="Editar" onPress={() => editAppointment(index)} />
              <Button color={'#6d6b75'} title="Eliminar" onPress={() => deleteAppointment(index)} />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({

  ordenar: {
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    },
  dot: {
    marginLeft: 40,
    width: 15,
    height: 15,
    borderRadius: 7,
    backgroundColor: 'purple',
    position: 'absolute',
    bottom: 0,
  },
  dot2: {
    marginLeft: 85,
    width: 15,
    height: 15,
    borderRadius: 7,
    backgroundColor: '#c79457',
    position: 'absolute',
    bottom: 0,
  },
  containerTitle: {
    padding:15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalContent: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pickerContainer: {
    width: '100%',
    marginBottom: 15,
  },
  modalLabel: {
    alignSelf: 'flex-start',
    marginBottom: 15,
    fontSize: 16,
  },
  appointmentsList: {
    marginTop: 20,
  },
  appointmentItem: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    flex: 1, 
    marginHorizontal: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

});
export default CalendarScreen;
