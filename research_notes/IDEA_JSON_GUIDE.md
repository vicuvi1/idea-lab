# How to write an Idea Lab idea file

Each idea is one JSON file in `/home/user/idea-lab/src/data/ideas/`. The app loads every file there automatically.

- **Template:** copy the structure of `/home/user/idea-lab/src/data/ideas/01-security-questionnaire-autopilot.json`. It shows every field filled in well.
- **Type definition:** `/home/user/idea-lab/src/types.ts` (the `Idea` interface).
- **Validate your files:** run `cd /home/user/idea-lab && node scripts/validate-ideas.mjs <your files>`. Every file must pass.

## Field rules
- `id`: a lowercase slug, unique. Start it with `r-`, e.g. `r-subdocs`.
- `title`: product name plus what it does, e.g. "SubDocs: subcontractor document tracking".
- `color`: cycle through `#3987e5`, `#d95926`, `#199e70`, `#c98500`, `#d55181`, `#0ca30c`, `#9085e9`, `#e66767` by rank (rank 1 takes the first colour, rank 9 starts again).
- `industry`: short, e.g. "Construction", "Accounting", "Cybersecurity", "E-commerce", "IT services / MSP", "Logistics", "Healthcare", "Public sector".
- `status`: `"idea"`. `notes`: `""`. `interviews`: `[]`. `recurring`: `true`, unless it really isn't.
- `tags`: 2–4 short tags, e.g. "Regulation deadline", "Jonatan's network", "Low competition".
- `summary`: 1–2 plain sentences. `hook`: a short quote showing the pain, in a customer's voice. `priceLabel`: e.g. "€49–199 / month".
- `story`: a realistic 2-paragraph customer story with `**bold**` key facts, separated by `\n\n`.
- `whyNow`: 1–3 sentences on deadlines or trends.
- `evidence`: 3–6 strings with concrete numbers, each ending with its source name in brackets.
- `sources`: `[{ "title": "...", "url": "https://..." }]`, using only real URLs from the notes, report or your own research. 3–10 per idea.
- `whyReal`: 3–4 `{title, text}` items. `whoPays`: `{label, text}` items for Customer, Buyer and Start market.
- `solution`: 4–6 `{title, text}` steps of how the product works.
- `mvp`: `{must: [...5–7 items], later: [...4–6]}`. `techStack`: an array of short strings. `timeline`: 3–4 `{when, what}` items, e.g. "Week 0–2".
- `costs`: `[{item, note, cost}]`, where cost is a string like "€10–25 / month". Include the Claude Code / AI coding tools line (€100–150 / month). `costTotal3Months`: e.g. "≈ €450–800".
- `pricing`: 2–3 `{name, description}` plans.
- `calculator`:
  - `customers`: `{min, max, value, label: "Paying customers"}`
  - `price`: `{min, max, value, label: "Average price per month ($)"}`
  - `multiplier`: `null`, or a slider such as "Sites per agency" when the price is per seat or unit
- `competitors`: `[{name, what, gap}]`, ending with `{"name":"Us","what":"...","gap":"...","isUs":true}`.
- `risks`: 3–4 `{risk, answer}`. `questions`: exactly 5 interview questions.
- `numbers`: `{cashMin, cashMax, mvpWeeksMin, mvpWeeksMax, priceLabel, competition (a short note), competitionLevel: "low"|"medium"|"high", whoSells (e.g. "Jonatan → facility managers")}`. Cash is euros for the first 3 months.
- `skills`: pick from coding, security, ai, integrations, design, marketing, b2b-sales, local-sales, writing, accounting, logistics, e-commerce, construction, government, finance, healthcare.
- `scores`: integers 0–10 for pain, willingnessToPay, lowCompetition, easyToBuild, easyToSell, skillFit, globalPotential, excitement (excitement defaults to 6).
- `rank`: the overall number 1–50. `batch`: as given in your task.

## Writing style
Plain, simple English: the reader's first language is not English. Don't invent statistics; every number needs a source. Mark vendor-reported numbers as such.

## The founders
- **Victor:** 18–19, developer in Moldova/Romania, with coding, AI/LLM and cybersecurity skills.
- **Jonatan:** in Sweden; does sales and operations in English and knows facility/construction services.
- **Constraints:** ~€800 budget for 3 months, ~15 h/week, MVP in about 8 weeks, recurring B2B revenue sold globally in English.
