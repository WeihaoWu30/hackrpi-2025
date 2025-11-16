import { useEffect, useState } from "react";
import "./App.css";
import { Header } from "./Components/Header";

function ChatRoom() {
  const [chatHistory, setChatHistory] = useState([]);
  const [message, setMessage] = useState("");
  const recipient = "Dr. Jeffrey Combs";
  const sender = "Dr. Sean Adams"
  const ws = new WebSocket("ws://localhost:3000");

  useEffect(() => {
   const fetch = async() => {
      const res = await fetch(process.env.REACT_APP_BACKEND + `/message?src=${"You"}&dst=${sender}`)
   };
  }, []);
   ws.onopen = () => {
      console.log("WebSocket connected");
      const newMessage = {
         type: "register",
         src: sender,
      };
      ws.send(JSON.stringify(newMessage))
   };

   ws.onmessage = (msg) => {
      const data = JSON.parse(msg);
      setChatHistory(prev => [...prev, data]);
   };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (message.trim()) {
      const newMessage = {
        message,
        src: sender,
        timestamp: new Date().toLocaleTimeString(),
        type: "message",
        dst: recipient,
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
   <Header>
      <div>
            <div className="people-online">
            <h3>{recipient}</h3>
            </div>

            <div className="chat-messages">
            {chatHistory.map((msg, index) => (
               <div key={index} className="message">
                  <strong>{msg.src}</strong>
                  <p>{msg.message}</p>
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
   </Header>
    
  );
}

export default ChatRoom;
