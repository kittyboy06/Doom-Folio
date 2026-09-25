# IMPLEMENT THE DOCTOR DOOM 3D PORTFOLIO

You are taking an existing React portfolio project and transforming it into the final production-ready interactive 3D portfolio.

IMPORTANT:

The Lovable output is the **visual/UI reference**.

Do NOT redesign the entire UI from scratch.

Preserve the Lovable visual hierarchy, spacing, section structure, typography direction, component relationships and responsive behavior unless a change is required for functionality or performance.

Your responsibility is to perform the engineering implementation:

* inspect the existing repository
* understand the current architecture
* preserve useful existing functionality
* connect portfolio data
* implement real 3D
* integrate the supplied visual components
* implement animations
* optimize performance
* make everything functional
* maintain responsive behavior

---

# 1. FIRST: INSPECT THE EXISTING REPOSITORY

Before modifying anything:

Analyze the complete repository.

Inspect:

* package.json
* src/
* components
* data
* existing Three.js implementation
* existing ThreeScene
* animation utilities
* CSS
* Tailwind configuration
* routing
* public assets
* portfolio.json

Do not blindly replace existing code.

Identify which existing components can be reused.

The existing repository contains a centralized portfolio data file:

src/data/portfolio.json

This must remain the source of truth for portfolio content.

Do NOT hardcode project information into individual components.

---

# 2. CURRENT PORTFOLIO DATA

Use the existing portfolio data.

Current information includes:

NAME:
Afsal Ahmed Khan A

TAGLINE:
Turning ideas into apps, games, and AI-powered experiences.

ROLES:
Android Developer
Full Stack Developer
AI Developer
Unity Game Developer

STATS:
18 Projects Shipped
56 LeetCode
8.0 CGPA
3rd CSE

Use the complete existing:

hero
about
achievements
skills
projects
timeline
certifications
contact
footer

data.

Do not invent replacement project information.

---

# 3. CORE VISUAL THEME

Implement the Lovable design as:

DOOM // LATVERIAN ARCHIVE

Visual identity:

#070908
#0D120F
#111612

Doom green:

#173D28
#235C3A

Energy:

#62D58A

Brass:

#B8954A
#D5B968

Gunmetal:

#252A27
#3A403B

Text:

#E7E4D8

Muted:

#858C84

Avoid generic cyberpunk neon.

---

# 4. REAL DOCTOR DOOM 3D MODEL

Integrate a real Doctor Doom GLB/GLTF model.

Potential source:

https://sketchfab.com/3d-models/doctor-doom-ab4b9003adec4dfc86831a1b36d0100f

Alternative lightweight model:

https://sketchfab.com/3d-models/doctor-doom-8b8019a6ac384b48a3c6003a865cf191

Before publishing, verify the selected model's license and attribution requirements.

Place the final asset inside the project's public asset structure.

Example:

public/models/doctor-doom.glb

Do NOT load the model from a third-party URL at runtime.

---

# 5. THREE.JS IMPLEMENTATION

Use the project's existing Three.js architecture where practical.

If React Three Fiber is already installed/useful, use it.

Otherwise use the existing Three.js implementation.

Implement:

* GLTF loading
* environment lighting
* camera
* orbit/drag interaction where appropriate
* mouse parallax
* idle animation if available
* model rotation
* responsive camera
* lighting
* shadows where useful
* post-processing only if performance permits

The Doom model must be the visual centerpiece of the hero.

---

# 6. DOOM HERO

The hero should contain:

LEFT:

// SYSTEM ONLINE

AFSAL AHMED
KHAN A

AI ENGINEER
SYSTEM BUILDER
GAME DEVELOPER

"Turning ideas into apps, games, and AI-powered experiences."

CTA:

ENTER ARCHIVE →

VIEW INVENTIONS

RIGHT/CENTER:

REAL 3D DOCTOR DOOM

Around the model:

SUBJECT: DOOM
SYSTEM: ONLINE
CORE: STABLE
LATVERIA // 2026

Add subtle:

* emerald rim lighting
* smoke
* particles
* atmospheric depth
* brass HUD elements
* vignette

---

# 7. REACT BITS COMPONENTS

Integrate these components where appropriate.

React Bits:

https://reactbits.dev/micro/flip-card

Use for:
PROFILE / IDENTITY CARD

https://reactbits.dev/text-animations/tech-text

Use for:
SYSTEM BOOT
TECHNICAL LABELS
HERO SYSTEM INITIALIZATION

https://reactbits.dev/animations/scroll-expand

Use for:
HERO → PROFILE transition
or another major scroll transition if technically appropriate.

Do not use components just because they exist.

Every animation must serve the experience.

---

# 8. LIGHTSWIND COMPONENTS

Integrate:

https://lightswind.com/components/3d-smokey-frame

Use around:

* Doom hero
* Aether feature
* Contact section

Adapt its colors to Doom green / dark emerald.

Do not leave the default cyan aesthetic.

---

Integrate:

https://lightswind.com/components/ai-gooey-blob

Use this as:

DOOM CORE / AETHER CORE

Example HUD:

DOOM CORE
POWER: 97.4%
SYSTEM: STABLE

Use emerald/green tones.

The component should feel like an energy reactor.

---

# 9. SYSTEM BOOT

After the hero, create:

INITIALIZING LATVERIAN ARCHIVE...

IDENTITY VERIFIED

ACCESS GRANTED

SUBJECT:
AFSAL AHMED KHAN A

CLASSIFICATION:
AI / SOFTWARE / GAME SYSTEMS

Animate this using the Tech Text component or an equivalent implementation.

The sequence must complete naturally and then transition into the profile.

Do not make it block scrolling unnecessarily.

---

# 10. PROFILE

Build the personnel dossier from:

portfolio.json

Display:

18
PROJECTS SHIPPED

56
LEETCODE

8.0
CGPA

3RD
CSE

Use the Flip Card component for the main identity card.

Front:

AFSAL AHMED KHAN A

Back:

AI SYSTEMS
ANDROID
WEB
UNITY
GAME DEVELOPMENT

The data must come from the repository.

---

# 11. SKILLS / ARMORY

Render the existing skills dynamically from:

portfolio.json

Do not hardcode them.

Categories:

Mobile
Web & PWA
Game Dev
AI & Cognitive Architecture
Languages
Tools & Infrastructure

Each category should become a Doom-style technical module.

Add:

* hover lighting
* subtle 3D tilt
* animated borders
* expandable details where appropriate

Do not overanimate individual skill tags.

---

# 12. PROJECT ARCHIVE

Render projects dynamically from:

portfolio.json

Do not hardcode projects.

Primary featured projects:

Aether
SignBridge AI
Aether Console Dashboard
Musubi
Cipher Quest OS
Kitchen Chaos 3D
NeuroCart
ARISE IRL

Create an interactive archive.

Each project must show:

ID
TITLE
CATEGORY
STATUS
DESCRIPTION
TECHNOLOGIES
SOURCE
DEMO

Use the actual GitHub/demo URLs stored in portfolio.json.

---

# 13. PROJECT INTERACTION

Desktop:

Hover → subtle 3D tilt.

Hover → emerald edge illumination.

Hover → technical metadata.

Click → expanded dossier.

Expanded dossier should include:

PROJECT
CATEGORY
STATUS
DESCRIPTION
STACK
SOURCE
DEMO

Use Framer Motion for transitions.

Do not introduce a large routing system unless necessary.

A modal/expansion experience is preferred if consistent with the Lovable design.

---

# 14. AETHER FEATURE

Give Aether special treatment.

Display:

AETHER
PERSONAL COGNITIVE ARCHITECTURE

DENO
TYPESCRIPT
SUPABASE
PGVECTOR
GEMINI 2.5
CLOUD RUN
DOCKER

Use the AI Gooey Blob as a cognitive/energy core.

Add technical HUD labels.

Make this the visual highlight of the project section.

---

# 15. CHRONICLES

Render the existing timeline dynamically.

Use:

portfolio.json → timeline

Implement:

* vertical timeline
* scroll activation
* glowing emerald progress line
* event reveal
* date markers
* subtle parallax

Do not manually duplicate timeline data inside components.

---

# 16. CONTACT

Use:

portfolio.json → contact

Create:

GITHUB
LINKEDIN
EMAIL
LEETCODE

All links must work.

Email should use mailto.

External links should open safely in a new tab where appropriate.

Use the Smokey Frame / Gooey Blob atmosphere around this section.

---

# 17. NAVIGATION

Navigation should scroll smoothly to:

PROFILE
ARMORY
INVENTIONS
CHRONICLES
CONTACT

Use existing smooth scrolling infrastructure where available.

If Lenis is already present, use it rather than introducing another scroll library.

Do not create competing smooth-scroll systems.

---

# 18. SCROLL EXPERIENCE

The site should feel like a continuous camera journey.

Sequence:

DOOM HERO

↓

SYSTEM BOOT

↓

SUBJECT PROFILE

↓

THE ARMORY

↓

DOOM'S INVENTIONS

↓

CHRONICLES

↓

COMMUNICATION CHANNEL

Use:

* Framer Motion
* existing Lenis setup
* scroll progress
* parallax
* scale
* blur
* sticky sections
* subtle perspective

Avoid excessive animations.

---

# 19. PERFORMANCE

This is critical.

The page contains:

* GLB model
* Three.js
* smoke
* particles
* animations
* multiple visual effects

Optimize aggressively.

Implement:

* GLB compression if practical
* lazy loading
* Suspense
* lower DPR on mobile
* reduced particle count on mobile
* disable expensive post-processing on low-power devices
* dispose Three.js resources
* avoid unnecessary rerenders
* memoize expensive components
* lazy-load below-the-fold 3D effects where possible

The website must remain smooth.

Target:

60 FPS on normal desktop hardware where possible.

Mobile should prioritize responsiveness over visual complexity.

---

# 20. RESPONSIVE BEHAVIOR

Desktop:

Full cinematic Doom experience.

Tablet:

Reduce:

* particles
* smoke density
* expensive effects

Mobile:

* smaller Doom model
* simpler lighting
* reduced particles
* reduced HUD elements
* stacked cards
* compact navigation
* no horizontal overflow

Do NOT remove the Doom identity on mobile.

---

# 21. ACCESSIBILITY

Implement:

* semantic HTML
* keyboard navigation
* visible focus states
* aria labels where necessary
* alt text
* reduced-motion support

If:

prefers-reduced-motion: reduce

Then:

* reduce parallax
* disable unnecessary looping animations
* reduce transitions
* keep essential UI functional

---

# 22. ERROR HANDLING

The 3D scene must fail gracefully.

If the GLB cannot load:

Do NOT leave a blank hero.

Display a fallback:

DOOM CORE
3D SYSTEM OFFLINE

and maintain the rest of the UI.

Similarly, if WebGL is unavailable, the portfolio must still work as a normal website.

---

# 23. DO NOT DESTROY EXISTING FUNCTIONALITY

Preserve useful existing functionality from the repository.

Before changing components:

Understand:

Hero
Navbar
Projects
Skills
Timeline
ThreeScene
ScrollReveal
data architecture
CSS utilities

Reuse where possible.

Do not rewrite the entire repository unnecessarily.

---

# 24. COMPONENT ARCHITECTURE

Keep components modular.

Recommended structure:

src/
components/
doom/
DoomHero.jsx
DoomModel.jsx
DoomCore.jsx
DoomHud.jsx
DoomPanel.jsx
SystemBoot.jsx
ArchiveCard.jsx
ProjectDossier.jsx
SkillModule.jsx
DoomTimeline.jsx

Use existing project conventions if they differ.

Do not duplicate utilities.

---

# 25. DATA ARCHITECTURE

The following must remain the source of truth:

src/data/portfolio.json

Components should receive data as props or access the centralized data through the existing architecture.

Never create separate hardcoded copies of:

projects
skills
timeline
contact
achievements
stats

---

# 26. VISUAL QUALITY BAR

This should NOT look like:

"AI generated portfolio template."

It should feel intentionally art-directed.

Every element must answer:

Why does this exist in Doom's archive?

Use:

* technical labels
* brass accents
* gunmetal panels
* emerald energy
* subtle noise
* atmospheric lighting
* controlled depth
* precise typography

Avoid visual clutter.

---

# 27. FINAL TESTING

Before finishing:

Test:

Desktop Chrome
Desktop Edge
Mobile viewport
Tablet viewport

Check:

* no horizontal overflow
* no console errors
* GLB loads
* fallback works
* navigation works
* projects open
* GitHub links work
* LinkedIn works
* email works
* LeetCode works
* animations don't break scrolling
* reduced-motion works
* mobile performance is acceptable

Run the production build.

Fix all build errors.

Fix all runtime errors.

---

# FINAL OBJECTIVE

Transform the existing portfolio into:

DOOM // LATVERIAN ARCHIVE

It should feel like the user has entered a living technological archive belonging to Doctor Doom.

The portfolio content remains Afsal Ahmed Khan A's real portfolio.

The Doctor Doom theme is the visual world surrounding that content.

Preserve the information architecture.

Upgrade the experience.

Make the 3D character, archive UI, emerald energy, smoke, technical HUDs and scroll interactions feel like one cohesive system.

Do not simply recolor the existing portfolio.

This should feel like a complete visual transformation while preserving the existing portfolio's data and functionality.
