import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_Sender_id,
  appId: import.meta.env.VITE_APP_ID,
};

//init firebase
firebase.initializeApp(firebaseConfig);

const firedb = firebase.firestore();

export { firedb };
