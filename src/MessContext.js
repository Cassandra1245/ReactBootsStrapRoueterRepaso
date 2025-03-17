import React, { createContext, useEffect, useState } from 'react';

const MessContext = createContext();

export const MessProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [usuario, setUsuario] = useState("")
  
    useEffect(() => {
      const loadMessages = async () => {
        const response = await fetch('./mensajes.json');
        const json = await response.json();
        setMessages(json.chats);
        setUsuario(json.usuario_propietario);
      };
      loadMessages();
    }, []);


  return (
    <MessContext.Provider value={{ messages, usuario, setMessages }}>
      {children}
    </MessContext.Provider>
  );
};

export default MessContext;