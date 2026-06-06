/* ==========================================
   ELEMENTS
========================================== */

const sidebar =
document.getElementById("sidebar");

const overlay =
document.getElementById("overlay");

const menuBtn =
document.getElementById("menuBtn");

const logoutBtn =
document.getElementById("logoutBtn");

const toast =
document.getElementById("toast");

const loader =
document.getElementById("loader");

/* ==========================================
   MODALS
========================================== */

const caseModal =
document.getElementById("caseModal");

const messageModal =
document.getElementById("messageModal");

const caseDetailsModal =
document.getElementById("caseDetailsModal");

const createCaseBtn =
document.getElementById("createCaseBtn");

const newCaseButton =
document.getElementById("newCaseButton");

const openMessagesBtn =
document.getElementById("openMessagesBtn");

/* ==========================================
   SIDEBAR
========================================== */

if(menuBtn){

menuBtn.addEventListener("click",()=>{

sidebar.classList.add("active");

overlay.classList.add("active");

});

}

if(overlay){

overlay.addEventListener("click",()=>{

sidebar.classList.remove("active");

overlay.classList.remove("active");

});

}

/* ==========================================
   MODALS
========================================== */

function openModal(modal){

if(modal){

modal.style.display = "flex";

}

}

function closeModal(modal){

if(modal){

modal.style.display = "none";

}

}

if(createCaseBtn){

createCaseBtn.addEventListener("click",()=>{

openModal(caseModal);

});

}

if(newCaseButton){

newCaseButton.addEventListener("click",()=>{

openModal(caseModal);

});

}

if(openMessagesBtn){

openMessagesBtn.addEventListener("click",()=>{

openModal(messageModal);

});

}

/* ==========================================
   CLOSE MODALS ON BACKGROUND CLICK
========================================== */

window.addEventListener("click",(e)=>{

if(e.target === caseModal){

closeModal(caseModal);

}

if(e.target === messageModal){

closeModal(messageModal);

}

if(e.target === caseDetailsModal){

closeModal(caseDetailsModal);

}

});

/* ==========================================
   ESC KEY
========================================== */

document.addEventListener("keydown",(e)=>{

if(e.key === "Escape"){

closeModal(caseModal);

closeModal(messageModal);

closeModal(caseDetailsModal);

sidebar.classList.remove("active");

overlay.classList.remove("active");

}

});

/* ==========================================
   TOAST
========================================== */

function showToast(
message,
type="success"
){

if(!toast) return;

toast.innerText = message;

if(type === "success"){

toast.style.background="#1ecb81";

}

if(type === "error"){

toast.style.background="#ff5252";

}

toast.style.display="block";

setTimeout(()=>{

toast.style.display="none";

},3000);

}

window.showToast = showToast;

/* ==========================================
   LOADER
========================================== */

function showLoader(){

if(loader){

loader.style.display="flex";

}

}

function hideLoader(){

if(loader){

loader.style.display="none";

}

}

window.showLoader = showLoader;

window.hideLoader = hideLoader;

/* ==========================================
   GREETING
========================================== */

function updateGreeting(){

const welcome =
document.getElementById(
"welcomeMessage"
);

if(!welcome) return;

const hour =
new Date().getHours();

let greeting = "";

if(hour < 12){

greeting =
"Good Morning";

}
else if(hour < 18){

greeting =
"Good Afternoon";

}
else{

greeting =
"Good Evening";

}

welcome.innerText =
`${greeting}`;

}

updateGreeting();

/* ==========================================
   USER INITIAL
========================================== */

function setUserInitial(name){

const initial =
document.getElementById(
"userInitial"
);

if(!initial) return;

if(name){

initial.innerText =
name.charAt(0).toUpperCase();

}

}

window.setUserInitial =
setUserInitial;

/* ==========================================
   NOTIFICATION COUNT
========================================== */

function updateNotificationCount(
count
){

const badge =
document.getElementById(
"notificationCount"
);

if(badge){

badge.innerText = count;

}

}

window.updateNotificationCount =
updateNotificationCount;

/* ==========================================
   CASE TABLE RENDER
========================================== */

function renderCases(cases){

const table =
document.getElementById(
"casesTableBody"
);

if(!table) return;

table.innerHTML="";

if(cases.length===0){

table.innerHTML=`
<tr>
<td colspan="5">
No Cases Found
</td>
</tr>
`;

return;

}

cases.forEach(caseItem=>{

table.innerHTML += `

<tr>

<td>${caseItem.caseId}</td>

<td>${caseItem.title}</td>

<td>${caseItem.status}</td>

<td>${caseItem.date}</td>

<td>

<button
class="small-btn"
onclick="openCaseDetails('${caseItem.caseId}')">

View

</button>

</td>

</tr>

`;

});

}

window.renderCases =
renderCases;

/* ==========================================
   TRANSACTIONS
========================================== */

function renderTransactions(
transactions
){

const body =
document.getElementById(
"transactionsBody"
);

if(!body) return;

body.innerHTML="";

if(transactions.length===0){

body.innerHTML=`
<tr>
<td colspan="4">
No Transactions Found
</td>
</tr>
`;

return;

}

transactions.forEach(tx=>{

body.innerHTML += `

<tr>

<td>${tx.date}</td>

<td>${tx.description}</td>

<td>${tx.amount}</td>

<td>${tx.status}</td>

</tr>

`;

});

}

window.renderTransactions =
renderTransactions;

/* ==========================================
   NOTIFICATIONS
========================================== */

function renderNotifications(
notifications
){

const container =
document.getElementById(
"notificationsContainer"
);

if(!container) return;

container.innerHTML="";

if(notifications.length===0){

container.innerHTML=`
<div class="notification-item">
No Notifications
</div>
`;

return;

}

notifications.forEach(item=>{

container.innerHTML += `

<div class="notification-item">

<h4>${item.title}</h4>

<p>${item.message}</p>

</div>

`;

});

}

window.renderNotifications =
renderNotifications;

/* ==========================================
   MESSAGES
========================================== */

function renderMessages(
messages
){

const container =
document.getElementById(
"messagesContainer"
);

if(!container) return;

container.innerHTML="";

if(messages.length===0){

container.innerHTML=`
<div class="message-empty">
No Messages Yet
</div>
`;

return;

}

messages.forEach(msg=>{

container.innerHTML += `

<div class="message-card">

<h4>${msg.sender}</h4>

<p>${msg.message}</p>

<small>${msg.date}</small>

</div>

`;

});

}

window.renderMessages =
renderMessages;

/* ==========================================
   CASE DETAILS
========================================== */

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

content.innerHTML=`

<h3>
Case ID:
${caseId}
</h3>

<p>
Loading case details...
</p>

`;

openModal(modal);

};

/* ==========================================
   PROFILE FORM
========================================== */

function populateProfile(data){

const profileName =
document.getElementById(
"profileName"
);

const profileEmail =
document.getElementById(
"profileEmail"
);

const profileWallet =
document.getElementById(
"profileWallet"
);

const profileBalance =
document.getElementById(
"profileBalance"
);

if(profileName)
profileName.value =
data.name || "";

if(profileEmail)
profileEmail.value =
data.email || "";

if(profileWallet)
profileWallet.value =
data.walletAddress || "";

if(profileBalance)
profileBalance.value =
data.balance || 0;

}

window.populateProfile =
populateProfile;

/* ==========================================
   QUICK COUNTERS
========================================== */

window.updateCaseCount =
function(count){

const el =
document.getElementById(
"caseCount"
);

if(el){

el.innerText = count;

}

};

window.updateMessageCount =
function(count){

const el =
document.getElementById(
"messageCount"
);

if(el){

el.innerText = count;

}

};

/* ==========================================
   READY
========================================== */

console.log(
"Dashboard UI Loaded Successfully"
);

