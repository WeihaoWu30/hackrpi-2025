import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.js";
import { WebSocket } from "ws";

const clientMapper = new Map();
export const handleSockets = (wss) => {
   wss.on("connection", (ws) => {
      console.log("Connection Established.");

      ws.on("message", async (msg) => {
         let data;
         try {
            data = JSON.parse(msg);
         } catch(e) {
            console.log("Error Parsing Data: ", e.message);
            return;
         }
         for(const [key, value] of clientMapper) {
            console.log(key + " is Talking");
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
                  timestamp: data.timestamp,
               };
               console.log(payload);
               const sortedField = [recipient.physicianName, ws.physicianName].sort();
               const collectionRef = collection(db, "messages");
               const docRef = await addDoc(collectionRef, {
                  ...payload,
                  chatID: sortedField, 
               });
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

      ws.send("Welcome To WebSocket!");
   });
}
