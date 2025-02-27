import express from "express";
import { WebSocketServer } from "ws";

const app = express();
const httpServer = app.listen(8080);

const wss = new WebSocketServer({ server: httpServer });

wss.on("connection", function connection(ws) {
  ws.on("message", function message(data, message) {
    console.log("received: %s", data);
  });
});
 