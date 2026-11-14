# ◆ Idea Lab

A local dashboard for finding, analysing and validating business ideas, and for working out which one fits **you**.
It runs on your own computer as a **website** (in your browser) or as a **Windows desktop app**. There's no server, no account, and your data stays local.

📖 **Read the 50 researched business ideas: [IDEAS.md](IDEAS.md)** (full report behind ideas 1–25: [reports/](reports/)).

It comes with 8 original analysed B2B SaaS ideas plus 50 researched ones: Security Questionnaire Autopilot, Accountant Document Chaser, Instant Lead Reply, Inbox-to-Quote for Freight, Supplier Price-List Sync, Offboarding Security, Subcontractor Document Tracker and Public Tender Finder.

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

**Install:** download the latest `Idea.Lab_x.y.z_x64-setup.exe` from
**https://github.com/vicuvi1/idea-lab-releases/releases/latest** and run it. The installer adds a desktop and Start-menu icon.

**Updates:** the app checks for a new version at start-up. Click **Update** in the sidebar (or **Settings → App updates**) and it downloads, installs and restarts itself. Your data is kept.

**From source:** install [Rust](https://rustup.rs) (and the "Desktop development with C++" tools it asks for), then run `npm run desktop`, or double-click **`start-desktop.bat`**.

### How releases work

Every push to `main` triggers **.github/workflows/windows-build.yml**, which:

1. Builds version `0.2.<run number>` on a Windows machine
2. Signs the update with the updater key
3. Publishes the installer and `latest.json` to the public repo **vicuvi1/idea-lab-releases**. The code itself stays private in this repo.

The workflow needs two repository secrets (**Settings → Secrets and variables → Actions**):

| Secret | What it is |
|---|---|
| `TAURI_SIGNING_PRIVATE_KEY` | The updater signing key. Keep a copy somewhere safe: if it's lost, installed apps can't verify new updates and you'd have to reinstall once with a new key. |
| `RELEASES_TOKEN` | A fine-grained GitHub token with **Contents: Read and write** on `vicuvi1/idea-lab-releases` |

## Where your data is stored

- **Website:** in your browser's local storage (per browser).
- **Desktop app:** `%APPDATA%\com.idealab.app\idea-lab-data.json`

The two keep separate data. To move data between them, use **Settings → Download backup** and then **Load backup**.

## Adding ideas

- In the app: **+ New idea**, then fill in the editor.
- As built-in ideas for everyone who installs it: add a JSON file to `src/data/ideas/` (copy an existing one as a template).

## Tech

React + TypeScript + Vite · Recharts · Tauri 2 (desktop, with self-updater) · plain CSS with light/dark themes.

## Roadmap

- [ ] AI analysis with your own Claude API key: find weak spots, generate new ideas from your profile, draft interview questions
- [ ] Market research links and notes per idea
- [ ] Export one idea as a one-page PDF
