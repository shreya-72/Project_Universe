    var stdNo = 0;
    var tbody = document.getElementById("tbody1");

    function AddItemToTable(ProjectLevel,ProjectName,ProjectLink, GitHubLink, Material,Image){
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        let td5 = document.createElement("td");
        let td6 = document.createElement("td");
        let td7 = document.createElement("td");

        td1.innerHTML = ++stdNo;
        td2.innerHTML = ProjectLevel;
        td3.innerHTML = ProjectName;
        td4.innerHTML = ProjectLink;
        td5.innerHTML = GitHubLink;
        td6.innerHTML = Material;
        td7.innerHTML = Image;

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tr.appendChild(td7);

        tbody.appendChild(tr);
    }

    function AddItemsToTable(projectDetails){
        stdNo = 0;
        tbody.innerHTML = "";
        projectDetails.forEach(element => {AddItemToTable(element.ProjectLevel, element.ProjectName, element.ProjectLink, element.GitHubLink, element.Material, element.Image)
        });
    }
    
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-analytics.js";
    import {getFirestore, collection, onSnapshot} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";
    import{getDatabase, ref, child, onValue, get} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";

    const firebaseConfig = {
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
  const analytics = getAnalytics(app);
  const db = getDatabase();
//   const db = getFirestore(app);


function GetAllDataRealtime(){
    const dbRef = ref(db);

    get(child(dbRef, "projectDetails"))
    .then((snapshot) => {

        var projects = [];
        
        snapshot.forEach((childSnapshot) => {
            projects.push(childSnapshot.val());
        });
        AddItemsToTable(projects);
    });
}
//     onValue(dbRef, (snapshot)=>{

//                 var projects = [];
        
//         snapshot.forEach((childSnapshot) => {
//             projects.push(childSnapshot.val());
//         });
//         AddItemsToTable(projects);


//     })
// }

window.onload = GetAllDataRealtime;

