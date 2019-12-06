/*global chrome*/

import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Send message from active tab to background: 
    chrome.runtime.sendMessage("hello", response => {
      console.log(`message from background: ${JSON.stringify(response)}`);
      setMessage(response)
    });

  }, [])

  return (
    <div className="App">
      {message}
    </div>
  );
}

export default App;
