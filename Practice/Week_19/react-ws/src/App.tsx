import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const [latestmessage, setlatestmessage] = useState("");

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socket.onopen = () => {
      console.log("WebSocket connection established. Ready to send and receive data.");
      setSocket(socket);
    };
    socket.onmessage = (event) => {
      console.log("Message received:", event.data);
      setlatestmessage(event.data);
    };
  }, []);

  if (!socket) {
    return <div>Connecting to a socket server...</div>;
  }

  return (
    <>
      <input></input>
      <button onClick={() => socket.send("hello world from frontend")}>Send</button>
      {latestmessage}
    </>
  );
}

export default App;
