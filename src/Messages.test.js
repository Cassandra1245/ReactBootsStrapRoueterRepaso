// Importación de módulos y dependencias necesarias
import './App.css'; // Archivo de estilo
import React, { useContext, useState } from 'react'; // Importación de React y hooks necesarios
import { Row, Col, Container, Card, ListGroup, Carousel, Modal, Button, Accordion } from "react-bootstrap"; // Importación de componentes de Bootstrap
import MessContext from './MessContext'; // Importación del contexto de los mensajes
import Menu from './Menu.js'; // Importación del componente de menú

function Messages() {
  // Usamos useContext para obtener el estado global de los mensajes y el usuario desde el contexto
  const { messages, usuario } = useContext(MessContext);

  // Estado para manejar la visibilidad de los modales de cada mensaje
  const [showModals, setShowModals] = useState({});

  // Función para mostrar un modal de detalles de un mensaje específico, basado en su timestamp
  const handleShow = (timestamp) => {
    setShowModals((prev) => ({ ...prev, [timestamp]: true }));
  };

  // Función para cerrar un modal de detalles de mensaje específico
  const handleClose = (timestamp) => {
    setShowModals((prev) => ({ ...prev, [timestamp]: false }));
  };

  return (
    <div className="App">
      {/* Componente Menu para la navegación */}
      <Menu />

      <header className="App-header">
        <Container>
          {/* Título principal que muestra el nombre de usuario */}
          <h1>Whattsap de {usuario}</h1>

          {/* Carrusel de Bootstrap para mostrar los mensajes en formato de deslizamiento */}
          <Carousel>
            {/* Iteramos sobre los mensajes de cada chat */}
            {messages.map((chat) => (
              chat.mensajes.map((conversacion) => (
                <Carousel.Item
                  style={{
                    // Se establece el fondo dinámico del carrusel según el contacto
                    backgroundImage: chat.contacto === "Kelly"
                      ? 'url(/persona1.jpg)'
                      : 'url(/persona2.jpg)',
                    backgroundSize: 'cover', // Fondo cubriendo todo el contenedor
                    backgroundPosition: 'center', // Fondo centrado
                    height: '100vh', // Altura total de la ventana
                  }}
                >
                  {/* Card de Bootstrap para mostrar la información del mensaje */}
                  <Card className="m-3">
                    <Card.Header>
                      <Card.Title>
                        {/* Título que muestra el contacto y el emisor del mensaje */}
                        <p>{chat.contacto} chatting with {conversacion.emisor}</p>
                      </Card.Title>
                    </Card.Header>
                    <Card.Body>
                      {/* Lista de mensajes en el cuerpo de la carta */}
                      <ListGroup className="list-group-flush">
                        <ListGroup.Item>{conversacion.contenido}</ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                    <Card.Footer className="text-muted">
                      {/* Pie de la carta con la hora y el estado del mensaje */}
                      <p>{conversacion.timestamp}: {conversacion.estado}</p>
                      {/* Botón para mostrar el modal con más detalles del mensaje */}
                      <Button variant="primary" onClick={() => handleShow(conversacion.timestamp)}>
                        Ver Detalles
                      </Button>
                    </Card.Footer>
                  </Card>
                </Carousel.Item>
              ))
            ))}
          </Carousel>

          {/* Sección de mensajes mostrada en una cuadrícula (Row y Col de Bootstrap) */}
          <Row>
            {messages.map((chat) => (
              chat.mensajes.map((conversacion) => (
                <Col xs={12} sm={6} md={4} xl={4} key={conversacion.timestamp}>
                  {/* Card para cada conversación */}
                  <Card className="m-3">
                    <Card.Header>
                      <Card.Title>
                        {/* Título que muestra el contacto y el emisor */}
                        <p>{chat.contacto} chatting with {conversacion.emisor}</p>
                      </Card.Title>
                    </Card.Header>
                    <Card.Body>
                      {/* Lista de contenido de cada mensaje */}
                      <ListGroup className="list-group-flush">
                        <ListGroup.Item>{conversacion.contenido}</ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                    <Card.Footer className="text-muted">
                      {/* Muestra la hora y estado del mensaje */}
                      <p>{conversacion.timestamp}: {conversacion.estado}</p>
                      {/* Botón para abrir el modal de detalles */}
                      <Button variant="primary" onClick={() => handleShow(conversacion.timestamp)}>
                        Ver Detalles
                      </Button>
                    </Card.Footer>

                    {/* Accordion de Bootstrap para mostrar más detalles */}
                    <Accordion defaultActiveKey="0">
                      <Accordion.Item eventKey="1">
                        <Accordion.Header>Ver Detalles</Accordion.Header>
                        <Accordion.Body>
                          {/* Cuerpo del acordeón con los detalles del mensaje */}
                          <p><strong>Emisor:</strong> {conversacion.emisor}</p>
                          <p><strong>Contenido:</strong> {conversacion.contenido}</p>
                          <p><strong>Timestamp:</strong> {conversacion.timestamp}</p>
                          <p><strong>Estado:</strong> {conversacion.estado}</p>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>

                  </Card>

                  {/* Modal para ver los detalles de un mensaje */}
                  <Modal show={showModals[conversacion.timestamp] || false} onHide={() => handleClose(conversacion.timestamp)}>
                    <Modal.Header closeButton>
                      <Modal.Title>Detalles del mensaje</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p><strong>Emisor:</strong> {conversacion.emisor}</p>
                      <p><strong>Contenido:</strong> {conversacion.contenido}</p>
                      <p><strong>Timestamp:</strong> {conversacion.timestamp}</p>
                      <p><strong>Estado:</strong> {conversacion.estado}</p>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={() => handleClose(conversacion.timestamp)}>
                        Cerrar
                      </Button>
                    </Modal.Footer>
                  </Modal>

                </Col>
              ))
            ))}
          </Row>

        </Container>
      </header>
    </div>
  );
}

export default Messages;
