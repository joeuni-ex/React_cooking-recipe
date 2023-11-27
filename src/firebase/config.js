import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBvPp9CuY13sj5oH7WXYtzVLlEYJhOurSU",
  authDomain: "cooking-recipe-daec5.firebaseapp.com",
  projectId: "cooking-recipe-daec5",
  storageBucket: "cooking-recipe-daec5.appspot.com",
  messagingSenderId: "987218294644",
  appId: "1:987218294644:web:e58a42db77c96c6dfc5e21",
};

//init firebase
firebase.initializeApp(firebaseConfig);

const firedb = firebase.firestore();

export { firedb };
