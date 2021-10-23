// 'https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js';
import { firebaseApp, auth } from './initialise.js';
import { doc, getFirestore, getDocs, query, collection, updateDoc, orderBy, limit } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js';
import { signOut } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js';

if(localStorage.getItem('userLoggedIn')){
    const login = document.getElementById("login");
    login.hidden = true;
    const userpage_link = document.getElementById("user");
    userpage_link.innerText = localStorage.getItem('username');
}

// Retrieve and show posts

const db = getFirestore();
const itemList = document.getElementById("itemlist");

var count = 1

const q = query(collection(db, "posts"), orderBy("votes", "desc"), limit(25));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc1) => {    
    const docData = doc1.data();
    const votes = docData['votes'];
    var tr = document.createElement("tr");
    var td1 = document.createElement("td");    
    var td2 = document.createElement("td");
    var upArrow = " " + String.fromCharCode(9709);
    var upArrowButton = document.createElement("span");
    var posterShow = document.createElement("a");
    upArrowButton.id = "upvote-link";
    upArrowButton.style.backgroundColor = "#2352fc";
    upArrowButton.style.color = "#12ed5f";
    upArrowButton.style.border = "none";
    upArrowButton.style.cursor = "pointer";
    upArrowButton.innerText = upArrow;
    upArrowButton.onclick = function () {
        var ref = doc(db, "posts", doc1.id);        
        updateDoc(ref, {
            votes: votes + 1
        }).then((something) => {
            ;
        }).catch((e) => {
            window.alert("Log in to vote posts.")
        })
    }
    td1.className = "item";    
    td1.innerHTML = String(count) + ".  " + docData['title'];        
    td1.appendChild(upArrowButton);
    td2.className = "item";    
    var displayUrl = docData['url'].replace(/(^\w+:|^)\/\//, '');
    if(displayUrl.includes("www")){
        displayUrl = displayUrl.slice(4);
    }
    if(displayUrl.length > 57){
        displayUrl = displayUrl.slice(0, 57);
        displayUrl = displayUrl.concat("...");
    }
    td2.innerHTML = "<a href=\"" + docData['url'] + "\" target=\"_blank\">" + displayUrl + "</a>";    
    if(docData['poster_username'] != undefined){
        posterShow.innerText = docData['poster_username']; // Eventually a link to the user's profile[1]         
    } else {
        posterShow.href = docData['poster_email']; // Eventually a link to the user's profile[1]         
    }
    posterShow.href = "./userpage/userpage.html";
    posterShow.setAttribute("target", "_blank");
    posterShow.onclick = () => {        
        if(docData['poster_username'] != undefined){
            localStorage.setItem('userpagePoster', docData['poster_username']);
        } else {
            localStorage.setItem('userpagePoster', docData['poster_email']);
        }
    };
    tr.appendChild(td1);
    tr.appendChild(td2);    
    tr.appendChild(posterShow);
    itemList.appendChild(tr);    
    count += 1;
})

// Logged In User's Userpage

const my_userpage = document.getElementById("user");
my_userpage.onclick = () => {
    localStorage.setItem('userpagePoster', localStorage.getItem('username'));
}

// Logout

const logout_button = document.getElementById("logout-button");
function logOut(){
    if(localStorage.getItem("userLoggedIn") !== null){
        signOut(auth).then(() => {
            localStorage.clear();        
            window.alert("Successfully logged out!");            
            window.location.reload();
        }).catch((e) => {
            console.error("Log out error: ", error);
        })
    } else {
        window.alert("You're already logged out.")
    }
}

logout_button.addEventListener('click', e => {
    e.preventDefault();
    logOut();
})

// [1]: A user's profile should show the past submissions, points(TBD), and possibly other things.
