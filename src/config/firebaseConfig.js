import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAETUuVK4pJXih0ov4EIGx7sIqkuu7Es7o",
  authDomain: "unifas-service.firebaseapp.com",
  projectId: "unifas-service",
  storageBucket: "unifas-service.appspot.com",
  messagingSenderId: "965372246614",
  appId: "1:965372246614:web:073b9837087a0894ef59f7",
  measurementId: "G-GBFXEDGWTE"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)