import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface LatverianCoreProps {
  reducedMotion?: boolean;
}

export const LatverianCore: React.FC<LatverianCoreProps> = ({ reducedMotion = false }) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Procedural glowing particle cloud
  const particleCount = 70;
  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const sca = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      const radius = 1.4 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      sca[i] = Math.random() * 0.8 + 0.2;
    }
    return [pos, sca];
  }, [particleCount]);

  useFrame((state, delta) => {
    if (reducedMotion) return;

    const time = state.clock.getElapsedTime();

    // Subtle pointer parallax tilt
    if (groupRef.current) {
      const targetRotX = state.pointer.y * 0.35;
      const targetRotY = state.pointer.x * 0.45;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
      groupRef.current.position.y = Math.sin(time * 1.5) * 0.1;
    }

    // Central core pulse
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.4;
      coreRef.current.rotation.z += delta * 0.2;
      const pulse = 1 + Math.sin(time * 3) * 0.06;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }

    // Gyroscopic brass rings rotation
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.5;
      ring1Ref.current.rotation.y += delta * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.6;
      ring2Ref.current.rotation.z += delta * 0.4;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z += delta * 0.3;
      ring3Ref.current.rotation.x -= delta * 0.4;
    }

    // Particle cloud slow drift
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Faceted Gunmetal Mask / Artifact */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[1.1, 1]} />
        <meshStandardMaterial
          color="#252A27"
          roughness={0.25}
          metalness={0.9}
          emissive="#173D28"
          emissiveIntensity={0.6}
          wireframe={false}
        />
      </mesh>

      {/* Inner Glowing Emerald Nucleus */}
      <mesh>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial
          color="#62D58A"
          emissive="#62D58A"
          emissiveIntensity={2.5}
          roughness={0.1}
          metalness={0.2}
        />
      </mesh>

      {/* Kinetic Brass Ring 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.65, 0.035, 16, 64]} />
        <meshStandardMaterial
          color="#B8954A"
          emissive="#D5B968"
          emissiveIntensity={0.3}
          metalness={0.95}
          roughness={0.2}
        />
      </mesh>

      {/* Kinetic Brass Ring 2 */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.9, 0.025, 16, 64]} />
        <meshStandardMaterial
          color="#D5B968"
          emissive="#B8954A"
          emissiveIntensity={0.25}
          metalness={0.9}
          roughness={0.25}
        />
      </mesh>

      {/* Kinetic Gunmetal Outer Ring 3 */}
      <mesh ref={ring3Ref}>
        <torusGeometry args={[2.15, 0.03, 16, 64]} />
        <meshStandardMaterial
          color="#3A403B"
          emissive="#173D28"
          emissiveIntensity={0.4}
          metalness={0.85}
          roughness={0.35}
        />
      </mesh>

      {/* Floating Emerald Energy Dust Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#62D58A"
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};
