// api/messageAPI.js
import axiosInstance from '../utils/axiosInstance';
import { messaging } from '../utils/firebase';

export const getMessages = async () => {
  const userId = localStorage.getItem("userId")
    try {
      const response = await axiosInstance.get('/messages', {
        params: { userId },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  };

// New function to mark a message as read
export const markAsRead = async (messageId) => {
  const userId = localStorage.getItem("userId")
  try {
    const response = await axiosInstance.patch(`/messages/${messageId}/read`, { userId });
    return response.data;
  } catch (error) {
    console.error('Error marking message as read:', error);
    throw error;
  }
};



export const sendMessage = async ( content, recipientId ) => {
  try {
    const token = localStorage.getItem('adminToken');
    const senderId = localStorage.getItem("adminId")
    console.log("recipientId", recipientId)
    // Prepare the payload
    const payload = {
      content,
      senderId,
      broadcastToAll: recipientId === 'all', // Set to true if broadcasting
      recipientId: recipientId !== 'all' ? recipientId : undefined, // Only include if specific recipient
    };

    // Send the message request
    const response = await axiosInstance.post('/messages/send', payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error('Failed to send message:', error);
    throw error;
  }
};


export const updateFcmToken = async (userId, fcmToken) => {
  try {
    const response = await axiosInstance.patch(`/users/update-fcm-token/${userId}`, { fcmToken });
    return response.data;
  } catch (error) {
    console.error('Failed to update FCM token', error);
    throw error;
  }
};
