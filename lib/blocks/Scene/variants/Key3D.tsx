"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, Suspense } from "react";
import * as THREE from "three";

function Pyramids() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!groupRef.current) return;
    const targetX = state.pointer.x * 1.5;
    const targetY = state.pointer.y * 1.0;
    const scrollY = window.scrollY * 0.002;
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY + scrollY, 0.05);
  });

  return (
    <group ref={groupRef} position={[0, -2, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#c2a77a" roughness={0.9} />
      </mesh>
      <mesh position={[0, 2, -2]} rotation={[0, Math.PI / 4, 0]} castShadow receiveShadow>
        <coneGeometry args={[3, 5, 4]} />
        <meshStandardMaterial color="#8b7355" flatShading />
      </mesh>
      <mesh position={[-6, 1, -8]} rotation={[0, Math.PI / 4, 0]} castShadow receiveShadow>
        <coneGeometry args={[2.5, 4, 4]} />
        <meshStandardMaterial color="#7a6245" flatShading />
      </mesh>
      <mesh position={[7, 0.5, -12]} rotation={[0, Math.PI / 4, 0]} castShadow receiveShadow>
        <coneGeometry args={[2, 3.5, 4]} />
        <meshStandardMaterial color="#6b5337" flatShading />
      </mesh>
    </group>
  );
}

export function Key3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 3, 10], fov: 60 }} dpr={[1, 1.5]} shadows style={{ pointerEvents: 'none' }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 10, 5]} intensity={2} color="#ffaa55" castShadow shadow-mapSize={[1024, 1024]} />
        <fog attach="fog" args={["#0a0a0f", 15, 45]} />
        <Suspense fallback={null}><Pyramids /></Suspense>
      </Canvas>
    </div>
  );
}