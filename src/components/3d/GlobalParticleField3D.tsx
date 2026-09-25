import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { WebGLErrorBoundary } from './WebGLErrorBoundary';

interface ParticleSystemProps {
  reducedMotion: boolean;
}

const ParticleSystem: React.FC<ParticleSystemProps> = ({ reducedMotion }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const count = isMobile ? 65 : 220;

  // Track real mouse coordinates in 3D viewport space
  const mouse3D = useRef(new THREE.Vector3(999, 999, 0));

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to Three.js NDC space (-1 to +1) scaled to camera frustum
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse3D.current.set(x * 7, y * 4.5, 0);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Compute base positions and mutable positions
  const [basePositions, currentPositions, colors] = useMemo(() => {
    const base = new Float32Array(count * 3);
    const curr = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);

    const emeraldColor = new THREE.Color('#62D58A');
    const brassColor = new THREE.Color('#D5B968');
    const deepGreenColor = new THREE.Color('#173D28');

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 16;
      const y = (Math.random() - 0.5) * 12;
      const z = (Math.random() - 0.5) * 8 - 1;

      base[i * 3] = x;
      base[i * 3 + 1] = y;
      base[i * 3 + 2] = z;

      curr[i * 3] = x;
      curr[i * 3 + 1] = y;
      curr[i * 3 + 2] = z;

      // Color distribution (70% emerald, 20% brass, 10% deep green)
      const rand = Math.random();
      const col = rand > 0.8 ? brassColor : rand > 0.1 ? emeraldColor : deepGreenColor;
      cols[i * 3] = col.r;
      cols[i * 3 + 1] = col.g;
      cols[i * 3 + 2] = col.b;
    }

    return [base, curr, cols];
  }, [count]);

  useFrame((state) => {
    if (reducedMotion || !pointsRef.current) return;

    const time = state.clock.getElapsedTime();
    const positionAttribute = pointsRef.current.geometry.attributes.position;
    const array = positionAttribute.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const bx = basePositions[idx];
      const by = basePositions[idx + 1] + Math.sin(time * 0.8 + i) * 0.25;
      const bz = basePositions[idx + 2];

      // Distance from particle to mouse in 3D
      const dx = array[idx] - mouse3D.current.x;
      const dy = array[idx + 1] - mouse3D.current.y;
      const dist = Math.hypot(dx, dy);

      if (dist < 2.5 && dist > 0.01) {
        // Dynamic mouse repulsion force
        const force = (1 - dist / 2.5) * 0.45;
        array[idx] += (dx / dist) * force;
        array[idx + 1] += (dy / dist) * force;
      } else {
        // Smooth spring lerp back to resting base position
        array[idx] = THREE.MathUtils.lerp(array[idx], bx, 0.04);
        array[idx + 1] = THREE.MathUtils.lerp(array[idx + 1], by, 0.04);
      }

      array[idx + 2] = bz;
    }

    positionAttribute.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[currentPositions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.045 : 0.065}
        vertexColors
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export const GlobalParticleField3D: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <WebGLErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 6], fov: 60 }}
          dpr={[1, typeof window !== 'undefined' && window.innerWidth < 768 ? 1.0 : 1.4]}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: 'low-power',
          }}
          className="w-full h-full"
        >
          <ParticleSystem reducedMotion={prefersReducedMotion} />
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
};
