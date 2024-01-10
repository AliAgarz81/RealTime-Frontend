import { Container, Row, Col } from 'react-bootstrap';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import WaitingRoom from './components/WaitingRoom';
import { useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import ChatRoom from './components/ChatRoom';

function App() {
  const [conn, setConn] = useState();
  const [messages, setMessages] = useState([]);
  const joinChatRoom = async (username, chatroom) => {
    try{
      const conn = new HubConnectionBuilder()
                      .withUrl("http://localhost:5265/chat")
                      .configureLogging(LogLevel.Information)
                      .build();
      conn.on("JoinSpecificChatRoom", (username, msg) => {
        setMessages(messages => [...messages, { username, msg }]);
        console.log("msg : ", msg)
      });

      conn.on("ReceiveSpecificMessage", (username, msg) =>{
        setMessages(messages => [...messages, { username, msg }]);
        console.log(messages);
      });

      await conn.start();
      await conn.invoke("JoinSpecificChatRoom", {username, chatroom});

      setConn(conn);
    }catch(e){
      console.log(e);
    }
  }

  const sendMessage = async (message) => {
    try{
      await conn.invoke("SendMessage", message);
    }catch(e){
      console.log(e);
    }
  }

  return (
    <div>
       <main>
        <Container>
          <Row className="px-5 my-5">
            <Col sm='12'>
                <h1 className='font-weight-light'>Hello to the Chat App</h1>
            </Col>
          </Row>
          { !conn
           ? <WaitingRoom joinChatRoom={joinChatRoom}></WaitingRoom>
           : <ChatRoom messages={messages} sendMessage={sendMessage}></ChatRoom>
          }
        </Container>
       </main>
    </div>
  );
}

export default App;
