# DOCTOR DOOM // LATVERIAN ARCHIVE — 3D UPGRADE IMPLEMENTATION PLAN

## Phase 1: Viewport Lifecycle & Performance Foundation
- [ ] Create `src/hooks/useCanvasVisibility.ts` utilizing `IntersectionObserver` to track viewport entry/exit and pause render loops when off-screen.

## Phase 2: Ambient 3D Cursor-Gravity Particle Field
- [ ] Create `src/components/3d/GlobalParticleField3D.tsx`:
  * Fixed full-screen background WebGL canvas positioned at `z-0`.
  * Instanced `THREE.Points` with emerald & brass glowing motes.
  * Interactive mouse repulsion spring physics.
  * Z-axis translation synced with scroll depth.
  * Throttled to 60 particles on mobile with `prefers-reduced-motion` static fallback.

## Phase 3: Semantic 3D Project Hologram Artifacts
- [ ] Create `src/components/3d/ProjectArtifact3D.tsx`:
  * Mapped to project categories:
    - AI Systems: `NeuralTensor` (Dodecahedron + kinetic brass rings + pulsing energy nodes)
    - Mobile: `HoloDevice` (Beveled slate + illuminated emerald screen face + HUD brackets)
    - Web & PWA: `CyberTorus` (Torus Knot + orbiting kinetic data satellites)
    - Unity Games: `PhysicsPolyhedron` (Icosahedron die tumbling with momentum)
  * Wrapped in Drei's `<Float>`.
  * Raycasting hover: ramps emissive emerald glow from `0.3` to `2.2`.
- [ ] Integrate `ProjectArtifact3D` into `InventionsSection.tsx` cards and `ProjectDossierModal.tsx`.

## Phase 4: Tactical 3D Armory Badges
- [ ] Create `src/components/3d/ArmoryBadge3D.tsx`:
  * Procedural 3D tokens for the 6 skill categories:
    - Mobile: 3D beveled gunmetal tablet
    - Web & PWA: 3D wireframe geodetic sphere with orbital equator
    - Game Dev: 3D diamond octahedron with brass facets
    - AI: 3D glowing tesseract hypercube
    - Languages: 3D kinetic cipher disc
    - Tools: 3D hexagonal mechanical bolt
  * Hover acceleration from `0.5x` to `2.5x` spin with emerald rim flash.
- [ ] Integrate `ArmoryBadge3D` into each module header in `ArmorySection.tsx`.

## Phase 5: 3D Holographic Biometric Scanner
- [ ] Create `src/components/3d/ProfileScanner3D.tsx`:
  * 3D biometric pedestal with floating Latverian sovereign crest.
  * Volumetric vertical emerald laser sweep plane oscillating along the Y-axis.
  * Biometric classification HUD telemetry.
- [ ] Integrate `ProfileScanner3D` into `ProfileSection.tsx`.

## Phase 6: Integration, Verification & Git Sync
- [ ] Mount `GlobalParticleField3D` in `App.tsx`.
- [ ] Verify `npm run build` succeeds with zero errors and optimized chunk sizes.
- [ ] Commit with conventional message (`feat: integrate multi-section 3D interactions and particle physics`) and push to `origin/main`.
