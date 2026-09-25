import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { WebGLErrorBoundary } from './WebGLErrorBoundary';
import { DoomModel } from './DoomModel';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface DoomCanvasProps {
  className?: string;
  enableControls?: boolean;
}

export const DoomCanvas: React.FC<DoomCanvasProps> = ({
  className = 'w-full h-full min-h-[380px]',
  enableControls = true,
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={`relative ${className}`}>
      <WebGLErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, typeof window !== 'undefined' && window.innerWidth < 768 ? 1.2 : 1.8]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          className="w-full h-full"
        >
          {/* Lighting Rig */}
          <ambientLight color="#0D120F" intensity={0.8} />

          {/* Emerald Rim Backlight */}
          <directionalLight
            position={[-4, 4, -3]}
            color="#62D58A"
            intensity={3.5}
          />

          {/* Warm Brass Front Key Light */}
          <directionalLight
            position={[3, 3, 4]}
            color="#D5B968"
            intensity={1.8}
          />

          {/* Deep Gunmetal Bottom Fill */}
          <directionalLight
            position={[0, -3, 2]}
            color="#173D28"
            intensity={1.2}
          />

          {/* Core Specimen */}
          <DoomModel />

          {/* Smooth Damped Orbit Controls */}
          {enableControls && !prefersReducedMotion && (
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              maxPolarAngle={Math.PI / 1.7}
              minPolarAngle={Math.PI / 2.5}
              maxAzimuthAngle={Math.PI / 4}
              minAzimuthAngle={-Math.PI / 4}
              dampingFactor={0.06}
              rotateSpeed={0.5}
            />
          )}
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
};
