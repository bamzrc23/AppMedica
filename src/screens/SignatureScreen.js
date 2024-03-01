import React, { useState, useRef } from 'react';
import { 
  View, 
  Modal, 
  Image, 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  Dimensions, 
  Alert, 
  Linking // para abrir URLs
} from 'react-native';
import Signature from 'react-native-signature-canvas';

const { width, height } = Dimensions.get('window');

const SignatureScreen = () => {
  const ref = useRef();
  const [signature, setSignature] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleOK = (signature) => {
    setSignature(signature);
    setModalVisible(true);
  };

  const handleClear = () => {
    ref.current.clearSignature();
  };

  const addSignatureToPDF = async () => {
    const pdfUrl = 'https://www.saludsapersonas.com/ventaoncocare/Textos/tyc_oncocare.pdf'; // URL de tu PDF
    const signatureBase64 = signature;
    const apiKey = 'matailo68@gmail.com_kh20jlA1XZFfT65QP28tCHwcC1j0b1Bt60ro8M86Sv2G79zo8Rh72k4mc726po2V'; // clave de API

    const apiUrl = 'https://api.pdf.co/v1/pdf/edit/add';

    const data = {
      url: pdfUrl,
      images: [
        {
          url:signatureBase64,
          x: 100,
          y: 550,
          width: 600,
          height: 300,
          pages: "9"
        }
      ]
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify(data),
      });
      const jsonResponse = await response.json();
      if (response.ok) {
        // Manejo de la URL del PDF firmado para abrirla en el navegador
        const signedPdfUrl = jsonResponse.url; // La API devuelve la URL en esta propiedad
        console.log("PDF firmado disponible en:", signedPdfUrl);
        Linking.openURL(signedPdfUrl).catch(err => {
          console.error("No se pudo abrir el PDF:", err);
        });
      } else {
        throw new Error(jsonResponse.message || "Error al agregar la firma al PDF");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Signature
        ref={ref}
        onOK={handleOK}
        descriptionText="Firma"
        clearText="Limpiar"
        confirmText="Confirmar"
        webStyle={`
          .m-signature-pad--footer { display: none; margin: 0px; }
          canvas { width: ${width}px !important; height: ${height}px !important; }
        `}
      />
      <TouchableOpacity style={[styles.buttonLimpiar]} onPress={handleClear}>
        <Text style={styles.textStyle}>Limpiar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonConfirm} onPress={() => ref.current.readSignature()}>
        <Text style={styles.textStyle}>Confirmar Firma</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonAddToPDF} onPress={addSignatureToPDF}>
        <Text style={styles.textStyle}>Agregar Firma al PDF</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image style={styles.signatureImage} source={{ uri: signature }} />
            <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(false)}>
              <Text style={styles.textStyle}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  buttonConfirm: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
  },
  buttonLimpiar: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
  },
  buttonAddToPDF: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: "#4CAF50",
    borderRadius: 20,
    padding: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  signatureImage: {
    width: 300,
    height: 200,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
    backgroundColor: "#2196F3",
  },
});

export default SignatureScreen;
