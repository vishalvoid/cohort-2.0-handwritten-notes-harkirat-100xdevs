# Why WebRTC?

WebRTC is the core/only protocol that lets you do `real time media communication` from inside a browser.

We already did this fairly well in a live stream&#x20;

<https://github.com/hkirat/omegle/tree/master>

<https://www.youtube.com/watch?v=0MIsI2xh9Zk>

You use WebRTC for applications that require sub second latency.&#x20;

Examples include

1. Zoom/Google meet (Multi party call)

1) Omegle, teaching (1:1 call)

1. 30FPS games (WebRTC can also send data)

# WebRTC Architecture/jargon

### P2P

WebRTC is a peer to peer protocol. This means the you directly send your media over to the other person without the need of a central server

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fd2ac1dd1-0dee-4a95-ac58-480952eddbe1%2FScreenshot_2024-05-04_at_4.08.18_PM.png?table=block\&id=4c68439d-c7b4-48dc-a1de-6133761f63bb\&cache=v2 "notion image")

💡

You do need a central server for signalling and sometimes for sending media as well (turn). We’ll be discussing this later

### Signalling server

Both the browsers need to exchange their `address` before they can start talking to each other. A `signaling server` is used for that. &#x20;

It is usually a websocket server but can be anything (http)

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fc790a3de-337f-44a8-887a-64a207f7195c%2FScreenshot_2024-05-04_at_4.16.23_PM.png?table=block\&id=7e2e3c43-dc21-45d9-88ef-d0648596f109\&cache=v2 "notion image")

### Stun (Session Traversal Utilities for NAT)

It gives you back your publically accessable IPs. It shows you how the world sees you

Check <https://webrtc.github.io/samples/src/content/peerconnection/trickle-ice/>

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fac6c5d61-a704-4ff5-89e5-5d8d887082e1%2FScreenshot_2024-05-04_at_4.57.40_PM.png?table=block\&id=d8b50e61-842c-41e2-857c-ef2753af011f\&cache=v2 "notion image")

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F3dc43212-493b-44bc-8fb4-7f6d55b16413%2FScreenshot_2024-05-04_at_5.07.21_PM.png?table=block\&id=9294085b-6462-43d7-bde4-24deed58f9b8\&cache=v2 "notion image")

### Ice candidates

ICE (Interactive Connectivity Establishment) candidates are potential networking endpoints that WebRTC uses to establish a connection between peers. Each candidate represents a possible method for two devices (peers) to communicate, usually in the context of real-time applications like video calls, voice calls, or peer-to-peer data sharing.

If two friends are trying to connect to each other in a `hostel wifi` , then they can connect via their private router ice candidates.&#x20;

&#x20;If two people from different countries are trying to connect to each other, then they would connect via their public IPs.

### Turn server

A lot of times, your network doesn’t allow media to come in from `browser 2` . This depends on how restrictive your network is&#x20;

Since the `ice candidate` is discovered by the `stun server`, your network `might` block incoming data from `browser 2` and only allow it from the `stun server`

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F13065925-b2f1-44cf-88d9-714431244257%2FScreenshot_2024-05-04_at_5.13.50_PM.png?table=block\&id=2ff90658-4bea-440e-bd07-c6fe791dbb52\&cache=v2 "notion image")

### Offer

The process of the first browser (the one initiating connection) sending their `ice candidates` to the other side.

### Answer

The other side returning their `ice candidates` is called the answer.

### SDP - Session description protocol

A single file that contains all your&#x20;

1. ice candidates

1) what media you want to send, what protocols you’ve used to encode the media

This is the file that is sent in the `offer` and received in the `answer`

Example

```TypeScript
v=0
o=- 423904492236154649 2 IN IP4 127.0.0.1
s=-
t=0 0
m=audio 49170 RTP/AVP 0
c=IN IP4 192.168.1.101
a=rtpmap:0 PCMU/8000
a=ice-options:trickle
a=candidate:1 1 UDP 2122260223 192.168.1.101 49170 typ host
a=candidate:2 1 UDP 2122194687 10.0.1.1 49171 typ host
a=candidate:3 1 UDP 1685987071 93.184.216.34 49172 typ srflx raddr 10.0.1.1 rport 49171
a=candidate:4 1 UDP 41819902 10.1.1.1 3478 typ relay raddr 93.184.216.34 rport 49172
```

### RTCPeerConnection (pc, peer connection)

<https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection>

This is a class that the browser provides you with which gives you access to the `sdp`, lets you create `answers` / `offers` , lets you send media.

This class hides all the complexity of webrtc from the developer

### Summary

You need a `signaling server`, `stun server` to initiate the webrtc conn b/w the parties. You can kill these once the conn is made.

You need to include a `turn server` incase any of the users are on a restrictive network so you can get back a `turn` ice candidate as well.

# Connecting the two sides

The steps to create a webrtc connection between 2 sides includes -&#x20;

1. Browser 1 creates an `RTCPeerConnection`

1) Browser 1 creates an `offer`

1. Browser 1 sets the `local description` to the offer

1) Browser 1 sends the offer to the other side through the `signaling server`

1. Browser 2 receives the `offer` from the `signaling server`

1) Browser 2 sets the `remote description` to the `offer`

1. Browser 2 creates an `answer`

1) Browser 2 sets the `local description` to be the `answer`

1. Browser 2 sends the `answer` to the other side through the `signaling server`

1) Browser 1 receives the `answer` and sets the `remote description`

This is just to `establish` the `p2p` connection b/w the two parties

To actually send media, we have to&#x20;

1. Ask for camera /mic permissions

1) Get the `audio` and `video` streams

1. Call `addTrack` on the `pc`

1) This would trigger a `onTrack` callback on the other side

# Implementation

We will be writing the code in&#x20;

1. Node.js for the Signaling server. It will be a websocket server that supports 3 types of messages

   1. createOffer
   2. createAnswer
   3. addIceCandidate

1) React + PeerConnectionObject on the frontend

We’re actually building a slightly complex version of [https://jsfiddle.net/rainzhao/3L9sfsvf](https://jsfiddle.net/rainzhao/3L9sfsvf/)

# Backend

* Create an empty TS project, add ws to it

```TypeScript
npm init -y
npx tsc --init
npm install ws @types/ws
```

* Change rootDir and outDir in tsconfig

```TypeScript
"rootDir": "./src",
"outDir": "./dist",
```

* Create a simple websocket server

```TypeScript
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

let senderSocket: null | WebSocket = null;
let receiverSocket: null | WebSocket = null;

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data: any) {
    const message = JSON.parse(data);

  });

  ws.send('something');
});
```

* Try running the server

```
tsc -b
node dist/index.js
```

* Add message handlers

```TypeScript
import { WebSocket, WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

let senderSocket: null | WebSocket = null;
let receiverSocket: null | WebSocket = null;

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data: any) {
    const message = JSON.parse(data);
    if (message.type === 'sender') {
      senderSocket = ws;
    } else if (message.type === 'receiver') {
      receiverSocket = ws;
    } else if (message.type === 'createOffer') {
      if (ws !== senderSocket) {
        return;
      }
      receiverSocket?.send(JSON.stringify({ type: 'createOffer', sdp: message.sdp }));
    } else if (message.type === 'createAnswer') {
        if (ws !== receiverSocket) {
          return;
        }
        senderSocket?.send(JSON.stringify({ type: 'createAnswer', sdp: message.sdp }));
    } else if (message.type === 'iceCandidate') {
      if (ws === senderSocket) {
        receiverSocket?.send(JSON.stringify({ type: 'iceCandidate', candidate: message.candidate }));
      } else if (ws === receiverSocket) {
        senderSocket?.send(JSON.stringify({ type: 'iceCandidate', candidate: message.candidate }));
      }
    }
  });
});
```

That is all that you need for a simple one way communication b/w two tabs

To have both the sides be able to send each other media, and support multiple rooms, see <https://github.com/hkirat/omegle/>

# Frontend

* Create a frontend repo

```TypeScript
npm create vite@latest
```

* Add two routes, one for a `sender` and one for a `receiver`

```TypeScript
import { useState } from 'react'
import './App.css'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { Sender } from './components/Sender'
import { Receiver } from './components/Receiver'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sender" element={<Sender />} />
        <Route path="/receiver" element={<Receiver />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
```

* Remove strict mode in `main.tsx` to get rid of a bunch of webrtc connections locally (not really needed)

- Create components for sender&#x20;

```TypeScript
import { useEffect, useState } from "react"

export const Sender = () => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [pc, setPC] = useState<RTCPeerConnection | null>(null);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080');
        setSocket(socket);
        socket.onopen = () => {
            socket.send(JSON.stringify({
                type: 'sender'
            }));
        }
    }, []);

    const initiateConn = async () => {

        if (!socket) {
            alert("Socket not found");
            return;
        }

        socket.onmessage = async (event) => {
            const message = JSON.parse(event.data);
            if (message.type === 'createAnswer') {
                await pc.setRemoteDescription(message.sdp);
            } else if (message.type === 'iceCandidate') {
                pc.addIceCandidate(message.candidate);
            }
        }

        const pc = new RTCPeerConnection();
        setPC(pc);
        pc.onicecandidate = (event) => {
            if (event.candidate) {
                socket?.send(JSON.stringify({
                    type: 'iceCandidate',
                    candidate: event.candidate
                }));
            }
        }

        pc.onnegotiationneeded = async () => {
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            socket?.send(JSON.stringify({
                type: 'createOffer',
                sdp: pc.localDescription
            }));
        }

        getCameraStreamAndSend(pc);
    }

    const getCameraStreamAndSend = (pc: RTCPeerConnection) => {
        navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
            const video = document.createElement('video');
            video.srcObject = stream;
            video.play();
            // this is wrong, should propogate via a component
            document.body.appendChild(video);
            stream.getTracks().forEach((track) => {
                pc?.addTrack(track);
            });
        });
    }

    return <div>
        Sender
        <button onClick={initiateConn}> Send data </button>
    </div>
}
```

* Create the component for receiver

```TypeScript
import { useEffect } from "react"


export const Receiver = () => {

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080');
        socket.onopen = () => {
            socket.send(JSON.stringify({
                type: 'receiver'
            }));
        }
        startReceiving(socket);
    }, []);

    function startReceiving(socket: WebSocket) {
        const video = document.createElement('video');
        document.body.appendChild(video);

        const pc = new RTCPeerConnection();
        pc.ontrack = (event) => {
            video.srcObject = new MediaStream([event.track]);
            video.play();
        }

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.type === 'createOffer') {
                pc.setRemoteDescription(message.sdp).then(() => {
                    pc.createAnswer().then((answer) => {
                        pc.setLocalDescription(answer);
                        socket.send(JSON.stringify({
                            type: 'createAnswer',
                            sdp: answer
                        }));
                    });
                });
            } else if (message.type === 'iceCandidate') {
                pc.addIceCandidate(message.candidate);
            }
        }
    }

    return <div>

    </div>
}
```

Final code - <https://github.com/100xdevs-cohort-2/week-23-webrtc>

### Assignment

Can you change the code so that

1. A single producer can produce to multiple people?

1) Add room logic.

1. Add two way communication.

1) Replace p2p logic with an SFU (mediasoup)

# Webrtc stats

You can look at a bunch of stats/sdps in `about:webrtc-internals`

A lot of times you ask users to dump stats from here for better debugging

# Using libraries for p2p

As you can see, there is a lot of things we had to know to be able to build a simple app that sends video from one side to another

There are libraries that hide a lot of this complexity (specifically the complexity of the `RTCPeerConnectionObject` from you).

<https://peerjs.com/>

# Other architectures

There are two other popular architectures for doing WebRTC

1. SFU

1) MCU

### Problems with p2p

Doesn’t scale well beyond 3-4 people in the same call

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Feecbe4a3-2b10-421a-8e42-1de3f10173ba%2FScreenshot_2024-05-04_at_7.55.05_PM.png?table=block\&id=80cbf71c-099d-4d03-ba10-33f1c24d1e55\&cache=v2 "notion image")

### SFU

SFU stands for `Selective forwarding unit`. This acts as a central media server which `forwards` packets b/w users

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fe28af61c-af64-4bfb-bfe3-843f16e984e3%2FScreenshot_2024-05-04_at_7.55.38_PM.png?table=block\&id=3e615dd7-200f-4ae0-9c81-96f30aeaa726\&cache=v2 "notion image")

Popular Open source SFUs -&#x20;

1. <https://github.com/versatica/mediasoup>

1) <https://github.com/pion/webrtc> (not exactly an SFU but you can build one on top of it)

### MCU

It mixes audio/video together on the server before forwarding it.&#x20;

This means it needs to

1. decode video/audio (using something like ffmpeg)

1) Mix them (create a video canvas/create a single audio stream)

1. Send out the merged audio stream to everyone

   1.

      ![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F33b6d704-e1ad-4c77-9044-bba7f4b9f460%2FScreenshot_2024-05-04_at_7.56.56_PM.png?table=block\&id=1a883553-f298-4e9d-81e0-c3be0079ee18\&cache=v2 "notion image")

