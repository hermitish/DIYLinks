import { firebaseApp } from '../initialise.js';
import { getFirestore, query, where, getDocs, collection} from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js';

const db = getFirestore(firebaseApp);

if(localStorage.getItem('userpagePoster')){
    const q = query(collection(db, "users"), where("username", "==", localStorage.getItem('userpagePoster')));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc1) => {
        const docData = doc1.data();
        localStorage.setItem("userAbout", docData['about']); // Might be needed elsewhere
        localStorage.setItem("userWebsite", docData['website']); // Might be needed elsewhere
        localStorage.setItem("username", docData['username']);
        const username = document.getElementById("username");
        username.innerText = "username: " + localStorage.getItem('username');
        const about = document.getElementById("about");
        about.innerText = "about: " + localStorage.getItem('userAbout');
        const website = document.getElementById("website");
        const websiteText = localStorage.getItem('userWebsite');
        website.setAttribute("href", "https://www." + websiteText);
        website.setAttribute("target", "_blank");
        website.innerText = websiteText;
        const points = document.getElementById("points");
        points.innerText = "points: " + docData['points'];
    })    
} else {
    window.location.href = "../index.html";
}