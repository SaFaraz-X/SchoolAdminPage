import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDKDg7Mq09xYePGrispdnUyVM9zKRHUDPM",
    authDomain: "lofty-ivy-242102.firebaseapp.com",
    databaseURL: "https://lofty-ivy-242102.firebaseio.com",
    projectId: "lofty-ivy-242102",
    storageBucket: "lofty-ivy-242102.appspot.com",
    messagingSenderId: "622324747867",
    appId: "1:622324747867:web:859020f7962da2f3bc397e",
    measurementId: "G-7R1SF5M75N"
  };

  const app = firebase.initializeApp(firebaseConfig);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default app;
// export default firebase;