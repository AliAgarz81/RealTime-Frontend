import React from 'react';

const MessageContainer = ({ messages }) => {
  return (
    <table>
        {messages.map((msg, index) => (
          <tr key={index}>
            <td>{msg.msg} - {msg.username}</td>
          </tr>
        ))}
    </table>
  );
};

export default MessageContainer;
