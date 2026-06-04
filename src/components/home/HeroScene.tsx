'use client';

import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import { Suspense } from 'react';

function FloatingShape({ position, color, speed = 1, scale = 1 }: { position: [number, number, number]; color: string; speed?: number; scale?: number }) {
  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={2}>
      <mesh position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial color={color} distort={0.3} speed={2} roughness={0.2} metalness={0.8} />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#6C2BD9" />
      <FloatingShape position={[-3, 1, -2]} color="#6C2BD9" speed={1.5} scale={0.8} />
      <FloatingShape position={[3, -1, -3]} color="#2563EB" speed={1.2} scale={0.6} />
      <FloatingShape position={[0, 2, -4]} color="#10B981" speed={1} scale={0.5} />
      <FloatingShape position={[-2, -2, -2]} color="#F59E0B" speed={1.8} scale={0.4} />
      <FloatingShape position={[2.5, 1.5, -1]} color="#8B5CF6" speed={1.3} scale={0.7} />
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Suspense fallback={null}>
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
}

