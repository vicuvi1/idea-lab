# ◆ Idea Lab

A local dashboard for finding, analysing and validating business ideas, and for working out which one fits **you**.
It runs on your own computer as a **website** (in your browser) or as a **Windows desktop app**. There's no server, no account, and your data stays local.

It comes with 8 analysed B2B SaaS ideas: Security Questionnaire Autopilot, Accountant Document Chaser, Instant Lead Reply, Inbox-to-Quote for Freight, Supplier Price-List Sync, Offboarding Security, Subcontractor Document Tracker and Public Tender Finder.

## What's inside

| Page | What it does |
|---|---|
| **Dashboard** | Your best-fit idea, ranking, pipeline (idea → validating → building…), next actions |
| **Idea Library** | All ideas with search, filters and sorting; add new ideas |
| **Idea page** | Problem story, why it's real, who pays, solution, MVP, tech stack, timeline, costs, pricing, revenue calculator, competitors, risks, interview questions, scores, conversations, notes |
| **Compare & Score** | Weighted ranking, value-vs-ease map, head-to-head radar, editable score table, key numbers |
| **Fit for Me** | Your skills, budget, hours and priorities give each idea a personal fit score with pros and cons |
| **Money Calculator** | Month-by-month revenue simulation with churn, break-even and payback |
| **Validation** | Log real customer conversations: would they pay, pain level, exact quotes, money received |
| **Settings** | Backup / restore (.json), export everything to Markdown, reset |

## Run it as a website

You need [Node.js](https://nodejs.org) (version 20 or newer).

```bash
npm install
npm run dev
```

Your browser opens at http://localhost:5173. On Windows you can also just double-click **`start-website.bat`**.

## Run it as a desktop app (Windows)

**Option A: download the installer (easiest).** On GitHub, go to **Actions → Build Windows app → Run workflow**. When it finishes, download `idea-lab-windows` and run the `.exe` installer.

**Option B: run from source.** Install [Rust](https://rustup.rs) (and the "Desktop development with C++" tools it asks for), then:

```bash
npm install
npm run desktop          # opens the app window
npm run desktop:build    # builds an installer in src-tauri/target/release/bundle/
```

Or double-click **`start-desktop.bat`**.

## Where your data is stored

- **Website:** in your browser's local storage (per browser).
- **Desktop app:** `%APPDATA%\com.idealab.app\idea-lab-data.json`

The two keep separate data. To move data between them, use **Settings → Download backup** and then **Load backup**.

## Adding ideas

- In the app: **+ New idea**, then fill in the editor.
- As built-in ideas for everyone who installs it: add a JSON file to `src/data/ideas/` (copy an existing one as a template).

## Tech

React + TypeScript + Vite · Recharts · Tauri 2 (desktop) · plain CSS with light/dark themes.

## Roadmap

- [ ] AI analysis with your own Claude API key: find weak spots, generate new ideas from your profile, draft interview questions
- [ ] Market research links and notes per idea
- [ ] Export one idea as a one-page PDF
