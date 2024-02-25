import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

function DiscussionRoom() {
  const [user, setUser] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [editMode, setEditMode] = useState(null);
  const [editedMessage, setEditedMessage] = useState('');

  const handleUserChange = (event) => {
    setUser(event.target.value);
  };

  const handleProjectTitleChange = (event) => {
    setProjectTitle(event.target.value);
  };

  const handleProjectDescriptionChange = (event) => {
    setProjectDescription(event.target.value);
  };

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === '') {
      return; // Don't send empty messages
    }
    const message = {
      text: newMessage,
      user: user,
      timestamp: new Date().toLocaleString(),
      rating: null, // Initialize rating as null for new messages
    };
    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);
    setNewMessage('');
  };

  const handleRateMessage = (index, rating) => {
    const updatedMessages = [...messages];
    updatedMessages[index].rating = rating;
    setMessages(updatedMessages);
  };

  const handleEditMessage = (index) => {
    setEditMode(index);
    setEditedMessage(messages[index].text);
  };

  const handleSaveEdit = (index) => {
    const updatedMessages = [...messages];
    updatedMessages[index].text = editedMessage;
    setMessages(updatedMessages);
    setEditMode(null);
  };

  const handleCancelEdit = () => {
    setEditMode(null);
    setEditedMessage('');
  };

  const handleDeleteMessage = (index) => {
    const updatedMessages = [...messages];
    updatedMessages.splice(index, 1);
    setMessages(updatedMessages);
    setEditMode(null); // Exit edit mode if deleting the edited message
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100">
      <h1 className="text-2xl mb-4">Discussion Room</h1>
      <div className="project-details mb-4 bg-white p-4 rounded" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <input
          type="text"
          value={projectTitle}
          onChange={handleProjectTitleChange}
          placeholder="Project Title"
          className="border border-gray-300 rounded px-2 py-1 mb-2 w-full"
        />
        <textarea
          value={projectDescription}
          onChange={handleProjectDescriptionChange}
          placeholder="Project Description"
          className="border border-gray-300 rounded px-2 py-1 mb-2 w-full resize-none"
          rows="3"
        />
      </div>
      <div className="messages" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        {messages.map((message, index) => (
          <div key={index} className="message border-b border-gray-200 pb-4 mb-4 bg-white p-4 rounded">
            <div className="flex items-center mb-2">
              <div className="user-avatar-box mr-2" style={{ borderRadius: '50%', overflow: 'hidden', width: 40, height: 40 }}>
                <img src={userAvatar} alt="User Avatar" className="w-full h-full" />
              </div>
              <p className="font-bold">{message.user}</p>
            </div>
            {editMode === index ? (
              <div>
                <input
                  type="text"
                  value={editedMessage}
                  onChange={(e) => setEditedMessage(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 mb-2 w-full"
                />
                <div className="flex">
                  <button
                    onClick={() => handleSaveEdit(index)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-4 mr-2 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-4 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p>{message.text}</p>
                <p>At: {message.timestamp}</p>
                <div className="flex items-center mt-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => handleRateMessage(index, rating)}
                      className="mr-2"
                    >
                      <FontAwesomeIcon
                        icon={rating <= (message.rating || 0) ? solidStar : regularStar}
                        className="text-yellow-500"
                      />
                    </button>
                  ))}
                  <span className="ml-2">{message.rating || '-'}</span>
                </div>
                {user === message.user && (
                  <div className="flex mt-2">
                    <button
                      onClick={() => handleEditMessage(index)}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-4 mr-2 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteMessage(index)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="new-message" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <input
          type="text"
          value={newMessage}
          onChange={handleNewMessageChange}
          placeholder="Type your message..."
          className="border border-gray-300 rounded px-2 py-1 mb-2 w-full"
        />
        <button
          onClick={handleSendMessage}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-4 rounded"
        >
          Send
        </button>
      </div>
      <div className="user mt-4" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <input
          type="text"
          value={user}
          onChange={handleUserChange}
          placeholder="Enter your name..."
          className="border border-gray-300 rounded px-2 py-1 w-full"
        />
      </div>
    </div>
  );
}

export default DiscussionRoom;
