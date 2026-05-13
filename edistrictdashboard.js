const LOGIN_ID = "admin";
const LOGIN_PASSWORD = "1234";

// SAFE VARIABLES
let records = [];
let services = [];
let todayCount = 0;

/* LOGIN FUNCTION */
function login() {
  const id = document.getElementById("loginId").value;
  const pass = document.getElementById("loginPassword").value;

  if (id === LOGIN_ID && pass === LOGIN_PASSWORD) {
    document.getElementById("loginContainer").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    document.getElementById("loginError").innerText = "";
  } else {
    document.getElementById("loginError").innerText = "❌ Wrong ID or Password";
  }
}

/* UPDATE DASHBOARD COUNTS */
function updateStats() {
  document.getElementById("todayRecords").innerText = todayCount;
  document.getElementById("totalServices").innerText = services.length;
  document.getElementById("totalRecords").innerText = records.length;
}

/* SEARCH */
function searchRecords() {
  const value = document.getElementById("searchInput").value.toLowerCase();
  const rows = document.querySelectorAll("tbody tr");

  rows.forEach(row => {
    const text = row.innerText.toLowerCase();
    row.style.display = text.includes(value) ? "" : "none";
  });
}

/* EXPORT CSV */
function exportCSV() {
  let csv = "SR,Name,Mobile,Service,Date\n";

  records.forEach((r, index) => {
    csv += `${index + 1},${r.name},${r.mobile},${r.service},${r.date}\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'records.csv';
  a.click();
}

/* CLOCK */
function updateClock() {
  const now = new Date();
  document.getElementById("clock").innerText = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);

/* INTERNET STATUS */
function updateInternetStatus() {
  const status = navigator.onLine ? "🟢 Online" : "🔴 Offline";
  document.getElementById("internetStatus").innerText = status;
}

window.addEventListener("online", updateInternetStatus);
window.addEventListener("offline", updateInternetStatus);
updateInternetStatus();

/* MODAL CLOSE */
window.onclick = function(event) {
  const modal = document.getElementById("modal");
  if (event.target === modal) {
    closeModal();
  }
};
