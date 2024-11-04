import { initializeApp, getApps } from 'firebase/app';
import { getMessaging, onMessage, isSupported } from 'firebase/messaging';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbdtTAiJKjj7zMtk5lrjKoWtoIwEZeWdc",
  authDomain: "test-for-push-notificati-4729d.firebaseapp.com",
  projectId: "test-for-push-notificati-4729d",
  storageBucket: "test-for-push-notificati-4729d.firebasestorage.app",
  messagingSenderId: "509371452478",
  appId: "1:509371452478:web:8146885f87443e4d53956f",
  measurementId: "G-3TMKE7JQ5G"
};

// Initialize Firebase only if there are no existing apps
if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

let messaging;
const initMessaging = async () => {
  if (typeof window !== 'undefined') { // Ensure this code runs only on the client side
    const supported = await isSupported();
    if (supported) {
      messaging = getMessaging();
    } else {
      console.warn("Firebase messaging is not supported in this browser.");
    }
  }
};



// Function to set up the onMessage listener
const getMessage = async () => {
  if (messaging) {
    onMessage(messaging, (payload) => {
      console.log("Message received:", payload);
      // Here, you can handle the received message (e.g., display a notification or update UI)
    });
  } else {
    console.warn("Messaging is not initialized. Ensure Firebase Messaging is supported in your environment.");
  }
};

if ('serviceWorker' in navigator) {

        navigator.serviceWorker.register('/firebase-messaging-sw.js')
          .then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
          })
          .catch((error) => {
            console.error('Service Worker registration failed:', error);
          });
 
  }
  
// Initialize messaging once Firebase and the environment are ready
initMessaging();

export { messaging, getMessage };
