

import { getFirestore, collection, addDoc, serverTimestamp, where, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDY9QB_Ds68b_kYMNXsQzJAt_1QBq_LHDs",
  authDomain: "projectuniverse-1810d.firebaseapp.com",
  projectId: "projectuniverse-1810d",
  databaseURL: "https://projectuniverse-1810d-default-rtdb.asia-southeast1.firebasedatabase.app",
  storageBucket: "projectuniverse-1810d.appspot.com",
  messagingSenderId: "619672181489",
  appId: "1:619672181489:web:c496ec07368d7a09026750",
  measurementId: "G-THSNKG0G3L"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const whenSignedIn = document.getElementById('whenSignedIn');
const whenSignedOut = document.getElementById('whenSignedOut');
const signInBtn = document.getElementById('signInBtn');
const signOutBtn = document.getElementById('signOutBtn');
const userDetails = document.getElementById('userDetails');
const createThing = document.getElementById('createThing');
const thingsList = document.getElementById('thingsList');

function onSignIn() {
  location.href = "Home.html";
}

function onSignOut() {
  location.href = location.href;
}

function signIn() {
  signInWithPopup(auth, provider)
    .then(result => {
      onSignIn(result.user);
    })
    .catch(error => {
      console.error(error);
    });
}

function signOut() {
  auth.signOut()
    .then(() => {
      onSignOut();
    })
    .catch(error => {
      console.error(error);
    });
}

// Sign in event handlers
signInBtn.addEventListener('click', signIn);
signOutBtn.addEventListener('click', signOut);

auth.onAuthStateChanged(user => {
  if (user) {
    // Signed in
    whenSignedIn.hidden = false;
    whenSignedOut.hidden = true;
    userDetails.innerHTML = `<h3>Hello ${user.displayName}!</h3> <p>User ID: ${user.uid}</p>`;
    const db = getFirestore(app);
    const thingsRef = collection(db, 'things');

    createThing.onclick = () => {
      addDoc(thingsRef, {
        uid: user.uid,
        name: faker.commerce.productName(),
        createdAt: serverTimestamp()
      });
    };

    const query = where('uid', '==', user.uid);
    const orderedQuery = orderBy('createdAt', 'asc');
    const unsubscribe = onSnapshot(query(thingsRef), orderedQuery, querySnapshot => {
      const items = querySnapshot.docs.map(doc => {
        return `<li>${doc.data().name}</li>`;
      });
      thingsList.innerHTML = items.join('');
    });
  } else {
    // Not signed in
    whenSignedIn.hidden = true;
    whenSignedOut.hidden = false;
    userDetails.innerHTML = '';
  }
});





  
