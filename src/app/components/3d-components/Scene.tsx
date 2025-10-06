"use client";
import React, { useRef } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import Model from "./Model";

export default function Scene() {
  return (
    <Canvas shadows camera={{ position: [0, 3, 6], fov: 75 }}>
      <SceneContent />
      <OrbitControls />
    </Canvas>
  );
}

function SceneContent() {
  const { width } = useThree((state) => state.viewport);

  return (
    <group>
      <RotatingSun radius={10} speed={0.1} height={5} />
      <Stars />
      <ambientLight intensity={1.5} />
      <pointLight position={[10, 10, 10]} />
      <Stars />
      <mesh receiveShadow position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="green" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="lightblue" />
      </mesh>
      <mesh position={[0, 0, -2]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="lightgray" />
      </mesh>
      <Model
        path="/3d-assets/AnimatedRobot.glb"
        position={[-2, 0, 0]}
        scale={0.5}
      />
      <Model
        path="/3d-assets/CoolBannanaGuy.glb"
        position={[2, 0, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={0.5}
      />
    </group>
  );
}

// Rotating Sun
function RotatingSun({ radius = 10, speed = 0.1, height = 5 }) {
  const lightRef = useRef<THREE.DirectionalLight>(null);
  let angle = 0;

  useFrame((_, delta) => {
    if (lightRef.current) {
      angle += delta * speed;
      lightRef.current.position.set(
        radius * Math.cos(angle),
        height,
        radius * Math.sin(angle)
      );
      lightRef.current.lookAt(0, 0, 0);
    }
  });

  return (
    <directionalLight
      ref={lightRef}
      intensity={1}
      castShadow
      shadow-mapSize-width={1024}
      shadow-mapSize-height={1024}
    />
  );
}
