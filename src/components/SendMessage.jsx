import React, { useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap';

const SendMessage = ({ sendMessage }) => {
  const [msg, setMsg] = useState('');
  return (
    <Form onSubmit={ e => {
        e.preventDefault();
        sendMessage(msg);
        setMsg('');
    }}>
        <InputGroup className='mb-3'>
            <InputGroup.Text>Chat</InputGroup.Text>
            <Form.Control onChange={e => setMsg(e.target.value)} value={msg} placeholder='Type a Message'></Form.Control>
            <Button type='submit' variant='primary' disabled={!msg}>Send</Button>
        </InputGroup>
    </Form>
  )
}

export default SendMessage