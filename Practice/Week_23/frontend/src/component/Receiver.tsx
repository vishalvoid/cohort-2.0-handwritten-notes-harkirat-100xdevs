import React, { useEffect, useRef } from "react";

const Receiver: React.FC = () => {
  const videoref = useRef<HTMLVideoElement>(null);
  //
  useEffect(() => {
    const socket = new WebSocket("ws:localhost:8080");
    socket.onopen = () => {
      socket.send(JSON.stringify({ type: "receiver" }));
    };

    socket.onmessage = async (event) => {
      const message = JSON.parse(event.data);
      let pc: RTCPeerConnection | null = null;
      if (message.type === "createOffer") {
        pc = new RTCPeerConnection();
        pc.setRemoteDescription(message.sdp);

        pc.onicecandidate = (event) => {
          if (event.candidate) {
            socket.send(JSON.stringify({ type: "iceCandidate", candidate: event.candidate }));
          }
        };

        pc.ontrack = (event) => {
          if (videoref.current) {
            videoref.current.srcObject = new MediaStream([event.track]);
            videoref.current.play().catch((error) => console.error("Error playing video:", error));
          }
        };

        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.send(JSON.stringify({ type: "createAnswer", sdp: pc.localDescription }));
      } else if (message.type === "iceCandidate") {
        if (pc) {
          // @ts-ignore
          pc.addIceCandidate(message.candidate);
        }
      }
    };
  }, []);
  //
  return (
    <div>
      <h1>Receiver</h1>
      <video ref={videoref} autoPlay playsInline></video>
    </div>
  );
};

export default Receiver;
