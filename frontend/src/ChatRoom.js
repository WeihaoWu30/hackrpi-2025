import { useState } from "react";
import "./App.css";

function ChatRoom() {
  const [chatHistory, setChatHistory] = useState([]);
  const [people, setPeople] = useState([]);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (message.trim()) {
      // remove hitespace
      // Add message to chat history
      const newMessage = {
        text: message,
        sender: "You",
        timestamp: new Date().toLocaleTimeString(),
      };

      setChatHistory((prev) => [...prev, newMessage]);
      setMessage(""); // Clear input
    }
  };

  const updateMessage = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div>
      <form className="chatBar" onSubmit={handleSubmit}>
        {" "}
        <label>
          <input
            type="text"
            name="message"
            value={message}
            placeholder="Enter message"
            onChange={updateMessage}
          />
        </label>
        <button type="submit">Send</button> 
        {/* placeholder button */}
      </form>
    </div>
  );
}

export default ChatRoom;
