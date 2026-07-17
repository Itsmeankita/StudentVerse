/* =========================================================
   StudentVerse — app.js
   Single-file SPA logic: data layer + router + views + tools
   Persistence: localStorage (key "sv_db")
   ========================================================= */

/* ---------------- ICONS (inline SVG, stroke style) ---------------- */
const ICON = {
  home:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/></svg>`,
  cal:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>`,
  book:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5v13Z"/><path d="M4 19.5V6.5"/></svg>`,
  card:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/></svg>`,
  cash:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/></svg>`,
  lib:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h4v16H4zM10 4h4v16h-4zM16 4h4v16h-4z"/></svg>`,
  bell:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>`,
  ai:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3"/><circle cx="12" cy="12" r="3"/></svg>`,
  chat:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.4 8.4 0 0 1-8.9 8.4A9 9 0 1 1 21 11.5Z"/></svg>`,
  brief: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
  gear:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V21a2 2 0 0 1-4 0v-.09a1.7 1.7 0 0 0-1-1.55 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.55-1H3a2 2 0 0 1 0-4h.09a1.7 1.7 0 0 0 1.55-1 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34H9a1.7 1.7 0 0 0 1-1.55V3a2 2 0 0 1 4 0v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87V9a1.7 1.7 0 0 0 1.55 1H21a2 2 0 0 1 0 4h-.09a1.7 1.7 0 0 0-1.55 1Z"/></svg>`,
  users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  chart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="M18 17V9M13 17V5M8 17v-4"/></svg>`,
  bus:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="12" rx="2"/><circle cx="7.5" cy="19" r="1.5"/><circle cx="16.5" cy="19" r="1.5"/><path d="M3 10h18"/></svg>`,
  plus:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>`,
  down:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v13M6 11l6 6 6-6M5 21h14"/></svg>`,
  trash: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4h8v2M6 6l1 15h10l1-15"/></svg>`,
};

/* ---------------- SEED DATA ---------------- */
const FIRST = ["Aarav","Vivaan","Aditya","Ishaan","Reyansh","Kabir","Advait","Arjun","Sai","Vihaan","Ananya","Diya","Ira","Myra","Aadhya","Saanvi","Kiara","Meera","Riya","Anika","Rohan","Karan","Naman","Yash","Pooja","Neha","Simran","Tanvi","Aryan","Dev"];
const LAST  = ["Sharma","Verma","Gupta","Singh","Yadav","Mishra","Patel","Reddy","Nair","Iyer","Chopra","Kapoor","Das","Bose","Rao","Joshi","Malhotra","Sinha","Pandey","Kumar"];
const DEPTS = ["Computer Science","Electronics","Mechanical","Civil","Information Technology"];
const SUBJECTS_BY_DEPT = {
  "Computer Science": ["Data Structures","Operating Systems","DBMS","Computer Networks","Web Technologies","AI Fundamentals"],
  "Electronics": ["Digital Circuits","Signals & Systems","Microprocessors","VLSI Design","Control Systems"],
  "Mechanical": ["Thermodynamics","Fluid Mechanics","Machine Design","Manufacturing Tech","Robotics"],
  "Civil": ["Structural Analysis","Surveying","Geotechnical Engg","Concrete Tech","Transportation Engg"],
  "Information Technology": ["Java Programming","Software Engineering","Cloud Computing","Cyber Security","Data Mining"],
};
function rand(n){ return Math.floor(Math.random()*n); }
function pick(arr){ return arr[rand(arr.length)]; }
function uid(prefix){ return prefix + "-" + Math.random().toString(36).slice(2,8).toUpperCase(); }

function seedDatabase(){
  const students = [];
  for(let i=0;i<40;i++){
    const dept = pick(DEPTS);
    const name = pick(FIRST)+" "+pick(LAST);
    const attendance = 60 + rand(38);
    students.push({
      id: uid("STU"),
      loginId: "SV-2026-"+(100+i),
      name, dept, sem: 1+rand(8),
      attendance,
      fees: { total: 85000, paid: [85000, 65000, 42000, 20000][rand(4)] },
      subjects: SUBJECTS_BY_DEPT[dept],
    });
  }
  const marks = [];
  students.forEach(s=>{
    s.subjects.forEach(sub=>{
      const internal = 12 + rand(13); // /25
      const external = 40 + rand(36); // /75
      marks.push({ studentId: s.id, subject: sub, internal, external });
    });
  });
  const faculty = [];
  for(let i=0;i<14;i++){
    const dept = pick(DEPTS);
    faculty.push({ id: uid("FAC"), loginId:"SV-F-"+(10+i), name: pick(FIRST)+" "+pick(LAST), dept, subject: pick(SUBJECTS_BY_DEPT[dept]) });
  }
  const notices = [
    { id: uid("NOT"), title:"Mid-semester exams schedule released", body:"Mid-sem exams begin from the 2nd week of next month. Hall tickets will be available on the portal 5 days before the first paper.", date: daysAgo(1), audience:"All" },
    { id: uid("NOT"), title:"Annual Tech Fest — Registrations open", body:"Register your team for hackathons, robotics and paper presentation events before slots close.", date: daysAgo(3), audience:"Students" },
    { id: uid("NOT"), title:"Faculty development workshop", body:"A two-day workshop on outcome-based education will be held in the seminar hall.", date: daysAgo(6), audience:"Faculty" },
    { id: uid("NOT"), title:"Library fine waiver week", body:"Return overdue books this week and get your late fines waived.", date: daysAgo(9), audience:"All" },
  ];
  const timetable = [];
  const days = ["Mon","Tue","Wed","Thu","Fri"];
  const slots = ["9:00","10:00","11:15","12:15","2:00","3:00"];
  days.forEach(d=>{
    slots.forEach(t=>{
      if(Math.random()<0.82){
        const f = pick(faculty);
        timetable.push({ day:d, time:t, subject: f.subject, faculty: f.name, room: "Room "+(101+rand(20)) });
      }
    });
  });
  const library = [];
  const bookTitles = ["Introduction to Algorithms","Clean Code","Digital Design","Engineering Mathematics","Thermodynamics Handbook","Database System Concepts","Computer Networking","Operating System Concepts","Machine Design Data Book","Structural Analysis Vol.1"];
  bookTitles.forEach(t=>{
    const issued = Math.random()<0.4;
    library.push({ id: uid("LIB"), title:t, author:"Various", copies: 3+rand(6), issuedTo: issued ? pick(students).id : null, dueDate: issued ? daysFromNow(3+rand(10)) : null });
  });
  const placements = [
    { company:"Infotech Solutions", role:"Software Engineer", date: daysAgo(20), hired: 12 },
    { company:"NextGen Systems", role:"Data Analyst", date: daysAgo(45), hired: 7 },
    { company:"BuildCore Pvt Ltd", role:"Site Engineer", date: daysAgo(60), hired: 5 },
    { company:"Vertex Robotics", role:"R&D Intern", date: daysAgo(10), hired: 4 },
  ];
  const attendanceLog = {}; // studentId -> {date: 'P'|'A'}
  students.forEach(s=>{
    attendanceLog[s.id] = {};
    for(let d=0; d<14; d++){
      const date = daysAgo(d);
      attendanceLog[s.id][date] = Math.random() < s.attendance/100 ? "P" : "A";
    }
  });

  return { students, faculty, marks, notices, timetable, library, placements, attendanceLog, chats:{} };
}
function daysAgo(n){ const d=new Date(); d.setDate(d.getDate()-n); return d.toISOString().slice(0,10); }
function daysFromNow(n){ const d=new Date(); d.setDate(d.getDate()+n); return d.toISOString().slice(0,10); }

function loadDB(){
  let raw = localStorage.getItem("sv_db");
  if(!raw){
    const db = seedDatabase();
    localStorage.setItem("sv_db", JSON.stringify(db));
    return db;
  }
  return JSON.parse(raw);
}
function saveDB(){ localStorage.setItem("sv_db", JSON.stringify(DB)); }
let DB = loadDB();

/* ---------------- SESSION ---------------- */
let SESSION = JSON.parse(localStorage.getItem("sv_session") || "null");

function gradeFromScore(total){ // total /100
  if(total>=90) return "A+"; if(total>=80) return "A"; if(total>=70) return "B+";
  if(total>=60) return "B"; if(total>=50) return "C"; if(total>=40) return "D"; return "F";
}
function gpaFromGrade(g){ return {"A+":10,"A":9,"B+":8,"B":7,"C":6,"D":5,"F":0}[g]; }

function studentGPA(studentId){
  const rows = DB.marks.filter(m=>m.studentId===studentId);
  if(!rows.length) return 0;
  let sum=0;
  rows.forEach(r=>{ sum += gpaFromGrade(gradeFromScore(r.internal+r.external)); });
  return (sum/rows.length).toFixed(2);
}
function studentAttendancePct(studentId){
  const log = DB.attendanceLog[studentId] || {};
  const vals = Object.values(log);
  if(!vals.length) return 0;
  const present = vals.filter(v=>v==="P").length;
  return Math.round((present/vals.length)*100);
}

/* ---------------- TOAST ---------------- */
function toast(msg){
  const wrap = document.getElementById("toast-wrap");
  const el = document.createElement("div");
  el.className = "toast"; el.textContent = msg;
  wrap.appendChild(el);
  setTimeout(()=>el.remove(), 3200);
}

/* ---------------- AUTH SCREEN LOGIC ---------------- */
let selectedRole = "student";
document.querySelectorAll(".role-tab").forEach(tab=>{
  tab.addEventListener("click", ()=>{
    document.querySelectorAll(".role-tab").forEach(t=>t.classList.remove("active"));
    tab.classList.add("active");
    selectedRole = tab.dataset.role;
    document.getElementById("login-title").textContent = selectedRole[0].toUpperCase()+selectedRole.slice(1)+" login";
  });
});
document.getElementById("btn-demo").addEventListener("click", ()=>{
  let record;
  if(selectedRole==="student") record = DB.students[0];
  else if(selectedRole==="faculty") record = DB.faculty[0];
  else record = { id:"ADM-001", loginId:"SV-ADMIN-01", name:"Priya Nataraj" };
  document.getElementById("login-name").value = record.name;
  document.getElementById("login-id").value = record.loginId;
  document.getElementById("login-pass").value = "demo1234";
});
document.getElementById("btn-login").addEventListener("click", ()=>{
  const name = document.getElementById("login-name").value.trim() || "Guest User";
  let id = document.getElementById("login-id").value.trim();
  let recordId = null;
  if(selectedRole==="student"){
    let match = DB.students.find(s=>s.loginId===id) || DB.students[0];
    recordId = match.id;
  } else if(selectedRole==="faculty"){
    let match = DB.faculty.find(f=>f.loginId===id) || DB.faculty[0];
    recordId = match.id;
  } else {
    recordId = "ADM-001";
  }
  SESSION = { role:selectedRole, name, recordId };
  localStorage.setItem("sv_session", JSON.stringify(SESSION));
  enterApp();
});
document.getElementById("btn-logout").addEventListener("click", ()=>{
  SESSION = null;
  localStorage.removeItem("sv_session");
  document.getElementById("app-shell").classList.add("hidden");
  document.getElementById("auth-screen").classList.remove("hidden");
});

/* random landing stat flair */
document.getElementById("stat-students").textContent = DB.students.length;
document.getElementById("stat-faculty").textContent = DB.faculty.length;

/* ---------------- THEME ---------------- */
document.getElementById("btn-theme").addEventListener("click", ()=>{
  const cur = document.body.getAttribute("data-theme");
  const next = cur==="dark" ? "light" : "dark";
  document.body.setAttribute("data-theme", next);
  localStorage.setItem("sv_theme", next);
});
if(localStorage.getItem("sv_theme")) document.body.setAttribute("data-theme", localStorage.getItem("sv_theme"));

/* ---------------- LANGUAGE (demo) ---------------- */
const LANG_STRINGS = {
  en: {dashboard:"Dashboard"},
  hi: {dashboard:"डैशबोर्ड"},
};
let curLang = "en";
document.getElementById("btn-lang").addEventListener("click", ()=>{
  curLang = curLang==="en" ? "hi" : "en";
  toast(curLang==="en" ? "Language: English" : "भाषा: हिन्दी (demo — labels only)");
});

/* ---------------- NAV CONFIG ---------------- */
const NAV = {
  student: [
    {group:"Main", items:[
      {id:"overview", label:"Overview", icon:ICON.home},
      {id:"attendance", label:"Attendance", icon:ICON.cal},
      {id:"academics", label:"Academics & GPA", icon:ICON.book},
      {id:"fees", label:"Fee Status", icon:ICON.cash},
      {id:"library", label:"Library", icon:ICON.lib},
      {id:"timetable", label:"Timetable", icon:ICON.cal},
    ]},
    {group:"Smart tools", items:[
      {id:"ai-planner", label:"AI Study Planner", icon:ICON.ai},
      {id:"ai-chat", label:"AI Assistant", icon:ICON.chat},
      {id:"placement", label:"Placement Cell", icon:ICON.brief},
    ]},
    {group:"Account", items:[
      {id:"idcard", label:"Digital ID Card", icon:ICON.card},
      {id:"notices", label:"Notice Board", icon:ICON.bell},
      {id:"settings", label:"Settings", icon:ICON.gear},
    ]},
  ],
  faculty: [
    {group:"Main", items:[
      {id:"overview", label:"Overview", icon:ICON.home},
      {id:"my-students", label:"My Students", icon:ICON.users},
      {id:"attendance-mgmt", label:"Mark Attendance", icon:ICON.cal},
      {id:"marks-entry", label:"Marks Entry", icon:ICON.book},
      {id:"timetable", label:"Timetable", icon:ICON.cal},
    ]},
    {group:"Insights", items:[
      {id:"analytics", label:"Performance Analytics", icon:ICON.chart},
      {id:"notices", label:"Notice Board", icon:ICON.bell},
    ]},
    {group:"Account", items:[
      {id:"idcard", label:"Digital ID Card", icon:ICON.card},
      {id:"settings", label:"Settings", icon:ICON.gear},
    ]},
  ],
  admin: [
    {group:"Main", items:[
      {id:"overview", label:"Overview", icon:ICON.home},
      {id:"manage-students", label:"Manage Students", icon:ICON.users},
      {id:"manage-faculty", label:"Manage Faculty", icon:ICON.users},
      {id:"fee-mgmt", label:"Fee Management", icon:ICON.cash},
      {id:"library-mgmt", label:"Library Management", icon:ICON.lib},
      {id:"placement", label:"Placement Cell", icon:ICON.brief},
      {id:"transport", label:"Hostel & Transport", icon:ICON.bus},
    ]},
    {group:"Insights", items:[
      {id:"analytics", label:"Reports & Analytics", icon:ICON.chart},
      {id:"notices", label:"Notice Board", icon:ICON.bell},
    ]},
    {group:"Account", items:[
      {id:"settings", label:"Settings", icon:ICON.gear},
    ]},
  ],
};

let currentView = "overview";

function enterApp(){
  document.getElementById("auth-screen").classList.add("hidden");
  document.getElementById("app-shell").classList.remove("hidden");
  renderSidebar();
  currentView = "overview";
  renderView();
}

function getMe(){
  if(SESSION.role==="student") return DB.students.find(s=>s.id===SESSION.recordId);
  if(SESSION.role==="faculty") return DB.faculty.find(f=>f.id===SESSION.recordId);
  return { name: SESSION.name || "Admin", id:"ADM-001" };
}

function renderSidebar(){
  const groups = NAV[SESSION.role];
  const nav = document.getElementById("nav-container");
  nav.innerHTML = groups.map(g=>`
    <div class="nav-group-label">${g.group}</div>
    ${g.items.map(it=>`<a href="#" class="nav-item ${it.id===currentView?'active':''}" data-view="${it.id}">${it.icon}<span>${it.label}</span></a>`).join("")}
  `).join("");
  nav.querySelectorAll(".nav-item").forEach(a=>{
    a.addEventListener("click", e=>{
      e.preventDefault();
      currentView = a.dataset.view;
      renderSidebar();
      renderView();
    });
  });
  const me = getMe();
  document.getElementById("user-avatar").textContent = (me.name||"?").split(" ").map(x=>x[0]).slice(0,2).join("");
  document.getElementById("user-name").textContent = me.name;
  document.getElementById("user-role").textContent = SESSION.role[0].toUpperCase()+SESSION.role.slice(1);
}

/* ---------------- VIEW ROUTER ---------------- */
const VIEW_TITLES = {
  overview:["Overview","Here's what's happening today"],
  attendance:["Attendance","Your attendance record across all subjects"],
  academics:["Academics & GPA","Marks, grades and GPA calculator"],
  fees:["Fee Status","Payment history and dues"],
  library:["Library","Search, issue and track books"],
  timetable:["Timetable","Weekly class schedule"],
  "ai-planner":["AI Study Planner","A weekly plan generated from your subjects and attendance risk"],
  "ai-chat":["AI Assistant","Ask about attendance, fees, exams or results"],
  placement:["Placement Cell","Companies, drives and readiness"],
  idcard:["Digital ID Card","Scannable campus identity card"],
  notices:["Notice Board","Announcements from the college"],
  settings:["Settings","Preferences for your account"],
  "my-students":["My Students","Students under your courses"],
  "attendance-mgmt":["Mark Attendance","Take attendance for today's class"],
  "marks-entry":["Marks Entry","Enter internal and external marks"],
  analytics:["Analytics","Performance and trends"],
  "manage-students":["Manage Students","Add, edit and remove student records"],
  "manage-faculty":["Manage Faculty","Add, edit and remove faculty records"],
  "fee-mgmt":["Fee Management","Institution-wide fee collection"],
  "library-mgmt":["Library Management","Catalogue and circulation"],
  transport:["Hostel & Transport","Rooms, routes and allocations"],
};

function renderView(){
  const [title, sub] = VIEW_TITLES[currentView] || ["",""];
  document.getElementById("view-title").textContent = title;
  document.getElementById("view-sub").textContent = sub;
  const root = document.getElementById("view-root");
  root.innerHTML = `<div class="empty-state">Loading…</div>`;
  const fn = VIEWS[currentView] || VIEWS.overview;
  root.innerHTML = fn();
  bindViewEvents();
  renderCharts();
}

/* ================================================================
   VIEWS
   ================================================================ */
const VIEWS = {};

VIEWS.overview = function(){
  if(SESSION.role==="student") return studentOverview();
  if(SESSION.role==="faculty") return facultyOverview();
  return adminOverview();
};

function ring(pct, color){
  const r=50, c=2*Math.PI*r;
  return `<div class="ring-wrap"><svg width="120" height="120" viewBox="0 0 120 120">
    <circle cx="60" cy="60" r="${r}" stroke="var(--line)" stroke-width="10" fill="none"/>
    <circle cx="60" cy="60" r="${r}" stroke="${color}" stroke-width="10" fill="none"
      stroke-dasharray="${c}" stroke-dashoffset="${c-(pct/100)*c}" stroke-linecap="round"/>
  </svg><div class="ring-label"><b>${pct}%</b><span>score</span></div></div>`;
}

function studentOverview(){
  const me = getMe();
  const gpa = studentGPA(me.id);
  const att = studentAttendancePct(me.id);
  const dueFee = me.fees.total - me.fees.paid;
  const upcoming = DB.notices.slice(0,3);
  return `
  <div class="grid cols-4">
    <div class="card stat-card">
      <div class="stat-icon" style="background:var(--grad-aurora); color:#fff;">${ICON.book}</div>
      <div class="eyebrow">GPA</div><div class="val">${gpa}</div>
      <div class="delta">out of 10.0 · Semester ${me.sem}</div>
    </div>
    <div class="card stat-card">
      <div class="stat-icon" style="background:var(--bg-card-hi); color:var(--teal);">${ICON.cal}</div>
      <div class="eyebrow">Attendance</div><div class="val">${att}%</div>
      <div class="delta">${att>=75 ? '<span class="badge ok">On track</span>' : '<span class="badge bad">Below 75% — at risk</span>'}</div>
    </div>
    <div class="card stat-card">
      <div class="stat-icon" style="background:var(--bg-card-hi); color:var(--gold);">${ICON.cash}</div>
      <div class="eyebrow">Fee Due</div><div class="val">₹${dueFee.toLocaleString('en-IN')}</div>
      <div class="delta">${dueFee===0 ? '<span class="badge ok">Fully paid</span>' : '<span class="badge warn">Payment pending</span>'}</div>
    </div>
    <div class="card stat-card">
      <div class="stat-icon" style="background:var(--bg-card-hi); color:var(--violet);">${ICON.brief}</div>
      <div class="eyebrow">Dept.</div><div class="val" style="font-size:16px;">${me.dept}</div>
      <div class="delta">ID: ${me.loginId}</div>
    </div>
  </div>

  <div class="grid cols-3" style="margin-top:18px; align-items:start;">
    <div class="card panel">
      <div class="section-title">Attendance health</div>
      ${ring(att, att>=75 ? "var(--green)" : "var(--coral)")}
      <p style="text-align:center; color:var(--text-low); font-size:12px; margin-top:12px;">Minimum required: 75%</p>
    </div>
    <div class="card panel" style="grid-column:span 2;">
      <div class="section-title">Subject-wise performance <span class="badge violet">Latest</span></div>
      <canvas id="chart-subjects" height="140"></canvas>
    </div>
  </div>

  <div class="grid cols-2" style="margin-top:18px; align-items:start;">
    <div class="card panel">
      <div class="section-title">Notice board</div>
      <div class="row-list">
        ${upcoming.map(n=>`<div class="row"><div class="row-ico">${ICON.bell}</div><div><div class="row-title">${n.title}</div><div class="row-sub">${n.date} · ${n.audience}</div></div></div>`).join("")}
      </div>
    </div>
    <div class="card panel">
      <div class="section-title">Quick actions</div>
      <div style="display:flex; flex-direction:column; gap:10px;">
        <button class="btn" data-goto="ai-planner">${ICON.ai} Generate this week's study plan</button>
        <button class="btn" data-goto="library">${ICON.lib} Browse library</button>
        <button class="btn" data-goto="fees">${ICON.cash} View fee receipt</button>
        <button class="btn gold" id="btn-export-report">${ICON.down} Download report card (PDF)</button>
      </div>
    </div>
  </div>`;
}

function facultyOverview(){
  const me = getMe();
  const myStudents = DB.students.filter(s=>s.dept===me.dept);
  const avgAtt = Math.round(myStudents.reduce((a,s)=>a+studentAttendancePct(s.id),0)/(myStudents.length||1));
  const avgGpa = (myStudents.reduce((a,s)=>a+parseFloat(studentGPA(s.id)),0)/(myStudents.length||1)).toFixed(2);
  const atRisk = myStudents.filter(s=>studentAttendancePct(s.id)<75).length;
  return `
  <div class="grid cols-4">
    <div class="card stat-card"><div class="stat-icon" style="background:var(--grad-aurora); color:#fff;">${ICON.users}</div><div class="eyebrow">My Students</div><div class="val">${myStudents.length}</div><div class="delta">${me.dept}</div></div>
    <div class="card stat-card"><div class="stat-icon" style="background:var(--bg-card-hi); color:var(--teal);">${ICON.cal}</div><div class="eyebrow">Avg. Attendance</div><div class="val">${avgAtt}%</div><div class="delta">across your students</div></div>
    <div class="card stat-card"><div class="stat-icon" style="background:var(--bg-card-hi); color:var(--gold);">${ICON.book}</div><div class="eyebrow">Avg. GPA</div><div class="val">${avgGpa}</div><div class="delta">department average</div></div>
    <div class="card stat-card"><div class="stat-icon" style="background:var(--bg-card-hi); color:var(--coral);">${ICON.ai}</div><div class="eyebrow">At-risk students</div><div class="val">${atRisk}</div><div class="delta">attendance below 75%</div></div>
  </div>
  <div class="grid cols-3" style="margin-top:18px;">
    <div class="card panel" style="grid-column:span 2;">
      <div class="section-title">Class performance distribution</div>
      <canvas id="chart-faculty-perf" height="130"></canvas>
    </div>
    <div class="card panel">
      <div class="section-title">Today's classes</div>
      <div class="row-list">
        ${DB.timetable.filter(t=>t.faculty===me.name).slice(0,4).map(t=>`<div class="row"><div class="row-ico">${ICON.cal}</div><div><div class="row-title">${t.subject}</div><div class="row-sub">${t.day} · ${t.time}</div></div><div class="row-right"><span class="tag-pill">${t.room}</span></div></div>`).join("") || '<div class="empty-state">No classes scheduled</div>'}
      </div>
    </div>
  </div>`;
}

function adminOverview(){
  const collected = DB.students.reduce((a,s)=>a+s.fees.paid,0);
  const totalDue = DB.students.reduce((a,s)=>a+(s.fees.total-s.fees.paid),0);
  return `
  <div class="grid cols-4">
    <div class="card stat-card"><div class="stat-icon" style="background:var(--grad-aurora); color:#fff;">${ICON.users}</div><div class="eyebrow">Total Students</div><div class="val">${DB.students.length}</div><div class="delta">across ${DEPTS.length} departments</div></div>
    <div class="card stat-card"><div class="stat-icon" style="background:var(--bg-card-hi); color:var(--teal);">${ICON.users}</div><div class="eyebrow">Total Faculty</div><div class="val">${DB.faculty.length}</div><div class="delta">active this semester</div></div>
    <div class="card stat-card"><div class="stat-icon" style="background:var(--bg-card-hi); color:var(--gold);">${ICON.cash}</div><div class="eyebrow">Fees Collected</div><div class="val">₹${(collected/100000).toFixed(1)}L</div><div class="delta">₹${totalDue.toLocaleString('en-IN')} pending</div></div>
    <div class="card stat-card"><div class="stat-icon" style="background:var(--bg-card-hi); color:var(--violet);">${ICON.brief}</div><div class="eyebrow">Students Placed</div><div class="val">${DB.placements.reduce((a,p)=>a+p.hired,0)}</div><div class="delta">this academic year</div></div>
  </div>
  <div class="grid cols-3" style="margin-top:18px;">
    <div class="card panel" style="grid-column:span 2;">
      <div class="section-title">Department-wise strength</div>
      <canvas id="chart-dept" height="130"></canvas>
    </div>
    <div class="card panel">
      <div class="section-title">Fee collection</div>
      <canvas id="chart-fees-pie" height="180"></canvas>
    </div>
  </div>
  <div class="grid cols-2" style="margin-top:18px;">
    <div class="card panel">
      <div class="section-title">Recent notices</div>
      <div class="row-list">${DB.notices.slice(0,4).map(n=>`<div class="row"><div class="row-ico">${ICON.bell}</div><div><div class="row-title">${n.title}</div><div class="row-sub">${n.date}</div></div></div>`).join("")}</div>
    </div>
    <div class="card panel">
      <div class="section-title">Quick actions</div>
      <div style="display:flex; flex-direction:column; gap:10px;">
        <button class="btn" data-goto="manage-students">${ICON.users} Add a new student</button>
        <button class="btn" data-goto="notices">${ICON.bell} Post a notice</button>
        <button class="btn gold" id="btn-export-excel">${ICON.down} Export student list (Excel)</button>
      </div>
    </div>
  </div>`;
}

/* ---- Attendance (student) ---- */
VIEWS.attendance = function(){
  const me = getMe();
  const log = DB.attendanceLog[me.id] || {};
  const dates = Object.keys(log).sort().reverse();
  const pct = studentAttendancePct(me.id);
  return `
  <div class="grid cols-3" style="align-items:start;">
    <div class="card panel">
      <div class="section-title">Overall</div>
      ${ring(pct, pct>=75?"var(--green)":"var(--coral)")}
    </div>
    <div class="card panel" style="grid-column:span 2;">
      <div class="section-title">Last 14 days</div>
      <div style="display:flex; gap:6px; flex-wrap:wrap;">
        ${dates.map(d=>`<div title="${d}: ${log[d]==='P'?'Present':'Absent'}" style="width:30px; height:30px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:700; background:${log[d]==='P'?'rgba(74,222,158,.18)':'rgba(255,107,122,.18)'}; color:${log[d]==='P'?'var(--green)':'var(--coral)'};">${d.slice(8)}</div>`).join("")}
      </div>
    </div>
  </div>
  <div class="card panel" style="margin-top:18px;">
    <div class="section-title">Subject-wise attendance <span class="badge violet">Demo</span></div>
    <table><thead><tr><th>Subject</th><th>Classes held</th><th>Attended</th><th>%</th></tr></thead>
    <tbody>${me.subjects.map(s=>{ const held=20+rand(15); const att=Math.round(held*(pct/100)); return `<tr><td>${s}</td><td>${held}</td><td>${att}</td><td>${Math.round(att/held*100)}%</td></tr>`; }).join("")}</tbody></table>
  </div>`;
};

/* ---- Academics & GPA calculator (student) ---- */
VIEWS.academics = function(){
  const me = getMe();
  const rows = DB.marks.filter(m=>m.studentId===me.id);
  return `
  <div class="card panel">
    <div class="section-title">Marks & grades</div>
    <table><thead><tr><th>Subject</th><th>Internal (/25)</th><th>External (/75)</th><th>Total</th><th>Grade</th></tr></thead>
    <tbody>${rows.map(r=>{ const total=r.internal+r.external; const g=gradeFromScore(total); return `<tr><td>${r.subject}</td><td>${r.internal}</td><td>${r.external}</td><td>${total}/100</td><td><span class="tag-pill">${g}</span></td></tr>`; }).join("")}</tbody></table>
  </div>

  <div class="card panel" style="margin-top:18px;">
    <div class="section-title">GPA / CGPA calculator <span class="badge gold">Interactive</span></div>
    <p style="color:var(--text-low); font-size:12.5px; margin-bottom:14px;">Adjust expected grades per subject to see your projected GPA — useful for planning end-semester performance.</p>
    <div id="gpa-calc-rows">
      ${rows.map((r,i)=>`
        <div class="field" style="display:flex; align-items:center; gap:12px;">
          <label style="min-width:170px; margin:0;">${r.subject}</label>
          <select data-gpa-subject="${i}" style="max-width:120px;">
            ${["A+","A","B+","B","C","D","F"].map(g=>`<option value="${g}" ${g===gradeFromScore(r.internal+r.external)?'selected':''}>${g} (${gpaFromGrade(g)}.0)</option>`).join("")}
          </select>
        </div>`).join("")}
    </div>
    <div style="display:flex; align-items:center; gap:16px; margin-top:10px; padding-top:14px; border-top:1px solid var(--line-soft);">
      <div class="eyebrow">Projected GPA</div>
      <div class="val font-display" id="gpa-result" style="font-size:26px;">${studentGPA(me.id)}</div>
    </div>
  </div>`;
};

/* ---- Fees (student) ---- */
VIEWS.fees = function(){
  const me = getMe();
  const due = me.fees.total - me.fees.paid;
  return `
  <div class="grid cols-3">
    <div class="card stat-card"><div class="eyebrow">Total Fee</div><div class="val">₹${me.fees.total.toLocaleString('en-IN')}</div></div>
    <div class="card stat-card"><div class="eyebrow">Paid</div><div class="val" style="color:var(--green)">₹${me.fees.paid.toLocaleString('en-IN')}</div></div>
    <div class="card stat-card"><div class="eyebrow">Due</div><div class="val" style="color:${due>0?'var(--coral)':'var(--green)'}">₹${due.toLocaleString('en-IN')}</div></div>
  </div>
  <div class="card panel" style="margin-top:18px;">
    <div class="section-title">Payment progress</div>
    <div class="progress-track"><div class="progress-fill" style="width:${Math.round(me.fees.paid/me.fees.total*100)}%;"></div></div>
    <p style="font-size:12px; color:var(--text-low); margin-top:8px;">${Math.round(me.fees.paid/me.fees.total*100)}% paid</p>
    <div style="display:flex; gap:10px; margin-top:18px;">
      ${due>0 ? `<button class="btn primary" id="btn-pay-fee">${ICON.cash} Pay ₹${due.toLocaleString('en-IN')} now (demo)</button>` : `<span class="badge ok">Fees fully paid ✓</span>`}
      <button class="btn ghost" id="btn-fee-receipt">${ICON.down} Download receipt (PDF)</button>
    </div>
  </div>`;
};

/* ---- Library ---- */
VIEWS.library = function(){
  const me = SESSION.role==="student" ? getMe() : null;
  return `
  <div class="card panel">
    <div class="section-title">Catalogue <span class="badge violet">${DB.library.length} titles</span></div>
    <table><thead><tr><th>Title</th><th>Author</th><th>Copies</th><th>Status</th><th></th></tr></thead>
    <tbody>${DB.library.map(b=>`
      <tr>
        <td>${b.title}</td><td>${b.author}</td><td>${b.copies}</td>
        <td>${b.issuedTo ? `<span class="badge warn">Issued · due ${b.dueDate}</span>` : `<span class="badge ok">Available</span>`}</td>
        <td>${me ? (b.issuedTo===me.id ? `<button class="btn sm" data-return="${b.id}">Return</button>` : (!b.issuedTo ? `<button class="btn sm primary" data-issue="${b.id}">Issue to me</button>` : '')) : ''}</td>
      </tr>`).join("")}</tbody></table>
  </div>`;
};

/* ---- Timetable ---- */
VIEWS.timetable = function(){
  const days = ["Mon","Tue","Wed","Thu","Fri"];
  const slots = [...new Set(DB.timetable.map(t=>t.time))].sort();
  return `
  <div class="card panel" style="overflow-x:auto;">
    <div class="section-title">Weekly schedule</div>
    <table>
      <thead><tr><th>Time</th>${days.map(d=>`<th>${d}</th>`).join("")}</tr></thead>
      <tbody>
        ${slots.map(t=>`<tr><td class="mono">${t}</td>${days.map(d=>{
          const cell = DB.timetable.find(x=>x.day===d && x.time===t);
          return `<td>${cell ? `<div style="font-weight:600;">${cell.subject}</div><div class="row-sub">${cell.faculty} · ${cell.room}</div>` : '<span style="color:var(--text-low);">—</span>'}</td>`;
        }).join("")}</tr>`).join("")}
      </tbody>
    </table>
  </div>`;
};

/* ---- AI Study Planner (rule-based, labeled as demo) ---- */
VIEWS["ai-planner"] = function(){
  const me = getMe();
  const att = studentAttendancePct(me.id);
  const weakSubjects = DB.marks.filter(m=>m.studentId===me.id && (m.internal+m.external)<60).map(m=>m.subject);
  const days = ["Mon","Tue","Wed","Thu","Fri","Sat"];
  const plan = days.map((d,i)=>{
    const subject = weakSubjects.length ? weakSubjects[i % weakSubjects.length] : me.subjects[i % me.subjects.length];
    const hours = weakSubjects.includes(subject) ? 2 : 1.5;
    return { day:d, subject, hours };
  });
  return `
  <div class="card panel">
    <div class="section-title">${ICON.ai} How this plan was built <span class="badge violet">Rule-based demo</span></div>
    <p style="color:var(--text-mid); font-size:13px; line-height:1.6;">This planner looks at subjects where your combined score is below 60/100, and gives them more weekly hours. Your current attendance is <b>${att}%</b>${att<75 ? " — below the 75% requirement, so catch-up sessions are prioritized." : ", which is healthy."} In a production build this logic would be replaced by a real ML model trained on historical performance.</p>
  </div>
  <div class="card panel" style="margin-top:18px;">
    <div class="section-title">This week's plan</div>
    <div class="row-list">
      ${plan.map(p=>`<div class="row"><div class="row-ico">${ICON.cal}</div><div><div class="row-title">${p.day} — ${p.subject}</div><div class="row-sub">${weakSubjects.includes(p.subject)?'Focus area · needs improvement':'Regular revision'}</div></div><div class="row-right"><span class="tag-pill">${p.hours}h</span></div></div>`).join("")}
    </div>
  </div>
  <div class="card panel" style="margin-top:18px;">
    <div class="section-title">Weak subject detection</div>
    ${weakSubjects.length ? `<div class="kpi-strip">${weakSubjects.map(s=>`<div class="kpi-chip badge bad">${s}</div>`).join("")}</div>` : `<div class="empty-state">No weak subjects detected — great work!</div>`}
  </div>`;
};

/* ---- AI Chatbot (keyword-based demo) ---- */
VIEWS["ai-chat"] = function(){
  const me = getMe();
  return `
  <div class="card panel">
    <div class="section-title">${ICON.chat} Campus assistant <span class="badge violet">Rule-based demo</span></div>
    <p style="color:var(--text-low); font-size:12.5px; margin-bottom:14px;">Try asking about "attendance", "fees", "exam", "library" or "gpa".</p>
    <div class="chat-log" id="chat-log">
      <div class="chat-bubble bot">Hi ${me.name.split(" ")[0]}! I'm your StudentVerse assistant. Ask me about your attendance, fees, exams, GPA or the library.</div>
    </div>
    <div style="display:flex; gap:10px; margin-top:14px;">
      <input id="chat-input" placeholder="Type your question…" />
      <button class="btn primary" id="chat-send">Send</button>
    </div>
  </div>`;
};

/* ---- Placement ---- */
VIEWS.placement = function(){
  return `
  <div class="grid cols-3">
    <div class="card stat-card"><div class="eyebrow">Companies visited</div><div class="val">${DB.placements.length}</div></div>
    <div class="card stat-card"><div class="eyebrow">Total placed</div><div class="val">${DB.placements.reduce((a,p)=>a+p.hired,0)}</div></div>
    <div class="card stat-card"><div class="eyebrow">Placement rate</div><div class="val">${Math.round(DB.placements.reduce((a,p)=>a+p.hired,0)/DB.students.length*100)}%</div></div>
  </div>
  <div class="card panel" style="margin-top:18px;">
    <div class="section-title">Recent drives</div>
    <table><thead><tr><th>Company</th><th>Role</th><th>Date</th><th>Students hired</th></tr></thead>
    <tbody>${DB.placements.map(p=>`<tr><td>${p.company}</td><td>${p.role}</td><td>${p.date}</td><td>${p.hired}</td></tr>`).join("")}</tbody></table>
  </div>
  ${SESSION.role==="student" ? `<div class="card panel" style="margin-top:18px;"><div class="section-title">Placement readiness score <span class="badge violet">AI demo</span></div>${ring(Math.min(99, studentAttendancePct(getMe().id)/2 + parseFloat(studentGPA(getMe().id))*5), "var(--gold)")}</div>` : ''}`;
};

/* ---- Digital ID Card ---- */
VIEWS.idcard = function(){
  const me = getMe();
  const qrData = `StudentVerse|${me.loginId || me.id}|${me.name}`;
  return `
  <div class="grid cols-2" style="align-items:start;">
    <div class="id-card">
      <div class="id-top"><div class="brand-name">StudentVerse</div><span class="badge violet" style="background:rgba(255,255,255,.2); color:#fff;">${SESSION.role.toUpperCase()}</span></div>
      <div class="id-photo">${me.name.split(" ").map(x=>x[0]).slice(0,2).join("")}</div>
      <div class="id-name">${me.name}</div>
      <div class="id-meta">${me.dept || 'Administration'}${me.sem ? ' · Sem '+me.sem : ''}</div>
      <div class="id-meta">ID: ${me.loginId || me.id}</div>
      <div class="id-qr" id="qr-holder"></div>
    </div>
    <div class="card panel">
      <div class="section-title">About this ID</div>
      <p style="font-size:13px; color:var(--text-mid); line-height:1.6;">This QR-coded digital ID can be scanned at library counters, exam halls and the campus gate for quick verification. It's generated live from your profile data.</p>
      <button class="btn primary" id="btn-download-id" style="margin-top:14px;">${ICON.down} Download ID card (PDF)</button>
    </div>
  </div>`;
};

/* ---- Notices ---- */
VIEWS.notices = function(){
  const canPost = SESSION.role==="admin" || SESSION.role==="faculty";
  return `
  ${canPost ? `
  <div class="card panel" style="margin-bottom:18px;">
    <div class="section-title">Post a notice</div>
    <div class="field"><label>Title</label><input id="notice-title" placeholder="e.g. Semester exam datesheet released" /></div>
    <div class="field"><label>Message</label><textarea id="notice-body" rows="3" placeholder="Details…"></textarea></div>
    <div class="field"><label>Audience</label><select id="notice-audience"><option>All</option><option>Students</option><option>Faculty</option></select></div>
    <button class="btn primary" id="btn-post-notice">${ICON.plus} Post notice</button>
  </div>` : ''}
  <div class="card panel">
    <div class="section-title">All notices</div>
    <div class="row-list">
      ${DB.notices.slice().reverse().map(n=>`<div class="row"><div class="row-ico">${ICON.bell}</div><div style="flex:1;"><div class="row-title">${n.title}</div><div class="row-sub">${n.body}</div><div class="row-sub" style="margin-top:4px;">${n.date} · <span class="tag-pill">${n.audience}</span></div></div></div>`).join("")}
    </div>
  </div>`;
};

/* ---- Settings ---- */
VIEWS.settings = function(){
  return `
  <div class="card panel">
    <div class="section-title">Appearance</div>
    <div style="display:flex; gap:10px;">
      <button class="btn" id="set-theme-dark">🌙 Dark mode</button>
      <button class="btn" id="set-theme-light">☀️ Light mode</button>
    </div>
  </div>
  <div class="card panel" style="margin-top:18px;">
    <div class="section-title">Data</div>
    <p style="font-size:12.5px; color:var(--text-low); margin-bottom:12px;">All data in this demo is stored locally in your browser via localStorage. Resetting will regenerate fresh sample data.</p>
    <button class="btn" id="btn-reset-data">Reset demo data</button>
  </div>
  <div class="card panel" style="margin-top:18px;">
    <div class="section-title">About</div>
    <p style="font-size:12.5px; color:var(--text-low); line-height:1.6;">StudentVerse — Smart Student Management System.<br>Front-end demo build using HTML, CSS, JavaScript, Chart.js, jsPDF, SheetJS and QRCode.js.</p>
  </div>`;
};

/* ---- Faculty: My Students ---- */
VIEWS["my-students"] = function(){
  const me = getMe();
  const list = DB.students.filter(s=>s.dept===me.dept);
  return `
  <div class="card panel">
    <div class="section-title">Students — ${me.dept} <span class="badge violet">${list.length}</span></div>
    <table><thead><tr><th>Name</th><th>ID</th><th>Sem</th><th>Attendance</th><th>GPA</th></tr></thead>
    <tbody>${list.map(s=>`<tr><td>${s.name}</td><td class="mono">${s.loginId}</td><td>${s.sem}</td><td>${studentAttendancePct(s.id)<75?'<span class="badge bad">':''}${studentAttendancePct(s.id)}%${studentAttendancePct(s.id)<75?'</span>':''}</td><td>${studentGPA(s.id)}</td></tr>`).join("")}</tbody></table>
  </div>`;
};

/* ---- Faculty: Attendance management ---- */
VIEWS["attendance-mgmt"] = function(){
  const me = getMe();
  const list = DB.students.filter(s=>s.dept===me.dept);
  const today = new Date().toISOString().slice(0,10);
  return `
  <div class="card panel">
    <div class="section-title">Take attendance — ${today}</div>
    <table><thead><tr><th>Name</th><th>ID</th><th>Status</th></tr></thead>
    <tbody>${list.map(s=>{ const status = (DB.attendanceLog[s.id]||{})[today] || "P"; return `<tr><td>${s.name}</td><td class="mono">${s.loginId}</td><td>
      <button class="btn sm ${status==='P'?'primary':''}" data-att-mark="${s.id}" data-val="P">Present</button>
      <button class="btn sm ${status==='A'?'gold':''}" data-att-mark="${s.id}" data-val="A">Absent</button>
    </td></tr>`; }).join("")}</tbody></table>
    <button class="btn primary" id="btn-save-attendance" style="margin-top:16px;">${ICON.cal} Save today's attendance</button>
  </div>`;
};

/* ---- Faculty: Marks entry ---- */
VIEWS["marks-entry"] = function(){
  const me = getMe();
  const rows = DB.marks.filter(m=>m.subject===me.subject);
  return `
  <div class="card panel">
    <div class="section-title">Marks entry — ${me.subject}</div>
    <table><thead><tr><th>Student</th><th>Internal (/25)</th><th>External (/75)</th><th>Total</th><th>Grade</th></tr></thead>
    <tbody>${rows.map((r)=>{ const s=DB.students.find(x=>x.id===r.studentId); const idx=DB.marks.indexOf(r); return `<tr>
      <td>${s?s.name:'—'}</td>
      <td><input type="number" min="0" max="25" value="${r.internal}" data-mark-internal="${idx}" style="width:70px;" /></td>
      <td><input type="number" min="0" max="75" value="${r.external}" data-mark-external="${idx}" style="width:70px;" /></td>
      <td>${r.internal+r.external}/100</td><td><span class="tag-pill">${gradeFromScore(r.internal+r.external)}</span></td>
    </tr>`; }).join("")}</tbody></table>
    <button class="btn primary" id="btn-save-marks" style="margin-top:16px;">Save marks</button>
  </div>`;
};

/* ---- Analytics (faculty & admin) ---- */
VIEWS.analytics = function(){
  return `
  <div class="grid cols-2">
    <div class="card panel"><div class="section-title">Attendance distribution</div><canvas id="chart-att-dist" height="160"></canvas></div>
    <div class="card panel"><div class="section-title">Grade distribution</div><canvas id="chart-grade-dist" height="160"></canvas></div>
  </div>
  <div class="card panel" style="margin-top:18px;"><div class="section-title">Department performance</div><canvas id="chart-dept-perf" height="130"></canvas></div>
  <div style="margin-top:18px; display:flex; gap:10px;">
    <button class="btn gold" id="btn-export-pdf-report">${ICON.down} Export full report (PDF)</button>
    <button class="btn" id="btn-export-excel-2">${ICON.down} Export data (Excel)</button>
  </div>`;
};

/* ---- Admin: Manage students ---- */
VIEWS["manage-students"] = function(){
  return `
  <div class="card panel" style="margin-bottom:18px;">
    <div class="section-title">Add student</div>
    <div class="grid cols-3">
      <div class="field"><label>Name</label><input id="new-stu-name" placeholder="Full name" /></div>
      <div class="field"><label>Department</label><select id="new-stu-dept">${DEPTS.map(d=>`<option>${d}</option>`).join("")}</select></div>
      <div class="field"><label>Semester</label><input id="new-stu-sem" type="number" min="1" max="8" value="1" /></div>
    </div>
    <button class="btn primary" id="btn-add-student">${ICON.plus} Add student</button>
  </div>
  <div class="card panel">
    <div class="section-title">All students <span class="badge violet">${DB.students.length}</span></div>
    <table><thead><tr><th>Name</th><th>ID</th><th>Dept</th><th>Sem</th><th>Attendance</th><th>GPA</th><th></th></tr></thead>
    <tbody>${DB.students.map(s=>`<tr><td>${s.name}</td><td class="mono">${s.loginId}</td><td>${s.dept}</td><td>${s.sem}</td><td>${studentAttendancePct(s.id)}%</td><td>${studentGPA(s.id)}</td><td><button class="btn sm ghost" data-del-student="${s.id}">${ICON.trash}</button></td></tr>`).join("")}</tbody></table>
  </div>`;
};

/* ---- Admin: Manage faculty ---- */
VIEWS["manage-faculty"] = function(){
  return `
  <div class="card panel" style="margin-bottom:18px;">
    <div class="section-title">Add faculty</div>
    <div class="grid cols-3">
      <div class="field"><label>Name</label><input id="new-fac-name" placeholder="Full name" /></div>
      <div class="field"><label>Department</label><select id="new-fac-dept">${DEPTS.map(d=>`<option>${d}</option>`).join("")}</select></div>
      <div class="field"><label>Subject</label><input id="new-fac-subject" placeholder="e.g. Data Structures" /></div>
    </div>
    <button class="btn primary" id="btn-add-faculty">${ICON.plus} Add faculty</button>
  </div>
  <div class="card panel">
    <div class="section-title">All faculty <span class="badge violet">${DB.faculty.length}</span></div>
    <table><thead><tr><th>Name</th><th>ID</th><th>Dept</th><th>Subject</th><th></th></tr></thead>
    <tbody>${DB.faculty.map(f=>`<tr><td>${f.name}</td><td class="mono">${f.loginId}</td><td>${f.dept}</td><td>${f.subject}</td><td><button class="btn sm ghost" data-del-faculty="${f.id}">${ICON.trash}</button></td></tr>`).join("")}</tbody></table>
  </div>`;
};

/* ---- Admin: Fee management ---- */
VIEWS["fee-mgmt"] = function(){
  const collected = DB.students.reduce((a,s)=>a+s.fees.paid,0);
  const total = DB.students.reduce((a,s)=>a+s.fees.total,0);
  return `
  <div class="grid cols-3">
    <div class="card stat-card"><div class="eyebrow">Total Expected</div><div class="val">₹${(total/100000).toFixed(1)}L</div></div>
    <div class="card stat-card"><div class="eyebrow">Collected</div><div class="val" style="color:var(--green)">₹${(collected/100000).toFixed(1)}L</div></div>
    <div class="card stat-card"><div class="eyebrow">Pending</div><div class="val" style="color:var(--coral)">₹${((total-collected)/100000).toFixed(1)}L</div></div>
  </div>
  <div class="card panel" style="margin-top:18px;">
    <div class="section-title">Fee status by student</div>
    <table><thead><tr><th>Name</th><th>Dept</th><th>Total</th><th>Paid</th><th>Due</th><th>Status</th></tr></thead>
    <tbody>${DB.students.map(s=>{ const due=s.fees.total-s.fees.paid; return `<tr><td>${s.name}</td><td>${s.dept}</td><td>₹${s.fees.total.toLocaleString('en-IN')}</td><td>₹${s.fees.paid.toLocaleString('en-IN')}</td><td>₹${due.toLocaleString('en-IN')}</td><td>${due===0?'<span class="badge ok">Paid</span>':'<span class="badge warn">Pending</span>'}</td></tr>`; }).join("")}</tbody></table>
  </div>`;
};

/* ---- Admin: Library management ---- */
VIEWS["library-mgmt"] = function(){
  return `
  <div class="card panel" style="margin-bottom:18px;">
    <div class="section-title">Add book</div>
    <div class="grid cols-3">
      <div class="field"><label>Title</label><input id="new-book-title" placeholder="Book title" /></div>
      <div class="field"><label>Author</label><input id="new-book-author" placeholder="Author" /></div>
      <div class="field"><label>Copies</label><input id="new-book-copies" type="number" min="1" value="3" /></div>
    </div>
    <button class="btn primary" id="btn-add-book">${ICON.plus} Add to catalogue</button>
  </div>
  ${VIEWS.library()}`;
};

/* ---- Admin: transport/hostel ---- */
VIEWS.transport = function(){
  const routes = ["Route A — City Center","Route B — North Campus","Route C — Riverside","Route D — Tech Park"];
  const hostels = ["Aravali Block","Nilgiri Block","Vindhya Block"];
  return `
  <div class="grid cols-2">
    <div class="card panel">
      <div class="section-title">${ICON.bus} Bus routes</div>
      <div class="row-list">${routes.map(r=>`<div class="row"><div class="row-ico">${ICON.bus}</div><div><div class="row-title">${r}</div><div class="row-sub">${20+rand(30)} students · departs 7:${10+rand(40)} AM</div></div></div>`).join("")}</div>
    </div>
    <div class="card panel">
      <div class="section-title">Hostel blocks</div>
      <div class="row-list">${hostels.map(h=>`<div class="row"><div class="row-ico">${ICON.home}</div><div><div class="row-title">${h}</div><div class="row-sub">${60+rand(30)}/120 beds occupied</div></div></div>`).join("")}</div>
    </div>
  </div>`;
};

/* ================================================================
   CHART RENDERING
   ================================================================ */
let chartInstances = [];
function killCharts(){ chartInstances.forEach(c=>c.destroy()); chartInstances=[]; }
function chartTheme(){
  const light = document.body.getAttribute("data-theme")==="light";
  return { grid: light ? "#E1E1F0" : "#2C3160", text: light ? "#4B4E76" : "#ABAFD9" };
}
function renderCharts(){
  killCharts();
  const t = chartTheme();
  Chart.defaults.color = t.text;
  Chart.defaults.font.family = "Inter";
  Chart.defaults.borderColor = t.grid;

  const subjCanvas = document.getElementById("chart-subjects");
  if(subjCanvas){
    const me = getMe();
    const rows = DB.marks.filter(m=>m.studentId===me.id);
    chartInstances.push(new Chart(subjCanvas, { type:"bar", data:{
      labels: rows.map(r=>r.subject.length>12?r.subject.slice(0,10)+"…":r.subject),
      datasets:[{ label:"Score /100", data: rows.map(r=>r.internal+r.external), backgroundColor:"#8B6CFF", borderRadius:6 }]
    }, options:{ plugins:{legend:{display:false}}, scales:{ y:{ max:100, grid:{color:t.grid}}, x:{grid:{display:false}} } } }));
  }
  const facPerf = document.getElementById("chart-faculty-perf");
  if(facPerf){
    const me = getMe();
    const students = DB.students.filter(s=>s.dept===me.dept);
    chartInstances.push(new Chart(facPerf, { type:"line", data:{
      labels: students.slice(0,12).map(s=>s.name.split(" ")[0]),
      datasets:[{ label:"GPA", data: students.slice(0,12).map(s=>studentGPA(s.id)), borderColor:"#3FD0C9", backgroundColor:"rgba(63,208,201,.15)", fill:true, tension:.35 }]
    }, options:{ plugins:{legend:{display:false}}, scales:{ y:{ min:0, max:10, grid:{color:t.grid}}, x:{grid:{display:false}} } } }));
  }
  const deptCanvas = document.getElementById("chart-dept");
  if(deptCanvas){
    const counts = DEPTS.map(d=>DB.students.filter(s=>s.dept===d).length);
    chartInstances.push(new Chart(deptCanvas, { type:"bar", data:{ labels:DEPTS.map(d=>d.split(" ")[0]), datasets:[{ data:counts, backgroundColor:"#F2B84B", borderRadius:6 }] }, options:{ plugins:{legend:{display:false}}, scales:{ y:{grid:{color:t.grid}}, x:{grid:{display:false}} } } }));
  }
  const feesPie = document.getElementById("chart-fees-pie");
  if(feesPie){
    const collected = DB.students.reduce((a,s)=>a+s.fees.paid,0);
    const total = DB.students.reduce((a,s)=>a+s.fees.total,0);
    chartInstances.push(new Chart(feesPie, { type:"doughnut", data:{ labels:["Collected","Pending"], datasets:[{ data:[collected, total-collected], backgroundColor:["#4ADE9E","#FF6B7A"] }] }, options:{ plugins:{legend:{position:"bottom"}} } }));
  }
  const attDist = document.getElementById("chart-att-dist");
  if(attDist){
    const buckets = [0,0,0,0];
    DB.students.forEach(s=>{ const p=studentAttendancePct(s.id); if(p<60) buckets[0]++; else if(p<75) buckets[1]++; else if(p<90) buckets[2]++; else buckets[3]++; });
    chartInstances.push(new Chart(attDist, { type:"bar", data:{ labels:["<60%","60-75%","75-90%","90%+"], datasets:[{ data:buckets, backgroundColor:["#FF6B7A","#F2B84B","#3FD0C9","#4ADE9E"], borderRadius:6 }] }, options:{ plugins:{legend:{display:false}} } }));
  }
  const gradeDist = document.getElementById("chart-grade-dist");
  if(gradeDist){
    const grades = ["A+","A","B+","B","C","D","F"];
    const counts = grades.map(g=>DB.marks.filter(m=>gradeFromScore(m.internal+m.external)===g).length);
    chartInstances.push(new Chart(gradeDist, { type:"doughnut", data:{ labels:grades, datasets:[{ data:counts, backgroundColor:["#4ADE9E","#3FD0C9","#8B6CFF","#F2B84B","#FFA45B","#FF6B7A","#8688A8"] }] }, options:{ plugins:{legend:{position:"bottom"}} } }));
  }
  const deptPerf = document.getElementById("chart-dept-perf");
  if(deptPerf){
    const avg = DEPTS.map(d=>{ const s=DB.students.filter(x=>x.dept===d); return (s.reduce((a,x)=>a+parseFloat(studentGPA(x.id)),0)/(s.length||1)).toFixed(2); });
    chartInstances.push(new Chart(deptPerf, { type:"radar", data:{ labels:DEPTS.map(d=>d.split(" ")[0]), datasets:[{ label:"Avg GPA", data:avg, backgroundColor:"rgba(139,108,255,.25)", borderColor:"#8B6CFF" }] }, options:{ scales:{ r:{ min:0, max:10, grid:{color:t.grid}, angleLines:{color:t.grid} } } } }));
  }
}

/* ================================================================
   EVENT BINDING (per view render)
   ================================================================ */
function bindViewEvents(){
  document.querySelectorAll("[data-goto]").forEach(b=>b.addEventListener("click", ()=>{ currentView=b.dataset.goto; renderSidebar(); renderView(); }));

  // GPA calculator
  document.querySelectorAll("[data-gpa-subject]").forEach(sel=>{
    sel.addEventListener("change", ()=>{
      const selects = document.querySelectorAll("[data-gpa-subject]");
      let sum=0; selects.forEach(s=>sum+=gpaFromGrade(s.value));
      document.getElementById("gpa-result").textContent = (sum/selects.length).toFixed(2);
    });
  });

  // Fee payment (demo)
  const payBtn = document.getElementById("btn-pay-fee");
  if(payBtn) payBtn.addEventListener("click", ()=>{
    const me = getMe(); me.fees.paid = me.fees.total; saveDB(); toast("Payment successful ✓ (demo transaction)"); renderView();
  });
  const receiptBtn = document.getElementById("btn-fee-receipt");
  if(receiptBtn) receiptBtn.addEventListener("click", ()=>exportFeeReceipt());

  // Library issue/return
  document.querySelectorAll("[data-issue]").forEach(b=>b.addEventListener("click", ()=>{
    const book = DB.library.find(x=>x.id===b.dataset.issue);
    book.issuedTo = getMe().id; book.dueDate = daysFromNow(14); saveDB(); toast("Book issued — due in 14 days"); renderView();
  }));
  document.querySelectorAll("[data-return]").forEach(b=>b.addEventListener("click", ()=>{
    const book = DB.library.find(x=>x.id===b.dataset.return);
    book.issuedTo = null; book.dueDate = null; saveDB(); toast("Book returned. Thank you!"); renderView();
  }));

  // Notices
  const postBtn = document.getElementById("btn-post-notice");
  if(postBtn) postBtn.addEventListener("click", ()=>{
    const title = document.getElementById("notice-title").value.trim();
    const body = document.getElementById("notice-body").value.trim();
    const audience = document.getElementById("notice-audience").value;
    if(!title){ toast("Please enter a title"); return; }
    DB.notices.push({ id:uid("NOT"), title, body: body||"—", date:new Date().toISOString().slice(0,10), audience });
    saveDB(); toast("Notice posted"); renderView();
  });

  // ID card QR + download
  const qrHolder = document.getElementById("qr-holder");
  if(qrHolder && window.QRCode){
    qrHolder.innerHTML = "";
    const me = getMe();
    new QRCode(qrHolder, { text:`StudentVerse|${me.loginId||me.id}|${me.name}`, width:64, height:64, colorDark:"#171933", colorLight:"#ffffff" });
  }
  const dlId = document.getElementById("btn-download-id");
  if(dlId) dlId.addEventListener("click", ()=>exportIdCardPdf());

  // Chat
  const chatSend = document.getElementById("chat-send");
  if(chatSend){
    const send = ()=>{
      const input = document.getElementById("chat-input");
      const text = input.value.trim(); if(!text) return;
      appendChat("user", text); input.value="";
      setTimeout(()=>appendChat("bot", chatbotReply(text)), 350);
    };
    chatSend.addEventListener("click", send);
    document.getElementById("chat-input").addEventListener("keydown", e=>{ if(e.key==="Enter") send(); });
  }

  // Attendance management (faculty)
  document.querySelectorAll("[data-att-mark]").forEach(b=>b.addEventListener("click", ()=>{
    const sid=b.dataset.attMark, val=b.dataset.val, today=new Date().toISOString().slice(0,10);
    DB.attendanceLog[sid] = DB.attendanceLog[sid]||{}; DB.attendanceLog[sid][today]=val;
    renderView();
  }));
  const saveAtt = document.getElementById("btn-save-attendance");
  if(saveAtt) saveAtt.addEventListener("click", ()=>{ saveDB(); toast("Attendance saved for today"); });

  // Marks entry
  document.querySelectorAll("[data-mark-internal]").forEach(inp=>inp.addEventListener("change", ()=>{ DB.marks[inp.dataset.markInternal].internal = Math.min(25, Math.max(0, parseInt(inp.value)||0)); renderView(); }));
  document.querySelectorAll("[data-mark-external]").forEach(inp=>inp.addEventListener("change", ()=>{ DB.marks[inp.dataset.markExternal].external = Math.min(75, Math.max(0, parseInt(inp.value)||0)); renderView(); }));
  const saveMarks = document.getElementById("btn-save-marks");
  if(saveMarks) saveMarks.addEventListener("click", ()=>{ saveDB(); toast("Marks saved"); });

  // Admin: add/remove student
  const addStu = document.getElementById("btn-add-student");
  if(addStu) addStu.addEventListener("click", ()=>{
    const name = document.getElementById("new-stu-name").value.trim();
    if(!name){ toast("Enter a name"); return; }
    const dept = document.getElementById("new-stu-dept").value;
    const sem = parseInt(document.getElementById("new-stu-sem").value)||1;
    const s = { id:uid("STU"), loginId:"SV-2026-"+(100+DB.students.length), name, dept, sem, attendance:80, fees:{total:85000,paid:0}, subjects:SUBJECTS_BY_DEPT[dept] };
    DB.students.push(s);
    s.subjects.forEach(sub=>DB.marks.push({studentId:s.id, subject:sub, internal:15, external:50}));
    DB.attendanceLog[s.id]={};
    saveDB(); toast("Student added"); renderView();
  });
  document.querySelectorAll("[data-del-student]").forEach(b=>b.addEventListener("click", ()=>{
    DB.students = DB.students.filter(s=>s.id!==b.dataset.delStudent);
    saveDB(); toast("Student removed"); renderView();
  }));

  // Admin: add/remove faculty
  const addFac = document.getElementById("btn-add-faculty");
  if(addFac) addFac.addEventListener("click", ()=>{
    const name = document.getElementById("new-fac-name").value.trim();
    if(!name){ toast("Enter a name"); return; }
    const dept = document.getElementById("new-fac-dept").value;
    const subject = document.getElementById("new-fac-subject").value.trim() || pick(SUBJECTS_BY_DEPT[dept]);
    DB.faculty.push({ id:uid("FAC"), loginId:"SV-F-"+(10+DB.faculty.length), name, dept, subject });
    saveDB(); toast("Faculty added"); renderView();
  });
  document.querySelectorAll("[data-del-faculty]").forEach(b=>b.addEventListener("click", ()=>{
    DB.faculty = DB.faculty.filter(f=>f.id!==b.dataset.delFaculty);
    saveDB(); toast("Faculty removed"); renderView();
  }));

  // Admin: add book
  const addBook = document.getElementById("btn-add-book");
  if(addBook) addBook.addEventListener("click", ()=>{
    const title = document.getElementById("new-book-title").value.trim();
    if(!title){ toast("Enter a title"); return; }
    const author = document.getElementById("new-book-author").value.trim()||"Unknown";
    const copies = parseInt(document.getElementById("new-book-copies").value)||1;
    DB.library.push({ id:uid("LIB"), title, author, copies, issuedTo:null, dueDate:null });
    saveDB(); toast("Book added to catalogue"); renderView();
  });

  // Exports
  const expReport = document.getElementById("btn-export-report");
  if(expReport) expReport.addEventListener("click", exportStudentReportPdf);
  const expExcel = document.getElementById("btn-export-excel");
  if(expExcel) expExcel.addEventListener("click", exportStudentsExcel);
  const expExcel2 = document.getElementById("btn-export-excel-2");
  if(expExcel2) expExcel2.addEventListener("click", exportStudentsExcel);
  const expPdf2 = document.getElementById("btn-export-pdf-report");
  if(expPdf2) expPdf2.addEventListener("click", exportInstitutionPdf);

  // Settings
  const dark = document.getElementById("set-theme-dark");
  if(dark) dark.addEventListener("click", ()=>{ document.body.setAttribute("data-theme","dark"); localStorage.setItem("sv_theme","dark"); renderCharts(); });
  const light = document.getElementById("set-theme-light");
  if(light) light.addEventListener("click", ()=>{ document.body.setAttribute("data-theme","light"); localStorage.setItem("sv_theme","light"); renderCharts(); });
  const resetBtn = document.getElementById("btn-reset-data");
  if(resetBtn) resetBtn.addEventListener("click", ()=>{
    localStorage.removeItem("sv_db"); DB = loadDB(); saveDB(); toast("Demo data reset"); renderView();
  });
}

function appendChat(who, text){
  const log = document.getElementById("chat-log");
  const div = document.createElement("div");
  div.className = "chat-bubble "+who;
  div.textContent = text;
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
}
function chatbotReply(q){
  const me = getMe();
  const s = q.toLowerCase();
  if(s.includes("attendance")) return `Your current attendance is ${studentAttendancePct(me.id)}%. ${studentAttendancePct(me.id)<75 ? "That's below the 75% requirement — try to attend upcoming classes." : "You're comfortably above the 75% requirement."}`;
  if(s.includes("fee")) return `Your total fee is ₹${me.fees.total.toLocaleString('en-IN')}, of which ₹${me.fees.paid.toLocaleString('en-IN')} is paid. ${me.fees.total-me.fees.paid>0 ? "Head to Fee Status to clear the remaining balance." : "You're fully paid up!"}`;
  if(s.includes("gpa") || s.includes("result") || s.includes("marks")) return `Your GPA this semester is ${studentGPA(me.id)}/10. Check Academics & GPA for a subject-wise breakdown.`;
  if(s.includes("exam")) return `Exam dates are usually posted on the Notice Board a few weeks in advance — check there for the latest schedule.`;
  if(s.includes("library") || s.includes("book")) return `The library has ${DB.library.length} titles in the catalogue. Visit the Library section to issue or return a book.`;
  if(s.includes("hi") || s.includes("hello")) return `Hello ${me.name.split(" ")[0]}! Ask me about attendance, fees, GPA, exams or the library.`;
  return `I'm a simple rule-based demo assistant, so I only understand a few topics right now — try asking about attendance, fees, GPA, exams or the library.`;
}

/* ================================================================
   EXPORTS: PDF (jsPDF) & Excel (SheetJS)
   ================================================================ */
function exportStudentReportPdf(){
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const me = getMe();
  doc.setFontSize(18); doc.text("StudentVerse — Report Card", 14, 18);
  doc.setFontSize(11); doc.text(`Name: ${me.name}`, 14, 30);
  doc.text(`ID: ${me.loginId}`, 14, 37);
  doc.text(`Department: ${me.dept}   Semester: ${me.sem}`, 14, 44);
  doc.text(`GPA: ${studentGPA(me.id)}   Attendance: ${studentAttendancePct(me.id)}%`, 14, 51);
  let y = 64;
  doc.setFontSize(12); doc.text("Subject-wise marks", 14, y); y+=8;
  doc.setFontSize(10);
  DB.marks.filter(m=>m.studentId===me.id).forEach(r=>{
    doc.text(`${r.subject}`, 14, y);
    doc.text(`${r.internal}/25`, 100, y);
    doc.text(`${r.external}/75`, 130, y);
    doc.text(`${gradeFromScore(r.internal+r.external)}`, 165, y);
    y+=7;
  });
  doc.save(`StudentVerse_ReportCard_${me.loginId}.pdf`);
  toast("Report card downloaded");
}
function exportFeeReceipt(){
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const me = getMe();
  doc.setFontSize(18); doc.text("StudentVerse — Fee Receipt", 14, 18);
  doc.setFontSize(11);
  doc.text(`Name: ${me.name}`, 14, 32);
  doc.text(`ID: ${me.loginId}`, 14, 39);
  doc.text(`Total Fee: Rs. ${me.fees.total.toLocaleString('en-IN')}`, 14, 50);
  doc.text(`Paid: Rs. ${me.fees.paid.toLocaleString('en-IN')}`, 14, 57);
  doc.text(`Due: Rs. ${(me.fees.total-me.fees.paid).toLocaleString('en-IN')}`, 14, 64);
  doc.text(`Date: ${new Date().toISOString().slice(0,10)}`, 14, 74);
  doc.save(`StudentVerse_Receipt_${me.loginId}.pdf`);
  toast("Receipt downloaded");
}
function exportIdCardPdf(){
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit:"mm", format:[85,54] });
  const me = getMe();
  doc.setFillColor(41,44,92); doc.rect(0,0,85,54,"F");
  doc.setTextColor(255,255,255); doc.setFontSize(10); doc.text("StudentVerse", 6, 9);
  doc.setFontSize(12); doc.text(me.name, 6, 22);
  doc.setFontSize(8); doc.text(`${me.dept||'Administration'}`, 6, 28);
  doc.text(`ID: ${me.loginId||me.id}`, 6, 33);
  doc.text(`Role: ${SESSION.role}`, 6, 38);
  doc.save(`StudentVerse_ID_${me.loginId||me.id}.pdf`);
  toast("ID card downloaded");
}
function exportInstitutionPdf(){
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.setFontSize(18); doc.text("StudentVerse — Institution Report", 14, 18);
  doc.setFontSize(11);
  doc.text(`Total students: ${DB.students.length}`, 14, 30);
  doc.text(`Total faculty: ${DB.faculty.length}`, 14, 37);
  doc.text(`Fees collected: Rs. ${DB.students.reduce((a,s)=>a+s.fees.paid,0).toLocaleString('en-IN')}`, 14, 44);
  doc.text(`Students placed: ${DB.placements.reduce((a,p)=>a+p.hired,0)}`, 14, 51);
  let y=64;
  doc.setFontSize(12); doc.text("Department-wise strength", 14, y); y+=8;
  doc.setFontSize(10);
  DEPTS.forEach(d=>{ doc.text(`${d}: ${DB.students.filter(s=>s.dept===d).length} students`, 14, y); y+=7; });
  doc.save("StudentVerse_Institution_Report.pdf");
  toast("Institution report downloaded");
}
function exportStudentsExcel(){
  const rows = DB.students.map(s=>({
    Name:s.name, ID:s.loginId, Department:s.dept, Semester:s.sem,
    Attendance:studentAttendancePct(s.id)+"%", GPA:studentGPA(s.id),
    FeeTotal:s.fees.total, FeePaid:s.fees.paid, FeeDue:s.fees.total-s.fees.paid
  }));
  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Students");
  XLSX.writeFile(wb, "StudentVerse_Students.xlsx");
  toast("Excel file downloaded");
}

/* ---------------- BOOT ---------------- */
if(SESSION){
  try{ enterApp(); } catch(e){ console.error(e); }
}
