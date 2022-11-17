import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

// const socket = io('http://localhost:5000');
// initial context of socket.io
const socket = io('https://video-chat-app.onrender.com/');

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    // We first want permission to use the video and audio from user's camera and microphone
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        // we immediately want to populate the video iframe with src of our screen
        myVideo.current.srcObject = currentStream;
      });

    // listen for a specific action
    socket.on('me', (id) => setMe(id));

    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    // peer capable of video call
    const peer = new Peer({ initiator: false, trickle: false, stream });

    // peer handlers
    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      // stream of other person
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    // current connection is equal to current peer
    connectionRef.current = peer;
  };

  const callUser = (id) => {
    // initiator: true because we are calling
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('callUser', {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    // destroy the current ref i.e stop recieving input from user camera and audio
    connectionRef.current.destroy();

    window.location.reload();
  };

  return (
    // Provider inside there is value which will be globally accessible to all the components
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
      }}
    >
      {/* All the components that we have in there are going to be inside the Socket wrapped into it */}
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
