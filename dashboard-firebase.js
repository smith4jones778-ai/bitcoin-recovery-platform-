/* =====================================================
   FIREBASE IMPORTS
===================================================== */

import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged,
    signOut
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    getDatabase,
    ref,
    get,
    set,
    push,
    update,
    onValue,
    serverTimestamp
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

/* =====================================================
   FIREBASE CONFIG
===================================================== */

const firebaseConfig = {

    apiKey: "AIzaSyBA_gGITL3vOX_wymV8m3c7h_2kYxUEL0A",

    authDomain: "email-5e336.firebaseapp.com",

    databaseURL:
    "https://email-5e336-default-rtdb.firebaseio.com",

    projectId: "email-5e336",

    storageBucket: "email-5e336.appspot.com",

    messagingSenderId: "561655323170",

    appId:
    "1:561655323170:web:42fcf886c34f2d5a16487b",

    measurementId:
    "G-J92WNBY5RL"

};

/* =====================================================
   INITIALIZE
===================================================== */

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getDatabase(app);

/* =====================================================
   GLOBALS
===================================================== */

let currentUser = null;

let currentUserData = null;

/* =====================================================
   ELEMENTS
===================================================== */

const welcomeMessage =
document.getElementById("welcomeMessage");

const walletAddress =
document.getElementById("walletAddress");

const accountBalance =
document.getElementById("accountBalance");

const logoutBtn =
document.getElementById("logoutBtn");

/* =====================================================
   AUTH GUARD
===================================================== */

onAuthStateChanged(auth, async(user)=>{

    if(!user){

        window.location.href =
        "index.html";

        return;
    }

    currentUser = user;

    try{

        showLoader();

        await loadUserProfile();

    }
    catch(error){

        console.error(error);

        showToast(
            "Failed to load dashboard",
            "error"
        );
    }
    finally{

        hideLoader();

    }

});

/* =====================================================
   LOAD USER PROFILE
===================================================== */

async function loadUserProfile(){

    if(!currentUser) return;

    const userRef =
    ref(
        db,
        "users/" + currentUser.uid
    );

    const snapshot =
    await get(userRef);

    if(!snapshot.exists()){

        showToast(
            "User profile not found",
            "error"
        );

        return;
    }

    currentUserData =
    snapshot.val();

    updateDashboardProfile(
        currentUserData
    );

}

/* =====================================================
   UPDATE DASHBOARD
===================================================== */

function updateDashboardProfile(data){

    const name =
    data.name ||
    currentUser.displayName ||
    "User";

    const email =
    data.email ||
    currentUser.email ||
    "";

    const wallet =
    data.walletAddress ||
    "Not Assigned";

    const balance =
    Number(
        data.balance || 0
    );

    /* Welcome */

    if(welcomeMessage){

        const currentText =
        welcomeMessage.innerText;

        welcomeMessage.innerText =
        `${currentText}, ${name}`;

    }

    /* User Initial */

    if(window.setUserInitial){

        window.setUserInitial(name);

    }

    /* Wallet Card */

    if(walletAddress){

        walletAddress.innerText =
        wallet;

    }

    /* Balance Card */

    if(accountBalance){

        accountBalance.innerText =
        `$${balance.toFixed(2)}`;

    }

    /* Profile Form */

    if(window.populateProfile){

        window.populateProfile({

            name: name,

            email: email,

            walletAddress: wallet,

            balance: balance

        });

    }

}

/* =====================================================
   REALTIME USER PROFILE LISTENER
===================================================== */

function startProfileListener(){

    if(!currentUser) return;

    const userRef =
    ref(
        db,
        "users/" + currentUser.uid
    );

    onValue(userRef,(snapshot)=>{

        if(snapshot.exists()){

            currentUserData =
            snapshot.val();

            updateDashboardProfile(
                currentUserData
            );

        }

    });

}

/* =====================================================
   LOGOUT
===================================================== */

if(logoutBtn){

    logoutBtn.addEventListener(
        "click",
        async(e)=>{

        e.preventDefault();

        try{

            showLoader();

            await signOut(auth);

            showToast(
                "Logged out successfully"
            );

            setTimeout(()=>{

                window.location.href =
                "index.html";

            },500);

        }
        catch(error){

            console.error(error);

            showToast(
                error.message,
                "error"
            );

        }
        finally{

            hideLoader();

        }

    });

}

/* =====================================================
   HELPERS
===================================================== */

function formatCurrency(amount){

    return `$${Number(
        amount || 0
    ).toFixed(2)}`;

}

/* =====================================================
   EXPORTS FOR NEXT PARTS
===================================================== */

window.auth = auth;

window.db = db;

window.currentUser = ()=>currentUser;

window.currentUserData = ()=>currentUserData;

window.firebaseRef = ref;

window.firebaseGet = get;

window.firebaseSet = set;

window.firebasePush = push;

window.firebaseUpdate = update;

window.serverTimestamp =
serverTimestamp;

window.startProfileListener =
startProfileListener;

window.formatCurrency =
formatCurrency;

/* =====================================================
   START PROFILE LISTENER
===================================================== */

setTimeout(()=>{

    startProfileListener();

},2000);

console.log(
    "Dashboard Firebase Part 1 Loaded"
);
/* =====================================================
   CASES MANAGEMENT
===================================================== */

const saveCaseBtn =
document.getElementById("saveCaseBtn");

const caseTitle =
document.getElementById("caseTitle");

const caseDescription =
document.getElementById("caseDescription");

const caseWallet =
document.getElementById("caseWallet");

const messageCaseDropdown =
document.getElementById("messageCase");

/* =====================================================
   CREATE CASE
===================================================== */

if(saveCaseBtn){

    saveCaseBtn.addEventListener(
        "click",
        createNewCase
    );

}

async function createNewCase(){

    try{

        const user =
        window.currentUser();

        if(!user){

            showToast(
                "Authentication required",
                "error"
            );

            return;
        }

        const title =
        caseTitle.value.trim();

        const description =
        caseDescription.value.trim();

        const wallet =
        caseWallet.value.trim();

        if(
            !title ||
            !description ||
            !wallet
        ){

            showToast(
                "Please complete all fields",
                "error"
            );

            return;
        }

        showLoader();

        const caseRef =
        push(
            ref(
                db,
                "cases/" + user.uid
            )
        );

        const caseId =
        "CASE-" +
        Date.now();

        const caseData = {

            caseId: caseId,

            title: title,

            description: description,

            wallet: wallet,

            status: "Pending Review",

            userId: user.uid,

            userEmail: user.email,

            createdAt:
            new Date().toISOString()

        };

        await set(
            caseRef,
            caseData
        );

        const notificationRef =
        push(
            ref(
                db,
                "notifications/" +
                user.uid
            )
        );

        await set(
            notificationRef,
            {

                title:
                "Case Submitted",

                message:
                "Your recovery case has been submitted successfully.",

                createdAt:
                serverTimestamp(),

                read:false

            }
        );

        caseTitle.value = "";
        caseDescription.value = "";
        caseWallet.value = "";

        const modal =
        document.getElementById(
            "caseModal"
        );

        if(modal){

            modal.style.display =
            "none";

        }

        showToast(
            "Case submitted successfully"
        );

    }
    catch(error){

        console.error(error);

        showToast(
            error.message,
            "error"
        );

    }
    finally{

        hideLoader();

    }

}

/* =====================================================
   LOAD CASES
===================================================== */

function startCasesListener(){

    const user =
    window.currentUser();

    if(!user) return;

    const casesRef =
    ref(
        db,
        "cases/" + user.uid
    );

    onValue(
        casesRef,
        (snapshot)=>{

        const cases = [];

        if(snapshot.exists()){

            snapshot.forEach(
                child=>{

                const item =
                child.val();

                cases.push({

                    firebaseId:
                    child.key,

                    caseId:
                    item.caseId ||
                    "N/A",

                    title:
                    item.title ||
                    "Untitled",

                    status:
                    item.status ||
                    "Pending",

                    date:
                    formatDate(
                        item.createdAt
                    ),

                    description:
                    item.description ||
                    "",

                    wallet:
                    item.wallet ||
                    ""

                });

            });

        }

        cases.sort(
            (a,b)=>
            b.caseId.localeCompare(
                a.caseId
            )
        );

        if(window.renderCases){

            window.renderCases(
                cases
            );

        }

        if(window.updateCaseCount){

            window.updateCaseCount(
                cases.length
            );

        }

        populateCaseDropdown(
            cases
        );

        window.userCases =
        cases;

    });

}

/* =====================================================
   CASE DROPDOWN
===================================================== */

function populateCaseDropdown(
    cases
){

    if(!messageCaseDropdown)
    return;

    messageCaseDropdown.innerHTML =
    `
    <option value="">
    Select Case
    </option>
    `;

    cases.forEach(item=>{

        messageCaseDropdown
        .innerHTML +=

        `
        <option value="${item.caseId}">
        ${item.caseId} - ${item.title}
        </option>
        `;

    });

}

/* =====================================================
   CASE DETAILS MODAL
===================================================== */

window.openCaseDetails =
function(caseId){

    const modal =
    document.getElementById(
        "caseDetailsModal"
    );

    const content =
    document.getElementById(
        "caseDetailsContent"
    );

    if(
        !window.userCases ||
        window.userCases.length===0
    ){

        content.innerHTML =
        `
        <p>
        No details available.
        </p>
        `;

        modal.style.display =
        "flex";

        return;
    }

    const caseData =
    window.userCases.find(
        item =>
        item.caseId === caseId
    );

    if(!caseData){

        content.innerHTML =
        `
        <p>
        Case not found.
        </p>
        `;

        modal.style.display =
        "flex";

        return;
    }

    content.innerHTML =

    `
    <div class="case-detail-box">

        <h3>
        ${caseData.title}
        </h3>

        <p>
        <strong>Case ID:</strong>
        ${caseData.caseId}
        </p>

        <p>
        <strong>Status:</strong>
        ${caseData.status}
        </p>

        <p>
        <strong>Wallet:</strong>
        ${caseData.wallet}
        </p>

        <p>
        <strong>Description:</strong>
        </p>

        <p>
        ${caseData.description}
        </p>

    </div>
    `;

    modal.style.display =
    "flex";

};

/* =====================================================
   DATE FORMATTER
===================================================== */

function formatDate(dateValue){

    if(!dateValue)
    return "-";

    const date =
    new Date(dateValue);

    return date.toLocaleDateString(
        "en-US",
        {

            year:"numeric",

            month:"short",

            day:"numeric"

        }
    );

}

/* =====================================================
   START CASES LISTENER
===================================================== */

setTimeout(()=>{

    startCasesListener();

},2500);

console.log(
    "Dashboard Firebase Part 2 Loaded"
);
/* =====================================================
   PART 4
   SEND MESSAGE
   PROFILE UPDATE
   MARK READ
   QUICK ACTIONS
   FINAL INITIALIZATION
===================================================== */

/* =====================================================
   ELEMENTS
===================================================== */

const sendMessageBtn =
document.getElementById("sendMessageBtn");

const updateProfileBtn =
document.getElementById("updateProfileBtn");

const messageText =
document.getElementById("messageText");

const messageCase =
document.getElementById("messageCase");

/* =====================================================
   SEND MESSAGE
===================================================== */

if(sendMessageBtn){

    sendMessageBtn.addEventListener(
        "click",
        sendMessage
    );

}

async function sendMessage(){

    try{

        const user =
        window.currentUser();

        if(!user){

            showToast(
                "User not authenticated",
                "error"
            );

            return;

        }

        const selectedCase =
        messageCase.value;

        const text =
        messageText.value.trim();

        if(!selectedCase){

            showToast(
                "Select a case",
                "error"
            );

            return;

        }

        if(!text){

            showToast(
                "Enter your message",
                "error"
            );

            return;

        }

        showLoader();

        const msgRef =
        push(
            ref(
                db,
                "messages/" +
                user.uid
            )
        );

        await set(
            msgRef,
            {

                sender:
                currentUserData?.name ||
                user.displayName ||
                "User",

                senderType:
                "user",

                caseId:
                selectedCase,

                message:
                text,

                read:
                false,

                createdAt:
                new Date().toISOString()

            }
        );

        const notificationRef =
        push(
            ref(
                db,
                "notifications/" +
                user.uid
            )
        );

        await set(
            notificationRef,
            {

                title:
                "Message Sent",

                message:
                "Your message has been submitted successfully.",

                read:
                false,

                createdAt:
                serverTimestamp()

            }
        );

        messageText.value = "";

        const modal =
        document.getElementById(
            "messageModal"
        );

        if(modal){

            modal.style.display =
            "none";

        }

        showToast(
            "Message sent successfully"
        );

    }
    catch(error){

        console.error(error);

        showToast(
            error.message,
            "error"
        );

    }
    finally{

        hideLoader();

    }

}

/* =====================================================
   UPDATE PROFILE
===================================================== */

if(updateProfileBtn){

    updateProfileBtn.addEventListener(
        "click",
        updateUserProfile
    );

}

async function updateUserProfile(){

    try{

        const user =
        window.currentUser();

        if(!user){

            showToast(
                "Authentication required",
                "error"
            );

            return;

        }

        const name =
        document
        .getElementById(
            "profileName"
        )
        .value
        .trim();

        const wallet =
        document
        .getElementById(
            "profileWallet"
        )
        .value
        .trim();

        const balance =
        parseFloat(
            document
            .getElementById(
                "profileBalance"
            )
            .value
        ) || 0;

        if(!name){

            showToast(
                "Name is required",
                "error"
            );

            return;

        }

        showLoader();

        await update(
            ref(
                db,
                "users/" +
                user.uid
            ),
            {

                name:
                name,

                walletAddress:
                wallet,

                balance:
                balance,

                updatedAt:
                new Date().toISOString()

            }
        );

        const notificationRef =
        push(
            ref(
                db,
                "notifications/" +
                user.uid
            )
        );

        await set(
            notificationRef,
            {

                title:
                "Profile Updated",

                message:
                "Your profile was updated successfully.",

                read:
                false,

                createdAt:
                serverTimestamp()

            }
        );

        showToast(
            "Profile updated successfully"
        );

    }
    catch(error){

        console.error(error);

        showToast(
            error.message,
            "error"
        );

    }
    finally{

        hideLoader();

    }

}

/* =====================================================
   MARK ALL NOTIFICATIONS READ
===================================================== */

async function markNotificationsRead(){

    try{

        const user =
        window.currentUser();

        if(!user) return;

        const notificationsRef =
        ref(
            db,
            "notifications/" +
            user.uid
        );

        const snapshot =
        await get(
            notificationsRef
        );

        if(!snapshot.exists())
        return;

        const updates = {};

        snapshot.forEach(
            child=>{

            updates[
                child.key +
                "/read"
            ] = true;

        });

        await update(
            notificationsRef,
            updates
        );

    }
    catch(error){

        console.error(error);

    }

}

/* =====================================================
   MARK ALL MESSAGES READ
===================================================== */

async function markMessagesRead(){

    try{

        const user =
        window.currentUser();

        if(!user) return;

        const messagesRef =
        ref(
            db,
            "messages/" +
            user.uid
        );

        const snapshot =
        await get(
            messagesRef
        );

        if(!snapshot.exists())
        return;

        const updates = {};

        snapshot.forEach(
            child=>{

            updates[
                child.key +
                "/read"
            ] = true;

        });

        await update(
            messagesRef,
            updates
        );

    }
    catch(error){

        console.error(error);

    }

}

/* =====================================================
   AUTO MARK READ WHEN OPENED
===================================================== */

const notificationsSection =
document.getElementById(
    "notificationsSection"
);

const messagesSection =
document.getElementById(
    "messagesSection"
);

if(notificationsSection){

    notificationsSection.addEventListener(
        "click",
        markNotificationsRead
    );

}

if(messagesSection){

    messagesSection.addEventListener(
        "click",
        markMessagesRead
    );

}

/* =====================================================
   QUICK ACTION BUTTONS
===================================================== */

const openTransactionsBtn =
document.getElementById(
    "openTransactionsBtn"
);

if(openTransactionsBtn){

    openTransactionsBtn
    .addEventListener(
        "click",
        ()=>{

        document
        .getElementById(
            "transactionsSection"
        )
        ?.scrollIntoView({

            behavior:
            "smooth"

        });

    });

}

/* =====================================================
   FINAL STARTUP
===================================================== */

window.dashboardReady = true;

console.log(
    "Dashboard Firebase Fully Loaded"
);

showToast(
    "Dashboard Ready"
);