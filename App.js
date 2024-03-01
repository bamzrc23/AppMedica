import React, { useState, useEffect  } from 'react';
import LoginScreen from './src/screens/LoginScreen.js';
import AppNavigator from './src/navigation/AppNavigator.js';
import Toast from 'react-native-toast-message';
import LoginNavigator from './src/navigation/LoginNavigator.js';
import { UserProvider } from './src/usuario.js';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleRegister = () => {

    setIsLoggedIn(true); 
  };

  useEffect(() => {
    // Este es el lugar adecuado para inicializar la referencia de Toast
  }, []);

  return (
    <UserProvider>
      {!isLoggedIn ? (
        <LoginScreen onLogin={handleLogin} onRegister={handleRegister} />
      ) : (

       <AppNavigator/>
       
      )}
      

      <Toast />

    </UserProvider>
  );
};

export default App;

