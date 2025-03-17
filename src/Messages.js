import './App.css';
import React, { useContext, useState } from 'react';
import { Row, Col, Container, Card, ListGroup, Carousel, Modal, Button, Accordion } from "react-bootstrap";
import MessContext from './MessContext';
import Menu from './Menu.js';

function Messages() {
  const { messages, usuario } = useContext(MessContext);

  const [showModals, setShowModals] = useState({});

  const handleShow = (timestamp) => {
    setShowModals((prev) => ({ ...prev, [timestamp]: true }));
  };

  const handleClose = (timestamp) => {
    setShowModals((prev) => ({ ...prev, [timestamp]: false }));
  };

  return (
    <div className="App">
      <Menu />

      <header className="App-header">
        <Container>

          <h1>Whattsap de {usuario}</h1>
          <Carousel >
            {messages.map((chat) => (
              chat.mensajes.map((conversacion) => (
                <Carousel.Item
                  style={{
                    backgroundImage: chat.contacto === "Kelly"
                      ? 'url(/persona1.jpg)'
                      : 'url(/persona2.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100vh',
                  }}
                >
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
                      <Button variant="primary" onClick={() => handleShow(conversacion.timestamp)}>
                        Ver Detalles
                      </Button>
                    </Card.Footer>
                  </Card>
                </Carousel.Item>
              ))
            ))}
          </Carousel>

          <Row>
            {messages.map((chat) => (
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
                      <Button variant="primary" onClick={() => handleShow(conversacion.timestamp)}>
                        Ver Detalles
                      </Button>
                    </Card.Footer>

                    <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>Ver Detalles</Accordion.Header>
                      <Accordion.Body>
                        <p><strong>Emisor:</strong> {conversacion.emisor}</p>
                        <p><strong>Contenido:</strong> {conversacion.contenido}</p>
                        <p><strong>Timestamp:</strong> {conversacion.timestamp}</p>
                        <p><strong>Estado:</strong> {conversacion.estado}</p>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>

                  </Card>

                  {/* Modal para mostrar los detalles del mensaje */}
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
