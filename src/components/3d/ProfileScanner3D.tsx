import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useCanvasVisibility } from '../../hooks/useCanvasVisibility';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { WebGLErrorBoundary } from './WebGLErrorBoundary';

interface ScannerMeshProps {
  reducedMotion: boolean;
}

const ScannerMesh: React.FC<ScannerMeshProps> = ({ reducedMotion }) => {
  const crestRef = useRef<THREE.Group>(null);
  const laserRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (reducedMotion) return;

    const time = state.clock.getElapsedTime();

    // Subtle breathing rotation
    if (crestRef.current) {
      crestRef.current.rotation.y = Math.sin(time * 1.2) * 0.45;
      crestRef.current.rotation.x = Math.cos(time * 0.8) * 0.15;
    }

    // Oscillating vertical emerald laser scanner plane
    if (laserRef.current) {
      laserRef.current.position.y = Math.sin(time * 3.0) * 1.1;
    }

    // Outer kinetic reticle ring
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.5;
    }
  });

  return (
    <group>
      {/* 3D Crest Pedestal Base */}
      <mesh position={[0, -1.5, 0]}>
        <cylinderGeometry args={[1.4, 1.6, 0.25, 32]} />
        <meshStandardMaterial
          color="#0D120F"
          emissive="#173D28"
          emissiveIntensity={0.6}
          roughness={0.4}
          metalness={0.9}
        />
      </mesh>

      {/* Kinetic Base Ring */}
      <mesh ref={ringRef} position={[0, -1.35, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.025, 16, 48]} />
        <meshStandardMaterial
          color="#B8954A"
          emissive="#D5B968"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Floating 3D Sovereign Shield Emblem */}
      <group ref={crestRef} position={[0, 0, 0]}>
        {/* Central Shield Body */}
        <mesh>
          <octahedronGeometry args={[1.0, 1]} />
          <meshStandardMaterial
            color="#252A27"
            emissive="#235C3A"
            emissiveIntensity={0.7}
            metalness={0.95}
            roughness={0.2}
          />
        </mesh>

        {/* Shield Wireframe Grid */}
        <mesh>
          <octahedronGeometry args={[1.02, 1]} />
          <meshBasicMaterial
            color="#62D58A"
            wireframe={true}
            transparent
            opacity={0.65}
          />
        </mesh>

        {/* Inner Glowing Core Specimen */}
        <mesh>
          <sphereGeometry args={[0.35, 16, 16]} />
          <meshStandardMaterial
            color="#62D58A"
            emissive="#62D58A"
            emissiveIntensity={2.5}
          />
        </mesh>
      </group>

      {/* Volumetric Emerald Laser Scan Line */}
      <mesh ref={laserRef}>
        <planeGeometry args={[2.6, 0.05]} />
        <meshBasicMaterial
          color="#62D58A"
          transparent
          opacity={0.9}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

export const ProfileScanner3D: React.FC = () => {
  const { containerRef, isVisible } = useCanvasVisibility({ threshold: 0.05 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[260px] bg-[#0D120F]/90 border border-[#235C3A]/60 rounded-sm p-3 shadow-xl overflow-hidden"
    >
      {/* Scanner Telemetry Overlay */}
      <div className="absolute top-2.5 left-3 z-10 flex items-center gap-2 text-[10px] font-mono text-[#62D58A]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#62D58A] animate-ping" />
        <span>BIOMETRIC SCANNER // ACTIVE</span>
      </div>

      <div className="absolute top-2.5 right-3 z-10 text-[9px] font-mono text-[#D5B968] bg-[#B8954A]/10 px-2 py-0.5 border border-[#B8954A]/30">
        MATCH: 99.98%
      </div>

      <div className="absolute bottom-2.5 left-3 z-10 text-[9px] font-mono text-[#778078]">
        CLEARANCE: OMEGA-CITIZEN
      </div>

      <div className="absolute bottom-2.5 right-3 z-10 text-[9px] font-mono text-[#62D58A]">
        SYS.AUTH // GRANTED
      </div>

      {/* 3D Canvas */}
      {isVisible ? (
        <WebGLErrorBoundary>
          <Canvas
            camera={{ position: [0, 0.2, 4.2], fov: 45 }}
            dpr={[1, 1.3]}
            gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
            className="w-full h-full"
          >
            <ambientLight intensity={0.7} />
            <directionalLight position={[-3, 3, 2]} color="#62D58A" intensity={3.0} />
            <directionalLight position={[3, 2, 3]} color="#D5B968" intensity={1.5} />
            <ScannerMesh reducedMotion={prefersReducedMotion} />
          </Canvas>
        </WebGLErrorBoundary>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-xs font-mono text-[#778078]">
          [STANDBY MODE]
        </div>
      )}
    </div>
  );
};
