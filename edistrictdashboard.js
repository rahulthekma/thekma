const LOGIN_ID = "admin";


document.getElementById("todayRecords").innerText = todayCount;
document.getElementById("totalServices").innerText = services.length;

}

function searchRecords(){

const value = document.getElementById("searchInput").value.toLowerCase();

const rows = document.querySelectorAll("tbody tr");

rows.forEach(row=>{

const text = row.innerText.toLowerCase();

row.style.display = text.includes(value) ? "" : "none";

});

}

function exportCSV(){

let csv = "SR,Name,Mobile,Service,Date\n";

records.forEach((r,index)=>{

csv += `${index+1},${r.name},${r.mobile},${r.service},${r.date}\n`;

});

const blob = new Blob([csv], { type: 'text/csv' });

const url = window.URL.createObjectURL(blob);

const a = document.createElement('a');

a.href = url;
a.download = 'records.csv';
a.click();

}

function updateClock(){

const now = new Date();

document.getElementById("clock").innerText = now.toLocaleTimeString();

}

setInterval(updateClock,1000);

function updateInternetStatus(){

const status = navigator.onLine ? "🟢 Online" : "🔴 Offline";

document.getElementById("internetStatus").innerText = status;

}

window.addEventListener("online", updateInternetStatus);
window.addEventListener("offline", updateInternetStatus);

updateInternetStatus();

window.onclick = function(event){

const modal = document.getElementById("modal");

if(event.target === modal){

closeModal();

}

};