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

const userModal =
document.getElementById("userModal");

const caseModal =
document.getElementById("caseModal");

const transactionModal =
document.getElementById("transactionModal");

const replyModal =
document.getElementById("replyModal");

const broadcastModal =
document.getElementById("broadcastModal");

const broadcastBtn =
document.getElementById("broadcastBtn");

const newTransactionBtn =
document.getElementById("newTransactionBtn");

const refreshBtn =
document.getElementById("refreshBtn");

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
   MODAL HELPERS
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

window.openModal = openModal;
window.closeModal = closeModal;

/* ==========================================
   QUICK ACTIONS
========================================== */

if(broadcastBtn){

broadcastBtn.addEventListener("click",()=>{

openModal(broadcastModal);

});

}

if(newTransactionBtn){

newTransactionBtn.addEventListener("click",()=>{

openModal(transactionModal);

});

}

if(refreshBtn){

refreshBtn.addEventListener("click",()=>{

location.reload();

});

}

/* ==========================================
   CLOSE MODALS
========================================== */

window.addEventListener("click",(e)=>{

if(e.target===userModal)
closeModal(userModal);

if(e.target===caseModal)
closeModal(caseModal);

if(e.target===transactionModal)
closeModal(transactionModal);

if(e.target===replyModal)
closeModal(replyModal);

if(e.target===broadcastModal)
closeModal(broadcastModal);

});

/* ==========================================
   ESC KEY
========================================== */

document.addEventListener("keydown",(e)=>{

if(e.key==="Escape"){

closeModal(userModal);
closeModal(caseModal);
closeModal(transactionModal);
closeModal(replyModal);
closeModal(broadcastModal);

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

if(type==="success"){

toast.style.background =
"#10b981";

}else{

toast.style.background =
"#ef4444";

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

loader.style.display =
"flex";

}

}

function hideLoader(){

if(loader){

loader.style.display =
"none";

}

}

window.showLoader =
showLoader;

window.hideLoader =
hideLoader;

/* ==========================================
   ADMIN INITIAL
========================================== */

function setAdminInitial(name){

const el =
document.getElementById(
"adminInitial"
);

if(!el) return;

if(name){

el.innerText =
name.charAt(0)
.toUpperCase();

}

}

window.setAdminInitial =
setAdminInitial;

/* ==========================================
   SUMMARY CARDS
========================================== */

window.updateDashboardStats =
function(stats){

const mappings = {

totalUsers:
stats.totalUsers || 0,

totalCases:
stats.totalCases || 0,

pendingCases:
stats.pendingCases || 0,

recoveredCases:
stats.recoveredCases || 0,

totalTransactions:
stats.totalTransactions || 0,

unreadMessages:
stats.unreadMessages || 0

};

Object.keys(mappings)
.forEach(id=>{

const el =
document.getElementById(id);

if(el){

el.innerText =
mappings[id];

}

});

};

/* ==========================================
   USERS TABLE
========================================== */

window.renderUsers =
function(users){

const body =
document.getElementById(
"usersTableBody"
);

if(!body) return;

body.innerHTML="";

if(users.length===0){

body.innerHTML=`
<tr>
<td colspan="5">
No Users Found
</td>
</tr>
`;

return;

}

users.forEach(user=>{

body.innerHTML += `

<tr>

<td>${user.name}</td>

<td>${user.email}</td>

<td>${user.walletAddress || "-"}</td>

<td>$${Number(user.balance || 0).toFixed(2)}</td>

<td>

<button
class="small-btn"
onclick="viewUser('${user.uid}')">

View

</button>

</td>

</tr>

`;

});

};

/* ==========================================
   CASES TABLE
========================================== */

window.renderCases =
function(cases){

const body =
document.getElementById(
"casesTableBody"
);

if(!body) return;

body.innerHTML="";

if(cases.length===0){

body.innerHTML=`
<tr>
<td colspan="6">
No Cases Found
</td>
</tr>
`;

return;

}

cases.forEach(item=>{

body.innerHTML += `

<tr>

<td>${item.caseId}</td>

<td>${item.userEmail}</td>

<td>${item.title}</td>

<td>${item.status}</td>

<td>${item.date}</td>

<td>

<button
class="small-btn"
onclick="viewCase('${item.uid}','${item.firebaseKey}')">

View

</button>

</td>

</tr>

`;

});

};

window.renderTransactions =
function(transactions){

const body =
document.getElementById(
"transactionsTableBody"
);

if(!body) return;

body.innerHTML="";

if(transactions.length===0){

body.innerHTML=`
<tr>
<td colspan="5">
No Transactions Found
</td>
</tr>
`;

return;

}

transactions.forEach(tx=>{

body.innerHTML += `

<tr>

<td>${tx.userEmail}</td>

<td>${tx.description}</td>

<td>$${Number(tx.amount).toFixed(2)}</td>

<td>${tx.status}</td>

<td>

<button
class="small-btn"
onclick="editTransaction('${tx.uid}','${tx.key}')">

Edit

</button>

</td>

</tr>

`;

});

};

/* ==========================================
   MESSAGES
========================================== */

window.renderMessages =
function(messages){

const container =
document.getElementById(
"messagesContainer"
);

if(!container) return;

container.innerHTML="";

if(messages.length===0){

container.innerHTML=`

<div class="message-empty">

No Messages Available

</div>

`;

return;

}

messages.forEach(msg=>{

container.innerHTML += `

<div class="message-card">

<h4>

${msg.sender}

</h4>

<p>

${msg.message}

</p>

<small>

${msg.date}

</small>

<br><br>

<button
class="small-btn"
onclick="replyToUser('${msg.uid}')">

Reply

</button>

</div>

`;

});

};

/* ==========================================
   NOTIFICATIONS
========================================== */

window.renderNotifications =
function(notifications){

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

<h4>

${item.title}

</h4>

<p>

${item.message}

</p>

</div>

`;

});

};

/* ==========================================
   VIEW USER
========================================== */

window.viewUser =
function(uid){

const content =
document.getElementById(
"userModalContent"
);

content.innerHTML =

`
<p>
Loading user information...
</p>
`;

openModal(userModal);

};

/* ==========================================
   VIEW CASE
========================================== */

window.viewCase =
function(uid,key){

const content =
document.getElementById(
"caseModalContent"
);

content.innerHTML =

`
<p>
Loading case details...
</p>
`;

openModal(caseModal);

};

/* ==========================================
   REPLY
========================================== */

window.replyToUser =
function(uid){

const hidden =
document.getElementById(
"replyUserId"
);

hidden.value = uid;

openModal(replyModal);

};

/* ==========================================
   SEARCH USERS
========================================== */

const userSearch =
document.getElementById(
"userSearch"
);

if(userSearch){

userSearch.addEventListener(
"input",
(e)=>{

const keyword =
e.target.value
.toLowerCase();

if(
window.allUsers
){

const filtered =
window.allUsers.filter(
user =>

user.name
.toLowerCase()
.includes(keyword)

||

user.email
.toLowerCase()
.includes(keyword)

);

window.renderUsers(
filtered
);

}

});

}

/* ==========================================
   NOTIFICATION BADGE
========================================== */

window.updateNotificationBadge =
function(count){

const badge =
document.getElementById(
"notificationCount"
);

if(badge){

badge.innerText =
count;

}

};

/* ==========================================
   READY
========================================== */

console.log(
"Admin UI Loaded Successfully"
);

