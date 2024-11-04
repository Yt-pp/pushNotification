import { markAsRead } from '../api/messageAPI';
import { useState } from 'react';
import {Modal} from './Modal'

const MessageList = ({ messages: initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMarkAsRead = async (messageId) => {
    try {
      await markAsRead(messageId); // Call the API to mark as read
     // Update the local state to mark the message as read
     setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg._id === messageId
          ? {
              ...msg,
              recipients: [
                {
                  ...msg.recipients[0], // Spread the first recipient object
                  isRead: true // Set isRead to true for the first recipient
                },
              ]
            }
          : msg
      )
    );
    } catch (err) {
      console.error('Failed to mark message as read', err);
    }
  };

  const handleOpenModal = (message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMessage(null);
  };

  return (
    <>
    <ul className="flex flex-col flex-1 divide-y divide-gray-200 gap-2">
      {messages?.map((message) => (
        <li
          key={message._id}
          className={`flex items-center justify-between p-4 transition-all duration-200 
            ${message?.recipients[0]?.isRead ? 'bg-gray-100' : 'bg-white'}
            hover:bg-gray-50 rounded-md cursor-pointer w-full`} // Use w-full for responsive width
          style={{ border: '1px solid black' }} // Inline style for border
          onClick={() => {
            if (!message?.recipients[0]?.isRead) {
              handleMarkAsRead(message._id); // Mark as read only if unread
            }
            handleOpenModal(message); // Open modal on click
          }}
        >
          <div className={`font-medium ${message.recipients[0]?.isRead ? 'text-gray-500' : 'text-black'} truncate`}>
            {message.content}
          </div>
          {!message?.recipients[0]?.isRead && (
            <span className="text-sm text-blue-500 font-semibold">Unread</span>
          )}
        </li>
      ))}
    </ul>

<Modal 
isOpen={isModalOpen} 
onClose={handleCloseModal} 
message={selectedMessage} 
/>
</>
  );
};

export default MessageList;
