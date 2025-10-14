"use client";
import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import * as THREE from "three";

// Custom created components
import LightSetup from "./Lighting/LightSetup";
import EnvironmentSetup from "./Lighting/EnvironmentSetup";
import Model from "./Models/Model";
import FPSWatcher from "./Performance/FPSWatcher";
import PerformancePanel from "./Performance/PerformancePanel";

// Main 3D Scene component, this is where the 3D "lives"
export default function Scene() {
  // dynamic performance settings to balance quality and performance
  // Dpr is "device pixel ratio" (higher = sharper look, but more performance heavy).
  const [degraded, setDegraded] = useState(false);
  const [dpr, setDpr] = useState(2);

  const minimumFPS = 30; // less than this and we consider performance to be poor.
  const duration = 3; // the duration (in seconds) that the performance can be poor before we switch to 2D.

  return (
    // Canvas is the scene container from react-three-fiber lib, it's the world where all 3D objects are rendered.
    // Camera and WebGL context (gl) are configured in the Canvas props.
    <Canvas
      shadows
      dpr={dpr}
      camera={{ position: [0, 4, 15], fov: 75, near: 0.1, far: 50 }}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        alpha: true,
        stencil: false,
        depth: true,
        logarithmicDepthBuffer: true,
      }}
      style={{ background: "transparent" }}
      onCreated={({ gl }) => {
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1;
        gl.setClearColor(new THREE.Color("#000000"), 0);
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
      }}
    >
      {/* Environment and Lighting Setup */}
      <EnvironmentSetup degraded={degraded} />
      <LightSetup degraded={degraded} />

      {/* Models in the Scene */}
      <Model
        path="/3d-assets/AnimatedRobot.glb"
        position={[0, 0, 10]}
        scale={1}
      />

      {/* Performance Monitor to adjust settings based on performance */}
      {/* onDecline: when performance drops, we set degraded to true to reduce quality */}
      {/* onIncline: when performance improves, we set degraded to false to increase quality */}
      {/* onFallback: if performance is very low, we set dpr to 1 to improve performance */}
      {/* These settings can be adjusted based on the desired performance and quality balance */}
      {/* More info: https://docs.pmnd.rs/drei/performance/performancemonitor */}
      <PerformanceMonitor
        onDecline={() => setDegraded(false)}
        onIncline={() => setDegraded(false)}
        onFallback={() => setDpr(1)}
      />
      {/* PerformanceMonitor will try to balance and get a stable fps, FPSWatcher will handle the kill-switch to 2D */}
      {/* *threshold* is minimum fps and *duration* is how long it needs to be below threshold to trigger */}
      <FPSWatcher threshold={minimumFPS} duration={duration} />

      {/* !DEBUG! Performance Panel to display performance metrics for debugging and optimization */}
      <PerformancePanel />
    </Canvas>
  );
}
