import React, { createContext, useState, useContext } from 'react';
import receta1Image from './img/receta.jpg';
import receta1Image2 from './img/receta2.jpg';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  // Inicializa el estado con un arreglo de usuarios
  const [users, setUsers] = useState([
    // Primer usuario
    {
      name: 'Maria Pérez',
      email: 'maria@ejemplo.com',
      password: '123456789',
      rol: 'paciente',
      profilePictureUrl: 'https://www.kino-teatr.ru/acter/photo/5/2/579225/1285720.jpg',
      appointments: [],
      prescriptions: [
        { imageUrl: 'https://www.partesdel.com/wp-content/uploads/Datos-del-medico.jpg', recetaDescription: "receta del 12/02/2024", medicoReceta: "Dr. Jorge Carrion"},
      ],
    },
    // Segundo usuario
    {
      name: 'Jimena Chapa',
      email: 'jimena@ejemplo.com',
      password: '123456789',
      rol: 'asistente',
      profilePictureUrl: 'https://www.kino-teatr.ru/acter/photo/5/2/579225/1285720.jpg',
      appointments: [],
      prescriptions: [
        { imageUrl: receta1Image2, recetaDescription: "receta del 18/02/2024", medicoReceta: "Dra. Manuela Pinto"},
      ],
    }
  ]);

      // funcion para cerrar secion 
    const logoutUser = () => {
      setCurrentUser(null);
    };

  /*const updateUser = (userIndex, userInfo) => {
    setUsers((prevUsers) => {
      const newUsers = [...prevUsers];
      newUsers[userIndex] = { ...newUsers[userIndex], ...userInfo };
      return newUsers;
    });
  }*/

  const [currentUser, setCurrentUser] = useState(null);

  const updateUser = (userIndex, userInfo) => {
    setUsers(prevUsers => {
      const newUsers = [...prevUsers];
      newUsers[userIndex] = { ...newUsers[userIndex], ...userInfo };
      return newUsers;
    });
  };

  const loginUser = (email, password) => {
    const userFound = users.find(user => user.email === email && user.password === password);
    if (userFound) {
      setCurrentUser(userFound);
      return true;
    }
    return false;
  };

  return (
    <UserContext.Provider value={{ users, updateUser, currentUser, loginUser, logoutUser  }}>
      {children}
    </UserContext.Provider>
  );
};
