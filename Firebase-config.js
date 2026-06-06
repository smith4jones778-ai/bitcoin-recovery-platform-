import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    onAuthStateChanged,
    signOut,
    updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    getDatabase,
    ref,
    set,
    get,
    push,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

/* =====================================================
   FIREBASE CONFIG
===================================================== */

const firebaseConfig = {

apiKey: "AIzaSyBA_gGITL3vOX_wymV8m3c7h_2kYxUEL0A",

authDomain: "email-5e336.firebaseapp.com",

databaseURL: "https://email-5e336-default-rtdb.firebaseio.com",

projectId: "email-5e336",

storageBucket: "email-5e336.appspot.com",

messagingSenderId: "561655323170",

appId: "1:561655323170:web:42fcf886c34f2d5a16487b",

measurementId: "G-J92WNBY5RL"

};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getDatabase(app);

/* =====================================================
   REGISTER
===================================================== */

const registerBtn =
document.getElementById("registerSubmit");

if(registerBtn){

registerBtn.addEventListener("click", async ()=>{

const name =
document.getElementById("regName").value.trim();

const email =
document.getElementById("regEmail").value.trim();

const password =
document.getElementById("regPassword").value;

if(!name || !email || !password){

showToast("Please complete all fields","error");
return;

}

try{

setLoading(registerBtn);

const result =
await createUserWithEmailAndPassword(
auth,
email,
password
);

await updateProfile(
result.user,
{
displayName:name
}
);

await set(
ref(db,"users/"+result.user.uid),
{
name:name,
email:email,
walletAddress:"",
balance:0,
createdAt:new Date().toISOString()
}
);

const notificationRef =
push(
ref(
db,
"notifications/"+result.user.uid
)
);

await set(notificationRef,{
title:"Welcome",
message:"Your account was created successfully.",
createdAt:serverTimestamp(),
read:false
});

showToast("Registration successful");

setTimeout(()=>{
window.location.href="dashboard.html";
},1500);

}
catch(error){

showToast(error.message,"error");

}
finally{

resetButton(registerBtn);

}

});

}

/* =====================================================
   LOGIN
===================================================== */

const loginBtn =
document.getElementById("loginSubmit");

if(loginBtn){

loginBtn.addEventListener("click", async ()=>{

const email =
document.getElementById("loginEmail").value.trim();

const password =
document.getElementById("loginPassword").value;

if(!email || !password){

showToast("Enter email and password","error");
return;

}

try{

setLoading(loginBtn);

await signInWithEmailAndPassword(
auth,
email,
password
);

showToast("Login successful");

setTimeout(()=>{

window.location.href =
"dashboard.html";

},1000);

}
catch(error){

showToast(error.message,"error");

}
finally{

resetButton(loginBtn);

}

});

}

/* =====================================================
   RESET PASSWORD
===================================================== */

const resetBtn =
document.getElementById("resetSubmit");

if(resetBtn){

resetBtn.addEventListener("click", async ()=>{

const email =
document.getElementById("resetEmail").value.trim();

if(!email){

showToast("Enter your email","error");
return;

}

try{

setLoading(resetBtn);

await sendPasswordResetEmail(
auth,
email
);

showToast(
"Password reset email sent"
);

}
catch(error){

showToast(error.message,"error");

}
finally{

resetButton(resetBtn);

}

});

}

/* =====================================================
   AUTH STATE
===================================================== */

onAuthStateChanged(
auth,
(user)=>{

if(user){

console.log(
"Logged in:",
user.displayName
);

}

}
);

/* =====================================================
   GLOBAL EXPORTS
===================================================== */

window.auth = auth;
window.db = db;
window.firebaseRef = ref;
window.firebaseGet = get;
window.firebaseSet = set;
window.firebasePush = push;

/* =====================================================
   LOGOUT HELPER
===================================================== */

window.logoutUser = async ()=>{

await signOut(auth);

window.location.href =
"index.html";

};

