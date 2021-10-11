import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js'

export const firebaseApp = initializeApp({
    apiKey: "AIzaSyCI0Ak5ZuFiwC0Q4m0SsTu3JsR4WthP9xs",
    authDomain: "diylinks-e1702.firebaseapp.com",
    projectId: "diylinks-e1702",
    storageBucket: "diylinks-e1702.appspot.com",
    messagingSenderId: "1007481386662",
    appId: "1:1007481386662:web:75b89aae1d4e794116a667"
})

export const auth = getAuth();