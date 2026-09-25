import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { useCanvasVisibility } from '../../hooks/useCanvasVisibility';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { WebGLErrorBoundary } from './WebGLErrorBoundary';

interface ArtifactMeshProps {
  category: string;
  isHovered: boolean;
  reducedMotion: boolean;
}

const ArtifactMesh: React.FC<ArtifactMeshProps> = ({ category, isHovered, reducedMotion }) => {
  const meshRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  const cat = category.toLowerCase();
  const isAI = cat.includes('ai');
  const isMobile = cat.includes('mobile') || cat.includes('cross-platform');
  const isGame = cat.includes('game') || cat.includes('unity');
  const isWeb = !isAI && !isMobile && !isGame;

  useFrame((_, delta) => {
    if (reducedMotion || !meshRef.current) return;

    const speedMultiplier = isHovered ? 2.5 : 1.0;

    // Continuous rotation
    meshRef.current.rotation.y += delta * 0.6 * speedMultiplier;
    meshRef.current.rotation.x += delta * 0.3 * speedMultiplier;

    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.8 * speedMultiplier;
      ringRef.current.rotation.x += delta * 0.4 * speedMultiplier;
    }

    if (coreRef.current) {
      const targetScale = isHovered ? 1.25 : 1.0;
      coreRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <Float
      speed={reducedMotion ? 0 : isHovered ? 4 : 2}
      rotationIntensity={reducedMotion ? 0 : 0.6}
      floatIntensity={reducedMotion ? 0 : 0.8}
    >
      <group ref={meshRef}>
        {/* 1. AI Systems: Dodecahedron + Neural Rings */}
        {isAI && (
          <>
            <mesh ref={coreRef}>
              <dodecahedronGeometry args={[1.0, 0]} />
              <meshStandardMaterial
                color="#111612"
                emissive="#62D58A"
                emissiveIntensity={isHovered ? 2.2 : 0.6}
                roughness={0.2}
                metalness={0.9}
                wireframe={false}
              />
            </mesh>
            <mesh>
              <dodecahedronGeometry args={[1.02, 0]} />
              <meshBasicMaterial
                color="#62D58A"
                wireframe={true}
                transparent
                opacity={isHovered ? 0.9 : 0.4}
              />
            </mesh>
            <mesh ref={ringRef}>
              <torusGeometry args={[1.5, 0.03, 16, 48]} />
              <meshStandardMaterial
                color="#D5B968"
                emissive="#B8954A"
                emissiveIntensity={isHovered ? 1.0 : 0.4}
                metalness={0.9}
              />
            </mesh>
          </>
        )}

        {/* 2. Mobile App: Floating Beveled Monolith Device */}
        {isMobile && (
          <>
            <mesh ref={coreRef}>
              <boxGeometry args={[1.1, 1.8, 0.18]} />
              <meshStandardMaterial
                color="#161D19"
                emissive="#235C3A"
                emissiveIntensity={isHovered ? 1.2 : 0.3}
                roughness={0.3}
                metalness={0.8}
              />
            </mesh>
            {/* Illuminated Emerald Screen Plane */}
            <mesh position={[0, 0, 0.1]}>
              <planeGeometry args={[0.95, 1.6]} />
              <meshStandardMaterial
                color="#0D120F"
                emissive="#62D58A"
                emissiveIntensity={isHovered ? 1.8 : 0.7}
                roughness={0.1}
              />
            </mesh>
            {/* Top Camera Sensor */}
            <mesh position={[0, 0.72, 0.11]}>
              <circleGeometry args={[0.04, 16]} />
              <meshBasicMaterial color="#62D58A" />
            </mesh>
          </>
        )}

        {/* 3. Unity Games: Physics Polyhedron (Icosahedron Die) */}
        {isGame && (
          <>
            <mesh ref={coreRef}>
              <icosahedronGeometry args={[1.15, 0]} />
              <meshStandardMaterial
                color="#252A27"
                emissive="#D5B968"
                emissiveIntensity={isHovered ? 1.8 : 0.4}
                roughness={0.2}
                metalness={0.95}
              />
            </mesh>
            <mesh>
              <icosahedronGeometry args={[1.17, 0]} />
              <meshBasicMaterial
                color="#D5B968"
                wireframe={true}
                transparent
                opacity={isHovered ? 0.9 : 0.35}
              />
            </mesh>
          </>
        )}

        {/* 4. Web & PWA: Interlocking Torus Knot */}
        {isWeb && (
          <>
            <mesh ref={coreRef}>
              <torusKnotGeometry args={[0.85, 0.22, 64, 16]} />
              <meshStandardMaterial
                color="#173D28"
                emissive="#62D58A"
                emissiveIntensity={isHovered ? 2.0 : 0.5}
                roughness={0.25}
                metalness={0.85}
              />
            </mesh>
            <mesh ref={ringRef}>
              <torusGeometry args={[1.4, 0.02, 16, 48]} />
              <meshStandardMaterial
                color="#B8954A"
                emissive="#D5B968"
                emissiveIntensity={isHovered ? 1.2 : 0.3}
                metalness={0.9}
              />
            </mesh>
          </>
        )}
      </group>
    </Float>
  );
};

interface ProjectArtifact3DProps {
  category: string;
  className?: string;
  isHovered?: boolean;
}

export const ProjectArtifact3D: React.FC<ProjectArtifact3DProps> = ({
  category,
  className = 'w-full h-40',
  isHovered = false,
}) => {
  const { containerRef, isVisible } = useCanvasVisibility({ threshold: 0.05 });
  const prefersReducedMotion = useReducedMotion();
  const [internalHover, setInternalHover] = useState(false);

  const activeHover = isHovered || internalHover;

  return (
    <div
      ref={containerRef}
      className={`relative select-none pointer-events-auto ${className}`}
      onMouseEnter={() => setInternalHover(true)}
      onMouseLeave={() => setInternalHover(false)}
    >
      {isVisible ? (
        <WebGLErrorBoundary>
          <Canvas
            camera={{ position: [0, 0, 3.8], fov: 45 }}
            dpr={[1, 1.4]}
            gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
            className="w-full h-full"
          >
            <ambientLight intensity={0.7} />
            <directionalLight position={[-3, 3, 2]} color="#62D58A" intensity={2.6} />
            <directionalLight position={[3, -2, 2]} color="#D5B968" intensity={1.5} />
            <ArtifactMesh
              category={category}
              isHovered={activeHover}
              reducedMotion={prefersReducedMotion}
            />
          </Canvas>
        </WebGLErrorBoundary>
      ) : (
        <div className="w-full h-full bg-[#111612]/30 border border-[#1E2821]/40 rounded-sm" />
      )}
    </div>
  );
};
