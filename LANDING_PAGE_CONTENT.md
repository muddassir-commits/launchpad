# LANDING PAGE — BUILD SPEC & FULL COPY
### The AI Marketing Launchpad
**Purpose:** Upload this file + the `/images` folder into Antigravity and have it build a high-converting, mobile-first landing page. All copy below is final and in English. Build it section by section, top to bottom.

---

## 0) GLOBAL SETTINGS

**Page title (browser tab):** The AI Marketing Launchpad — Start Earning Online From Zero
**Meta description:** A live, 30-day beginner course in AI + digital marketing. Only free tools. Build something real in every class. Skills you can use in any field. Next batch starts July 6.
**Primary CTA (used everywhere):** `Register now — ₹2,999`
**Secondary CTA:** `Have questions? Message on WhatsApp`
**Primary CTA action:** opens the Razorpay payment link (see SETUP file).
**Secondary CTA action:** opens WhatsApp to +91-8887620727.

> No email signup form anywhere on this page. The only data collected is through payment + a Google Form after payment. Queries go to WhatsApp. (No automation, by design.)

### Design system (match the muddassirali.com brand)
- **Colors:**
  - Deep Navy `#0E1A2B` (dark sections, primary text)
  - Electric Teal `#14B8A6` (primary CTA, accents, links)
  - Warm Amber `#E8A13A` (scarcity badges, secondary highlights)
  - Off-white `#F7FAFC` (light sections)
  - Slate grey `#5B6B7B` (muted/supporting text)
- **Fonts:**
  - `Bebas Neue` — large display headlines
  - `DM Sans` — body text and subheads
  - `Space Mono` — small labels, badges, numbers (e.g. "25 SEATS", "JULY 6")
- **UX rules:**
  - Mobile-first. Most visitors are on phones.
  - **Sticky bottom bar on mobile** with the primary CTA always visible: `Register now — ₹2,999`.
  - Repeat the primary CTA after every major section (about 5 times total).
  - Large tap targets, generous spacing, fast-loading compressed images.
  - Alternate section backgrounds: Navy → Off-white → Navy for rhythm.

### Motion & animation (ADVANCED — this is a priority)
Build this as a high-end, motion-rich experience. Use **GSAP + ScrollTrigger** for scroll animation, **Lenis** for buttery smooth scrolling, and CSS for hover/micro-interactions. Animate **only `transform` and `opacity`** for 60fps. Lazy-load images. Always honour `prefers-reduced-motion` (disable heavy motion if the user requests it). On mobile, keep reveals and hovers but **turn off parallax and any custom-cursor effects** so it stays fast.

**Global behaviours:**
- **Smooth scroll** across the whole page (Lenis).
- **Scroll-reveal** on every section: elements fade up + slight scale (from `opacity:0, translateY(28px), scale(0.98)`), with a **stagger** so child items animate in sequence, triggered as they enter the viewport.
- **Thin scroll-progress bar** (teal) fixed at the top.
- **Button hovers:** lift + soft teal glow + a subtle "magnetic" pull toward the cursor on desktop; clear press/ripple on tap.
- **Card hovers:** lift with soft shadow, a thin animated teal border, and a gentle 3D tilt toward the cursor (desktop only).
- **Link/underline hovers:** animated underline that wipes in.

**Signature moments (make these feel premium):**
- **Hero:** an animated, slowly-shifting gradient / aurora glow behind the navy; the headline reveals **line by line with a mask wipe**; the badge and sub-headline fade up after it; a faint parallax on the hero image as you scroll.
- **Trust strip stats:** numbers **count up** when scrolled into view ("6+", "200+", "25").
- **"Skills work in any field" row:** the field words ("A job · Freelancing · Your own business · …") run as a **slow horizontal marquee** that subtly speeds up on hover.
- **Pricing card:** a soft animated glow/sheen around the card; the ₹2,999 number scales in; the "25 SEATS" badge has a gentle pulse.
- **Gallery:** images animate in with a stagger; on hover they zoom slightly inside their frame; clicking opens a **lightbox with a smooth zoom transition**.
- **FAQ:** smooth height accordion with a rotating "+" icon.
- **How it works steps:** the connecting line "draws" in as you scroll, and each step pops in one after another.
- **Final CTA:** the headline reveals with a mask wipe; the button has a continuous subtle shimmer to draw the eye.
- **Page entrance:** a quick, classy load-in (logo or hero fades/clears in) — under ~1 second, never a slow loader.

**Tone of motion:** confident and smooth, never bouncy or gimmicky. Think premium product page, not a template. Every animation should feel intentional.

---

## 1) HERO (Navy background)

**Badge (Space Mono, amber):** LIVE • STARTS JULY 6 • 25 SEATS

**Headline (Bebas Neue, large):**
Start earning online from zero — in 30 days.

**Sub-headline (DM Sans):**
A live, 30-day course for complete beginners. Learn AI and digital marketing using only free tools, build something real in every class, and walk away with a skill you can use in any field.

**Primary CTA button:** Register now — ₹2,999
**Under the button (small, Space Mono):** Mon / Wed / Fri · 8:00–9:30 PM · Live only

**Hero image placeholder:** `images/hero-muddassir.jpg` (you, friendly, looking at camera — right side on desktop, top on mobile)

**Trust strip (below hero, thin band):**
6+ years experience  ·  200+ marketers trained  ·  Only free tools  ·  Honest, no fake promises

---

## 2) THE PROBLEM (Off-white) — empathy

**Section label (Space Mono, teal):** IF THIS SOUNDS LIKE YOU

**Heading (Bebas Neue):** You have the will. You were never shown the way.

**Body (DM Sans):**
You have watched people earn online and wondered what they know that you do not. Maybe you have collected a few skills, but never the one thing that turns them into income. And now AI is changing everything so fast that it is easy to feel left behind.

None of that is your fault. No one ever sat you down and showed you the path, step by step, in plain language, from the very beginning. That is exactly what this course is.

**Three pain points (cards):**
- "I do not know where to start." → We start from absolute zero.
- "Courses are too expensive or too theoretical." → ₹2,999, fully live, and you build in every class.
- "I am scared AI will make my skills useless." → You will learn to use AI as your advantage, not your replacement.

---

## 3) WHAT THIS IS (Navy)

**Section label:** THE COURSE

**Heading (Bebas Neue):** The AI Marketing Launchpad

**Body:**
A 30-day, fully live course that takes a complete beginner from "I don't know anything" to "I can use AI and digital marketing to start earning." No paid tools. No fluff. Every class, you build something real — a piece you can actually show and use.

**Four pillars (icon cards):**
- **100% Live** — Real classes, real questions, real time. Never pre-recorded.
- **Only Free Tools** — Nothing to buy. Ever.
- **Build Every Class** — You leave each session with something made.
- **Honest** — No fake income promises. No surprise upsell.

**CTA:** Register now — ₹2,999

---

## 4) SKILLS THAT WORK IN ANY FIELD (Off-white) — the signature angle

**Section label:** WHY IT MATTERS

**Heading (Bebas Neue):** These skills don't stay in one box.

**Body:**
Most courses sell you "become a marketer." This one is broader on purpose. Once you know how to use AI to research, create, communicate, sell, and read data — and how to turn an idea into a result — you can apply it almost anywhere.

**Field row (small badges or a simple grid):**
A job  ·  Freelancing  ·  Your own business  ·  Content creation  ·  Finance & the markets

**Closing line (bold):**
You are not learning one narrow thing. You are learning how to make modern tools work for you, wherever you go.

---

## 5) A SKILL THAT IS TRULY YOURS (Navy) — emotional / stability

**Heading (Bebas Neue):** The kind of skill no one can take from you.

**Body:**
This is more than a course. It is a step toward a little more control over your own future. A skill you can use from anywhere — for a job, for your own clients, or for your own business. The kind of skill that gives you options, and a steadier footing in a world that keeps changing.

You do not need to be an expert. You do not need money to spend on tools. You just need to show up for 30 days and do the work alongside everyone else.

**CTA:** Register now — ₹2,999

---

## 6) WHAT YOU WILL LEARN (Off-white)

**Section label:** THE CURRICULUM

**Heading (Bebas Neue):** 12 live classes. One real skill set.

**Intro line:** Mon / Wed / Fri, 8:00–9:30 PM. Every class: a concept, a live demo, then you build it.

**Week-by-week (4 cards or an accordion):**

**Week 1 — Foundations + your AI superpower**
- How this whole field works and how money is actually made
- Set up your free toolkit
- Talk to AI so it gives you gold, not garbage
- Find your niche and your offer

**Week 2 — Content that gets attention**
- Copywriting with AI: hooks, headlines, persuasion
- A simple content strategy and calendar
- Make reels and designs with free tools

**Week 3 — Get found + the money skill**
- SEO basics and the new AI search
- Get a business found on Google
- Meta Ads, step by step — the skill that gets beginners paid fastest

**Week 4 — Run it, measure it, get paid**
- Launch and read your ad results
- Understand your numbers with analytics
- Capstone on a real business + how to find your first work

**Bonus:** An advanced Meta Ads session for those who want to go further.

**CTA:** Register now — ₹2,999

---

## 7) MEET YOUR INSTRUCTOR (Navy)

**Section label:** WHO IS TEACHING

**Heading (Bebas Neue):** Muddassir Ali

**Instructor image placeholder:** `images/instructor-portrait.jpg`

**Body:**
Founder of Veloxis Global and a Meta Ads and AI specialist with over six years of hands-on experience. He has trained more than 200 marketers and works with real businesses every day. This is a practitioner teaching practitioners — not theory from a textbook, but the exact things that work, explained simply.

**Mini trust badges:** 6+ years experience · 200+ trained · Real client work · Founder, Veloxis Global

---

## 8) PROOF & GALLERY (Off-white)

**Section label:** REAL WORK, REAL MOMENTS

**Heading (Bebas Neue):** Years of doing the work.

**Body (one line):** A look at the teaching, the certifications, and the work behind the course.

**Gallery grid (masonry or 3-column, lightbox on click). Image placeholders — drop your real photos here:**
- `images/gallery/cert-1.jpg` — certification / recognition
- `images/gallery/cert-2.jpg` — certification / recognition
- `images/gallery/cert-3.jpg` — certification / recognition
- `images/gallery/teaching-1.jpg` — you teaching / training a group
- `images/gallery/teaching-2.jpg` — you teaching / training a group
- `images/gallery/work-1.jpg` — work / results / event
- `images/gallery/work-2.jpg` — work / results / event
- `images/gallery/work-3.jpg` — work / results / event

> Add as many as you have. The grid should scale to any number of images. Keep captions short or none.

---

## 9) WHAT YOU WALK AWAY WITH (Navy)

**Heading (Bebas Neue):** By the end, you will have:

**Checklist (teal ticks):**
- The skills to start applying for jobs or internships, or to take on small client work
- A real portfolio piece, built on an actual business
- A personal pack of prompts and templates you will keep using
- A completion certificate under the Veloxis Global brand
- A community of people who started exactly where you did

**Honest note (small, italic):** This course teaches the skills and shows you the path. It does not promise a guaranteed salary or job — that part is the work you put in. We would rather be honest than oversell.

---

## 10) TESTIMONIALS (Off-white) — placeholder, fill after Batch 1

**Section label:** WHAT STUDENTS SAY

**Heading (Bebas Neue):** From people who started here.

> For the first batch, leave this section out or show a single honest line such as: "This is our first public batch — your review could be the first one here." After Batch 1, replace with 3–6 real testimonials (name, city, one or two lines, photo if they allow).

**Testimonial card template (repeat):**
- `images/testimonials/student-1.jpg`
- "Short quote in the student's own words."
- — Name, City

---

## 11) PRICING (Navy) — the offer

**Section label:** ENROLL

**Heading (Bebas Neue):** One price. Everything included.

**Price block (centered card, amber accent):**
- **Big number (Bebas Neue):** ₹2,999
- **Under it:** for the full 30-day course

**Included list (teal ticks):**
- 12 live classes + 1 advanced bonus
- Build something real in every class
- Short written notes after each class
- Prompt + template pack
- Batch WhatsApp community
- Completion certificate (Veloxis Global)

**Scarcity badge (Space Mono, amber):** ONLY 25 SEATS · STARTS JULY 6

**Refund line (small):** Not sure? You can request a full refund up to the end of Class 2.

**CTA:** Register now — ₹2,999

---

## 12) HOW IT WORKS (Off-white) — the flow

**Heading (Bebas Neue):** Joining is simple.

**4 steps (numbered):**
1. **Register & pay** — securely, ₹2,999.
2. **Get a confirmation** — a personal message on WhatsApp.
3. **Join the batch group** — your class links and notes live here.
4. **Start live on July 6** — and build from day one.

**CTA:** Register now — ₹2,999

---

## 13) FAQ (Navy) — accordion

**Heading (Bebas Neue):** Questions, answered.

- **Who is this for?** Complete beginners who want to start earning. If you have never done this before, you are exactly who it is built for. Anyone who wants to add AI to their work is welcome too.
- **Do I need any experience?** No. We start from absolute zero.
- **Are the tools really free?** Yes. You will not need to buy anything.
- **Are the classes live?** Yes, fully live — never pre-recorded.
- **Are there recordings?** No. Classes are live only, so every session is worth showing up for and the batch stays focused. If you miss a class, you get short written notes and can ask your questions in the next one.
- **When are the classes?** Mon / Wed / Fri, 8:00–9:30 PM, for one month, starting July 6.
- **What if I miss a class?** You will get short written notes, and you can ask anything in the next live session.
- **Will I get a certificate?** Yes, a completion certificate under the Veloxis Global brand.
- **What is the refund policy?** Full refund up to the end of Class 2. After that, no refunds.
- **How do I pay?** Through a secure payment link on this page (UPI, cards, net banking).
- **Will this guarantee me a job or income?** No, and anyone who promises that is not being honest. This gives you the skills and the path; the results come from the work you put in.
- **How do I ask a question before joining?** Message directly on WhatsApp: +91-8887620727.

---

## 14) FINAL CTA (Navy) — emotional close

**Heading (Bebas Neue):** The next batch starts July 6.

**Body:**
There are only 25 seats. If you have been waiting for a sign to finally start — to learn something that is truly yours, that you can use anywhere — this is it. Thirty days from now, you could be looking back at the moment you began.

**Primary CTA:** Register now — ₹2,999
**Secondary CTA:** Have questions? Message on WhatsApp

---

## 15) FOOTER (Navy, darker)

- **Brand:** The AI Marketing Launchpad — by Veloxis Global
- **Contact:** WhatsApp +91-8887620727
- **Link:** muddassirali.com
- **Small print:** © 2026 Veloxis Global. All rights reserved.

---

## IMAGE PLACEHOLDER SUMMARY (for the `/images` folder)

| File | Where | What to put | Suggested size |
|---|---|---|---|
| `images/hero-muddassir.jpg` | Hero | Friendly photo of you | 1200×1200 |
| `images/instructor-portrait.jpg` | Instructor | Clean portrait | 800×1000 |
| `images/gallery/cert-1..3.jpg` | Gallery | Certification photos | 1000×750 |
| `images/gallery/teaching-1..2.jpg` | Gallery | You teaching/training | 1000×750 |
| `images/gallery/work-1..3.jpg` | Gallery | Work / results / events | 1000×750 |
| `images/testimonials/student-1..6.jpg` | Testimonials | After Batch 1 | 400×400 |
| `images/logo.png` | Header/Footer | Course or Veloxis logo | transparent PNG |
| `images/og-image.jpg` | Social share preview | Course title on brand background | 1200×630 |

> Keep all images compressed (under ~300 KB each) so the page loads fast on mobile. If a photo is missing, the builder should use a clean coloured placeholder block of the right size so the layout never breaks.
