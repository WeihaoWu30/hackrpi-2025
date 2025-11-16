import express from "express";
import router from "./routers/router.js";
import http from "http";
import morgan from "morgan";
import { WebSocketServer } from "ws";
import { handleSockets } from "./websockets/handler.js"
import cors from "cors";

const app = express();
const server = http.createServer(app); 
const wss = new WebSocketServer({ server });
const port = 3000;

// express
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/api", router);

// web sockets
handleSockets(wss);

// deploy
server.listen(port, () => {
   console.log("Listening on PORT", port);
});

