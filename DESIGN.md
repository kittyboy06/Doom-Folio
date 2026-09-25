# DOCTOR DOOM // LATVERIAN ARCHIVE — 3D DEVELOPER PORTFOLIO
## Comprehensive Architecture & Technical Design Specification (v2.0 — Extended 3D Interactions)

**Subject**: Afsal Ahmed Khan A  
**Classification**: AI Systems / Android / Web PWA / Unity Game Engine  
**Project**: Doom-Folio (`kittyboy06/Doom-Folio`)  
**Design Phase**: Validated Technical Design & Extended 3D Spatial Interactions  

---

## 1. Executive Understanding Summary

* **Objective**: Transform the portfolio into a living, multi-dimensional Latverian technological archive with tactile 3D interactive elements spanning every section.
* **Core 3D Expansions**:
  1. **Interactive 3D Category Artifacts** in Inventions (AI Systems, Mobile, Web, Games) with `<Float>` physics and hover raycasting.
  2. **Floating 3D Tactical Badges** in the Armory for each skill domain with kinetic orbital rings.
  3. **3D Holographic Biometric Scanner** in the Profile section with oscillating laser beam.
  4. **Ambient 3D Cursor-Gravity Particle Field** spanning the background with cursor repulsion and scroll depth.
* **Key Constraints**:
  * Guaranteed **60 FPS** across all devices using viewport-aware rendering (`useCanvasVisibility`).
  * One single draw-call for global particle fields via instanced `BufferGeometry`.
  * Strict mobile optimization: DPR clamped to `1.0–1.5`, particle counts throttled to 60, zero scroll lag.
* **Explicit Non-Goals**:
  * No heavy multi-megabyte 3D model bloat that slows down initial load time.
  * No scroll-jacking or disorienting camera movements that interfere with reading project details.
  * No unselectable 3D text replacing accessible HTML content.

---

## 2. Decision Log (Complete: D1 – D17)

| # | Decision | Alternatives Considered | Rationale |
|---|---|---|---|
| **D1** | **Scaffold Fresh React + Vite + TypeScript Project** | Importing external Lovable export; pure design spec only | Workspace currently contains only specs in `idea/`. Scaffolding a clean, modern Vite + TypeScript setup ensures zero legacy baggage and full architectural alignment. |
| **D2** | **Centralized Data via `portfolio.json`** | Hardcoded JSX components; headless CMS | Guaranteed single source of truth. Easy to update projects, stats, and links without touching component or style code. |
| **D3** | **React Three Fiber (R3F) + Drei with Procedural Fallback** | Vanilla Three.js canvas ref; Spline embed | R3F offers declarative React component lifecycle, Suspense boundaries, and native WebGL state management with zero memory leaks. |
| **D4** | **Custom Tailored Implementations for Visual Components** | External npm packages from React Bits & Lightswind | Guarantees exact Latverian emerald/brass styling, prevents dependency conflicts in React 19, and achieves optimal 60 FPS performance. |
| **D5** | **Procedural 3D Latverian Mask & Core Centerpiece** | Blocking on a manual `.glb` download; empty placeholder | The hero works immediately with a procedural 3D metallic mask & arcane reactor, and automatically hot-swaps to `public/models/doctor-doom.glb` when loaded. |
| **D6** | **Static SPA Deployment (Vercel / GitHub Pages)** | Docker container / Cloud Run service | Lightning-fast static asset delivery via CDN with zero server cost, instant global loading, and seamless GitHub Actions automated push workflow. |
| **D7** | **Approach 1: Latverian Arcane Core + R3F Canvas + Modular HUD System** | Continuous global 3D camera flight (Approach 2); 2.5D CSS-only micro-islands (Approach 3) | Delivers elite cinematic visual quality, guarantees 60 FPS performance, cleanly isolates 3D WebGL rendering from DOM layout, and provides instant responsiveness across devices. |
| **D8** | **Strict TypeScript Schema Validation for Portfolio Data** | Loose untyped JSON imports; Runtime Zod parsing | Provides compile-time type safety across all components with zero bundle size overhead. |
| **D9** | **Pure Tailwind + Framer Motion Widget Architecture** | Third-party compiled component packages | Eliminates external bundle fragility, matches the exact `#070908` / `#62D58A` / `#B8954A` palette, and ensures seamless responsive behavior. |
| **D10** | **Hybrid 3D Pipeline: Procedural Core with Automatic GLB Hot-Swap** | Hardcoded GLB dependency; 2D static image fallback | Ensures the 3D scene looks breathtaking out-of-the-box, avoids broken states if the model is absent, and seamlessly displays `doctor-doom.glb` as soon as the file is placed in `public/models/`. |
| **D11** | **Strict WebGL Error Boundary & Reduced-Motion Respect** | Silent failure; Ignoring accessibility media queries | Guarantees accessibility for motion-sensitive users and ensures the portfolio remains fully browsable even on low-end machines without WebGL. |
| **D12** | **Multi-Section 3D Expansion** | Keeping 3D restricted strictly to Hero | Deepens immersion and creates a tangible, multi-dimensional Latverian archive where every section responds to spatial user interaction. |
| **D13** | **Latverian Arcane Cybernetic 3D Aesthetic** | Photorealistic PBR metals; Monochromatic wireframe glitch | Perfectly harmonizes with the `#070908` void black, `#62D58A` emerald energy, and `#B8954A` brass palette while offering dynamic hover lighting. |
| **D14** | **Modular R3F Island Architecture with Viewport-Aware Rendering** | Single full-page canvas with Drei `<View>` portals; 2.5D CSS hybrid | Gives total DOM component independence, guarantees zero GPU waste on off-screen sections, and isolates WebGL error boundaries cleanly. |
| **D15** | **Semantic Category-Driven 3D Artifacts** | Identical generic 3D cube for all projects; Loading external GLBs for 18 projects | Procedurally generates distinctive, instant-loading 3D artifacts mapped to Afsal's 4 core disciplines (AI, Mobile, Web, Games) with zero network latency. |
| **D16** | **3D Tactical Armory Tokens & Hologram Biometric Scanner** | Static SVG icons; video loops | Replaces flat 2D icons with tangible, reactive 3D metallic artifacts, reinforcing the tactile sensation of Doom's laboratory equipment. |
| **D17** | **Fixed Background 3D Cursor-Gravity Particle Field** | 2D canvas noise; heavyweight fluid simulation | Delivers genuine 3D spatial depth that connects every section into a single unified Latverian atmospheric chamber, while keeping CPU/GPU load minimal via instanced points. |

---

## 3. Detailed 3D Component Specifications

### 3.1 `GlobalParticleField3D.tsx`
* Fixed background WebGL canvas positioned at `z-0` behind main content.
* 250 instanced glowing dust points (`THREE.Points`) with custom shader spring physics.
* Dynamic mouse repulsion: Particles within 1.5 units radius push away smoothly and lerp back into position.
* Translates on Z axis with scroll progress to produce ambient parallax.

### 3.2 `ProjectArtifact3D.tsx`
* Renders unique procedural artifacts based on project category:
  1. **AI Systems**: Rotating Dodecahedron with concentric brass data rings and pulsing emerald vertices.
  2. **Mobile Apps**: Floating gunmetal monolith with illuminated screen-plane and HUD brackets.
  3. **Web & PWA**: Interlocking Torus Knot with orbiting kinetic data satellites.
  4. **Unity Games**: Faceted Icosahedron physics die tumbling with momentum.
* Wraps in `<Float speed={2} rotationIntensity={0.6} floatIntensity={0.8}>`.
* Cursor raycasting triggers emission boost from `0.3` to `2.2`.

### 3.3 `ArmoryBadge3D.tsx`
* Kinetic 3D procedural tokens for the 6 skill modules:
  * Mobile: 3D beveled gunmetal tablet.
  * Web & PWA: 3D wireframe geodetic sphere with orbital equator.
  * Game Dev: 3D diamond octahedron with brass facets.
  * AI: 3D glowing tesseract hypercube.
  * Languages: 3D inscribed cipher disc.
  * Tools: 3D hexagonal mechanical bolt.
* Rotates continuously; accelerates and flashes emerald rim lighting upon parent card hover.

### 3.4 `ProfileScanner3D.tsx`
* 3D biometric pedestal with rotating Latverian sovereign crest.
* Volumetric vertical emerald laser sweep plane oscillating along the Y axis.
* Real-time telemetry indicators.

### 3.5 `useCanvasVisibility.ts`
* Reusable hook leveraging `IntersectionObserver` to unmount or pause off-screen 3D micro-canvases when outside of the viewport.
