import { firebaseApp } from '../initialise.js';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js";
// https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js

// Consts

export const auth = getAuth();
const login_form = document.getElementById("login-form");
const signup_form = document.getElementById("signup-form");
var user;
var username;
var email;

// Check if user already logged in

if(localStorage.getItem('userLoggedIn') == 'True'){
    window.location.href = "../index.html";
}

// Login

function signIn(email, password){
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {    
        user = userCredential.user;
        console.log("Login successful!: ", user);
        localStorage.setItem('userLoggedIn', 'True');               
        localStorage.setItem('username', user.displayName);
        localStorage.setItem('userEmail', user.email);
        if(localStorage.getItem('submitToLogin') == 'True'){
            window.location.href = "../submit/submit.html";
        } else {
            window.location.href = "../index.html";
        }
    }).catch((error) => {
        console.error("Error logging in: ", error);
    });
}

login_form.addEventListener('submit', e => {
    e.preventDefault();
    const email = login_form['email-input']['value'];
    const password = login_form['password-input']['value'];    
    signIn(email, password);    
})


// Sign Up

/*
function show_password(){
    var p = document.getElementById("password-input");
    var cp = document.getElementById("confirm-password");
    if(p.type === "password" && cp.type === "password"){
        p.type = "text";
        cp.type = "text";        
    } else {
        p.type = "password";
        cp.type = "password";
    }
}
*/

function signUp(email, password, username){
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {            
        localStorage.setItem('userLoggedIn', 'True');       
        updateProfile(userCredential.user, {
            displayName: username
        })              
        localStorage.setItem('username', username);
        localStorage.setItem('userEmail', email);
        if(localStorage.getItem('submitToLogin') == 'True'){
            window.location.href = "../submit/submit.html";
        } else {
            window.location.href = "../index.html";
        }
    }).catch((error) => {        
        console.error("Error signing up: ", error);
    });    
}
signup_form.addEventListener('submit', e => {
    e.preventDefault();
    const email = signup_form['email-input']['value'];
    const password = signup_form['password-input']['value'];    
    const username = signup_form['username-input']['value'];
    signUp(email, password, username);
})
