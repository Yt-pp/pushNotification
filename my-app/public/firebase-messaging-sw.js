// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js');
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyAbdtTAiJKjj7zMtk5lrjKoWtoIwEZeWdc",
    authDomain: "test-for-push-notificati-4729d.firebaseapp.com",
    projectId: "test-for-push-notificati-4729d",
    storageBucket: "test-for-push-notificati-4729d.firebasestorage.app",
    messagingSenderId: "509371452478",
    appId: "1:509371452478:web:8146885f87443e4d53956f",
    measurementId: "G-3TMKE7JQ5G"
};
// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message', payload);
  
  // Safely access data properties
  const notificationTitle = payload.data?.title;
  const notificationOptions = {
    body: payload.data?.body,
    icon: './next.svg',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});