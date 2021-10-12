import { firebaseApp } from '../initialise.js';
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js';
// https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js

if(localStorage.getItem('userLoggedIn') == 'True'){
    const db = getFirestore();   
    const post_form = document.getElementById("post-submit");
    post_form.addEventListener('submit', e => {
        e.preventDefault();        
        try {
            const poster_email = localStorage.getItem('userEmail');
            setTimeout(() => {
                const postDocRef = addDoc(collection(db, "posts"), {
                    title: post_form['title-input']['value'],
                    url: post_form['url-input']['value'],
                    votes: 0,
                    poster_email: poster_email
                }).then(() => {
                    window.location.href = "../index.html";
                }).catch((e) => {
                    console.log("Error submitting post: ", e);
                })                
            }, 3)            
        } catch (e) {
            console.log("Error submitting post: ", e);
        }
    })
} else {
    localStorage.setItem('submitToLogin', 'True');
    window.location.href = "../login/login.html";
}
