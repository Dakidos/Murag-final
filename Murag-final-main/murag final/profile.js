import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore , getDoc , setDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyCUZBdQ0TopHRfktfUrW_85EuwXQ-AgH6E",
    authDomain: "create-account-b137b.firebaseapp.com",
    projectId: "create-account-b137b",
    storageBucket: "create-account-b137b.firebasestorage.app",
    messagingSenderId: "904046684259",
    appId: "1:904046684259:web:2e336c1f510c0c715cb056"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

onAuthStateChanged(auth, (user) => {
    if (!user) {
        console.log("User not logged in");
        window.location.href = "login.html";
    } else {
        const loggedInUser = user.uid;
        console.log("User logged in");
        const docRef = doc (db, "users", loggedInUser);
        getDoc(docRef)
            .then(docSnap => {
                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data());
                    const userData = docSnap.data();
                    document.getElementById("Enter your Username").innerText = userData.firstName;
                    document.getElementById("Enter your ID Number").innerText = userData.email;
                    document.getElementById("Enter your school").innerText = userData.password;
                    document.getElementById("Enter your Email").innerText = userData.idNumber;
                    document.getElementById("Enter your Password").innerText = userData.school;
                } else {
                    console.log("No such document found matching id!");
                }
            })
            .catch((error) => {
                console.log("Error getting document:", error);
            });
    }

});

if(logout){
    logout.addEventListener("click", function (event) {
        event.preventDefault();
        console.log("Logout button clicked");

        signOut(auth)
            .then(() => {
                localStorage.removeItem("user");
                window.location.href = "login.html" + new Date().getTime();
            })
            .catch((error) => {
                console.log(error);
            });
    });
} else {
    console.log("Logout button not found");
}

const clearToken =(idToken) => {
    localStorage.removeItem('idToken', idToken);
}
