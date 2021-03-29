import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDWZQ3yDPwd3cfjFGwdOw5Bipe-71DhlGs",
    authDomain: "unisos-bcf1f.firebaseapp.com",
    projectId: "unisos-bcf1f",
    storageBucket: "unisos-bcf1f.appspot.com",
    messagingSenderId: "155064937510",
    appId: "1:155064937510:web:726714d3cd0e94c989cae7",
    measurementId: "G-66DLFKE9ML"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const store = firebase.storage();

export {
    db,
    auth,
    store
}