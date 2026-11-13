# B2B SaaS Opportunities in Dev Tools, IT Ops, MSPs and AI-Agent Tooling (as of Nov 2026)

Scope: buildable, recurring-revenue B2B ideas for a solo technical founder (18–19, Moldova/Romania, strong coding + AI/LLM + cybersecurity), with a Sweden-based co-founder selling in English. Budget about €800 for 3 months, about 15 h/week, MVP in about 8 weeks.

Source-quality note: research date is 2026-11-13. Many pricing figures come from competitor-written comparison pages or aggregators, not vendor pricing pages. These are flagged inline. Figures from 2024–2025 are marked "(older)". Reddit threads (r/msp, r/sysadmin) were not fetched directly in this session. MSP pain evidence comes from industry surveys and trade press that summarise them.

---

## 1. What do MSPs complain about in 2025–2026?

### Takeaway
Tool sprawl was MSPs' top operational pain in 2025, and staffing overtook it in 2026. Sprawl, alert fatigue and the "inability to quickly demonstrate value to clients" (reporting/QBRs) are still major. Cyber-insurance carriers now want **evidence** (MFA enforcement scope, tested backups) rather than yes/no answers. That creates a concrete, sellable evidence-collection need, especially for Microsoft 365 tenants.

### Cited Findings
**Tool sprawl / fatigue / staffing**
- Kaseya's 2026 MSP survey: a year ago tool fragmentation was the biggest operational challenge; in 2026 staffing (hiring, training) leads. — [Kaseya blog](https://www.kaseya.com/blog/msp-growth-challenges-2026/)
- Auvik 2026 report: 36% of MSPs use 10+ tools. 20% say shadow IT is the issue leadership most underestimates. — [Channel Insider on Auvik 2026](https://www.channelinsider.com/channel-business/channel-analysis/2026-ai-shadow-it-msp-report-auvik/)
- MSP Success 2026 survey: the biggest new-customer acquisition challenges are competition from other MSPs (22%) and "inability to quickly demonstrate value to clients" (19%). MSPs saying they don't fully use their software fell from 27% (2025) to 18% (2026). — [mspsuccess.com](https://mspsuccess.com/?p=21070) (via search summary; not fetched)
- (older, 2025) Heimdal survey of 80 North American MSPs: MSPs that rarely feel fatigue use 4.5 tools on average, against 7.4 for those with daily fatigue. Only 20% have consolidated security tools. — [Channel Insider](https://www.channelinsider.com/channel-business/running-an-msp/heimdal-security-fatigue-report-2025/)
- (older, 2025) Cynet: most MSPs use four security tools from four vendors, and complexity is tied to margin decline. 50% cite limited automation as the biggest barrier to scaling. — [Silicon UK press release](https://www.silicon.co.uk/press-release/new-cynet-survey-reveals-msps-are-growing-fast-but-complexity-and-tool-sprawl-are-slowing-them-down); [BetaNews](https://betanews.com/2025/07/23/msps-struggle-with-complexity-and-tool-sprawl/)
- (2025) N-able: 50.4% cite duplicate alerts from overlapping security tools as a leading noise source. Only 51.9% keep a comprehensive inventory of AI tools running in client environments. — [Channel Insider on N-able](https://www.channelinsider.com/security/managed-services/n-able-ai-security-alert-fatigue-msps/)

**Cyber-insurance evidence**
- Underwriters have moved from yes/no attestations to wanting proof of enforcement. They ask *where* MFA is enforced (remote access, privileged/admin, email, backup systems), and partial MFA can count as no MFA. — [Consilien 2026 checklist](https://consilien.com/news/cyber-insurance-requirements-2026-checklist); [UnderDefense Jul 2026](https://underdefense.com/blog/cyber-insurance-readiness-checklist/); [SmarterMSP](https://smartermsp.com/cyber-insurance-is-getting-pickier-what-msps-need-to-know/)
- Claims get denied when the deployed reality doesn't match the questionnaire answers. Misrepresentation, even accidental, is among the most common denial reasons. — [Todyl](https://www.todyl.com/blog/how-cyber-insurance-is-forcing-msps-to-get-serious-about-grc); [ConnectWise 2025](https://www.connectwise.com/blog/what-msps-need-to-know-about-cyber-insurance-in-2025)
- (older, 2024) Coalition data: 82% of denied cyber claims involved organisations without fully implemented MFA. — cited in [Flamingo blog](https://www.flamingo.run/blog/cyber-insurance-requirements) (secondary)
- A widely repeated "70% of ransomware claims denied in 2025" figure appears in a CyberQP ebook without a primary report. **Treat as unverified.** — [CyberQP ebook](https://cyberqp.com/downloads/ebooks/obtain-cyber-insurance-without-the-hassle/)
- Backups: sources point to backups on the same domain as production, and missing SaaS backups (e.g. cloud accounting data), as frequent gaps. Restore testing is expected evidence. — [UnderDefense](https://underdefense.com/blog/cyber-insurance-readiness-checklist/); [Consilien](https://consilien.com/news/cyber-insurance-requirements-2026-checklist)

**M365 multi-tenant management market**
- Inforcer: per-tenant pricing for 365 Manager with a **20-tenant minimum** and 12-month terms. Its TDR product is per user (50-user minimum). No public list price. — [Inforcer request-pricing/FAQ](https://www.inforcer.com/request-pricing); [Nerdio comparison](https://getnerdio.com/best-multi-tenant-management-tools-for-microsoft-365/)
- CoreView prices by licensed identities. A reseller listing shows CoreView/Simeon annual subscriptions from about $24.7k to $49.5k/yr. — [CoreView pricing](https://coreview.com/pricing); [ChannelOnline reseller listing](https://global.channelonline.com/acme/mpcontemporarycopy/Products/all?mfr=Y61105) (indicative)
- CIPP (CyberDrain) is open source. It is free to self-host, with paid hosted tiers, and the MSP owns upkeep when self-hosting. — [Nerdio on CIPP](https://getnerdio.com/cyberdrain-cipp/)
- Syncro published a 2026 "best M365 management tools for MSPs" list and ships an MCP server, a sign that MSP vendors are adding AI/MCP. — [Syncro blog](https://syncrosecure.com/blog/best-microsoft-365-management-tools-for-msps/)

**QBR / client reporting**
- ScalePad Lifecycle Insights (vCIO/QBR reporting) is listed from about $149/month. ScalePad bundles start at $250/month, and per-client licensing is sold in blocks of 5. — [Software Advice](https://www.softwareadvice.com/product/451074-ScalePad-Lifecycle-Insights/); [ScalePad pricing](https://www.scalepad.com/pricing)
- A third-party site lists Lifecycle Manager Essentials at $99/mo (10 clients) and Pro at $250/mo (25 clients). — [checkthat.ai](https://checkthat.ai/brands/scalepad) (aggregator, low confidence)

### Inferences
- The best MSP wedge is a **narrow, evidence-producing** tool, not another platform: something that fits the "demonstrate value" pain (19%), the insurance-proof pain and the M365 baseline pain at once.
- Inforcer's 20-tenant minimum and CoreView's five-figure annual cost leave the **small MSP (1–10 techs, 5–40 tenants)** underserved. CIPP is free but self-hosted, which caps willingness to pay. A hosted, opinionated "insurance evidence + M365 drift report" product has room if priced at about $3–6/tenant/month.
- Since staffing is now the top pain, tools that save tech hours (automated evidence collection, auto-generated QBR narratives using LLMs) sell better than tools that add dashboards.

### Gaps
- No direct r/msp thread quotes were collected. Pain intensity on onboarding/offboarding, licence waste and documentation (IT Glue/Hudu) is not quantified here.
- No verified BrightGauge pricing, and no ConnectWise or Datto 2026 survey numbers found.
- No primary carrier data on the 2025–2026 denial rate.

---

## 2. What AI-rollout pains exist (shadow AI, leakage, cost, prompt injection, agent permissions, EU AI Act), who are the startups, and what's left for SMBs?

### Takeaway
AI pains are real and well documented: 57–77% of AI-using employees paste sensitive data, AI budgets overrun, and agents/MCP add new attack surface. But the **enterprise AI-security layer consolidated in 2025–2026**. Prompt Security went to SentinelOne, Lakera to Check Point, Protect AI and Portkey to Palo Alto Networks, Langfuse to ClickHouse, and Helicone is in maintenance mode after Mintlify bought it. That leaves SMBs, MSPs and indie developers with expensive enterprise suites, or with orphaned and open-source tools. The EU AI Act Article 4 AI-literacy duty still applies, although the 2026 Digital Omnibus softened its wording.

### Cited Findings
**Shadow AI and data leakage**
- (2025) TELUS Digital, 1,000 US employees at 5,000+ staff firms: 57% entered confidential information into ChatGPT, Gemini or Copilot. 68% use personal accounts, and only 24% had mandatory AI training. — [Dataconomy](https://dataconomy.com/2025/02/28/57-percent-of-employees-expose-sensitive-data-to-genai/)
- (2025) LayerX: 77% of GenAI-using employees copy/paste data into the tools, and 22% paste PII/PCI. — [eSecurity Planet](https://www.esecurityplanet.com/news/shadow-ai-chatgpt-dlp/); [TechRepublic](https://www.techrepublic.com/article/news-employees-share-company-secrets-on-chatgpt/)
- (2025) Cybernews: 59% of employees use unapproved AI tools, and 75% of those admit sharing sensitive info. — [RegTech Analyst](https://regtechanalyst.com/?p=78248)
- (2025) Anagram, 500 US employees: 58% admit pasting sensitive data into LLMs. — [TechRadar](https://www.techradar.com/pro/security/watch-out-your-workers-might-be-pasting-company-secrets-into-chatgpt)
- Caveat: one 2026 blog notes that many circulating shadow-AI percentages can't be traced to an original publication. — [ainora.lt](https://ainora.lt/blog/shadow-ai-what-employees-paste)
- N-able: only 51.9% of MSPs keep a full inventory of AI tools in client environments. — [Channel Insider](https://www.channelinsider.com/security/managed-services/n-able-ai-security-alert-fatigue-msps/)

**LLM cost overruns**
- Most AI projects exceed spending targets, and LLM token costs are the 5th-largest driver of unexpected AI spend. More than 80% of companies say AI costs eroded gross margin by more than 6%, and over a quarter saw drops of 16% or more. — [CIO.com](https://www.cio.com/article/4064319/ai-cost-overruns-are-adding-up-with-major-implications-for-cios.html)
- McKinsey: companies have exhausted annual AI budgets within months. Only 20–25% have mature AI FinOps. — [McKinsey](https://www.mckinsey.com/our-insights/the-cost-of-intelligence-how-cios-can-manage-ai-demand-at-scale)
- Harness survey of 700 leaders: about 26% of AI spend is wasted. — [IT Brew](https://www.itbrew.com/stories/more-than-one-quarter-of-all-ai-spend-is-wasted-report)
- CloudZero: average monthly AI spend went from about $63k (2024) to $85.5k (2025), up 36%. 15% have no formal AI cost tracking. — [CloudZero](https://www.cloudzero.com/blog/ai-cost-crisis) (vendor)
- A circulating "380% overrun (MIT Sloan 2025)" figure is **unverified**, so don't use it.

**Startup landscape and consolidation**
- SentinelOne acquired Prompt Security (announced Aug 5, 2025, closed Sep 5, 2025) for about $180M. It is now sold as AI Usage Control, Agentic AI Security and AI App Security modules. — [Nand Research](https://nand-research.com/research-note-sentinelone-to-acquire-prompt-security/); [FutureCIO](https://futurecio.tech/sentinelone-to-acquire-prompt-security-to-advance-protection-against-risks-of-ai-adoption/)
- Check Point acquired Lakera, estimated at about $300M (undisclosed officially). — [Ynet](https://www.ynetnews.com/business/article/bksoa0dogl)
- Wave: Cato bought Aim Security, Tenable bought Apex, CrowdStrike bought Pangea, and Palo Alto bought Protect AI. Cato, Check Point, CrowdStrike, F5 and SentinelOne agreed to pay a combined $1.31B for AI-security firms (Sept 2025). — [GovInfoSecurity](https://www.govinfosecurity.com/blogs/ai-security-goes-mainstream-as-vendors-spend-heavily-on-ma-p-3953); [Calcalist](https://www.calcalistech.com/ctechnews/article/bjt0500luxl)
- LLM observability consolidation, per secondary sources (not verified against vendor press releases):
  - ClickHouse acquired Langfuse (announced Jan 16, 2026).
  - Helicone was put in maintenance mode after Mintlify acquired it (Mar 3, 2026).
  - Palo Alto Networks acquired Portkey (closed May 29, 2026) as the core of the Prisma AIRS AI Gateway.
  - Sources: [DevelopersDigest](https://www.developersdigest.tech/blog/llm-observability-acquisitions-2026); [FutureAGI](https://futureagi.com/blog/helicone-alternatives-2026/); [llmgateway.io](https://llmgateway.io/blog/helicone-alternatives)
- Helicone Hobby tier: 10k requests, 1 GB, 1 seat. Portkey free tier: 10k logs/month. Langfuse is open source and self-hostable. — same sources as above. Aggregator ranges: Langfuse $0–$2,499/mo, Helicone $0–$2,000/mo ([CostBench](https://www.costbench.com/compare/helicone-vs-langfuse/), unverified).

**MCP / agent security**
- Runlayer (MCP gateway, threat detection, observability; Okta/Entra permissions) launched Nov 2025 with an $11M seed (Khosla, Felicis). A $30M Series A at a $120M valuation in Jun 2026 is reported by aggregators only. — [TechCrunch](https://techcrunch.com/2025/11/17/mcp-ai-agent-security-startup-runlayer-launches-with-8-unicorns-11m-from-khoslas-keith-rabois-and-felicis); [TamRadar](https://www.tamradar.com/funding-rounds/runlayer-series-a-30m)
- Obot AI raised a $35M seed (Sep 2025) for an open-source enterprise MCP gateway. Archestra raised $3.3M (Aug 2025). Helmet Security raised $9M. Operant, Natoma and Cloudflare AI Gateway are also named. — [VCA Online](https://www.vcaonline.com/news/2025092308/obot-ai-secures-35m-seed-to-build-enterprise-mcp-gateway/); [SiliconANGLE](https://siliconangle.com/2025/08/14/archestra-raises-3-3m-secure-enterprise-use-ai-agents-mcp-servers/); [SecurityWeek](https://www.securityweek.com/helmet-security-emerges-from-stealth-mode-with-9-million-in-funding/amp/)
- Auth vendors are adding "sign-in for AI agents / MCP" (SSOJet MCP beta; Scalekit CIMD support for MCP client registration). — [SSOJet](https://ssojet.com/blog/workos-pricing-at-scale-50-100-200-connections); [Scalekit](https://www.scalekit.com/blog/workos-alternatives)
- OWASP Top 10 for LLM Applications (2025 edition) lists Prompt Injection (LLM01), Sensitive Information Disclosure (LLM02), Excessive Agency (LLM06) and Unbounded Consumption (LLM10), among others. These map directly to the injection, leakage, agent-permission and cost-overrun pains. — [OWASP GenAI](https://genai.owasp.org/llm-top-10/) (from background knowledge; page not re-fetched this session)

**EU AI Act**
- Article 4 AI literacy has applied since 2 Feb 2025. The Digital Omnibus changes the duty from "ensure a sufficient level" to "take measures to support AI literacy", which commentators call softened but surviving (an obligation of effort). — [Gibson Dunn](https://www.gibsondunn.com/eu-ai-act-omnibus-agreement); [FPF](https://fpf.org/blog/the-ai-act-implementation-timeline-what-changes-under-the-ai-omnibus); [Lewis Silkin, 27 Jul 2026](https://www.lewissilkin.com/insights/2026/07/27/the-digital-omnibus-on-ai-enters-into-force-today-102nedo)
- High-risk Annex III obligations move from 2 Aug 2026 to 2 Dec 2027, and Annex I embedded systems to 2 Aug 2028. Art. 50(2) watermarking/transparency moves to 2 Dec 2026. — [Verifywise](https://verifywise.ai/blog/eu-ai-act-omnibus-what-changed); [Cooley](https://cdp.cooley.com/digital-ai-omnibus-delays-key-deadlines-introduces-new-rules/)
- Status conflict: some sources say the Omnibus is adopted (Reg. (EU) 2026/1744, in force 27 Jul 2026), while others describe only a provisional agreement. Lewis Silkin's 27 Jul 2026 article title says "enters into force today", so adoption is likely. — [euaiact.com](https://www.euaiact.com/digital-omnibus-ai); [Simmons & Simmons](https://www.simmons-simmons.com/en/publications/cmoveo6ke00icuxskpgueb0od/ai-omnibus-update)

### Inferences
- **Don't compete head-on with enterprise AI-security suites** (SentinelOne, Check Point, Palo Alto). The gap left for a solo founder is (a) **SMB/MSP-delivered** shadow-AI visibility and policy, (b) **developer-side** cost control and MCP hygiene for small teams, and (c) **evidence/compliance artefacts** (AI-literacy training records, AI-use policy acknowledgements, AI tool inventory).
- The observability consolidation (Helicone in maintenance, Portkey moving into an enterprise security suite) likely creates **orphaned indie and small-team users**. Positioning: "portable, simple LLM cost caps per customer/feature". Risk: LiteLLM, OpenRouter and Langfuse OSS are free.
- The softened Article 4 wording makes "AI literacy" a weaker compliance driver. It is still useful as a **conversation opener** for MSPs selling to EU SMBs, but not a hard mandate.
- MCP security is hot but VC-funded ($11M–$35M rounds) and enterprise-focused. A solo founder can win only on a **narrow developer/SMB wedge**, such as an MCP config scanner (tool-poisoning, over-broad permissions) delivered as a CLI plus a cheap team dashboard.

### Gaps
- No verified SMB-tier pricing for Harmonic, LayerX, Nightfall or SentinelOne AI Usage Control (all quote-based).
- Acquisitions of Langfuse, Helicone and Portkey come from secondary blogs. Verify against vendor press releases before the final report states them as fact.
- No data found on how many SMBs (fewer than 250 staff) have done anything about Article 4.
- Credo AI's current pricing and position were not researched.

---

## 3. Small-SaaS infrastructure gaps: SSO/SCIM, dunning, status pages, audit logs, trust pages

### Takeaway
Every category has cheap or free incumbents, so "low competition" is weak across the board. The clearest pricing pain is **SCIM (directory sync)**, now called the "SCIM tax": WorkOS bills SSO and SCIM as separate connections at about $125 each. Dunning is a proven pain (about 22% of SaaS churn is involuntary) but crowded. Status pages are commoditised (Instatus free/$20; Statuspage $29–$99+, subscriber-based).

### Cited Findings
**SSO / SCIM**
- WorkOS charges per connection, and SSO and Directory Sync are billed as separate connections. Reported tiers: $125 per connection for the first 15, then $100 (16–30), $80 (31–50), $65 (51–100), $50 (101–200). Audit logs cost $99/mo per 1M events plus $125/mo per SIEM connection. — [WorkOS blog](https://workos.com/blog/estimate-sso-scim-costs); [ActivePieces](https://www.activepieces.com/blog/workos-pricing-what-each-connection-costs-2026.md); [SSOJet](https://ssojet.com/blog/workos-pricing-at-scale-50-100-200-connections) (competitor-written; tiers conflict slightly)
- Estimate at 100 connections: about $6.5k/mo for SSO only, about $13k/mo with SCIM on every connection. — [SSOJet](https://ssojet.com/blog/workos-pricing-at-scale-50-100-200-connections) (competitor)
- Stytch is free to 10k MAU and 5 SSO/SCIM connections, then $125/connection. Clerk claims no per-connection SCIM surcharge. Clerk coined the "SCIM tax" framing. — [Clerk article](https://clerk.com/articles/auth-platforms-with-sso-and-scim-in-the-base-tier); [SSOJet pricing comparison 2026](https://ssojet.com/blog/enterprise-authentication-pricing-2026)
- Competitors in the SSO-for-small-SaaS space: SSOJet, Scalekit, Clerk, Stytch, Auth0, plus WorkOS itself. — [SSOJet 10 tools compared](https://ssojet.com/blog/enterprise-authentication-for-developers-10-tools-compared); [Scalekit](https://www.scalekit.com/blog/workos-alternatives)

**Dunning / failed payments**
- Churnkey/Stripe analysis: about 22% of SaaS churn is involuntary (5.4M failed payments studied). Recurly 2025 puts it at 20–26% of B2B SaaS churn. — [Churnkey guide](https://churnkey.co/guides/reduce-involuntary-churn); [Churnkey benchmarks](https://churnkey.co/blog/involuntary-churn-benchmarks)
- Failed payments cost about 9% of recurring revenue a year (attributed to Stripe, via secondary sources). — [Lago](https://getlago.com/blog/dunning-management); [DEV](https://dev.to/toolkitonline/how-failed-payments-are-silently-killing-your-saas-revenue-and-how-to-fix-it-3ed9)
- Churnkey's own comparison: Stripe Smart Retries recover 51% in 5.5 days, against 55% in 4.8 days with Churnkey added (vendor claim). Churnkey targets $200k+ MRR SaaS. One third-party source lists its price as 0.5% of recovered revenue (unverified). — [Churnkey Stripe dunning](https://churnkey.co/blog/stripe-dunning/); [aitoolreviews](https://aitoolreviews.pages.dev/articles/stripe-dunning-tools-compared)
- Many indie dunning tools exist (e.g. WorkAid Dunning on Indie Hackers, Churnward). — [Indie Hackers](https://www.indiehackers.com/product/workaid-dunning)

**Status pages**
- Atlassian Statuspage: no free tier, from about $29/mo, Business $99/mo, scaling with subscriber count. Instatus: free plan with unlimited subscribers, Pro $20/mo. Better Stack: extra public page $12/mo; white-label $208/mo (annual) or $250/mo (monthly). — [openstatus comparison](https://www.openstatus.dev/guides/how-openstatus-compares-to-other-status-page-tools); [WizStatus](https://wizstatus.com/blog/status-page-tools-comparison); [Better Stack](https://betterstack.com/community/comparisons/better-stack-vs-statuspage/) (all vendor-authored)
- Open-source and cheap options include openstatus, OneUptime, Upptime, Cachet, Hyperping and StatusGator. — [OneUptime 2026](https://oneuptime.com/blog/post/2026-03-10-best-statuspage-alternatives/markdown); [Hyperping](https://hyperping.com/blog/best-statuspage-alternatives)

### Inferences
- **Status pages and dunning are red oceans** for a newcomer. Only enter with a sharp sub-niche, for example dunning for Paddle/Lemon Squeezy merchants or white-label status pages for agencies/MSPs.
- SSO/SCIM is a real pricing pain, but auth is security-critical and trust-heavy. An 18-year-old solo founder selling auth infrastructure to B2B SaaS faces a credibility barrier. A safer adjacent wedge: **"enterprise-readiness" add-ons** that don't sit in the login path, such as audit-log-as-a-service with a customer-facing log viewer, or an AI-assisted security-questionnaire/trust page.
- WorkOS audit logs at $99/1M events plus $125/SIEM connection set a price ceiling. A self-serve audit-log API at $29–$99/mo is plausible but has low perceived urgency.

### Gaps
- Trust-centre pricing (Vanta Trust Center, SafeBase, Conveyor, Drata) was not researched this session.
- Baremetrics Recover, Churn Buster and Paddle Retain prices were not verified.
- No official WorkOS pricing page was fetched, so the tier figures rely on secondary sources.

---

## 4. Idea profiles (8 concrete ideas)

### Takeaway
The strongest fits for this founder (security + AI, salesperson selling in English, tiny budget) are tools that **produce evidence or reports for a buyer who already pays for IT services**: MSPs and agencies. The pain is documented, the buyer is reachable through communities and marketplaces, and the product can be built on top of existing APIs (Microsoft Graph, Google Workspace, browser extension, Stripe) without heavy infrastructure. Pure dev-tool infrastructure ideas (SSO, LLM gateway, MCP gateway) are technically attractive but face free open-source alternatives, VC-funded competitors and harder non-technical selling.

### Cited Findings
(The supporting evidence for each idea is in sections 1–3. Key competitor price anchors:)
- Inforcer: per-tenant, 20-tenant minimum, quote-only. CoreView: about $25k–$50k/yr bands. CIPP: free/self-hosted. — [Inforcer](https://www.inforcer.com/request-pricing); [ChannelOnline](https://global.channelonline.com/acme/mpcontemporarycopy/Products/all?mfr=Y61105); [Nerdio](https://getnerdio.com/cyberdrain-cipp/)
- ScalePad Lifecycle Insights from about $149/mo. Lifecycle Manager $99/mo (10 clients) and $250/mo (25 clients). — [Software Advice](https://www.softwareadvice.com/product/451074-ScalePad-Lifecycle-Insights/); [checkthat.ai](https://checkthat.ai/brands/scalepad)
- WP Umbrella €1.99/site/mo, all features including white-label reports. ManageWP core is free with per-site add-ons (e.g. +$2 backups, +$1 uptime; white-label is an add-on). MainWP is self-hosted with no per-site fees. — [WP Umbrella](https://wp-umbrella.com/); [WP Umbrella alternatives page](https://wp-umbrella.com/alternatives) (competitor-written); [gautamkhorana.com](https://gautamkhorana.com/blog/managewp-alternatives/)
- WorkOS SSO/SCIM about $125/connection each. — see section 3
- Helicone in maintenance mode; Portkey moved into Palo Alto's Prisma AIRS (secondary sources). — see section 2
- Runlayer $11M seed; Obot $35M seed. — see section 2

### Inferences

All running-cost figures below are **estimates** assuming Hetzner/Fly.io VPS hosting (about €5–€20/mo), Supabase/Neon free or entry tiers (€0–€25/mo), a domain plus transactional email (about €5/mo) and metered LLM usage. They are not sourced quotes.

---

#### Idea A — "InsureProof for M365": cyber-insurance evidence pack + tenant baseline drift for small MSPs
- **Target customer / buyer:** owner or tech lead of a small MSP (1–15 staff, 5–60 M365 tenants). Secondary: in-house IT at SMBs with 50–500 users.
- **Pain evidence:** insurers want proof of MFA scope and backup tests, and questionnaire/reality mismatches cause denials (section 1). Inforcer has a 20-tenant minimum and CoreView costs five figures. 19% of MSPs struggle to "demonstrate value".
- **Competitors and gap:** Inforcer, CoreView, CIPP (free/self-host), Augmentt, Syncro's M365 tooling, and CyberQP (insurance content). Gap: a hosted, cheap, **insurance-questionnaire-mapped** evidence PDF per client. It would read Microsoft Graph and Conditional Access policies for MFA coverage, show admin role hygiene and legacy auth, and accept a backup restore-test log upload. It would also flag drift against a CIS-like baseline, with no 20-tenant minimum.
- **Suggested pricing:** $4/tenant/mo (minimum $49/mo), or $149/mo for up to 40 tenants. One-off "insurance renewal report" add-on at $29/tenant.
- **Running cost:** about €20–€40/mo at MVP (VPS + DB + email; Graph API is free).
- **8-week MVP:** multi-tenant Entra app with GDAP/consent flow; checks for MFA registration and enforcement per user/role, Conditional Access, legacy auth, Global Admin count, Secure Score pull and mailbox forwarding rules; manual backup-test attestation with file upload and timestamps; white-label PDF "Insurance Evidence Pack" mapped to common questionnaire questions; weekly drift email.
- **Distribution:** r/msp, MSPGeek/Discord communities, Pax8 marketplace later, MSP podcasts, LinkedIn outreach by the co-founder to MSP owners in the UK, Nordics, US, Australia and NZ. Also partnering with cyber-insurance brokers who refer MSPs.
- **Risks:** Microsoft API/permission changes; CIPP adding a similar report for free; MSPs' trust in a young vendor holding admin consent to client tenants (mitigate with read-only scopes and SOC 2-lite documentation); insurer questionnaires vary.
- **2-week validation:** (1) Post a free "M365 insurance readiness checklist" template on r/msp and LinkedIn and measure downloads. (2) Co-founder books 15 calls with MSP owners. (3) Show a Figma or static PDF mockup of the evidence pack and ask for a $99 pre-order or a pilot commitment from 3 MSPs.
- **Interview questions:** (1) Walk me through the last time a client renewed cyber insurance: who filled in the questionnaire and how long did it take? (2) How do you prove MFA coverage today? (3) Have you or a client had a claim questioned or denied? (4) What do you use for M365 multi-tenant management, and what do you pay? (5) Would you pay per tenant for a client-ready evidence PDF, and at what price would it be a no-brainer?

#### Idea B — "Shadow AI Radar for MSPs": AI tool discovery + AI-use policy + AI-literacy records for SMB clients
- **Target / buyer:** MSPs (resell to SMB clients as a new security line item) and SMB IT managers, especially in the EU.
- **Pain evidence:** 57–77% of employees paste sensitive data into AI tools; 68% use personal accounts; only 24% have had training; only 51.9% of MSPs inventory AI tools. EU Article 4 literacy duty (softened but alive). See section 2.
- **Competitors and gap:** SentinelOne Prompt Security (AI Usage Control), Harmonic, LayerX, Nightfall and the Check Point/Lakera products, all enterprise and quote-based. Gap: an **MSP multi-tenant**, cheap, lightweight product made of a browser extension that detects AI sites and paste events with PII patterns (warn, don't block, at MVP), OAuth-app discovery via M365/Google admin APIs (which AI apps users granted access to), a policy template with employee acknowledgement and a short AI-literacy micro-course with completion log.
- **Suggested pricing:** $2–$3/user/mo wholesale to MSPs (they mark up), with a 10-user minimum per tenant. Direct SMB price $4/user/mo.
- **Running cost:** about €20–€50/mo (extension telemetry is small; PII detection is done locally with regex/small model).
- **8-week MVP:** Chrome/Edge extension managed via Intune/Google policy; detection list of 200+ AI domains; local PII/secret regex (emails, IBANs, API keys, card numbers) with an in-page warning; per-tenant dashboard; OAuth-grant scan via Microsoft Graph; policy plus acknowledgement page; monthly PDF "AI usage report" for the MSP's QBR.
- **Distribution:** MSP channel (r/msp, MSP Facebook/Discord groups, MSP peer groups), Chrome Web Store, EU SMB LinkedIn content around "AI Act literacy".
- **Risks:** Microsoft Purview/Edge and Google adding built-in AI DLP; enterprise vendors moving down-market; browser-extension privacy concerns; Article 4 softening reduces urgency.
- **2-week validation:** landing page with an "AI usage audit for your clients" offer; co-founder contacts 20 MSPs offering a free 14-day pilot on one client. Target: 3 pilots and 1 paid commitment.
- **Interview questions:** (1) Have clients asked you about ChatGPT/Copilot risks? (2) Do you know which AI tools your clients' staff use today? (3) Have you sold any AI-related service yet, and at what price? (4) Would a monthly AI-usage report help your QBRs? (5) What would stop you from deploying a browser extension to client endpoints?

#### Idea C — "TokenGuard": per-customer LLM cost attribution and hard budget caps for small SaaS
- **Target / buyer:** founders/CTOs of small SaaS companies (2–30 people) with AI features on OpenAI/Anthropic/Gemini APIs; also AI agencies building client chatbots.
- **Pain evidence:** most AI projects overrun budgets; over 80% report margin erosion above 6%; 15% have no AI cost tracking; about half of AI-core companies reportedly don't track LLM API costs (secondary). Helicone is in maintenance mode and Portkey went enterprise (section 2).
- **Competitors and gap:** Langfuse (OSS/ClickHouse), LiteLLM (OSS proxy), OpenRouter, Helicone (maintenance), Portkey (Palo Alto), Cloudflare/Vercel AI Gateway. Gap: **business-level cost answers** ("which customer/plan/feature loses money on AI?") plus **per-end-customer hard caps** and automatic overage billing via Stripe metering. That makes it about unit economics, not tracing.
- **Suggested pricing:** free to $50 of tracked spend; $29/mo (up to $2k LLM spend tracked); $99/mo (up to $20k); 1% of spend above that.
- **Running cost:** €20–€60/mo (proxy on a VPS; ClickHouse/Postgres for events). Latency-sensitive, so it needs edge or regional hosting later.
- **8-week MVP:** OpenAI-compatible proxy plus an SDK wrapper that tags `customer_id` and `feature`; live price table per model; dashboard of margin per customer (pulls Stripe MRR); budget caps returning a graceful error or fallback to a cheaper model; Slack/email alerts; CSV export.
- **Distribution:** Hacker News Show HN, r/SaaS, r/LocalLLaMA, Indie Hackers, X/Twitter build-in-public, a "migrate from Helicone" guide (SEO).
- **Risks:** strong free OSS alternatives; cloud AI gateways adding this; being in the request path raises reliability/security expectations; harder for a non-technical salesperson (developer-led sale).
- **2-week validation:** publish a "Helicone alternative / LLM cost per customer" landing page plus a migration guide, and post to HN, r/SaaS and Indie Hackers. Target: 100 waitlist signups and 10 calls. Ask 3 founders to share their LLM bill and Stripe export for a free manual "AI margin report" (concierge MVP).
- **Interview questions:** (1) What is your monthly LLM spend, and how has it changed? (2) Do you know your most expensive customer by AI cost? (3) Have you ever been surprised by an API bill? (4) What do you use today (Langfuse, Helicone, a spreadsheet)? (5) Would you route traffic through a proxy, or only accept async logging?

#### Idea D — "MCP Shield": MCP server/config security scanner and allowlist for small dev teams
- **Target / buyer:** engineering leads and security-minded CTOs at 10–200-person software companies whose developers use Claude Code, Cursor or Copilot agents with MCP servers.
- **Pain evidence:** VC money signals the pain (Runlayer $11M seed and a reported $30M A; Obot $35M; Archestra; Helmet). OWASP LLM01 Prompt Injection and LLM06 Excessive Agency (section 2).
- **Competitors and gap:** Runlayer, Obot, Archestra, Helmet, Operant, Natoma, Cloudflare AI Gateway, all enterprise or gateway-heavy. Gap: **zero-infrastructure, developer-first scanning**. A CLI/GitHub Action and endpoint agent would inventory MCP configs across dev machines, check for tool-description poisoning, over-broad scopes, unpinned versions, secrets in configs and known-malicious servers, and keep a team allowlist with an audit trail.
- **Suggested pricing:** free CLI (open source, for distribution); team dashboard $8/dev/mo; $299/mo for up to 50 developers.
- **Running cost:** €10–€30/mo.
- **8-week MVP:** CLI in Go/TS that parses Claude Desktop, Claude Code, Cursor, VS Code and Windsurf MCP configs; static rules plus an LLM-assisted review of tool descriptions; SARIF output for GitHub code scanning; small SaaS dashboard aggregating reports per developer; allowlist policy file.
- **Distribution:** GitHub (open-source CLI), HN, r/netsec, r/devops, security newsletters, conference CFPs (BSides). Content marketing through the founder's own MCP vulnerability research.
- **Risks:** very fast-moving and crowded; IDE and model vendors may build this in; developer tools are hard to monetise; the co-founder can't easily sell it (technical buyer).
- **2-week validation:** ship the free CLI in week 1 and publish a write-up scanning 100 public MCP servers for issues. Measure GitHub stars and inbound requests; ask 10 engineering leads whether they'd pay for team visibility.
- **Interview questions:** (1) How many MCP servers do your developers use, and do you know which? (2) Do you have a policy on agent tool access? (3) Has security asked about AI coding agents yet? (4) Would you prefer a gateway or a scanner? (5) Who would own the budget?

#### Idea E — "AgencyPulse": stack-agnostic client-site health + security report for web agencies
- **Target / buyer:** owners of web agencies and freelancers managing 10–300 client sites on WordPress, Webflow, Shopify, Next.js or static hosts.
- **Pain evidence:** the WordPress-only tools (ManageWP, WP Umbrella, MainWP) prove agencies pay per site and value white-label reports (section 4 cited findings). The gap is non-WordPress stacks and security depth.
- **Competitors and gap:** ManageWP (free core plus per-site add-ons), WP Umbrella (€1.99/site), MainWP (self-hosted), uptime tools (UptimeRobot, Better Stack). Gap: **one external-scan report covering any stack**: uptime, SSL/domain/DNS expiry, email auth (SPF/DKIM/DMARC), security headers, exposed files (.git, .env), outdated JS libraries/CMS versions, Core Web Vitals via the PageSpeed API and broken links. Delivered as a white-label monthly PDF the agency can bill as a "care plan".
- **Suggested pricing:** $1.50/site/mo (minimum $29/mo), or $49 (25 sites), $99 (75 sites), $199 (250 sites).
- **Running cost:** €15–€40/mo (cron scanners on a VPS; PageSpeed API is free within quota).
- **8-week MVP:** add sites by CSV; scheduled external checks (listed above); alerting; white-label PDF/branded web report; client-facing status page per agency (bonus: an agency status page as an upsell).
- **Distribution:** agency communities (r/webdev, r/Wordpress, r/web_design, Webflow forum/marketplace, Shopify Partners), LinkedIn outreach by the co-founder (easy, non-technical pitch), free "site security grade" tool as a lead magnet.
- **Risks:** low barrier to entry and many cheap monitors; agencies are price-sensitive; external-only scanning is shallower than plugin-based tools.
- **2-week validation:** build a free single-URL "Agency Site Health Grade" page (2–3 days), and co-founder emails 50 agencies a free report on 3 of their client sites. Target: 5 asking for a bulk version and 2 pre-paying.
- **Interview questions:** (1) How many client sites do you maintain, on which platforms? (2) Do you sell care/maintenance plans, and what do you include and charge? (3) How do you report to clients today? (4) Have you had a client site hacked or an expired domain/SSL? (5) What would you pay per site for automated white-label reports?

#### Idea F — "QBR Autopilot": AI-written QBR/client value reports for small MSPs
- **Target / buyer:** small MSP owners/vCIOs who skip QBRs because preparing them takes hours.
- **Pain evidence:** 19% of MSPs cite inability to demonstrate value as an acquisition barrier; staffing is now the #1 pain; ScalePad's premium pricing ($99–$250+/mo) shows willingness to pay (section 1).
- **Competitors and gap:** ScalePad Lifecycle Insights/Manager, BrightGauge (ConnectWise), Liongard, PSA built-in reports. Gap: an **LLM-generated narrative** ("what we did, risks, recommendations, budget") from PSA ticket exports plus M365/RMM data. It would be cheap and fast, for MSPs not on ScalePad.
- **Suggested pricing:** $79/mo (10 clients), $149/mo (30 clients).
- **Running cost:** €30–€80/mo (LLM tokens are the main variable; about €0.05–€0.30 per report estimated).
- **8-week MVP:** integrations with 1–2 PSAs via API (HaloPSA, Syncro or Autotask) plus CSV fallback; ticket categorisation and trends; LLM summary with editable sections; branded PDF/slide output.
- **Distribution:** MSP channel, as for Idea A. It can be bundled with Idea A (evidence pack plus QBR in one product).
- **Risks:** PSA vendors adding AI summaries natively (ConnectWise and Kaseya are both investing in AI); integration maintenance; data-privacy concerns with ticket data in LLMs (mitigate with EU-hosted and zero-retention APIs).
- **2-week validation:** concierge: ask 5 MSPs for one anonymised client's ticket export, produce the QBR manually with an LLM, and ask whether they'd pay $79/mo.
- **Interview questions:** (1) Do you run QBRs, and how often? (2) How long does one take to prepare? (3) What tools do you use? (4) What do clients care about most in them? (5) Would an auto-drafted report you edit in 10 minutes be worth $X/month?

#### Idea G — "TrustDesk": AI security-questionnaire answering + trust page for small B2B SaaS
- **Target / buyer:** founders or first ops hires at 5–50-person B2B SaaS companies selling into mid-market, who are swamped by security questionnaires before they have SOC 2.
- **Pain evidence (indirect):** enterprise-readiness spend is visible in WorkOS-style pricing for SSO/SCIM/audit logs (section 3). Direct questionnaire-burden data was not collected (see gaps).
- **Competitors and gap:** Vanta/Drata trust centres, SafeBase, Conveyor and Loopio, typically bundled with expensive compliance suites (prices not verified this session). Gap: **standalone, cheap** questionnaire auto-fill (upload past answers and policies, RAG to answer new CAIQ/SIG-lite/Excel questionnaires) plus a hosted trust page with status and subprocessors.
- **Suggested pricing:** $49/mo (5 questionnaires/mo), $149/mo unlimited plus trust page.
- **Running cost:** €30–€70/mo (LLM plus embeddings).
- **8-week MVP:** document ingestion (policies, past questionnaires); Excel/CSV questionnaire import with answers, citations and confidence; review/approve UI; export back to the original format; public trust page.
- **Distribution:** r/SaaS, Indie Hackers, LinkedIn founder content, SOC 2 consultants as partners.
- **Risks:** crowded with funded players; answers must be accurate (liability); buyers may prefer bundled Vanta/Drata.
- **2-week validation:** offer a done-for-you "we'll answer your next security questionnaire in 24h for $99" service and see if 3 founders buy.
- **Interview questions:** (1) How many security questionnaires did you get last quarter? (2) Who fills them in and how long does it take? (3) Do you have SOC 2/ISO 27001, or plans for it? (4) What tools have you tried? (5) Have you lost or delayed a deal because of security review?

#### Idea H — "SCIM Bridge": flat-price SCIM + audit-log add-on for small B2B SaaS (lower priority)
- **Target / buyer:** CTOs of small B2B SaaS companies whose first enterprise customer demands SCIM/SSO.
- **Pain evidence:** SSO and SCIM are billed as separate connections at about $125 each on WorkOS; Clerk's "SCIM tax" framing (section 3).
- **Competitors and gap:** WorkOS, Stytch (free to 5 connections), Clerk, SSOJet, Scalekit, Auth0 and open-source options. Gap is narrow: flat-price SCIM provisioning plus an embeddable audit-log viewer, for apps already on their own auth.
- **Suggested pricing:** $49/mo for 3 enterprise connections, then $15/connection.
- **Running cost:** €15–€30/mo.
- **8-week MVP:** SCIM 2.0 server endpoint per tenant (Okta/Entra tested); webhooks to the customer app; audit-log ingestion API plus an embeddable React viewer.
- **Distribution:** dev communities, HN, comparison SEO ("WorkOS alternative").
- **Risks:** crowded with funded players; security trust barrier for a young founder; technical-only sale.
- **2-week validation:** landing page and "SCIM pricing calculator", HN post; target 50 signups and 5 calls.
- **Interview questions:** (1) Have customers asked for SSO/SCIM? (2) What did you use, and what does it cost? (3) Build or buy? (4) Do you need customer-facing audit logs? (5) What price would make you switch?

### Gaps
- No direct customer interviews or Reddit quote mining were done. The pain scores below are inferred from surveys and competitor funding/pricing.
- Pricing for Augmentt, Liongard, BrightGauge, Harmonic, LayerX, Vanta/Drata trust centres and SafeBase was not verified.
- Running-cost figures are estimates, not quotes.

---

## 5. Scoring (0–10) and ranking

### Takeaway
Ideas A (M365 insurance evidence for MSPs) and E (agency site-health reports) score best overall, because a non-technical co-founder can sell them, they're cheap to run and they use the founder's security skills. B (Shadow AI for MSPs) has the best AI fit and timing but more platform risk. C, D and H suit the developer profile but are hardest to sell and most exposed to free/OSS or VC-funded competition.

### Cited Findings
- Scores are judgement calls based on the evidence cited in sections 1–4. No external source scores these ideas.

### Inferences

| Idea | Pain | WTP | Low competition | Ease of build | Ease of selling (non-tech) | Fit (sec+AI) | Global potential | **Total /70** |
|---|---|---|---|---|---|---|---|---|
| A. M365 insurance evidence pack (MSP) | 8 | 8 | 6 | 6 | 7 | 9 | 8 | **52** |
| E. AgencyPulse site-health reports | 6 | 6 | 5 | 9 | 8 | 7 | 9 | **50** |
| B. Shadow AI Radar for MSPs | 7 | 6 | 6 | 6 | 7 | 10 | 8 | **50** |
| F. QBR Autopilot (MSP) | 7 | 7 | 5 | 6 | 7 | 6 | 7 | **45** |
| G. TrustDesk questionnaires | 7 | 7 | 3 | 6 | 6 | 8 | 8 | **45** |
| C. TokenGuard LLM cost caps | 7 | 6 | 4 | 6 | 3 | 8 | 9 | **43** |
| D. MCP Shield scanner | 6 | 4 | 4 | 7 | 2 | 10 | 9 | **42** |
| H. SCIM Bridge | 6 | 6 | 3 | 5 | 2 | 6 | 8 | **36** |

- **Recommended combination:** start with **A** and fold **F** in later as an upsell ("evidence pack + QBR in one"), since both sell to the same MSP buyer through the same channel. Alternatively, **E** is the fastest to validate (a free lead-magnet scanner in days) and the easiest pitch for the co-founder.
- **B** could become a second module for the same MSP customers once A has traction. Same buyer, AI-security story, EU angle.
- **Budget fit:** all ideas run under about €80/mo at MVP. €800 over 3 months covers hosting, domain, an LLM API allowance, a Microsoft Partner/test tenant (Microsoft 365 developer/test tenants may require a paid trial; unverified) and small ad or lead-magnet costs.
- **Founder-specific note:** for MSP-facing products holding admin consent to client tenants, a young unknown vendor must offset trust risk with least-privilege read-only scopes, public security documentation and possibly an open-source scanner core.

### Gaps
- Scores have not been checked against real buyer interviews. The 2-week validation plans above are meant to test them.
- No data on MSP density by country, for prioritising the co-founder's outreach (UK, Nordics, DACH, US, ANZ suggested by inference only).
