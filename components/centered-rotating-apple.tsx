'use client';

import React, { useRef, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const ROTATION_SPEED = 0.5;
const APPLE_BODY_POSITION = [0, -0.5, 0] as const;
const APPLE_STEM_POSITION = [0, 0.5, 0] as const;

const Apple: React.FC = React.memo(() => {
  const appleRef = useRef<THREE.Group>(null);
  const rotateApple = useCallback((delta: number) => {
    if (appleRef.current) {
      appleRef.current.rotation.y += delta * ROTATION_SPEED;
    }
  }, []);

  useFrame((_, delta) => rotateApple(delta));

  return (
    <group ref={appleRef}>
      {/* りんごの本体 */}
      <mesh position={APPLE_BODY_POSITION}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="red" wireframe={true} />
      </mesh>
      
      {/* りんごの茎 */}
      <mesh position={APPLE_STEM_POSITION}>
        <cylinderGeometry args={[0.1, 0.1, 0.3, 8]} />
        <meshBasicMaterial color="brown" wireframe={true} />
      </mesh>
    </group>
  );
});

Apple.displayName = 'Apple'

export function CenteredRotatingApple(): React.JSX.Element {
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <Apple />
        <OrbitControls 
          enableDamping={false}
          enablePan={true}
          panSpeed={0.5}
          rotateSpeed={0.5}
          zoomSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
