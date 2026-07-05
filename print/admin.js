import { auth, db } from "./firebase-config.js";

import {
signInWithEmailAndPassword,
signOut,
onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

import {
collection,
onSnapshot,
doc,
updateDoc,
deleteDoc
}
from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const ADMIN_EMAIL = "vleazm1469@gmail.com";

const loginForm = document.getElementById("loginForm");
const dashboard = document.getElementById("dashboard");
const orderTable = document.getElementById("orderTable");

loginForm.addEventListener(
"submit",
async (e) => {

e.preventDefault();

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;

try {

await signInWithEmailAndPassword(
auth,
email,
password
);

}
catch(error){

alert(
"Login Failed\n\n" +
error.message
);

}

});

onAuthStateChanged(
auth,
(user) => {

if(!user){

dashboard.classList.add("hidden");
return;

}

if(user.email !== ADMIN_EMAIL){

alert(
"आपको Admin Access नहीं है"
);

signOut(auth);
return;

}

loginForm.parentElement.classList.add(
"hidden"
);

dashboard.classList.remove(
"hidden"
);

loadOrders();

}
);

function loadOrders(){

onSnapshot(
collection(db,"orders"),

(snapshot)=>{

orderTable.innerHTML = "";

snapshot.forEach((docSnap)=>{

const data = docSnap.data();

const tr =
document.createElement("tr");

tr.innerHTML = `

<td class="border p-2">
${data.orderId || ""}
</td>

<td class="border p-2">
${data.name || ""}
</td>

<td class="border p-2">
${data.mobile || ""}
</td>

<td class="border p-2">
${data.fee || ""}
</td>

<td class="border p-2">
${data.status || ""}
</td>

<td class="border p-2">

<a
href="${data.fileUrl}"
target="_blank"
class="text-blue-600 underline">

View

</a>

</td>

<td class="border p-2">

<button
class="completeBtn bg-green-600 text-white px-2 py-1 rounded text-xs"
data-id="${docSnap.id}">

Complete

</button>

<button
class="deleteBtn bg-red-600 text-white px-2 py-1 rounded text-xs ml-2"
data-id="${docSnap.id}">

Delete

</button>

</td>

`;

orderTable.appendChild(tr);

});

attachActions();

});

}

function attachActions(){

document
.querySelectorAll(".completeBtn")
.forEach((btn)=>{

btn.onclick = async ()=>{

const id =
btn.dataset.id;

await updateDoc(
doc(db,"orders",id),
{
status:"Completed"
}
);

};

});

document
.querySelectorAll(".deleteBtn")
.forEach((btn)=>{

btn.onclick = async ()=>{

const ok =
confirm(
"क्या आप यह Order Delete करना चाहते हैं?"
);

if(!ok) return;

await deleteDoc(
doc(db,"orders",btn.dataset.id)
);

};

});

}

document
.getElementById("logoutBtn")
.addEventListener(
"click",
()=>{

signOut(auth);

location.reload();

}
);
