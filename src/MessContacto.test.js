// src/__tests__/MessContacto.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MessContacto from '../MessContacto';
import { MemoryRouter, Route } from 'react-router-dom'; // Para simular la navegación
import MessContext from '../MessContext';

// Mock para los datos de los mensajes
const mockMessages = [
  {
    contacto: 'Juan',
    mensajes: [
      {
        emisor: 'Ryan',
        contenido: 'Hola Juan',
        timestamp: '2025-03-17T10:00:00Z',
        estado: 'entregado',
      },
    ],
  },
  {
    contacto: 'Pedro',
    mensajes: [
      {
        emisor: 'Ryan',
        contenido: 'Hola Pedro',
        timestamp: '2025-03-17T11:00:00Z',
        estado: 'entregado',
      },
    ],
  },
];

describe('MessContacto', () => {
  // Función de configuración para el renderizado del componente con contexto y enrutamiento
  const renderWithContext = (filtro) => {
    render(
      <MemoryRouter initialEntries={[`/contacto/${filtro}`]}>
        <MessContext.Provider value={{ messages: mockMessages, setMessages: jest.fn() }}>
          <Route path="/contacto/:filtro">
            <MessContacto />
          </Route>
        </MessContext.Provider>
      </MemoryRouter>
    );
  };

  test('debería renderizar el componente correctamente', () => {
    renderWithContext('Juan');
    expect(screen.getByText('Lista de Mensajes')).toBeInTheDocument(); // Asegúrate de que el encabezado esté en el DOM
  });

  test('debería filtrar los mensajes según el contacto', () => {
    renderWithContext('Juan');
    
    // Comprobamos que solo el mensaje de "Juan" está visible
    expect(screen.getByText('Hola Juan')).toBeInTheDocument();
    expect(screen.queryByText('Hola Pedro')).not.toBeInTheDocument();
  });

  test('debería actualizar el valor del mensaje cuando el usuario escribe en el campo de texto', () => {
    renderWithContext('Juan');
    
    // Localizamos el campo de entrada y verificamos su valor inicial
    const inputField = screen.getByPlaceholderText('Escribe aquí tu mensaje...');
    expect(inputField).toHaveValue('');
    
    // Simulamos la escritura en el campo de texto
    fireEvent.change(inputField, { target: { value: 'Nuevo mensaje' } });
    
    // Verificamos que el valor del campo de texto ha cambiado
    expect(inputField).toHaveValue('Nuevo mensaje');
  });

  test('debería agregar un nuevo mensaje cuando el usuario hace clic en "Enviar"', async () => {
    const setMessages = jest.fn(); // Mock de la función setMessages
    render(
      <MemoryRouter initialEntries={['/contacto/Juan']}>
        <MessContext.Provider value={{ messages: mockMessages, setMessages }}>
          <Route path="/contacto/:filtro">
            <MessContacto />
          </Route>
        </MessContext.Provider>
      </MemoryRouter>
    );

    // Localizamos el campo de entrada y el botón de enviar
    const inputField = screen.getByPlaceholderText('Escribe aquí tu mensaje...');
    const sendButton = screen.getByText('Enviar');
    
    // Simulamos la escritura de un mensaje
    fireEvent.change(inputField, { target: { value: 'Nuevo mensaje' } });
    
    // Simulamos el clic en el botón de enviar
    fireEvent.click(sendButton);
    
    // Esperamos a que el mensaje sea agregado
    await waitFor(() => {
      expect(setMessages).toHaveBeenCalledTimes(1); // Verificamos que se haya llamado a setMessages
    });

    // Verificamos que la función setMessages haya sido llamada con el nuevo mensaje
    expect(setMessages).toHaveBeenCalledWith(expect.any(Function));
  });
});
