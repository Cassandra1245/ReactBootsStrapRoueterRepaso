import './App.css';
import React, { useContext } from 'react';
import { Row, Col, Container, Card, ListGroup, Carousel } from "react-bootstrap";
import MessContext from './MessContext';
import Menu from './Menu.js'
import { useParams } from "react-router-dom";

function MessContacto() {
  const { messages } = useContext(MessContext);
  const { filtro } = useParams();
 /*
  const mensajesFiltrados = messages.filter(mensaje =>
    mensaje.contacto === filtro
  );

   
    === FILTRAR POR EMISOR ===
    Si en lugar de filtrar por "contacto" quisiéramos filtrar por "emisor",
    tendríamos que recorrer cada chat y obtener solo los mensajes donde el emisor coincida.
   */
    const mensajesFiltrados = messages.filter(chat => 
      chat.mensajes.some(chatting => chatting.emisor === filtro)
    );
    
   

  /*  
    === FILTRAR SOLO LOS MENSAJES DEL EMISOR "Ryan" ===
    En este caso, mostramos solo los mensajes enviados por Ryan sin importar el contacto.
  
  const mensajesDeRyan = messages.flatMap(chat =>
    chat.mensajes.filter(conversacion => conversacion.emisor === "Ryan")
  );
  */

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
        </Container>
      </header>
    </div>
  );


}

export default MessContacto;
