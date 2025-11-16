import { useState } from "react";
import "./App.css";

function ChatRoom() {
  const [chatHistory, setChatHistory] = useState([]);
  const [people, setPeople] = useState([]);
  const [message, setMessage] = useState("");
  const ws = new WebSocket("ws://localhost:3001");
  const [sender, setSender] = useState("");
  const [recievedMessage, setRecievedMessage] = useState("");

  const linkPeople = async () => {
    ws.onopen = () => {
      console.log("WebSocket connected");
      const newMessage = {
        type: "register",
        src: "You",
      };
    };

    ws.onmessage = async (msg) => {
      const message = JSON.parse(msg);
      setSender(message.src);
      setRecievedMessage(message.message);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (message.trim()) {
      const newMessage = {
        message,
        src: sender,
        timestamp: new Date().toLocaleTimeString(),
        type: "message",
        dst: "Other Person",
      };
      ws.send(newMessage);
      setChatHistory((prev) => [...prev, newMessage]);
      setMessage("");
    }
  };

  const updateMessage = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div>
      <div className="people-online">
        <h3>Online ({people.length})</h3>
        {people.map((person, index) => (
          <span key={index} className="person">
            {person}
          </span>
        ))}
      </div>

      <div className="chat-messages">
        {chatHistory.map((msg, index) => (
          <div key={index} className="message">
            <strong>{msg.src}</strong>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>

      <form className="chatBar" onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            name="message"
            value={message}
            onChange={updateMessage}
            placeholder="Enter message"
            className="chatText"
          />
        </label>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatRoom;
