
const app = firebase.initializeApp(firebaseConfig);
app.firestore().settings({ experimentalForceLongPolling: true });
app.analytics();

firebase
  .app()
  .then((app) => {
    console.log("Firebase SDK loaded successfully.");
  })
  .catch((error) => {
    console.error("Error loading Firebase SDK.");
  });
