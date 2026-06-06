
/* =====================================================
   DOM ELEMENTS
===================================================== */

const mobileMenu = document.getElementById("mobileMenu");
const menuIcon = document.getElementById("menuIcon");
const closeMenu = document.getElementById("closeMenu");

const loginModal = document.getElementById("loginModal");
const registerModal = document.getElementById("registerModal");
const resetModal = document.getElementById("resetModal");

const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");

const mobileLoginBtn = document.getElementById("mobileLoginBtn");
const mobileRegisterBtn = document.getElementById("mobileRegisterBtn");

const heroRegister = document.getElementById("heroRegister");

const forgotPasswordLink =
document.getElementById("forgotPasswordLink");

const toast =
document.getElementById("toast");

/* =====================================================
   MOBILE MENU
===================================================== */

if(menuIcon){

menuIcon.addEventListener("click",()=>{

mobileMenu.classList.add("active");

});

}

if(closeMenu){

closeMenu.addEventListener("click",()=>{

mobileMenu.classList.remove("active");

});

}

/* =====================================================
   OPEN MODALS
===================================================== */

function openLogin(){

loginModal.style.display="flex";

}

function openRegister(){

registerModal.style.display="flex";

}

function openReset(){

resetModal.style.display="flex";

}

if(loginBtn){

loginBtn.addEventListener("click",openLogin);

}

if(registerBtn){

registerBtn.addEventListener("click",openRegister);

}

if(heroRegister){

heroRegister.addEventListener("click",openRegister);

}

if(mobileLoginBtn){

mobileLoginBtn.addEventListener("click",()=>{

mobileMenu.classList.remove("active");

openLogin();

});

}

if(mobileRegisterBtn){

mobileRegisterBtn.addEventListener("click",()=>{

mobileMenu.classList.remove("active");

openRegister();

});

}

/* =====================================================
   FORGOT PASSWORD
===================================================== */

if(forgotPasswordLink){

forgotPasswordLink.addEventListener("click",()=>{

loginModal.style.display="none";

openReset();

});

}

/* =====================================================
   CLOSE MODALS
===================================================== */

window.addEventListener("click",(e)=>{

if(e.target===loginModal){

loginModal.style.display="none";

}

if(e.target===registerModal){

registerModal.style.display="none";

}

if(e.target===resetModal){

resetModal.style.display="none";

}

});

/* =====================================================
   ESC KEY CLOSE
===================================================== */

document.addEventListener("keydown",(e)=>{

if(e.key==="Escape"){

loginModal.style.display="none";
registerModal.style.display="none";
resetModal.style.display="none";

mobileMenu.classList.remove("active");

}

});

/* =====================================================
   TOAST SYSTEM
===================================================== */

function showToast(message,type="success"){

toast.innerText = message;

if(type==="success"){

toast.style.background="#19c37d";

}

if(type==="error"){

toast.style.background="#ff4d4d";

}

toast.style.display="block";

setTimeout(()=>{

toast.style.display="none";

},3000);

}

window.showToast = showToast;

/* =====================================================
   FAQ ACCORDION
===================================================== */

const faqItems =
document.querySelectorAll(".faq-item");

faqItems.forEach(item=>{

item.addEventListener("click",()=>{

faqItems.forEach(faq=>{

if(faq!==item){

faq.classList.remove("active");

}

});

item.classList.toggle("active");

});

});

/* =====================================================
   SCROLL ANIMATION
===================================================== */

const observer = new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},

{
threshold:0.15
}

);

document
.querySelectorAll(
".service-card,.feature-box,.stat-card,.testimonial-card,.contact-card"
)
.forEach(el=>{

el.classList.add("hidden");

observer.observe(el);

});

/* =====================================================
   NAVBAR ACTIVE LINKS
===================================================== */

const sections =
document.querySelectorAll("section");

const navLinks =
document.querySelectorAll("nav a");

window.addEventListener("scroll",()=>{

let current = "";

sections.forEach(section=>{

const sectionTop =
section.offsetTop - 150;

if(pageYOffset >= sectionTop){

current = section.getAttribute("id");

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(
link.getAttribute("href") ===
"#" + current
){

link.classList.add("active");

}

});

});

/* =====================================================
   BUTTON LOADING
===================================================== */

function setLoading(button,text="Processing..."){

button.dataset.original =
button.innerHTML;

button.disabled = true;

button.innerHTML = text;

}

function resetButton(button){

button.disabled = false;

button.innerHTML =
button.dataset.original;

}

window.setLoading =
setLoading;

window.resetButton =
resetButton;

/* =====================================================
   WELCOME MESSAGE
===================================================== */

const hour =
new Date().getHours();

let greeting =
"Welcome";

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

console.log(greeting);

/* =====================================================
   DEMO BUTTON EVENTS
   FIREBASE COMES NEXT FILE
===================================================== */

const loginSubmit =
document.getElementById("loginSubmit");

const registerSubmit =
document.getElementById("registerSubmit");

const resetSubmit =
document.getElementById("resetSubmit");

if(loginSubmit){

loginSubmit.addEventListener("click",()=>{

showToast(
"Authentication will be connected in Firebase file."
);

});

}

if(registerSubmit){

registerSubmit.addEventListener("click",()=>{

showToast(
"Registration will be connected in Firebase file."
);

});

}

if(resetSubmit){

resetSubmit.addEventListener("click",()=>{

showToast(
"Password reset will be connected in Firebase file."
);

});

}
