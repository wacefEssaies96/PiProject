// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIao9_zKL3bs_3RxakcyGJ7dMg6Clhupk",
  authDomain: "otp-project-802e6.firebaseapp.com",
  projectId: "otp-project-802e6",
  storageBucket: "otp-project-802e6.appspot.com",
  messagingSenderId: "633127417349",
  appId: "1:633127417349:web:7c03073898f30df936ce6c",
  measurementId: "G-RD5XK7DN4R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);