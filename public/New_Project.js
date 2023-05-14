import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";

const firebaseConfig = {
    // Your Firebase project configuration
    apiKey: "AIzaSyDY9QB_Ds68b_kYMNXsQzJAt_1QBq_LHDs",
    authDomain: "projectuniverse-1810d.firebaseapp.com",
    databaseURL: "https://projectuniverse-1810d-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "projectuniverse-1810d",
    storageBucket: "projectuniverse-1810d.appspot.com",
    messagingSenderId: "619672181489",
    appId: "1:619672181489:web:c496ec07368d7a09026750",
    measurementId: "G-THSNKG0G3L"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const projectDetailsRef = ref(db, "projectDetails");


function addItemsToTable() {
    onValue(projectDetailsRef, function(snapshot) {
      var table = document.getElementById('tbody1');
      table.innerHTML = ''; 
     
      var counter = 1;
      snapshot.forEach(function(childSnapshot) {
        var projectData = childSnapshot.val();
        Object.keys(projectData).forEach(function(key) {
          var childData = projectData[key];
          var row = table.insertRow(-1);
          var srNoCell = row.insertCell(0);
        var projectLevelCell = row.insertCell(1);
        var projectNameCell = row.insertCell(2);
        var projectLinkCell = row.insertCell(3);
        var githubLinkCell = row.insertCell(4);
        var materialCell = row.insertCell(5);
        var imageCell = row.insertCell(6);
          
        srNoCell.innerHTML = counter;
          projectLevelCell.innerHTML = childData.ProjectLevel;
          projectNameCell.innerHTML = childData.ProjectName;
          projectLinkCell.innerHTML = childData.ProjectLink;
          githubLinkCell.innerHTML = childData.GitHubLink;
          materialCell.innerHTML = childData.Material;
          imageCell.innerHTML = childData.Image;
          counter++;
        });
      });
    });
  }
  window.onload = addItemsToTable;
  

