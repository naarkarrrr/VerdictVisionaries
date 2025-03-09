// Import Firebase SDK modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5MpBd6pH5UAY5F_CaOpl1TddSGLgXuBw",
  authDomain: "ghr-hack.firebaseapp.com",
  projectId: "ghr-hack",
  storageBucket: "ghr-hack.firebasestorage.app",
  messagingSenderId: "882444297601",
  appId: "1:882444297601:web:c4fd782b51df3372be3480",
  measurementId: "G-RQVMFGJENF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Redirect if user is already logged in
auth.onAuthStateChanged((user) => {
  if (user) {
    window.location.href = "index.html";
  }
});

// Login function
document.getElementById("submit").addEventListener("click", function (event) {
  event.preventDefault();

  // Inputs
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  // Log in user
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User logged in:", userCredential.user);
      window.location.href = "index.html"; // Redirect after successful login
    })
    .catch((error) => {
      alert(error.message);
      console.error("Login Error:", error);
    });
});
