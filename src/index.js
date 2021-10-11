// import { getAuth, signOut } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js';
import { getFirestore, getDocs, query, collection } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js';
import { signOut } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js';
import { firebaseApp, auth } from './initialise.js';

// Retrieve and show posts

const db = getFirestore();
const itemList = document.getElementById("itemlist");

var count = 1

const q = query(collection(db, "posts"));

const querySnapshot = await getDocs(q)
querySnapshot.forEach((doc) => {
    // console.log("Doc id: ", doc.id, " Doc data", doc.data());
    const docData = doc.data();
    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    td1.className = "item";
    td1.innerText = String(count) + ".  " + docData['title'];
    var td2 = document.createElement("td");
    td2.className = "item";
    td2.innerHTML = "<a href=" + docData['url'] + " target=\"_blank\">" + docData['url'] + "</a>";    
    tr.appendChild(td1);
    tr.appendChild(td2);    
    itemList.appendChild(tr);
    count += 1;
})

// Logout

const logout_button = document.getElementById("logout-button");
function logOut(){
    signOut(auth).then(() => {
        localStorage.clear();        
        window.alert("Successfully logged out!");
    }).catch((e) => {
        console.error("Log out error: ", error);
    })
}
logout_button.addEventListener('click', e => {
    e.preventDefault();
    logOut();
})

/*
const auth = getAuth();
const logout_button = document.getElementById("logout-button");
function logOut(){
    signOut(auth).then(() => {
        localStorage.clear();        
        window.alert("Successfully logged out!");
    }).catch((e) => {
        console.error("Log out error: ", error);
    })
}
logout_button.addEventListener('click', e => {
    e.preventDefault();
    logOut();
})
*/