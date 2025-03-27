import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

let senderSocket: null | WebSocket = null;
let receiveSocket: null | WebSocket = null;

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", function message(data: any) {
    const message = JSON.parse(data);
    if (message.type === "sender") {
      senderSocket = ws;
      console.log("sender set");
    } else if (message.type === "receiver") {
      receiveSocket = ws;
      console.log("receiver set");
    } else if (message.type === "createOffer") {
      receiveSocket?.send(JSON.stringify({ type: "createOffer", sdp: message.sdp }));
      console.log("offer created");
    } else if (message.type === "createAnswer") {
      senderSocket?.send(JSON.stringify({ type: "createAnswer", sdp: message.sdp }));
      console.log("answer created");
    } else if (message.type === "iceCandidate") {
      if (ws === senderSocket) {
        receiveSocket?.send(JSON.stringify({ type: "iceCandidate", candidate: message.candidate }));
        console.log("icecandidate sender side");
      } else if (ws === receiveSocket) {
        senderSocket?.send(JSON.stringify({ type: "iceCandidate", candidate: message.candidate }));
        console.log("iceCandidate receiver side");
      }
    }
  });

  ws.send("something");
});
