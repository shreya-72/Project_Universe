

import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";

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
const db = getDatabase(app);
const projectDetailsRef = ref(db, "projectDetails");


function createAccordionSection(title, content, url = null) {
    const section = document.createElement("div");
    section.className = "accordion-item";
  
    const header = document.createElement("h2");
    header.className = "accordion-header";
    
    const button = document.createElement("button");
    button.className = "accordion-button collapsed";
    button.type = "button";
    button.innerText = title;


      button.addEventListener("click", () => {
        const collapseElement = section.querySelector(".accordion-collapse");
        const accordion = new bootstrap.Collapse(collapseElement, { toggle: false });
        accordion.toggle();
      });

    header.appendChild(button);
    section.appendChild(header);
    
    const body = document.createElement("div");
    body.className = "accordion-collapse collapse";
    body.id = title;
    // body.id = collapseId;

    
    const bodyContent = document.createElement("div");
    bodyContent.className = "accordion-body";
    bodyContent.innerText = content;

  body.appendChild(bodyContent);
  section.appendChild(body);
    
    return section;
  }

function generateCard(projects) {
    const container = document.getElementById("cardContainer");
    cardContainer.innerHTML = "";
    
    for (const project of projects) {
      const col = document.createElement("div");
      col.className = "col";

    const card = document.createElement("div");
    card.className = "card";
    card.style = "width: 30%; padding: 10px;";

  
    const cardLink = document.createElement("a");
    cardLink.href = project.ProjectLink;
  
    const cardImage = document.createElement("img");
    cardImage.onerror = function () {
      cardImage.src = "https://cdn.pixabay.com/photo/2018/05/08/08/44/artificial-intelligence-3382507_1280.jpg";
    };
    cardImage.src = project.Image;
    cardImage.className = "card-img-top small-image";
    cardImage.style.width = "100%";
    cardImage.alt = "...";
    cardLink.appendChild(cardImage);
  
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
  
    const cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.innerText = project.ProjectName;
    cardLink.appendChild(cardTitle);
  
    cardBody.appendChild(cardLink);
  
    const accordion = document.createElement("div");
    accordion.className = "accordion";
  
    const sourceCodeSection = createAccordionSection("Source code", project.GitHubLink);
    accordion.appendChild(sourceCodeSection);

    const studyMaterialSection = createAccordionSection("Study material", project.Material);
    accordion.appendChild(studyMaterialSection);

    const rateCommentSection = createAccordionSection("Rate/comment", "This is the third item's accordion body.");
    accordion.appendChild(rateCommentSection);
  
    col.appendChild(card);
    cardContainer.appendChild(col);
    card.appendChild(cardBody);
    card.appendChild(accordion);
    container.appendChild(card);
}}

function fetchDataAndGenerateAccordion() {
    onValue(projectDetailsRef, function (snapshot) {
        const projects = [];
        snapshot.forEach(function (childSnapshot) {
            const projectData = childSnapshot.val();
            Object.keys(projectData).forEach(function (key) {
                const childData = projectData[key];
                projects.push(childData);
            });
        });
        generateCard(projects);


const accordions = document.getElementsByClassName("accordion");
for (const accordion of accordions) {
  const collapseElements = accordion.getElementsByClassName("accordion-collapse");
  const accordionButtons = accordion.getElementsByClassName("accordion-button");

  for (let i = 0; i < accordionButtons.length; i++) {
    const button = accordionButtons[i];
    const collapseElement = collapseElements[i];
    const accordionElement = new bootstrap.Collapse(collapseElement, { toggle: false });

    button.addEventListener("click", () => {
      for (let j = 0; j < accordionButtons.length; j++) {
        if (j !== i) {
          const otherCollapseElement = accordionButtons[j].parentElement.nextElementSibling;
          const otherAccordionElement = new bootstrap.Collapse(otherCollapseElement, { toggle: false });
          otherAccordionElement.hide();
        }
      }
      accordionElement.toggle();
    });  
  }
}

});
}


window.onload = fetchDataAndGenerateAccordion;


