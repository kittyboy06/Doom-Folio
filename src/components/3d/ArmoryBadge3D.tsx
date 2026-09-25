import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useCanvasVisibility } from '../../hooks/useCanvasVisibility';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { WebGLErrorBoundary } from './WebGLErrorBoundary';

interface BadgeMeshProps {
  categoryName: string;
  isHovered: boolean;
  reducedMotion: boolean;
}

const BadgeMesh: React.FC<BadgeMeshProps> = ({ categoryName, isHovered, reducedMotion }) => {
  const meshRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const name = categoryName.toLowerCase();

  useFrame((_, delta) => {
    if (reducedMotion || !meshRef.current) return;

    const speedMultiplier = isHovered ? 3.0 : 1.0;
    meshRef.current.rotation.y += delta * 0.8 * speedMultiplier;
    meshRef.current.rotation.x += delta * 0.4 * speedMultiplier;

    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 1.2 * speedMultiplier;
    }
  });

  return (
    <group ref={meshRef}>
      {/* 1. Mobile */}
      {name.includes('mobile') && (
        <>
          <mesh>
            <boxGeometry args={[0.9, 1.4, 0.18]} />
            <meshStandardMaterial
              color="#161D19"
              emissive="#62D58A"
              emissiveIntensity={isHovered ? 1.6 : 0.4}
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>
          <mesh position={[0, 0, 0.1]}>
            <planeGeometry args={[0.75, 1.2]} />
            <meshStandardMaterial
              color="#070908"
              emissive="#62D58A"
              emissiveIntensity={isHovered ? 2.0 : 0.8}
            />
          </mesh>
        </>
      )}

      {/* 2. Web & PWA */}
      {name.includes('web') && (
        <>
          <mesh>
            <sphereGeometry args={[0.85, 16, 12]} />
            <meshStandardMaterial
              color="#111612"
              emissive="#62D58A"
              emissiveIntensity={isHovered ? 1.8 : 0.5}
              wireframe={true}
            />
          </mesh>
          <mesh ref={ringRef}>
            <torusGeometry args={[1.25, 0.03, 12, 36]} />
            <meshStandardMaterial
              color="#B8954A"
              emissive="#D5B968"
              emissiveIntensity={isHovered ? 1.2 : 0.3}
              metalness={0.9}
            />
          </mesh>
        </>
      )}

      {/* 3. Game Dev */}
      {name.includes('game') && (
        <>
          <mesh>
            <octahedronGeometry args={[0.9, 0]} />
            <meshStandardMaterial
              color="#252A27"
              emissive="#D5B968"
              emissiveIntensity={isHovered ? 2.0 : 0.6}
              metalness={0.95}
              roughness={0.2}
            />
          </mesh>
          <mesh>
            <octahedronGeometry args={[0.95, 0]} />
            <meshBasicMaterial
              color="#62D58A"
              wireframe={true}
              transparent
              opacity={isHovered ? 0.9 : 0.35}
            />
          </mesh>
        </>
      )}

      {/* 4. AI & Cognitive Architecture */}
      {name.includes('ai') && (
        <>
          {/* Inner core */}
          <mesh>
            <boxGeometry args={[0.65, 0.65, 0.65]} />
            <meshStandardMaterial
              color="#173D28"
              emissive="#62D58A"
              emissiveIntensity={isHovered ? 2.5 : 1.2}
              roughness={0.1}
            />
          </mesh>
          {/* Outer tesseract cage */}
          <mesh>
            <boxGeometry args={[1.05, 1.05, 1.05]} />
            <meshStandardMaterial
              color="#D5B968"
              emissive="#B8954A"
              emissiveIntensity={isHovered ? 1.4 : 0.4}
              wireframe={true}
            />
          </mesh>
        </>
      )}

      {/* 5. Languages */}
      {name.includes('languages') && (
        <>
          <mesh>
            <cylinderGeometry args={[0.8, 0.8, 0.25, 24]} />
            <meshStandardMaterial
              color="#252A27"
              emissive="#D5B968"
              emissiveIntensity={isHovered ? 1.6 : 0.4}
              metalness={0.9}
            />
          </mesh>
          <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.15, 0.025, 12, 32]} />
            <meshStandardMaterial
              color="#62D58A"
              emissive="#62D58A"
              emissiveIntensity={isHovered ? 2.0 : 0.6}
            />
          </mesh>
        </>
      )}

      {/* 6. Tools & Infrastructure */}
      {name.includes('tools') && (
        <>
          <mesh>
            <cylinderGeometry args={[0.8, 0.8, 0.35, 6]} />
            <meshStandardMaterial
              color="#3A403B"
              emissive="#778078"
              emissiveIntensity={isHovered ? 1.2 : 0.3}
              metalness={0.95}
              roughness={0.3}
            />
          </mesh>
          <mesh>
            <cylinderGeometry args={[0.45, 0.45, 0.38, 16]} />
            <meshStandardMaterial
              color="#111612"
              emissive="#62D58A"
              emissiveIntensity={isHovered ? 2.0 : 0.5}
            />
          </mesh>
        </>
      )}
    </group>
  );
};

interface ArmoryBadge3DProps {
  categoryName: string;
  isHovered?: boolean;
  className?: string;
}

export const ArmoryBadge3D: React.FC<ArmoryBadge3DProps> = ({
  categoryName,
  isHovered = false,
  className = 'w-10 h-10',
}) => {
  const { containerRef, isVisible } = useCanvasVisibility({ threshold: 0.05 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <div ref={containerRef} className={`relative select-none pointer-events-none ${className}`}>
      {isVisible ? (
        <WebGLErrorBoundary>
          <Canvas
            camera={{ position: [0, 0, 2.8], fov: 45 }}
            dpr={[1, 1.2]}
            gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
            className="w-full h-full"
          >
            <ambientLight intensity={0.8} />
            <directionalLight position={[-2, 2, 2]} color="#62D58A" intensity={2.2} />
            <directionalLight position={[2, -2, 2]} color="#D5B968" intensity={1.4} />
            <BadgeMesh
              categoryName={categoryName}
              isHovered={isHovered}
              reducedMotion={prefersReducedMotion}
            />
          </Canvas>
        </WebGLErrorBoundary>
      ) : (
        <div className="w-full h-full bg-[#111612] rounded-sm" />
      )}
    </div>
  );
};
