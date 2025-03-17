import './App.css';
import React, { useContext } from 'react';
import { Row, Col, Container, Card, ListGroup, Carousel } from "react-bootstrap";
import MessContext from './MessContext';
import Menu from './Menu.js'

function Messages() {
  const { messages, usuario } = useContext(MessContext);

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
                      : 'url(/persona2.jpg)'
                        ? 'url(/persona2.jpg)'
                        : '', //
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
                    </Card.Footer>
                  </Card>
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
