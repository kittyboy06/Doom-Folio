# DOCTOR DOOM // LATVERIAN ARCHIVE — 3D DEVELOPER PORTFOLIO

> *"A developer's portfolio hidden inside Doctor Doom's private Latverian technological archive."*

[![React 19](https://img.shields.io/badge/React-19.0-235C3A.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-173D28.svg)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-R3F-62D58A.svg)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-B8954A.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/Security-Classified-D5B968.svg)]()

---

## 🏛️ Overview

A cinematic, interactive 3D developer portfolio engineered for **Afsal Ahmed Khan A**. Styled as a classified personnel dossier deep within Doctor Doom's Latverian technological laboratories, this application highlights Afsal's software systems, AI cognitive architectures, Android engineering, and Unity game development achievements.

### 🎨 Visual Identity & Palette
* **Void Obsidian**: `#070908` / `#0D120F` / `#111612`
* **Latverian Emerald Energy**: `#173D28` / `#235C3A` / `#62D58A`
* **Antique Brass Accents**: `#B8954A` / `#D5B968`
* **Armor Gunmetal**: `#252A27` / `#3A403B` / `#778078`
* **Parchment Text**: `#E7E4D8` / `#858C84`

---

## ⚙️ Architecture & Features

* **3D Scene Pipeline**: Powered by React Three Fiber (`@react-three/fiber`) & `@react-three/drei`. Features a procedural Latverian Arcane Core with kinetic gyroscopic brass rings, emerald rim lighting, volumetric particles, and automatic mounting of `/models/doctor-doom.glb` if provided.
* **The 5 Specialized Widgets**:
  1. **`FlipCard`** (React Bits): 3D CSS `preserve-3d` personnel dossier card with classified statistics on the front and tactical competency matrix on the back.
  2. **`TechText`** (React Bits): Terminal character scrambler resolving from random glyphs (`01!@#$%^&*░▒▓`) into decoded military labels.
  3. **`ScrollExpand`** (React Bits): Viewport scroll-driven container transition connecting Hero into the Subject Profile.
  4. **`SmokeyFrame`** (Lightswind): WebGL/Canvas procedural turbulence smoke shader framing key tactical modules.
  5. **`AiGooeyBlob`** (Lightswind): SVG liquid metaball reactor (`feGaussianBlur` + `feColorMatrix`) powering the **Aether** cognitive core.
* **Single Source of Truth**: Centralized, immutable data pipeline driven by `src/data/portfolio.json`.
* **Resilience**: `<WebGLErrorBoundary>` gracefully falls back to a 2D holographic scanner HUD on low-power devices.
* **Accessibility**: Full support for `prefers-reduced-motion` and touch devices.

---

## 🚀 Quick Start

### Installation
```bash
npm install
```

### Local Development
```bash
npm run dev
```
Open `http://localhost:3000` to view the archive in your browser.

### Production Build
```bash
npm run build
```

---

## 📂 Project Structure

```
src/
├── assets/                  # Emblems, textures, and brand icons
├── components/
│   ├── 3d/                  # DoomCanvas, LatverianCore, DoomModel, WebGLErrorBoundary
│   ├── ui/                  # FlipCard, TechText, ScrollExpand, SmokeyFrame, AiGooeyBlob, Icons
│   ├── hud/                 # DoomPanel, DoomButton, HudLabel, SystemBadge, ProjectDossierModal
│   └── sections/            # Hero, SystemBoot, Profile, Armory, Inventions, Chronicles, Contact, Footer
├── data/
│   └── portfolio.json       # Centralized verified data
├── hooks/                   # usePortfolioData, useReducedMotion
├── types/                   # Strict TypeScript schemas
├── styles/                  # Tailwind v4 theme, scanline keyframes
├── App.tsx                  # Root layout & tactical overlay
└── main.tsx                 # DOM Entry point
```

---

## 🎖️ Subject Identification

* **Operative**: Afsal Ahmed Khan A
* **Specialization**: AIML Engineering // Jerusalem College of Engineering, Chennai
* **GitHub**: [@kittyboy06](https://github.com/kittyboy06)
* **LinkedIn**: [Afsal Ahmed Khan A](https://www.linkedin.com/in/afsal-ahmed-khan-a-9a6062332/)
* **LeetCode**: [@kittyboy06](https://leetcode.com/kittyboy06)
* **Direct Transmission**: afsalahmed2006@gmail.com
