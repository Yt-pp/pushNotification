// api/authAPI.js
import axiosInstance from '../utils/axiosInstance';
import { getToken } from 'firebase/messaging';
import { messaging } from '@/utils/firebase';
import { updateFcmToken } from './messageAPI';

export const loginMethod = async (email, password, role) => {
  const payload = {};
  try {

    if (email) payload.email = email;
    if (password) payload.password = password;
    if (role) payload.role = role;
    
    const response = await axiosInstance.post('/auth/login', payload);
   
    const { access_token } = response.data.data;
    const { id, name } = response.data.data.user;
    console.log("test login", id)
    // Save token to localStorage
    if (access_token) {
      try {
        const fcmToken = await getToken(messaging, {
          vapidKey: 'BMv3fNMziUWi99mixqSbbbOcLXIPI02C3sM6u7y6IqdYqsTCFGu_fLFg9NuU05RKSDZlZNaoi8FaBOusszkQs5w',
        });

        if (fcmToken) {
          await updateFcmToken(id, fcmToken); // Replace with appropriate FCM update call
          console.log('FCM Token updated successfully.');
        }
      } catch (error) {
        console.error('Error updating FCM token:', error);
      }
      localStorage.setItem('userToken', access_token);
    }

    if (access_token) {
      if (role === 'admin') {
        localStorage.setItem('adminId', id);
      } else {
        localStorage.setItem('userId', id);
        localStorage.setItem('userName', name);
      }
    }

    return response.data; // Return user data if needed
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await axiosInstance.get('/users', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw error;
  }
};
