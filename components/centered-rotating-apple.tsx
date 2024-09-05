'use client'

import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function Apple() {
  const appleRef = useRef()
  
  useFrame((state, delta) => {
    if (appleRef.current) {
      appleRef.current.rotation.y += delta * 0.5
    }
  })

  return (
    <group ref={appleRef}>
      {/* りんごの本体 */}
      <mesh position={[0, -0.5, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="red" wireframe={true} />
      </mesh>
      
      {/* りんごの茎 */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.3, 8]} />
        <meshBasicMaterial color="brown" wireframe={true} />
      </mesh>
    </group>
  )
}

export function CenteredRotatingApple() {
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
  )
}