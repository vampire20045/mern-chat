import io from 'socket.io-client';

const socket = io('http://localhost:6000'); // Connect to video call server

// Join room
socket.emit('join room', roomId);

// Get user media
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then(localStream => {
    // Initialize peer connection
    const peerConnection = new RTCPeerConnection();

    // Add local stream to peer connection
    localStream.getTracks().forEach(track => {
      peerConnection.addTrack(track, localStream);
    });

    // Listen for ICE candidates and send to peer
    peerConnection.onicecandidate = event => {
      if (event.candidate) {
        socket.emit('ice-candidate', { candidate: event.candidate, roomId });
      }
    };

    // Listen for remote stream and display it
    peerConnection.ontrack = event => {
      const remoteStream = event.streams[0];
      // Display remote stream in UI
      // remoteVideoElement.srcObject = remoteStream;
    };

    // Create offer and send to peer
    peerConnection.createOffer()
      .then(offer => {
        return peerConnection.setLocalDescription(offer);
      })
      .then(() => {
        socket.emit('offer', { offer: peerConnection.localDescription, roomId });
      })
      .catch(error => {
        console.error('Error creating offer:', error);
      });

    // Handle signaling events from server
    socket.on('offer', data => {
      // Handle offer from peer
    });

    socket.on('answer', data => {
      // Handle answer from peer
    });

    socket.on('ice-candidate', data => {
      // Handle ICE candidate from peer
    });
  })
  .catch(error => {
    console.error('Error accessing media devices:', error);
  });
