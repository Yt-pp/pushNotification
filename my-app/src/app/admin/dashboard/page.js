'use client';
import { useState, useEffect } from 'react';
import { getUsers } from '../../../api/loginAPI';
import { sendMessage } from '../../../api/messageAPI';

const Admin = () => {
  const [message, setMessage] = useState('');
  const [recipientId, setRecipientId] = useState('all'); // 'all' or specific user ID
  const [users, setUsers] = useState([]);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch users on component mount
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response); // Set the fetched users
      } catch (err) {
        console.error('Failed to fetch users', err);
      }
    };

    fetchUsers();
  }, []);

  const handleSendMessage = async () => {
    try {
  

      await sendMessage(message,recipientId)
      setError('');
      setSuccess('Message sent successfully!');
      setMessage('');
    } catch (err) {
      setError('Failed to send message');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {success && <p className="text-green-500 mb-2">{success}</p>}
      {error && <p className="text-red-500 mb-2">{error}</p>}
      
      <textarea
        placeholder="Compose your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border border-gray-300 rounded p-2 mb-4 w-full max-w-md h-32 resize-none"
      />
      
      <select
        onChange={(e) => setRecipientId(e.target.value)}
        className="border border-gray-300 rounded p-2 mb-4 w-full max-w-md"
      >
        <option value="all">All Users</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {`${user.email}(${user.name})`} {/* Display name or email */}
          </option>
        ))}
      </select>
      
      <button
        onClick={handleSendMessage}
        className="bg-blue-500 text-white rounded p-2 w-full max-w-md hover:bg-blue-600 transition"
      >
        Send Message
      </button>
    </div>
  );
};

export default Admin;
