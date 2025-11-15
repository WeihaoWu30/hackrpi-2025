import express from "express";
import router from "./routers/router.js";
import http from "http";
import morgan from "morgan";
import { WebSocketServer, WebSocket } from "ws";

const app = express();
const server = http.createServer(app); 
const wss = new WebSocketServer({ server });
const port = 3000;

// express
app.use(express.json());
app.use(morgan("dev"));
app.use("/api", router);

const clientMapper = new Map();
wss.on("connection", (ws) => {
   console.log("Connection Established.");

   ws.on("message", (msg) => {
      let data;
      try {
         data = JSON.parse(msg);
      } catch(e) {
         console.log("Error Parsing Data: ", e.message);
         return;
      }

      if(data.type === "register") {
         ws.physicianName = data.src;
         clientMapper.set(data.src, ws);
         return;
      }
      else if(data.type === "message") {
         if(!ws.physicianName) {
            console.log("Sender is not online");
            ws.send(JSON.stringify({
               type: "ERROR",
               content: data.src + " is not online",
            }));
         }

         const recipient = clientMapper.get(data.dst);

         if(recipient && recipient.readyState === WebSocket.OPEN) {
            const payload = {
               dst: recipient.physicianName,
               src: ws.physicianName,
               type: "new_message",
               message: data.message,
            };
            recipient.send(JSON.stringify(payload));
         } else {
            console.log("Recipient not online");
            ws.send(JSON.stringify({
               type: "ERROR",
               content: "Recipient " + data.dst + " is not online",
            }));
         }
      };
   });

   ws.on("close", () => {
      if(ws.physicianName) {
         clientMapper.delete(ws.physicianName);
         console.log("Connected Ended with", ws.physicianName);
         return;
      }
   });
});

// deploy
server.listen(port, () => {
   console.log("Listening on PORT", port);
});

