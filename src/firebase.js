import firebase from 'firebase';
const config = {
  apiKey: "AIzaSyDA3lF5hUMLTGclm2dkhqGO0qAstZNHBNA",
  authDomain: "lime-pon-de-road.firebaseapp.com",
  databaseURL: "https://lime-pon-de-road.firebaseio.com",
  projectId: "lime-pon-de-road",
  storageBucket: "lime-pon-de-road.appspot.com",
  messagingSenderId: "152087668631"
};
firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;

