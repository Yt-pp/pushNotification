'use client';
import { useState, useEffect } from 'react';
import { messaging } from '../../../utils/firebase';
import { getToken, deleteToken } from 'firebase/messaging';
import { updateFcmToken } from '../../../api/messageAPI';

const Settings = () => {
  const [notifications, setNotifications] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleToggleNotifications = async (event) => {
    const newNotificationsValue = event.target.checked;
    setNotifications(newNotificationsValue);

    if (newNotificationsValue) {
      try {
        console.log("test fo rhi")
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          const token = await getToken(messaging, {
            vapidKey: 'BMv3fNMziUWi99mixqSbbbOcLXIPI02C3sM6u7y6IqdYqsTCFGu_fLFg9NuU05RKSDZlZNaoi8FaBOusszkQs5w',
          });

          if (token) {
            console.log('FCM Token:', token);
            await saveTokenToBackend(token);
          }
        }
      } catch (error) {
        console.error('Failed to enable notifications', error);
      }
    } else {
      try {
        await deleteToken(messaging);
        console.log('FCM Token deleted successfully.');
        const userId = localStorage.getItem('userId');
        await updateFcmToken(userId, null);
      } catch (error) {
        console.error('Failed to disable notifications', error);
      }
    }
  };

  const saveTokenToBackend = async (token) => {
    const userId = localStorage.getItem('userId');
    try {
      await updateFcmToken(userId, token);
    } catch (error) {
      console.error('Failed to save token to backend:', error);
    }
  };

  const checkExistingToken = async () => {
    const userId = localStorage.getItem('userId');
    const tokenExists = await updateFcmToken(userId); // Mock check for token in backend
    setNotifications(!!tokenExists);
  };

  useEffect(() => {
    checkExistingToken();
  }, []);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={toggleDropdown}
          className="flex items-center text-sm text-white rounded-md"
        >
          Settings
          <svg
            className="-mr-1 ml-1 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {dropdownOpen && (
        <div className="absolute right-0 z-10 w-48 mt-2 bg-white rounded-md shadow-lg">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <label className="flex items-center px-4 py-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={notifications}
                onChange={handleToggleNotifications}
                className="mr-2"
              />
              Enable Notifications
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
