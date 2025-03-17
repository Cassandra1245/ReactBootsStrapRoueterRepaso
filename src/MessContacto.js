import './App.css';
import React, { useContext, useState } from 'react';
import { Row, Col, Container, Card, ListGroup, Form, Button } from "react-bootstrap";
import MessContext from './MessContext';
import Menu from './Menu.js';
import { useParams } from "react-router-dom";

function MessContacto() {
  const { messages, setMessages } = useContext(MessContext); 
  const { filtro } = useParams();

  const mensajesFiltrados = messages.filter(mensaje =>
    mensaje.contacto === filtro
  );

  const [mensaje, setMensaje] = useState('');

  const handleInputChange = (event) => {
    setMensaje(event.target.value);
  };

  const crearmensaje = (mensaje) => {

    const nuevoMensaje = {
      "emisor": "Ryan",
      "contenido": mensaje,
      "timestamp": new Date().toISOString(),
      "estado": "entregado"
    };

   
    alert(`Mensaje creado: ${JSON.stringify(nuevoMensaje)}`);

    // Lógica para agregar el mensaje al estado global
    // Este es un ejemplo de cómo podrías actualizar el estado global de los mensajes
    setMessages(prevMessages => {
      return prevMessages.map(chat => {
        if (chat.contacto === filtro) {
          // Añadimos el nuevo mensaje al array de mensajes del contacto correspondiente
          return {
            ...chat,
            mensajes: [...chat.mensajes, nuevoMensaje]
          };
        }
        return chat;
      });
    });

    setMensaje(""); // Limpiamos el input después de enviar el mensaje
  };

  return (
    <div className="App">
      <Menu />

      <header className="App-header">
        <Container>

          <Row>
            {mensajesFiltrados.map((chat) => (
              chat.mensajes.map((conversacion) => (
                <Col xs={12} sm={6} md={4} xl={4} key={conversacion.timestamp}>
                  <Card className="m-3">
                    <Card.Header>
                      <Card.Title>
                        <p>{chat.contacto} chatting with {conversacion.emisor}</p>
                      </Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <ListGroup className="list-group-flush">
                        <ListGroup.Item>{conversacion.contenido}</ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                    <Card.Footer className="text-muted">
                      <p>{conversacion.timestamp}: {conversacion.estado}</p>
                    </Card.Footer>
                  </Card>
                </Col>
              ))
            ))}
          </Row>

          {/* Campo para escribir mensaje */}
          <Form>
            <Form.Group controlId="mensaje">
              <Form.Label>Escribe un mensaje</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={mensaje}
                onChange={handleInputChange}
                placeholder="Escribe aquí tu mensaje..."
              />
            </Form.Group>
            <Button variant="primary" onClick={() => crearmensaje(mensaje)}>
              Enviar
            </Button>
          </Form>

        </Container>
      </header>
    </div>
  );
}

export default MessContacto;

