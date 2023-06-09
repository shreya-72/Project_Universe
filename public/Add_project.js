import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getDatabase, ref, push, child } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
import { getAuth, sendEmailVerification} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";


const alert = document.getElementById('alert');
const form = document.getElementById('AddProjectForm');


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


// firebase.initializeApp(firebaseConfig);
//   const database = firebase.database()
//   const ref = database.ref("projectDetails")

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const projectDetailsRef = ref(database, "projectDetails");
  const auth = getAuth(app);



form.addEventListener("submit",(e)=>{
    
  e.preventDefault();
  
  
  const user = auth.currentUser;
  // const user = currentUser(auth);
  // const user = firebase.auth().currentUser;
  const uid = user.uid;
  
  const ProjectLevel = document.getElementById('project-level').value;
  const ProjectName = document.getElementById('project-name').value;
  const ProjectLink = document.getElementById('project-link').value;
  const GitHubLink = document.getElementById('githubLink').value;
  const Material = document.getElementById('material').value;
  const Image = document.getElementById('image-upload').value;


//   push(projectDetailsRef,{
//     ProjectLevel: ProjectLevel,
//     ProjectName: ProjectName,
//     ProjectLink: ProjectLink,
//     GitHubLink: GitHubLink,
//     Material: Material,
//     Image: Image
//   });

//   console.log(ProjectLevel, ProjectName, ProjectLink, GitHubLink, Material, Image);

//   // alert.style.display="block"

//   // setTimeout(()=>{
//   //     alert.style.display="none"
//   // },2000)

//   form.reset()

// })

push(child(projectDetailsRef, uid),{
  ProjectLevel: ProjectLevel,
  ProjectName: ProjectName,
  ProjectLink: ProjectLink,
  GitHubLink: GitHubLink,
  Material: Material,
  Image: Image
})
// .then(() => {
//   console.log(ProjectLevel, ProjectName, ProjectLink, GitHubLink, Material, Image);
//   form.reset();
// })

.then(() => {
  console.log(ProjectLevel, ProjectName, ProjectLink, GitHubLink, Material, Image);
  form.reset();

  // Send verification email
  sendEmailVerification(user)
    .then(() => {
      // Redirect to verification page or show success message
      window.location.href = "New_Project.html";
    })
    .catch((error) => {
      console.log("Error sending verification email:", error);
      // Show error message to the user
    });
})

// .catch((error) => {
//   console.log(error);
// });
// })

})




