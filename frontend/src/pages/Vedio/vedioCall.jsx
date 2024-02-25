import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import SimplePeer from 'simple-peer';

const VideoCall = ({ userID }) => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const socketRef = useRef();
  const peerRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect('http://localhost:6000');

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        setLocalStream(stream);
        socketRef.current.emit('join room', ROOM_ID, userID);
      });

    socketRef.current.on('other user', user => {
      initiateCall(user.userID);
    });

    socketRef.current.on('offer', handleOffer);
    socketRef.current.on('answer', handleAnswer);
    socketRef.current.on('ice-candidate', handleNewICECandidateMsg);
    socketRef.current.on('message', handleReceiveMessage);

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const initiateCall = user => {
    peerRef.current = new SimplePeer({ initiator: true, trickle: false, stream: localStream });

    peerRef.current.on('signal', signal => {
      socketRef.current.emit('offer', { signal, to: user.userID });
    });

    peerRef.current.on('stream', stream => {
      setRemoteStream(stream);
    });
  };

  const handleOffer = data => {
    peerRef.current = new SimplePeer({ initiator: false, trickle: false, stream: localStream });

    peerRef.current.on('signal', signal => {
      socketRef.current.emit('answer', { signal, to: data.from });
    });

    peerRef.current.on('stream', stream => {
      setRemoteStream(stream);
    });

    peerRef.current.signal(data.signal);
  };

  const handleAnswer = data => {
    peerRef.current.signal(data.signal);
  };

  const handleNewICECandidateMsg = data => {
    const candidate = new RTCIceCandidate(data.candidate);
    peerRef.current.addIceCandidate(candidate);
  };

  const handleReceiveMessage = message => {
    setChatMessages(prevMessages => [...prevMessages, message]);
  };

  const handleSendMessage = () => {
    if (messageInput.trim() !== '') {
      socketRef.current.emit('message', messageInput);
      setMessageInput('');
    }
  };

  const toggleAudio = () => {
    localStream.getAudioTracks().forEach(track => {
      track.enabled = !isMuted;
    });
    setIsMuted(!isMuted);
  };

  const toggleVideo = () => {
    localStream.getVideoTracks().forEach(track => {
      track.enabled = !isVideoPaused;
    });
    setIsVideoPaused(!isVideoPaused);
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center bg-gray-100 p-8">
      <div className="flex justify-center space-x-4">
        <div className="flex flex-col items-center border border-gray-500 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Local Stream</h2>
          {localStream && <video autoPlay muted={isMuted} className="w-96 h-72 border border-gray-500 rounded-lg" />}
          <div className="mt-4 space-x-2">
            <button onClick={toggleAudio} className="px-4 py-2 bg-blue-500 text-white rounded">Toggle Audio</button>
            <button onClick={toggleVideo} className="px-4 py-2 bg-blue-500 text-white rounded">Toggle Video</button>
          </div>
        </div>
        <div className="flex flex-col items-center border border-gray-500 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Remote Stream</h2>
          {remoteStream && <video autoPlay className="w-96 h-72 border border-gray-500 rounded-lg" />}
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Chat</h2>
        <ul className="space-y-2">
          {chatMessages.map((message, index) => (
            <li key={index} className="bg-gray-200 p-2 rounded">{message}</li>
          ))}
        </ul>
        <div className="mt-4 flex space-x-2">
          <input type="text" value={messageInput} onChange={e => setMessageInput(e.target.value)} className="px-4 py-2 w-64 border border-gray-300 rounded" />
          <button onClick={handleSendMessage} className="px-4 py-2 bg-blue-500 text-white rounded">Send</button>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
