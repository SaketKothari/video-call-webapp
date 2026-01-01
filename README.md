# Video Call WebApp 📹

### [Live Site](https://video-chat-webapp.vercel.app/)

<img style="text-align:center" src="https://user-images.githubusercontent.com/81709725/126911393-0ce3de2d-912b-4d96-be30-453d7bd207f6.png" width=800px/>

## Overview

A real-time peer-to-peer video calling application that enables seamless video communication between users. Built with modern web technologies, this application allows users to instantly connect with others using a unique caller ID - similar to Zoom or Google Meet, but simpler and more lightweight.

<img align="right" src="https://user-images.githubusercontent.com/81709725/126911301-f2013b88-c3bd-4bed-9424-7472e99f7163.png" width="400" height="300"/>

## ✨ Features

- **Peer-to-Peer Video Chat**: Direct video and audio communication using WebRTC
- **Instant Connection**: Join calls using a unique caller ID - no account required
- **Real-time Signaling**: Socket.io handles call setup and connection management
- **Responsive UI**: Material-UI components for a clean, modern interface
- **Copy to Clipboard**: Easy sharing of your caller ID
- **Call Notifications**: Visual alerts for incoming calls
- **End Call**: Simple call termination with automatic cleanup

## 🏗️ Architecture & How It Works

### System Architecture

```
┌─────────────┐         WebSocket         ┌─────────────┐
│   Client A  │◄──────────────────────────►│   Server    │
│  (React)    │                            │  (Node.js)  │
└─────────────┘                            └─────────────┘
      ▲                                          ▲
      │                                          │
      │         WebRTC Peer Connection          │
      │         (Direct Media Stream)           │
      │                                          │
      └──────────────────────────────────────────┘
                        ▼
                 ┌─────────────┐
                 │   Client B  │
                 │  (React)    │
                 └─────────────┘
```

### Technical Flow

#### 1. **Initial Connection**

When a user opens the application:

- The React client requests access to the user's camera and microphone using `navigator.mediaDevices.getUserMedia()`
- A WebSocket connection is established with the server via Socket.io
- The server assigns a unique socket ID to the user, which serves as their caller ID
- The user's video stream is displayed in their local video element

#### 2. **Initiating a Call**

When User A wants to call User B:

- User A enters User B's caller ID
- A new `SimplePeer` instance is created with `initiator: true`
- The peer generates a "signal" (SDP offer) containing connection details
- This signal is sent to the server via Socket.io with the event `callUser`
- The server forwards this signal to User B using their socket ID

#### 3. **Receiving a Call**

When User B receives a call:

- The server emits a `callUser` event to User B with the signal data
- User B receives a notification showing User A's name
- User B's UI displays an "Answer Call" option

#### 4. **Answering a Call**

When User B answers:

- A new `SimplePeer` instance is created with `initiator: false`
- User B's peer generates an "answer signal" (SDP answer)
- This answer is sent back through the server to User A via `answerCall`
- Both peers exchange ICE candidates for NAT traversal

#### 5. **Establishing Peer Connection**

- Once both peers have exchanged signals, a direct WebRTC connection is established
- Media streams (video/audio) flow directly between peers (not through the server)
- Both users can now see and hear each other in real-time
- The server's role is now minimal, only handling disconnection events

#### 6. **Ending a Call**

When either user ends the call:

- The peer connection is destroyed using `connectionRef.current.destroy()`
- The page reloads to reset the application state
- If a user disconnects unexpectedly, the server broadcasts `callEnded` to notify the other user

### Key Technologies Explained

#### **WebRTC (Web Real-Time Communication)**

- Enables browser-to-browser audio and video communication without plugins
- Handles media stream capture, encoding, and transmission
- Manages NAT traversal and firewall issues using STUN/TURN

#### **Socket.io**

- Establishes real-time, bidirectional communication between clients and server
- Used for signaling: exchanging SDP offers/answers and ICE candidates
- Handles user presence and connection/disconnection events

#### **SimplePeer**

- Wrapper library that simplifies WebRTC API
- Handles complex WebRTC setup with a clean API
- Manages peer connection lifecycle and event handling

#### **React Context API**

- Provides global state management for call state
- Makes socket connection and peer functions available throughout the app
- Avoids prop drilling for deeply nested components

## 🛠️ Tech Stack

### Frontend

- **React.js** - UI framework
- **Material-UI** - Component library for modern design
- **SimplePeer** - WebRTC wrapper for peer connections
- **Socket.io-client** - Real-time communication with server

### Backend

- **Node.js** - Server runtime
- **Express.js** - Web server framework
- **Socket.io** - WebSocket server for signaling
- **CORS** - Cross-origin resource sharing

### Hosting

- **Vercel** - Client deployment
- **Render** - Server deployment

## 📦 Project Structure

```
video-call-webapp/
├── client/                    # React frontend
│   ├── src/
│   │   ├── App.js            # Main application component
│   │   ├── Context.js        # Socket & Peer logic (State management)
│   │   ├── components/
│   │   │   ├── VideoPlayer.jsx    # Video display component
│   │   │   ├── Sidebar.jsx        # Call controls & ID display
│   │   │   └── Notifications.jsx  # Incoming call alerts
│   │   └── styles.css        # Application styles
│   └── package.json
├── index.js                   # Express + Socket.io server
├── package.json
└── README.md
```

## 🚀 Setup & Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Modern web browser with WebRTC support

### Installation Steps

1. **Clone the repository**

```bash
git clone https://github.com/SaketKothari/video-call-webapp.git
cd video-call-webapp
```

2. **Install server dependencies**

```bash
npm install
```

3. **Install client dependencies**

```bash
cd client
npm install
```

4. **Configure the server URL** (for local development)

  - Open `client/src/Context.js`
  - Change the socket URL to your local server:

  ```javascript
  const socket = io("http://localhost:5001");
  ```

5. **Start the server**

```bash
# From the root directory
npm start
```

Server will run on `http://localhost:5001`

6. **Start the client** (in a new terminal)

```bash
cd client
npm start
```

Client will run on `http://localhost:3000`

### Development Mode

For development with auto-reload:

```bash
# Server with nodemon
npm run dev

# Client (in separate terminal)
cd client
npm start
```

## 📱 Usage Guide

1. **Open the application** in your browser
2. **Grant permissions** for camera and microphone access
3. **Copy your ID** using the "Copy Your ID" button
4. **Share your ID** with the person you want to call
5. **Enter their ID** in the "ID to call" field to initiate a call
6. **Answer incoming calls** when you receive a notification
7. **End the call** using the "Hang Up" button when finished

## 🔒 Security Considerations

- All video/audio streams are transmitted directly between peers (P2P)
- The server only handles signaling data, not media streams
- Ensure proper CORS configuration in production
- Consider implementing authentication for private calls
- Use HTTPS in production for secure WebRTC connections

## 🐛 Troubleshooting

**Camera/Microphone not working:**

- Ensure browser permissions are granted
- Check if another application is using the devices
- Try using HTTPS (required by some browsers)

**Connection fails:**

- Verify both users have stable internet connections
- Check firewall settings
- Ensure the server is running and accessible

**No video/audio:**

- Check device permissions in browser settings
- Verify WebRTC is supported in your browser
- Check console for error messages

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

ISC

## 👨‍💻 Author

**Saket Kothari**

- GitHub: [@SaketKothari](https://github.com/SaketKothari)

---

Built with ❤️ using React, WebRTC, and Socket.io

