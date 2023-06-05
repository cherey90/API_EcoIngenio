// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDw4SntJLt_cjHX6bpfNdUyfi7f5V6S2HQ",
  authDomain: "apiecoing.firebaseapp.com",
  projectId: "apiecoing",
  storageBucket: "apiecoing.appspot.com",
  messagingSenderId: "87740785945",
  appId: "1:87740785945:web:254f4911c1a12e49cc9188",
  measurementId: "G-EEMTZTKVEE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);