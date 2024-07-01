'use client'

import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Box } from '@react-three/drei'
import * as THREE from 'three'

function CubePiece({ position, color }: { position: [number, number, number], color: string }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <Box
      ref={meshRef}
      position={position}
      args={[0.9, 0.9, 0.9]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.1 : 1}
    >
      <meshStandardMaterial
        color={color}
        metalness={0.1}
        roughness={0.2}
        emissive={hovered ? color : '#000000'}
        emissiveIntensity={hovered ? 0.2 : 0}
      />
    </Box>
  )
}

function RubikCubeModel() {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.3
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  const colors = {
    front: '#ff6b6b',   // Red
    back: '#ffa500',    // Orange
    right: '#4ecdc4',   // Cyan
    left: '#45b7d1',    // Blue
    top: '#96ceb4',     // Green
    bottom: '#ffeaa7',  // Yellow
  }

  const pieces = []
  
  // Generate 3x3x3 cube pieces
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        let color = '#333333' // Default dark color for inner pieces
        
        // Assign colors based on face visibility
        if (x === 1) color = colors.right
        else if (x === -1) color = colors.left
        else if (y === 1) color = colors.top
        else if (y === -1) color = colors.bottom
        else if (z === 1) color = colors.front
        else if (z === -1) color = colors.back
        
        pieces.push(
          <CubePiece
            key={`${x}-${y}-${z}`}
            position={[x * 1.1, y * 1.1, z * 1.1]}
            color={color}
          />
        )
      }
    }
  }

  return (
    <group ref={groupRef}>
      {pieces}
    </group>
  )
}

export function RubikCube3D() {
  return (
    <div className="w-80 h-80 lg:w-96 lg:h-96">
      <Canvas
        camera={{ position: [5, 5, 5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <RubikCubeModel />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1}
        />
      </Canvas>
    </div>
  )
}