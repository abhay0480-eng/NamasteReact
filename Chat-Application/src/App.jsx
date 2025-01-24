import React, { useState, useEffect, useReducer, useRef } from 'react';

// Mock WebSocket connection (replace with real WS backend)
class MockWebSocket {
  constructor(url) {
    this.url = url;
    this.listeners = { message: [], open: [] };
    setTimeout(() => this.triggerOpen(), 100); // Simulate connection
  }

  triggerOpen() {
    this.listeners.open.forEach(cb => cb());
  }

  send(data) {
    // Simulate receiving echoed message
    setTimeout(() => {
      const message = JSON.parse(data);
      this.listeners.message.forEach(cb => cb({ data: JSON.stringify(message) }));
    }, 100);
  }

  addEventListener(event, callback) {
    this.listeners[event].push(callback);
  }
}

// Reducer for chat state
const chatReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'SET_USERS':
      return { ...state, users: action.payload };
    case 'SET_TYPING':
      return { ...state, typingUser: action.payload };
    default:
      return state;
  }
};

const ChatApp = () => {
  const [state, dispatch] = useReducer(chatReducer, {
    messages: [],
    users: [],
    typingUser: null
  });
  const [message, setMessage] = useState('');
  const [username] = useState('User_' + Math.floor(Math.random() * 1000));
  const ws = useRef(null);
  const typingTimeout = useRef(null);

  // Connect to WebSocket
  useEffect(() => {
    ws.current = new MockWebSocket('ws://dummy-chat-server.com');
    ws.current.addEventListener('message', handleIncomingMessage);
    return () => ws.current.close();
  }, []);

  // Handle incoming messages
  const handleIncomingMessage = (e) => {
    const data = JSON.parse(e.data);
    switch (data.type) {
      case 'message':
        dispatch({ type: 'ADD_MESSAGE', payload: data });
        break;
      case 'users':
        dispatch({ type: 'SET_USERS', payload: data.users });
        break;
      case 'typing':
        dispatch({ type: 'SET_TYPING', payload: data.user });
        setTimeout(() => dispatch({ type: 'SET_TYPING', payload: null }), 2000);
        break;
    }
  };

  // Send message
  const sendMessage = () => {
    if (!message.trim()) return;
    ws.current.send(JSON.stringify({
      type: 'message',
      user: username,
      text: message,
      timestamp: new Date().toISOString()
    }));
    setMessage('');
  };

  // Send typing indicator (debounced)
  const sendTypingIndicator = () => {
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    ws.current.send(JSON.stringify({ type: 'typing', user: username }));
    typingTimeout.current = setTimeout(() => {
      ws.current.send(JSON.stringify({ type: 'typing', user: null }));
    }, 2000);
  };

  return (
    <div className="chat-container">
      <div className="online-users">
        <h3>Online Users ({state.users.length})</h3>
        <ul>
          {state.users.map(user => <li key={user}>{user}</li>)}
        </ul>
      </div>

      <div className="chat-messages">
        {state.messages.map((msg, i) => (
          <div key={i} className="message">
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        ))}
        {state.typingUser && (
          <div className="typing-indicator">{state.typingUser} is typing...</div>
        )}
      </div>

      <div className="message-input">
        <input
          type="text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            sendTypingIndicator();
          }}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatApp;