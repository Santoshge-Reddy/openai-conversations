import React, { useState } from 'react';
import axios from 'axios';

const OPENAI_API_KEY = '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';

const Chatbot = () => {
  const [conversationId, setConversationId] = useState('');
  const [conversationHistory, setConversationHistory] = useState([]);
  const [input, setInput] = useState('');

  const handleChange = event => {
    setInput(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/conversations/',
        {
          prompt: input,
          conversation_id: conversationId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );

      setConversationId(response.data.conversation_id);
      setConversationHistory([...conversationHistory, input, response.data.text]);
      setInput('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={input} onChange={handleChange} />
        <button type="submit">Send</button>
      </form>
      <div>
        {conversationHistory.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
    </div>
  );
};

export default Chatbot;
