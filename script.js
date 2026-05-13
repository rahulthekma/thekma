// script.js

let voices = [];

window.speechSynthesis.onvoiceschanged = () => {

voices = window.speechSynthesis.getVoices();

};

document.getElementById("number").addEventListener("keypress", function(event){

if(event.key === "Enter"){

checkStatus();

}

});

window.onload = function(){

document.getElementById("number").focus();

};

document.getElementById("service").addEventListener("change", function(){

const service = this.value;

const input = document.getElementById("number");

if(service === "electric"){

input.placeholder = "Enter Electricity Account Number";

}

else if(service === "edistrict"){

input.placeholder = "Enter Application Number";

}

else if(service === "varasat"){

input.placeholder = "Enter Case Number";

}

else if(service === "google"){

input.placeholder = "Search anything on Google...";

}

});

function checkStatus(){

const number =
document.getElementById("number").value.trim();

const service =
document.getElementById("service").value;

if(number === ""){

alert("Please enter something");

return;

}

if(service === "google"){

const googleUrl =
"https://www.google.com/search?q="
+
encodeURIComponent(number);

window.open(googleUrl, "_blank");

return;

}

let url = "";

if(service === "electric"){

url =
"https://consumer.uppcl.org/wss/pay_bill?kno="
+
encodeURIComponent(number)
+
"&discom=PUVNL";

}

else if(service === "edistrict"){

url =
"https://edistrict.up.gov.in/edistrict/showStatushome.aspx?application_no="
+
encodeURIComponent(number);

}

else if(service === "varasat"){

url =
"https://vaad.up.nic.in/KhaPu_User/P11_Applicant_Details.aspx?case_auto_nogen="
+
encodeURIComponent(number);

}

window.open(url, "_blank");

speakStatus(number);

}

function speakStatus(number){

const message =
"Please recheck the numbers. Your entered number is "
+
number.split('').join(' ');

const speech =
new SpeechSynthesisUtterance(message);

speech.lang = "en-US";

speech.rate = 1.15;

speech.pitch = 1;

const englishVoice = voices.find(voice =>

voice.lang.includes("en")

);

if(englishVoice){

speech.voice = englishVoice;

}

window.speechSynthesis.cancel();

window.speechSynthesis.speak(speech);

}

function openUniversityModal(){

document.getElementById("universityModal").style.display =
"flex";

}

function closeUniversityModal(){

document.getElementById("universityModal").style.display =
"none";

}

function openAadhaarModal(){

document.getElementById("aadhaarModal").style.display =
"flex";

}

function closeAadhaarModal(){

document.getElementById("aadhaarModal").style.display =
"none";

}

window.onclick = function(event){

const universityModal =
document.getElementById("universityModal");

const aadhaarModal =
document.getElementById("aadhaarModal");

if(event.target === universityModal){

universityModal.style.display = "none";

}

if(event.target === aadhaarModal){

aadhaarModal.style.display = "none";

}

};
