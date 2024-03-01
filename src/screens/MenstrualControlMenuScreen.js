import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, CheckBox, StyleSheet, TextInput, ScrollView, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment'; 

const MenstrualControlScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [periodEndsToday, setPeriodEndsToday] = useState(false);
  const [flowLevel, setFlowLevel] = useState(null);
  const [sexualActivity, setSexualActivity] = useState(null);
  const [notes, setNotes] = useState('');
  const [markedDates, setMarkedDates] = useState({});
  const [lastPeriodDate, setLastPeriodDate] = useState('');
  const [cycleLength, setCycleLength] = useState('28'); 

  // Lógica para calcular días fértiles y de atraso
  const calculateFertileDaysAndDelay = () => {
    if (!lastPeriodDate) return;

    let fertileStart = moment(lastPeriodDate).add(10, 'days');
    let fertileEnd = moment(lastPeriodDate).add(15, 'days');
    let expectedNextPeriod = moment(lastPeriodDate).add(parseInt(cycleLength), 'days');
    let today = moment();
    let delayDays = today.diff(expectedNextPeriod, 'days');

    // Marcar días fértiles
    for (let m = moment(fertileStart); m.diff(fertileEnd, 'days') <= 0; m.add(1, 'days')) {
      markedDates[m.format('YYYY-MM-DD')] = { marked: true, dotColor: 'blue' };
    }

    // Alerta de atraso
    if (delayDays > 0) {
      Alert.alert(`Posible atraso`, `Tienes un retraso de ${delayDays} día(s).`);
    }

    setMarkedDates({ ...markedDates });
  };

  useEffect(() => {
    calculateFertileDaysAndDelay();
  }, [lastPeriodDate, cycleLength]);

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    setModalVisible(true);
  };

  const saveDayInfo = () => {
    const heartColor = sexualActivity === 'protected' ? '❤️' : '💔'; 
    const newMarkedDates = {
      ...markedDates,
      [selectedDate]: {
        customStyles: {
          container: {},
          text: {
            color: heartColor === '❤️' ? 'green' : 'red',
          },
        },
        marked: true,
      },
    };
    setMarkedDates(newMarkedDates);
    setModalVisible(false);
  };

  const FlowLevelIndicator = ({ level }) => (
    <TouchableOpacity style={styles.flowLevelButton} onPress={() => setFlowLevel(level)}>
      <Text style={styles.flowLevelText}>{'💧'.repeat(level)}</Text>
      <CheckBox value={flowLevel === level} />
    </TouchableOpacity>
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <Calendar
          onDayPress={handleDayPress}
          markedDates={markedDates}
          markingType="custom"
          theme={{
            'stylesheet.day.single': {
              base: {
                width: 32,
                height: 32,
                alignItems: 'center',
              },
              text: {
                marginTop: -2,
                fontSize: 20,
                lineHeight: 20,
              },
            },
          }}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => {
            setModalVisible(!isModalVisible);
          }}
        >
          <View style={styles.modalContent}>
            <CheckBox value={periodEndsToday} onValueChange={setPeriodEndsToday} />
            <Text>¿Termina tu periodo hoy?</Text>

            <View>
              <Text>Nivel de flujo:</Text>
              {[1, 2, 3, 4].map(level => (
                <FlowLevelIndicator key={level} level={level} />
              ))}
            </View>

            <View>
              <TouchableOpacity style={styles.button} onPress={() => setSexualActivity('protected')}>
                <Text style={styles.buttonText}>Con protección</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => setSexualActivity('unprotected')}>
                <Text style={styles.buttonText}>Sin protección</Text>
              </TouchableOpacity>
            </View>

            <Text>Notas:</Text>
            <TextInput
              value={notes}
              onChangeText={setNotes}
              style={styles.notesInput}
            />

            <TouchableOpacity style={styles.button} onPress={saveDayInfo}>
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <Text style={styles.label}>Fecha de último periodo:</Text>
        <TextInput
          value={lastPeriodDate}
          onChangeText={setLastPeriodDate}
          style={styles.input}
          placeholder="AAAA-MM-DD"
        />
        <Text style={styles.label}>Longitud del ciclo (días):</Text>
        <TextInput
          value={cycleLength}
          onChangeText={setCycleLength}
          style={styles.input}
          keyboardType="numeric"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  modalContent: {
    margin: 20,
    backgroundColor: 'white',
    padding: 35,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#6c5ce7',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  flowLevelText: {
    fontSize: 24,
  },
  flowLevelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  notesInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginTop: 5,
    marginBottom: 15,
    borderRadius: 5,
  },
  label: {
    marginTop: 15,
    marginBottom: 5,
    fontWeight: 'bold',
  },
});

export default MenstrualControlScreen;
