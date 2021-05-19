import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCspDzeszo7O2_3s0DjtlEAkCKxSScfo0g",
    authDomain: "to-do-fb2e4.firebaseapp.com",
    projectId: "to-do-fb2e4",
    storageBucket: "to-do-fb2e4.appspot.com",
    messagingSenderId: "80682644478",
    appId: "1:80682644478:web:f66b4b457f84903a3746af"
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;