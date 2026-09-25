import React, { Suspense, useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { LatverianCore } from './LatverianCore';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface DoomModelProps {
  modelPath?: string;
}

const GLBViewer: React.FC<{ modelPath: string; reducedMotion: boolean }> = ({ modelPath }) => {
  const { scene } = useGLTF(modelPath);
  return (
    <primitive
      object={scene}
      scale={1.8}
      position={[0, -1.8, 0]}
    />
  );
};

export const DoomModel: React.FC<DoomModelProps> = ({ modelPath = '/models/doctor-doom.glb' }) => {
  const [modelExists, setModelExists] = useState<boolean | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Check if GLB file actually exists in public directory before trying to parse
    fetch(modelPath, { method: 'HEAD' })
      .then((res) => {
        if (res.ok && res.headers.get('content-type')?.includes('octet-stream')) {
          setModelExists(true);
        } else {
          setModelExists(false);
        }
      })
      .catch(() => {
        setModelExists(false);
      });
  }, [modelPath]);

  // If model is confirmed available, load GLTF in Suspense with LatverianCore fallback
  if (modelExists === true) {
    return (
      <Suspense fallback={<LatverianCore reducedMotion={prefersReducedMotion} />}>
        <GLBViewer modelPath={modelPath} reducedMotion={prefersReducedMotion} />
      </Suspense>
    );
  }

  // Default procedural 3D centerpiece
  return <LatverianCore reducedMotion={prefersReducedMotion} />;
};
