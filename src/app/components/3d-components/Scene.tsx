"use client";
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Stars,
  PerformanceMonitor,
  Environment,
} from "@react-three/drei";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { HDRLoader } from "three/examples/jsm/Addons.js";
import Model from "./Model";

export default function Scene() {
  const [dpr, setDpr] = useState(1.5);
  return (
    <Canvas shadows camera={{ position: [0, 3, 6], fov: 75 }}>
      <SceneContent />
      <OrbitControls />

      <PerformanceMonitor
        bounds={(refreshRate) => (refreshRate > 90 ? [50, 90] : [50, 60])}
        onIncline={({ factor }) => setDpr(Math.min(2, 1 + factor))}
        onDecline={({ factor }) => setDpr(Math.max(1, 1 - factor))}
        onChange={({ factor }) => setDpr(Math.floor(0.5 + 1.5 * factor))}
        flipflops={3}
        onFallback={() => setDpr(1)}
      />
    </Canvas>
  );
}

function SceneContent() {
  const { scene } = useThree();

  // const hololonight = "/3d-assets/dikhololo_night_1k.hdr";
  // const citysunset = "/3d-assets/city.hdr";
  // const lakeside = "/3d-assets/lakeside_sunrise_1k.hdr";
  // const photostudio = "/3d-assets/blue_photo_studio_1k.hdr";
  // const metronoord = "/3d-assets/metro_noord_1k.hdr";
  // const sunset = "/3d-assets/qwantani_sunset_puresky_1k.hdr";
  // React.useEffect(() => {
  //   const loader = new HDRLoader();
  //   loader.load(
  //     sunset,
  //     (texture) => {
  //       texture.mapping = THREE.EquirectangularReflectionMapping;
  //       scene.environment = texture;
  //     },
  //     undefined,
  //     (error) => {
  //       console.error("Error loading HDR texture:", error);
  //     }
  //   );
  // }, [scene]);

  return (
    <group>
      <directionalLight
        intensity={1}
        castShadow
        position={[5, 10, 5]}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />
      ;
      <Stars />
      <ambientLight intensity={1.1} />
      <pointLight position={[10, 10, 10]} />
      <mesh receiveShadow position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="green" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="gray" />
      </mesh>
      <mesh position={[0, 0, -2]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="gray" />
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
