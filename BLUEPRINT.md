# Portfolio Blueprint — Hrushikesh Yadav

**Senior Software Engineer · 5 Years · React / GraphQL / TypeScript / AI**
A narrative-driven, WebGL-powered portfolio engineered to convert a recruiter's
8-second scan into a 5-minute read and a callback.

> **North-star principle:** The site itself is the strongest case study. Every
> interaction must whisper *"a senior engineer who sweats the details built
> this."* 3D is in service of the story — never decoration.

---

## 0. Source-of-Truth: What We're Actually Selling

All copy below is grounded in real repositories in the parent workspace, not
invented. Defensible headline metrics (verified from git history & source):

| Project | Evidence (from repos) | The "flex" |
|---|---|---|
| **DigiQC** | 5,702 commits · Aug 2021 → Jan 2026 · 14 feature modules · 355 source files · multi-tenant (`x-tenant-id`) · RBAC · Google Maps · DnD stage engine | 4.5 years of sustained ownership on a production B2B SaaS |
| **Zinq** | 2,873 commits · 650 source files · custom debounced `useAutoSave` engine · 8-language i18n (ar/de/es/fr/hi/ja/zh/en) · granular module-permission system (`canRead/canWrite/canDelete`) · Vite + Next.js public runtime | AI agent + form-builder platform with enterprise-grade i18n & authz |
| **Agent Demos** | 6 vertical AI agents · MediaPipe `tasks-vision` (KYC liveness) · Streamdown streaming (CJK/code/math/mermaid) · Express + Vercel AI SDK | Applied AI across BI, meetings, training, KYC, RAG, ERPNext |
| **RERA Scrapers (R&D)** | 3 state pipelines (Delhi/Gurgaon/UP) · Puppeteer + Cheerio · district-by-district crawl over ASP.NET postback pagination · excel4node export · Winston logging | Backend automation & data engineering — not just frontend |
| **Eugenix Admin** | Hair-transplant clinic-management software · **mounted into Zinq as a git submodule** (`src/modules/eugenix-module`, `eugenix-dev` branch) · reuses Zinq's primitives/design system | Platform reuse + healthcare breadth (current build) |

> ⚠️ **Action for Hrushikesh:** Insert any *internal* numbers you can verify —
> e.g. team size you led, p95 load-time improvement, % cloud-cost reduction,
> tenant count, MAU. The blueprint marks every place these go with `‹METRIC›`.

---

## 1. TECH STACK & ARCHITECTURE

### 1.1 Framework: **Next.js 15 (App Router)**

**Why Next over Remix/Astro for this use case:**

- **SEO + share cards matter for a portfolio.** SSG the marketing/content
  shell (Hero, About, Case Studies, Contact) → perfect Lighthouse SEO, instant
  OG/Twitter cards, crawlable copy.
- **WebGL lives client-side anyway.** R3F canvases are `'use client'` islands
  dynamically imported with `ssr: false`. Next lets us statically render the
  *content* while lazy-mounting the *experience* — best of both.
- **Astro** is tempting (islands by default) but its React-island DX for a
  heavily-interactive, shared-state 3D app is rougher than Next.
- **Remix** is excellent but its edge is data-mutation-heavy apps; a portfolio
  is read-mostly. Next's SSG + RSC fits cleaner.

```
Next.js 15 · React 19 · TypeScript (strict)
└─ Static shell (RSC/SSG) ──── crawlable copy, OG images, zero-JS content
└─ Client islands (ssr:false) ─ R3F canvases, cursor, scroll-scene
```

> **Note on current repo:** This portfolio is presently a **Vite + TanStack
> Router SPA**. That is 100% viable and ships today. Next.js is the
> *recommended evolution* if/when SEO discoverability becomes a priority.
> Section 5 covers both paths.

### 1.2 3D / WebGL Stack

| Concern | Library | Role |
|---|---|---|
| Renderer bridge | **@react-three/fiber** | Declarative Three.js in React |
| Helpers | **@react-three/drei** | `Environment`, `Float`, `MeshTransmissionMaterial`, `Html`, `useGLTF`, `AdaptiveDpr`, `PerformanceMonitor` |
| Post-processing | **@react-three/postprocessing** | Bloom, chromatic aberration, vignette (used *sparingly*) |
| Physics (optional) | **@react-three/rapier** | Only on the Tech-Stack "node cloud" — magnetic repulsion between skill nodes |
| Shaders | **Raw GLSL via `shaderMaterial`** | Custom particle field that reacts to mouse + scroll |
| Loading | **Suspense + drei `useProgress`** | Branded preloader, no layout shift |

### 1.3 Animation Stack — **GSAP + Lenis** (primary), Framer Motion (secondary)

**The honest trade-off:**

- **GSAP ScrollTrigger + Lenis** for anything *scroll-linked* — pinning
  sections, scrubbing the 3D camera along a scroll timeline, staggered text
  reveals. GSAP's timeline scrubbing is materially better than Framer for
  scroll-bound 3D choreography.
- **Framer Motion** for *component-level* micro-interactions — page
  transitions, layout animations, hover springs, `AnimatePresence`. It's the
  ergonomic choice inside React component trees and already in this repo.
- **Lenis** for smooth/inertial scroll — the single biggest "premium feel"
  upgrade per line of code. Drives GSAP's `ScrollTrigger.update()`.

```
Lenis (smooth scroll) ──drives──> GSAP ScrollTrigger ──scrubs──> R3F camera/uniforms
Framer Motion ──> in-component micro-interactions & route transitions
```

### 1.4 Performance Strategy (the part that separates senior from junior)

**Asset pipeline**
- Models: **glTF + Draco/Meshopt compression**, `gltf-transform optimize`.
  Target < 1.5 MB per scene. Prefer *procedural geometry* (icosahedrons,
  instanced particles) over imported meshes wherever possible — zero download.
- Textures: KTX2 / Basis supercompression via `useKTX2`.
- Fonts: subset + `next/font` (or `font-display: swap`); preconnect to font CDN.

**Runtime adaptivity**
- `<AdaptiveDpr pixelated />` + drei `<PerformanceMonitor>` to **dynamically
  drop DPR** and particle counts when FPS sags.
- `useDetectGPU` (drei) → tier the experience:
  - **Tier 0–1 (mobile/low-end):** static hero image / CSS gradient fallback,
    no canvas. Ship a `<picture>` poster.
  - **Tier 2:** reduced particle count, no post-processing.
  - **Tier 3 (desktop GPU):** full bloom + physics + shaders.
- `prefers-reduced-motion` → kill autorotation, scrub-jacking, and parallax.
  Respect accessibility; it's a senior signal.

**Render discipline**
- Single shared `<Canvas>` per page; never one canvas per section.
- `frameloop="demand"` where the scene is static; `invalidate()` on interaction.
- Memoize geometries/materials; instance everything repeated (`<Instances>`).
- Lazy-mount canvases with `next/dynamic` / `React.lazy` + `IntersectionObserver`
  so off-screen WebGL doesn't burn battery.

**Budgets**
- LCP < 1.8s, TBT < 150ms, CLS < 0.05 on the static shell.
- 3D mount is *non-blocking* — content is readable before the canvas paints.

---

## 2. VISUAL CONCEPT & 3D INTEGRATION

### 2.1 Theme — **"The Living Blueprint"** (Architectural Cyber-Minimalism)

A near-black canvas (`#000`) with a single decisive accent (**`#ff4500`
ignition-orange**), Apple-grade type scale (Bricolage Grotesque display +
DM Mono technical), and a faint blueprint grid. The metaphor: *a system
architect's schematic that comes alive as you explore it.* Restraint is the
brand — 90% monochrome, 10% orange, used like a laser pointer.

**Design tokens**
```
--bg:        #000000      --text:    #f5f5f7   (Apple near-white)
--surface:   #0d0d0d      --text-2:  rgba(245,245,247,0.55)
--accent:    #ff4500      --grid:    rgba(255,255,255,0.025)
type:        Bricolage Grotesque (display 800) · DM Mono (labels)
motion:      cubic-bezier(0.16, 1, 0.3, 1)  — the "Apple ease"
```

### 2.2 The 3D Through-Line (one evolving scene, four states)

Rather than four disconnected toys, **one persistent 3D object** morphs as the
user scrolls — reinforcing the "systems thinking" narrative.

1. **HERO — The Core.** A slowly-rotating wireframe icosahedron ("the system")
   wrapped in a custom-shader **particle field** that drifts toward the cursor
   (GPU-side `uMouse` uniform). Conveys: *complex system, elegantly controlled.*

2. **ABOUT — The Decomposition.** On scroll, the icosahedron **explodes into a
   node graph** (GSAP scrubs vertex positions outward). Nodes = the disciplines
   he owns (architecture, GraphQL, AI, DX). This already exists in spirit as the
   D3 `TechGraph`; we promote it into the shared WebGL scene.

3. **WORK — The Build.** Nodes **re-assemble into stacked planes** — each plane
   a case study. Camera dollies through them like flipping architectural sheets.

4. **STACK — The Constellation.** Final state: skills become an **interactive
   particle constellation** (optional Rapier magnetism) — drag to disturb,
   springs back. *Mastery, not a checklist.*

**Why this isn't a gimmick:** the geometry literally narrates the value
proposition — *"I take complexity (the core), decompose it (the graph), and
ship it as shippable systems (the planes)."* Every state maps to a section's job.

### 2.3 Custom Shader Particle Field (the signature moment)

A GLSL `shaderMaterial` driving ~8–15k instanced points:
- `uTime` → organic drift (curl/simplex noise).
- `uMouse` (raycast to a plane) → particles lean toward cursor, fading by
  distance. Reads as *responsive intelligence*, not random sparkles.
- `uScroll` → density/turbulence ramps as sections change.
- Additive blending, orange→white gradient by velocity. Bloom on Tier 3 only.

---

## 3. STRUCTURE & CONTENT STRATEGY (Senior-Level Copy)

### 3.1 Hero — the hook

> **Display:** `Hrushikesh Yadav` (filled) / `Yadav.` (outline) — viewport-scale.
>
> **Value line (rotating, monospace):**
> *"I architect scalable digital systems & premium interactive experiences."*
>
> **Sub:** "Senior engineer at **Logicwind**. Five years turning ambiguous
> product ideas into multi-tenant SaaS, AI agents, and the invisible
> infrastructure that makes them feel effortless."
>
> **CTAs:** `View Case Studies →` · `Résumé (PDF)` · `Get in touch`
>
> **Trust strip:** `5+ yrs` · `5,700+ commits shipped` · `10+ products` ·
> `3 multi-tenant platforms`

Move *away from* "I build websites." Move *toward* outcomes and scale.

### 3.2 About / Engineering Philosophy

Not a biography — a **point of view**. Three beliefs, each with proof:

1. **"Architecture is a feature."**
   *DigiQC has shipped 5,700+ commits over 4.5 years without a rewrite because
   the module boundaries were drawn right on day one — 14 feature modules,
   normalized Apollo cache, multi-tenant from the first line.*

2. **"The best UI is invisible."**
   *I built Zinq's debounced `useAutoSave` engine so users never hit a Save
   button — and a permission layer (`canRead/canWrite/canDelete`) so they never
   see a button they can't use.*

3. **"Ship globally from day one."**
   *Zinq speaks 8 languages (ar, de, es, fr, hi, ja, zh, en) because i18n was
   architecture, not an afterthought.*

> **Leadership / metrics block** (fill with verifiable numbers):
> "Led ‹N›-engineer frontend pod · drove TypeScript-strict + zero-warning ESLint
> across ‹N› repos · cut ‹X›% off ‹build/bundle/p95 load›." Use `‹›` only where
> you can back it up in a conversation.

### 3.3 Selected Work — **2–3 deep dives, not 10 thumbnails**

Each case study is a scroll-pinned chapter: **Problem → Constraint → Architecture
→ My role → Outcome.** Architecture diagrams rendered as interactive SVG/WebGL.

---

#### CASE STUDY 1 — DigiQC · *"The 4.5-Year System"*

- **Problem.** Construction/real-estate QC ran on paper and WhatsApp.
  Inspections, approvals, and evidence were untraceable across sites and orgs.
- **Constraint.** Must be **multi-tenant** (many construction firms, isolated
  data), **role-aware** (inspector ≠ approver ≠ admin), and usable on-site on
  flaky mobile networks with **geotagged photographic evidence**.
- **Architecture.**
  - React + Apollo Client, **normalized InMemoryCache**; auth link injects JWT +
    `x-tenant-id` for tenant isolation; global error link → toast + routing.
  - **14 feature modules** (auth, projects, users, agencies, EQC types,
    dashboard, reports, todo, logs, notifications, profile…) with strict
    boundaries — the reason it scaled to 5,700+ commits without a rewrite.
  - **Drag-and-drop stage engine** (DnD Kit + tree view) for configurable
    inspection workflows; **Google Maps** geolocation tagging; LESS theming via
    CRACO; Firebase hosting; Bitbucket Pipelines CI/CD.
- **My role.** Owned the frontend architecture end-to-end across its lifetime —
  module design, Apollo layer, the DnD workflow builder, RBAC UI, release
  discipline (zero-warning lint gate, pre-commit hooks).
- **Outcome.** A production B2B SaaS in continuous delivery since 2021 —
  **5,702 commits, ‹tenant count›, ‹MAU›**. *(Insert tenant/usage numbers.)*

#### CASE STUDY 2 — Zinq · *"Invisible UX at Enterprise Scale"*

- **Problem.** Teams needed to build AI-driven forms & configure autonomous
  agents — without a manual, without losing work, across languages and roles.
- **Constraint.** Auto-persistence (no data loss, no Save button), **granular
  authorization** per module/action, **8-language** localization, and a public
  agent runtime separate from the admin.
- **Architecture.**
  - React + TS + **Vite** admin SPA + Apollo GraphQL (+ GraphQL Codegen) and a
    **Next.js public runtime** (`zinq-nextjs-website/form-web`).
  - Custom **`useAutoSave`** hook: debounced, per-mutation-target, global
    saving-loader, timer cleanup on unmount — "it just saves."
  - **`useModulePermission`** authz primitive gating every read/write/delete at
    route and button level.
  - i18n-first: every string keyed; `en.json` source synced to 7 locales.
  - **White-label platform model:** Zinq is the *parent* app; whole products
    mount in as **git submodules** under `src/modules`. **Eugenix** (clinic
    management) is built this way — consuming Zinq's design system, GraphQL
    layer, autosave, and permission engine instead of re-implementing them.
- **My role.** Built the autosave engine, the permission abstraction, and the
  i18n architecture — the invisible systems the whole app stands on (650 files,
  2,873 commits).
- **Outcome.** Enterprise-ready AI platform: zero-data-loss editing, role-safe
  UI, instant localization. *(Insert adoption/agent-count numbers.)*

#### CASE STUDY 3 — LW Agent Demos · *"Applied AI, Six Ways"*

- **Problem.** Prove Logicwind's AI capability to prospects across very
  different verticals — fast, interactive, credible.
- **Constraint.** One codebase, six genuinely different agents, real-time
  streaming, and **on-device computer vision** for KYC.
- **Architecture.**
  - Vite + React + **Vercel AI SDK** (`ai`, `@ai-sdk/react`) with an **Express**
    server for tool/runtime endpoints.
  - **MediaPipe `tasks-vision`** for a real **KYC liveness** pipeline (face
    landmarks in-browser — no server round-trip for frames).
  - **Streamdown** renderers for streamed CJK, code, math, and **Mermaid**
    diagrams; Recharts for the BI agent.
  - Six features: Tally BI agent · bilingual meeting assistant · employee
    training AI · KYC liveness · RAG knowledge base · ERPNext conversational UI.
- **My role.** Architected the shared agent shell + streaming UI; built the
  KYC vision pipeline and the multi-modal Streamdown rendering layer.
- **Outcome.** A single portal that closes the "can you actually do AI?"
  question in a live demo. *(Insert demo→deal conversions if known.)*

#### RANGE SPOTLIGHT — RERA Scrapers · *"Beyond the Frontend"*

A short, high-signal block proving full-stack/automation depth (counters the
"just a UI dev" objection):

- **Problem.** DigiQC's go-to-market needed a live, structured list of every
  builder/promoter registered with India's state Real-Estate Regulatory
  Authorities — data locked behind slow, paginated government portals.
- **Architecture.** Three Node.js pipelines (**Delhi, Gurgaon, UP RERA**) built
  with **Puppeteer** for headless browser automation, **Cheerio** for HTML
  parsing, **excel4node** for structured Excel output, and **Winston** for
  observable logging. The UP scraper iterates **every district** and drives
  ASP.NET postback pagination programmatically; data is normalized into
  Name / Promoter / Contact / Address / District columns.
- **My role.** Designed and built all three crawlers as an R&D effort —
  resilient selectors, network-idle waits, and dedupe/normalization logic.
- **Outcome.** Automated market-intelligence feed that turned days of manual
  copy-paste into a one-command export — direct input to sales & onboarding.

> **Secondary work** (compact grid, not deep-dived): AppsOnAir (app
> distribution), LW Hub (knowledge base), React Org Chart (open-source D3
> component), Chem ERP, **Eugenix (healthcare — hair-transplant clinic
> management, built as a git submodule on top of the Zinq platform; current
> build)**, TMDB Explorer, Claude Code Monitor. *Together these show domain
> breadth: construction, AI, fintech-style distribution, healthcare, open
> source, and dev tooling.*

### 3.4 Interactive Tech Stack — the constellation

Skills as a **3D particle constellation** clustered by domain
(Frontend / API & Data / AI & Agents / Infra). Hovering a node:
- highlights its real-world *edges* — e.g. `GraphQL → Apollo → Codegen → Zod`,
  or `AI SDK → Claude → RAG → Streaming UI` — so it reads as a **dependency
  graph of how he actually works**, not a word cloud.
- shows where it was used (`Apollo → DigiQC, Zinq, AppsOnAir`).

Optional Rapier physics: drag to scatter, springs back into formation —
tactile proof of front-end command.

---

## 4. ANIMATION & UX STRATEGY

### 4.1 Micro-interactions (the "expensive" feel)

| Interaction | Implementation | Intent |
|---|---|---|
| **Custom cursor** | Blended-difference dot + trailing ring (already in repo as `Cursor`); grows/labels on interactive targets | Bespoke, not stock |
| **Magnetic buttons** | `mousemove` → translate toward pointer (GSAP `quickTo`), spring back on leave | Playful precision |
| **Text reveals** | Split by line (`SplitType`), clip-mask `y:110%→0`, stagger 40ms, "Apple ease" | Editorial polish |
| **Page transitions** | Framer `AnimatePresence` — orange wipe / shared-layout morph between routes | Continuity |
| **Smooth scroll** | **Lenis** inertial scroll, syncs GSAP ScrollTrigger | The #1 premium tell |
| **Hover lifts** | `y:-4`, accent border, soft shadow on cards | Depth without noise |
| **Link underlines** | Animated `width:0→100%` accent rule | Restraint |

All gated behind `prefers-reduced-motion`.

### 4.2 Scroll-Linked 3D Choreography

A single GSAP master timeline, pinned to the page, scrubs the shared scene:

```
scroll 0.00 → HERO    icosahedron whole · particles drift to cursor
scroll 0.25 → ABOUT   vertices explode outward into the node graph
scroll 0.55 → WORK    nodes collapse into stacked case-study planes;
                      camera dollies through each as it pins
scroll 0.85 → STACK   planes dissolve into the skill constellation
scroll 1.00 → CONTACT scene recedes; orange glow rises from footer
```

- Camera position, particle turbulence (`uScroll`), and geometry morph are all
  driven by one normalized `scrollProgress` (0→1) → buttery, coherent, never
  janky.
- **Section pinning** lets each case study hold attention while its diagram
  animates in — the scroll *is* the narration device.
- `ScrollTrigger.matchMedia()` simplifies/disables the scrub on mobile.

---

## 5. ACTION PLAN & NEXT STEPS

### Path A — *Evolve the current Vite SPA* (fastest, ships this week)

The repo already has R3F, drei, Three, Framer Motion, D3, TanStack Router.
Build the premium layer on top of what exists.

1. **Foundation polish (day 1–2)**
   - Lock the design tokens (Section 2.1) into `index.css`; true-black `#000`,
     Apple type scale, one accent. *(In progress.)*
   - Add **Lenis** smooth scroll; wire to a single scroll context.
   - Audit cursor + add magnetic buttons + `SplitType` text reveals.
2. **Unify the 3D scene (day 3–5)**
   - Collapse per-section canvases into **one shared `<Canvas>`** with a scene
     graph that reads `scrollProgress`.
   - Implement the morph states (icosahedron → graph → planes → constellation)
     with GSAP ScrollTrigger scrubbing R3F state.
   - Write the **custom particle shaderMaterial** (`uTime/uMouse/uScroll`).
3. **Content & case studies (day 5–7)**
   - Replace the 10-card grid with **3 deep-dive chapters** (Section 3.3 copy)
     + a compact secondary grid.
   - Build interactive architecture diagrams (SVG first; WebGL planes later).
4. **Performance & fallbacks (day 7–8)**
   - `useDetectGPU` tiering + mobile poster fallback; `AdaptiveDpr` +
     `PerformanceMonitor`; `prefers-reduced-motion` paths.
   - Draco/KTX2 any imported assets; lazy-mount canvases via IntersectionObserver.
5. **Ship**
   - Lighthouse pass (LCP/CLS/TBT budgets), OG image, sitemap, analytics.
   - Deploy on **Vercel** (already configured: `vercel.json`).

### Path B — *Migrate to Next.js 15* (if SEO/discoverability becomes priority)

Do this once Path A's experience is proven. Steps: scaffold Next 15 App Router →
port sections as RSC static shell → move all R3F into `'use client'` islands
dynamically imported `ssr:false` → `next/font` subset → `next/image` posters →
generate dynamic OG images via `@vercel/og` → redeploy on Vercel.

### Definition of Done (hire-ready bar)

- [ ] Loads to readable content < 1.8s; 3D mounts non-blocking.
- [ ] 60fps scrub on desktop; graceful Tier-0 fallback on phones.
- [ ] 3 case studies with Problem→Architecture→Outcome and real `‹METRIC›`s filled.
- [ ] Résumé PDF download + 3D résumé header (already built).
- [ ] `prefers-reduced-motion` fully respected; keyboard-navigable; alt text.
- [ ] Lighthouse: SEO 100, A11y ≥ 95, Perf ≥ 90 (desktop).
- [ ] Deployed, custom domain, OG/Twitter cards, analytics.

---

### Appendix — Verified Repo Facts (for honest interviews)

- DigiQC web: **5,702 commits**, 2021-08-02 → 2026-01-28, 14 modules, 355 files,
  React + Apollo + Ant Design + CRACO/LESS, Firebase + Bitbucket CI.
- Zinq web: **2,873 commits**, 650 files, Vite + Apollo + Ant Design + SASS,
  `useAutoSave` + `useModulePermission`, 8-language i18n; plus Next.js public
  runtime repos.
- Agent Demos: Vite + Vercel AI SDK + Express, MediaPipe `tasks-vision`,
  Streamdown (CJK/code/math/mermaid), Recharts; 6 vertical agents.
- RERA Scrapers (R&D, Mar 2023): `delhi-rera-scraping` / `gurgaon-rera-scraping`
  / `up-rera-scraping` — Node.js + Puppeteer + Cheerio (UP) + excel4node +
  Winston; UP scraper iterates all districts over ASP.NET postback pagination.
- Eugenix admin (Feb 2026, current build): TS clinic-management software for a
  hair-transplant chain, **mounted into Zinq as a git submodule** —
  `zinq-graphql-web-ts/.gitmodules` → `src/modules/eugenix-module` (branch
  `eugenix-dev`); imports Zinq's `components/primitives/CommonButton` etc.,
  proving Zinq is a reusable platform base. Phosphor icons; GitLab→Bitbucket CI.
- Also in workspace: digiqc-graphql-admin, digiqc-register-web,
  digiqc-report-server, lw-hub (+kb), react-org-chart, tmdb-next-ts,
  vercel-ai-sdk-demo, Claude-Code-Usage-Monitor.
