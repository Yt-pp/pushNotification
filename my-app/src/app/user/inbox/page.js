'use client'
import { useEffect, useState } from 'react';
import { getMessages, updateFcmToken } from '../../../api/messageAPI';
import Navbar from '@/components/Navbar';
import MessageList from '@/components/MessageList';

const Inbox = () => {

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== 'undefined') {
      const storedUserName = localStorage.getItem('userName');
      setUserName(storedUserName);
    }})
  useEffect(() => {
    const fetchMessages = async () => {
      console.log("message run")
      try {
        const response = await getMessages();
        setMessages(response);
      } catch (err) {
        setError('Failed to fetch messages.');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex-1 p-6 text-black">
        <h1 className="text-4xl font-bold mb-4">Welcome {userName}</h1>
        <h1 className="text-2xl font-bold mb-4">Inbox</h1>
        {loading ? (
          <p>Loading messages...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <MessageList messages={messages} />
        )}
      </div>
    </div>
  );
};

export default Inbox;
