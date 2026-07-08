import { db } from "./firebase-config.js";

import {
collection,
addDoc,
serverTimestamp
}
from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const uploadForm = document.getElementById("uploadForm");

const totalFee = document.getElementById("totalFee");

const colorType = document.getElementById("colorType");

const sideType = document.getElementById("sideType");

const pages = document.getElementById("pages");

function calculateFee() {

const color = colorType.value;
const side = sideType.value;
const pageCount = parseInt(pages.value) || 0;

let rate = 5;

if (color === "color") {
rate = side === "double" ? 15 : 10;
}

totalFee.innerText =
"₹" + (rate * pageCount);

}

colorType.addEventListener(
"change",
calculateFee
);

sideType.addEventListener(
"change",
calculateFee
);

pages.addEventListener(
"input",
calculateFee
);

calculateFee();

uploadForm.addEventListener(
"submit",
async (e) => {

e.preventDefault();

const submitBtn =
document.getElementById("submitBtn");

submitBtn.disabled = true;
submitBtn.innerText =
"अपलोड हो रहा है...";

try {

const file =
document.getElementById("fileInput").files[0];

if (!file) {
alert("फाइल चुनें");
return;
}

if (
file.size >
10 * 1024 * 1024
) {
alert(
"10MB से बड़ी फाइल स्वीकार नहीं है"
);
return;
}

const orderId =
"ORD" +
Date.now();

const formData = new FormData();

formData.append("file", file);

formData.append(
"upload_preset",
"cscprint"
);

const uploadResponse =
await fetch(
"https://api.cloudinary.com/v1_1/ibjslwtg/auto/upload",
{
method: "POST",
body: formData
}
);

const uploadData =
await uploadResponse.json();

if (!uploadData.secure_url) {
throw new Error(
"Cloudinary Upload Failed"
);
}

const fileUrl =
uploadData.secure_url;

await addDoc(
collection(db, "orders"),
{
orderId,

name:
document.getElementById(
"custName"
).value,

mobile:
document.getElementById(
"custMobile"
).value,

fileName:
file.name,

fileUrl,

colorType:
colorType.value,

sideType:
sideType.value,

pages:
pages.value,

fee:
totalFee.innerText,

status:
"Pending",

createdAt:
serverTimestamp(),

expiresAt:
Date.now() +
24 * 60 * 60 * 1000
}
);

document
.getElementById(
"successBox"
)
.classList.remove(
"hidden"
);

document
.getElementById(
"successBox"
)
.innerHTML =

`
<div class="font-bold text-green-700">
ऑर्डर सफलतापूर्वक जमा हो गया
</div>

<div>
ऑर्डर आईडी:
${orderId}
</div>
`;

uploadForm.reset();

calculateFee();

}
catch(err){

alert(
"त्रुटि: " +
err.message
);

console.error(err);

}
finally{

submitBtn.disabled = false;

submitBtn.innerText =
"सबमिट करें";

}

});
