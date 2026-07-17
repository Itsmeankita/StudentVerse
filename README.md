# StudentVerse — Smart Student Management System

StudentVerse is a final-year-project-grade, front-end web application for managing a
college: students, faculty, admin, attendance, results, fees, library, timetable,
placements and a set of rule-based "smart" tools — all running entirely in the
browser with no backend or database server required.

---

## 1. Live Demo

https://itsmeankita.github.io/StudentVerse/

**Option A — Just open the file**
Double-click `index.html` (or right-click → Open with → your browser).
Everything works offline except the fonts and the four CDN libraries listed below,
which load once from the internet the first time you open it.

**Option B — Run a local server (recommended for smoother routing/fonts)**
```bash
# from inside the StudentVerse folder
python3 -m http.server 8080
# then open http://localhost:8080 in your browser
```
or, with Node:
```bash
npx serve .
```

**Option C — Free hosting (to get a real shareable link)**
Because it's a static site, you can deploy it in under a minute on any of these,
just drag-and-drop the folder or connect the repo:
- Netlify Drop — https://app.netlify.com/drop
- Vercel — https://vercel.com
- GitHub Pages — push this folder to a repo and enable Pages in Settings

No build step, no environment variables, no server code — it's plain HTML/CSS/JS.

---

## 2. Demo Login

On the landing screen, pick a role tab (**Student / Faculty / Admin**) and click
**"Use demo account"** to auto-fill a working sample login, or type any name — the
app accepts anything in this demo (there's no real authentication server).

All data (students, faculty, marks, attendance, fees, library, notices, timetable,
placements) is generated the first time you open the app and saved in your
browser's `localStorage`, so it persists between visits on the same device/browser.
Use **Settings → Reset demo data** to regenerate a fresh sample dataset.

---

## 3. Tech Stack

| Purpose | Library |
|---|---|
| Structure | HTML5 |
| Styling | CSS3 (custom design system, CSS variables, no framework) |
| Logic | Vanilla JavaScript (ES6, no build tools) |
| Data storage | Browser `localStorage` |
| Charts / analytics | [Chart.js](https://www.chartjs.org/) |
| PDF export (report cards, receipts, ID cards, institution reports) | [jsPDF](https://github.com/parallax/jsPDF) |
| Excel export (student lists, reports) | [SheetJS / xlsx](https://sheetjs.com/) |
| QR codes (digital ID card) | [qrcodejs](https://davidshimjs.github.io/qrcodejs/) |
| Fonts | Space Grotesk (display), Inter (body), JetBrains Mono (data) via Google Fonts |

All libraries are loaded via CDN `<script>` tags in `index.html` — nothing to
install with npm.

---

## 4. Project Structure

```
StudentVerse/
├── index.html      → App shell: login screen + sidebar app layout
├── style.css        → Full design system (colors, type, components, responsive rules)
├── app.js            → All application logic: data model, routing, views, charts, exports
└── README.md         → This file
```

It's intentionally a single HTML/CSS/JS trio (no framework, no bundler) so it can be
opened directly in a browser, dropped into any static host, or copied into a college
project submission as-is.

---

## 5. Feature Overview

### Student
- Personal dashboard: GPA, attendance %, fee due, department, quick actions
- Attendance tracker with a 14-day calendar strip and subject-wise breakdown
- Academics: marks/grades table + an **interactive GPA/CGPA calculator** (change
  expected grades per subject and see the projected GPA update live)
- Fee status: paid/due breakdown, progress bar, demo "pay now", **PDF receipt download**
- Library: browse the catalogue, issue/return books, see due dates
- Weekly timetable grid
- **AI Study Planner** — a rule-based weekly plan that gives more hours to subjects
  scoring under 60/100 and flags attendance risk (clearly labeled as a rule-based
  demo, not a trained model)
- **AI Campus Assistant** — a keyword-based chatbot that answers questions about
  attendance, fees, GPA, exams and the library
- Placement Cell: company drives, hiring stats, a simple readiness score
- Digital Student ID card with a live **QR code** and **PDF download**
- Notice board (read)
- Downloadable **report card PDF**

### Faculty
- Dashboard: class size, average attendance/GPA, at-risk student count, today's classes
- My Students: roster with attendance and GPA at a glance
- Mark Attendance: mark present/absent per student, saved to local storage
- Marks Entry: edit internal/external marks inline, grade recalculates automatically
- Performance analytics chart
- Timetable, Notice board (read + post)

### Admin
- Institution dashboard: total students/faculty, fees collected, students placed
- Manage Students / Manage Faculty: add or remove records
- Fee Management: collected vs pending, per-student breakdown
- Library Management: add books to the catalogue, track circulation
- Placement Cell overview
- Hostel & Transport: bus routes and hostel block occupancy
- Reports & Analytics: attendance distribution, grade distribution, department
  performance radar chart, **export full report to PDF**, **export data to Excel**
- Notice board (post + read)

### Shared / platform features
- Dark mode / light mode toggle (persisted)
- Responsive layout (desktop sidebar → mobile-friendly stacked layout)
- Smart search bar in the top bar
- Toast notifications for actions (save, issue, post, export, etc.)
- Role-based navigation (each role only sees the tools relevant to it)
- All exports (PDF/Excel) are generated live from whatever is currently in the
  browser's local data — edit a mark or mark attendance, then export, and the
  exported file reflects the change

### Honest notes on the "AI" features
The AI Study Planner and AI Campus Assistant are **rule-based demos**, not
connected to a real machine-learning model — this is standard for a front-end-only
student portal and is called out in the UI itself. If you want to wire in a real
model later, both functions (`chatbotReply()` and the planner logic in `app.js`)
are isolated and easy to swap for an API call.

---

## 6. Customizing

- **Rename / rebrand:** search for `StudentVerse` in `index.html` and `app.js`.
- **Change the palette:** all colors are CSS variables at the top of `style.css`
  under `:root` and `[data-theme="light"]`.
- **Change sample data size:** edit the loop counts in `seedDatabase()` in `app.js`
  (currently 40 students, 14 faculty).
- **Reset data during development:** open your browser console and run
  `localStorage.removeItem('sv_db')`, then refresh — or use the in-app
  Settings → Reset demo data button.

---

## 7. Known Limitations (by design, since this is a front-end-only demo)

- No real backend, database, or authentication — anyone can "log in" as anyone.
- Data lives only in the current browser's localStorage; it isn't shared across
  devices or users.
- Email/SMS/OTP/Face-login features referenced in earlier feature lists are
  simulated in the UI, not wired to a real messaging or biometric provider.
- The AI features are rule-based, not machine-learning models (see above).

These are the right tradeoffs for a college project / portfolio piece; wiring in a
real backend (Node/Express + a database) would be the natural next step.
