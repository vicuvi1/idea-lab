# Handoff: continue Idea Lab on Victor's Windows PC

This file is for the AI assistant (Claude Code) running on Victor's PC. Read it fully before doing anything.

## What this project is

**Idea Lab** is a local dashboard for finding, comparing and validating business ideas. It runs as:
- a website: `npm run dev`, which opens http://localhost:5173
- a Windows desktop app, built with Tauri 2, with a self-updater

Stack: React 19, TypeScript, Vite, Recharts, Tauri 2 (Rust). The code is in this repo (private): `vicuvi1/idea-lab`.
Installers are published to the **public** repo `vicuvi1/idea-lab-releases`, where the desktop app looks for updates.

Key files:
- `src/types.ts`: the `Idea` data model. Optional research fields: `rank`, `batch`, `whyNow`, `evidence[]`, `sources[{title,url}]`.
- `src/data/ideas/*.json`: built-in ideas. Every JSON file here is loaded automatically, sorted by filename. Installs that already exist get newly added built-in ideas on their next start (the `seenSeeds` logic in `src/store.tsx`).
- `src/lib/updater.tsx` and `src/components/UpdatePanel.tsx`: the Update button (sidebar and Settings).
- `src-tauri/tauri.conf.json`: holds the updater `pubkey` and the endpoint `https://github.com/vicuvi1/idea-lab-releases/releases/latest/download/latest.json`.
- `.github/workflows/windows-build.yml`: every push to `main` builds version `0.2.<run number>`, signs it and publishes it to `idea-lab-releases`. A first step checks the secrets. If signing fails, it still publishes an unsigned installer as a fallback. Add `[skip ci]` to a commit message to skip the build.
- `research_notes/Top 25 SaaS ideas for Victor/*.md`: six research note files covering about 49 candidate ideas, with sources.
- `reports/Top 25 SaaS ideas for Victor.md`: the final ranked report of 25 ideas (about 17k words, with scores, evidence and sources).

## Current status (13 Nov 2026)

- ✅ The app works as a website and builds as a Windows installer.
- ✅ The `RELEASES_TOKEN` secret is set and can write to `idea-lab-releases`.
- ❌ **The `TAURI_SIGNING_PRIVATE_KEY` secret holds an invalid value**, so signed releases (and auto-update) fail.
- ⏳ The 25 researched ideas are not loaded into the app yet.
- Victor's PC has an old v0.1.0 installed, which has no updater. He needs one manual install of a new version.

## Your tasks, in order

### 1. Set up
```bash
git clone https://github.com/vicuvi1/idea-lab.git
cd idea-lab
npm install
npm run build
```
Check that the GitHub CLI works: `gh auth status`. If it doesn't, run `gh auth login`.

### 2. Fix the signing key (make auto-update work)
Victor has a file `idea-lab.key`, probably in Downloads. If he can't find it, make a new key pair instead (option B).

**Option A (existing key file):**
```bash
gh secret set TAURI_SIGNING_PRIVATE_KEY --repo vicuvi1/idea-lab < "%USERPROFILE%\Downloads\idea-lab.key"
```
(In PowerShell: `Get-Content $env:USERPROFILE\Downloads\idea-lab.key -Raw | gh secret set TAURI_SIGNING_PRIVATE_KEY --repo vicuvi1/idea-lab`)

**Option B (new key pair, if the file is lost):**
```bash
npx tauri signer generate -w "%USERPROFILE%\.idea-lab\idea-lab.key" -p "" --ci -f
```
- Put the contents of `idea-lab.key.pub` into `plugins.updater.pubkey` in `src-tauri/tauri.conf.json`, then commit.
- Set the secret from the new private key, using the command from option A with the new path.
- Never commit the private key.

Then start a build and watch it:
```bash
gh workflow run windows-build.yml --repo vicuvi1/idea-lab --ref main
gh run watch --repo vicuvi1/idea-lab
```
The step "Check secrets are set and look right" must print `looks valid` and `can write`. The release must appear at https://github.com/vicuvi1/idea-lab-releases/releases/latest with an `.exe`, a `.msi` and **`latest.json`**.

### 3. Load the 25 researched ideas into the app
- Read `reports/Top 25 SaaS ideas for Victor.md`, and the notes in `research_notes/…` for details.
- For each of the 25 ideas, create `src/data/ideas/1NN-<slug>.json` (101–125, so the research ideas sort after the original 8).
- Use `src/data/ideas/01-security-questionnaire-autopilot.json` as the template, and fill **every** field of the `Idea` type in `src/types.ts`:
  - **Basics:** `title`, `summary`, `hook`, `industry`, `tags`, `priceLabel`
  - **Story and problem:** `story` (a short realistic customer story, using `**bold**`), `whyReal`, `whoPays`
  - **Product:** `solution` steps, `mvp.must`/`mvp.later`, `techStack`, `timeline`
  - **Money:** `costs`, `costTotal3Months`, `pricing`, `calculator` (realistic sliders)
  - **Market and validation:** `competitors` (include an `"Us"` row with `isUs: true`), `risks`, `questions` (the 5 interview questions)
  - **Numbers:** `numbers` (`cashMin`/`cashMax` in €, `mvpWeeksMin`/`mvpWeeksMax`, `competitionLevel` `low|medium|high`, `whoSells`)
  - **Scoring:** `skills` (from `SKILLS` in `src/lib/criteria.ts` where possible), `recurring: true`, and `scores` (the report's 0–10 scores mapped to `pain`, `willingnessToPay`, `lowCompetition`, `easyToBuild`, `easyToSell`, `skillFit`, `globalPotential`, plus `excitement`, default 6)
  - **Defaults:** `status: "idea"`, `notes: ""`, `interviews: []`
  - **Research extras:** `rank` (1–25 from the report), `batch: "Research Nov 2026"`, `whyNow`, `evidence` (3–6 bullet strings with numbers), `sources` (the real URLs cited in the report and notes for that idea)
  - **Colour:** cycle through `IDEA_COLORS` from `src/lib/criteria.ts`
- Use only facts from the report and notes; don't invent statistics. Keep the reader in mind: English is his second language, so use plain words.
- Check: `npx tsc -b && npm run build`, then `npm run dev` and look at the Library ("Research Nov 2026" filter), a few idea pages, Compare and Fit for Me.
- Commit and push to `main` (without `[skip ci]`) so the build publishes a new version that includes the ideas.

### 4. Install on Victor's PC (one time)
- Download the newest `Idea.Lab_<version>_x64-setup.exe` from https://github.com/vicuvi1/idea-lab-releases/releases/latest and run it.
- If SmartScreen appears, click **More info → Run anyway**. Keep **"Create desktop shortcut"** ticked.
- Uninstalling the old v0.1.0 first is optional; the installer replaces it.
- Open Idea Lab from the desktop icon. Check that all 33 ideas show (8 original + 25 research) and that the sidebar shows the version.

### 5. Test the auto-update end to end
- Make a tiny visible change (e.g. a text tweak), commit and push, then wait for the build.
- In the installed app, click **↻ Check for updates**. It should offer **⬇ Update to v0.2.X**.
- Click it. The app should download, install and restart on the new version, keeping its data.

## Rules
- Commit messages: clear English. Don't commit secrets or key files.
- Ask Victor before deleting anything or changing his GitHub settings beyond the secrets above.
- Next features Victor wants afterwards (don't start unless he asks): AI co-founder (Claude API key), validation sprint mode, landing-page generator.
