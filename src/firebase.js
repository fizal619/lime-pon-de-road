import firebase from 'firebase';
const config = {
  apiKey: "AIzaSyCJDRqZjoyYzNrJBQkhDaZkSokvntT3ymM",
  authDomain: "quizapp-lol.firebaseapp.com",
  databaseURL: "https://quizapp-lol.firebaseio.com",
  projectId: "quizapp-lol",
  storageBucket: "quizapp-lol.appspot.com",
  messagingSenderId: "526612498188"
};
firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;

