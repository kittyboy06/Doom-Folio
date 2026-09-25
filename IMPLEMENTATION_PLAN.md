# DOCTOR DOOM // LATVERIAN ARCHIVE — IMPLEMENTATION PLAN

## Overview
Transform the repository into a high-craft, cinematic, production-grade 3D developer portfolio for **Afsal Ahmed Khan A**, based on the validated design in [DESIGN.md](file:///d:/Projects/Hackathon/Portfolio/DESIGN.md).

---

## Phase 1: Project Scaffolding & Tooling Foundation
- [ ] Initialize modern Vite + React 19 + TypeScript application in root.
- [ ] Configure Tailwind CSS with the Latverian theme colors:
  * Void Black: `#070908`, `#0D120F`, `#111612`
  * Doom Green: `#173D28`, `#235C3A`
  * Energy Emerald: `#62D58A`
  * Brass: `#B8954A`, `#D5B968`
  * Gunmetal: `#252A27`, `#3A403B`
  * Typography: `#E7E4D8` (primary text), `#858C84` (muted)
- [ ] Install core dependencies:
  * `three`, `@types/three`
  * `@react-three/fiber`, `@react-three/drei`
  * `framer-motion`, `lucide-react`, `clsx`, `tailwind-merge`
- [ ] Copy and link verified portfolio data from `idea/portfolio.json` into `src/data/portfolio.json`.
- [ ] Create strict TypeScript interfaces (`src/types/portfolio.ts`) and data access hook (`src/hooks/usePortfolioData.ts`).

---

## Phase 2: Core HUD & Design System Primitives
- [ ] `DoomPanel`: Gunmetal tactical panels with clipped corners, subtle emerald borders, and brass rivets.
- [ ] `DoomButton`: High-security action button with corner brackets and hover state.
- [ ] `HudLabel`: Monospace technical metadata tags with status indicator pips.
- [ ] `SystemBadge`: Security classification and category indicator badges.
- [ ] Scanline backdrop, ambient vignette, and noise texture overlays.

---

## Phase 3: The 5 Specialized UI Widgets
- [ ] `TechText` (Terminal Decryptor): Scrambles characters (`01!@#$%^&*░▒▓`) before settling into decoded text.
- [ ] `FlipCard` (Personnel Dossier): 3D CSS `preserve-3d` card with security badge on front and tactical skills matrix on back.
- [ ] `ScrollExpand` (Archive Transition): Viewport scroll-driven container linking Hero into Profile.
- [ ] `SmokeyFrame` (Atmospheric Border): WebGL/Canvas emerald smoke noise shader with subtle cursor turbulence.
- [ ] `AiGooeyBlob` (Arcane Cognitive Core): SVG liquid metaball reactor (`feGaussianBlur` + `feColorMatrix`) for the Aether showcase.

---

## Phase 4: 3D Scene Pipeline & Hero Centerpiece
- [ ] `DoomCanvas`: R3F Canvas with responsive camera, ambient light, emerald rim backlight, and brass fill.
- [ ] `LatverianCore`: Procedural 3D metallic mask, interlocking rotating kinetic brass rings, and glowing energy particle cloud.
- [ ] `DoomModel`: Asynchronous GLB loader using `useGLTF` that automatically mounts `/models/doctor-doom.glb` if found.
- [ ] `WebGLErrorBoundary`: Graceful fallback to 2D holographic scanner HUD.
- [ ] Mouse parallax and idle motion via `useFrame`.

---

## Phase 5: Content Sections Implementation
- [ ] `Navbar`: Minimal floating HUD with status beacon `● LATVERIA ONLINE`, smooth section links, and mobile drawer.
- [ ] `HeroSection`: "The Sovereign" hero with title, role rotator, actions, social links, and 3D character stage.
- [ ] `SystemBootSection`: Terminal boot sequence with `TechText` decryption.
- [ ] `ProfileSection`: Personnel dossier, metric stats (18 projects, 56 LeetCode, 8.0 CGPA), and the 3D `FlipCard`.
- [ ] `ArmorySection`: Equipment module grids for Mobile, Web/PWA, Game Dev, AI, Languages, Tools.
- [ ] `InventionsSection`: Archive of engineered projects with 3D tilt, tags, and featured `Aether` cognitive core powered by `AiGooeyBlob`.
- [ ] `ProjectDossierModal`: Fullscreen technical blueprint modal for selected project.
- [ ] `ChroniclesSection`: Vertical timeline with glowing emerald path and scroll reveals.
- [ ] `ContactSection`: Communication terminals for GitHub, LinkedIn, Email, LeetCode inside `SmokeyFrame`.
- [ ] `Footer`: Minimal military archive sign-off.

---

## Phase 6: Accessibility, Responsive Tuning & Mobile Optimization
- [ ] Reduced motion support via `prefers-reduced-motion`.
- [ ] Mobile viewport optimizations (clamped DPR, 40 particles vs 150 on desktop, touch tap-to-flip).
- [ ] Zero horizontal overflow verification.

---

## Phase 7: Verification, Production Build & Git Sync
- [ ] Verify `npm run build` succeeds with zero errors.
- [ ] Verify all external links, email mailto, and project demos work.
- [ ] Stage and push changes to `origin/main` using conventional commits.
