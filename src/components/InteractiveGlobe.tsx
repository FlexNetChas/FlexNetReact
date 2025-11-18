"use client";

import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

// Uppdaterad färgpalett för att matcha footern
const colors = {
  background: 0x0e1624, // Matchar footer bakgrund
  primary: 0x99e2f7,
  secondary: 0x141e31,
  accent: 0xbd51c5,
  success: 0x4ade80,
  warning: 0xfbbf24,
};

interface InteractiveGlobeProps {
  className?: string;
}

export function InteractiveGlobe({ className }: InteractiveGlobeProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const globeGroupRef = useRef<THREE.Group | null>(null);
  const frameRef = useRef<number>(0);

  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const rotationSpeedRef = useRef({ x: 0, y: 0 });

  const [isMounted, setIsMounted] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    if (!mountRef.current) return;

    let mountElement = mountRef.current;
    let renderer: THREE.WebGLRenderer | null = null;

    try {
      // Scene setup
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(colors.background);
      sceneRef.current = scene;

      // Camera setup
      const camera = new THREE.PerspectiveCamera(
        30,
        mountElement.clientWidth / mountElement.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 3.2;
      cameraRef.current = camera;

      // Renderer setup
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
      });
      renderer.setSize(mountElement.clientWidth, mountElement.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      rendererRef.current = renderer;

      // Clear erlier canvas elements to prevent duplicates
      if (mountElement.children.length > 0) {
        const children = Array.from(mountElement.children);
        for (const child of children) {
          if (child.tagName === "CANVAS") {
            mountElement.removeChild(child);
          }
        }
      }
      mountElement.appendChild(renderer.domElement);

      // Lightings configuration
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);

      const mainLight = new THREE.DirectionalLight(colors.primary, 1.0);
      mainLight.position.set(2, 1, 2);
      scene.add(mainLight);

      const fillLight = new THREE.DirectionalLight(0x4466aa, 0.3);
      fillLight.position.set(-2, -0.5, -1);
      scene.add(fillLight);

      const backLight = new THREE.DirectionalLight(colors.accent, 0.2);
      backLight.position.set(0, 0, -2);
      scene.add(backLight);

      // Create a group for the entire globe system
      const globeGroup = new THREE.Group();
      globeGroupRef.current = globeGroup;
      scene.add(globeGroup);

      // Scale down or up the globe group
      globeGroup.scale.set(0.8, 0.8, 0.8);

      // Atmospheric subitle glow for the globe
      const atmosphereGeometry = new THREE.SphereGeometry(0.8, 24, 24);
      const atmosphereMaterial = new THREE.MeshBasicMaterial({
        color: colors.primary,
        transparent: true,
        opacity: 0.01,
        side: THREE.BackSide,
      });
      const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
      globeGroup.add(atmosphere);

      // Wireframe that wraps the globe
      const wireframeGeometry = new THREE.SphereGeometry(0.7, 12, 12);
      const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: colors.accent,
        wireframe: true,
        transparent: true,
        opacity: 0.15,
      });
      const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
      globeGroup.add(wireframe);

      // Particles configuration
      const particleCount = 100;
      const particlesGeometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);
      const colorsArray = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const radius = 1.2 + Math.random() * 0.6;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = radius * Math.cos(phi);

        sizes[i] = Math.random() * 0.02 + 0.005;

        const colorChoice = Math.random();
        if (colorChoice < 0.7) {
          colorsArray[i3] = 0.6;
          colorsArray[i3 + 1] = 0.9;
          colorsArray[i3 + 2] = 0.97;
        } else if (colorChoice < 0.85) {
          colorsArray[i3] = 0.74;
          colorsArray[i3 + 1] = 0.32;
          colorsArray[i3 + 2] = 0.77;
        } else {
          colorsArray[i3] = 0.29;
          colorsArray[i3 + 1] = 0.87;
          colorsArray[i3 + 2] = 0.5;
        }
      }

      particlesGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      particlesGeometry.setAttribute(
        "size",
        new THREE.BufferAttribute(sizes, 1)
      );
      particlesGeometry.setAttribute(
        "color",
        new THREE.BufferAttribute(colorsArray, 3)
      );

      // Configure particle material size and opacity
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        transparent: true,
        opacity: 0.4,
        vertexColors: true,
        sizeAttenuation: true,
      });

      const particles = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particles);

      // Mouse event handlers
      const handleMouseDown = (event: MouseEvent) => {
        if (event.button === 0) {
          isDraggingRef.current = true;
          previousMousePositionRef.current = {
            x: event.clientX,
            y: event.clientY,
          };
          mountElement.style.cursor = "grabbing";
        }
      };

      const handleMouseMove = (event: MouseEvent) => {
        if (!isDraggingRef.current || !globeGroupRef.current) return;

        const deltaX = event.clientX - previousMousePositionRef.current.x;
        const deltaY = event.clientY - previousMousePositionRef.current.y;

        rotationSpeedRef.current = {
          x: deltaY * 0.01,
          y: deltaX * 0.01,
        };

        globeGroupRef.current.rotation.y += deltaX * 0.01;
        globeGroupRef.current.rotation.x += deltaY * 0.01;

        globeGroupRef.current.rotation.x = Math.max(
          -Math.PI / 2,
          Math.min(Math.PI / 2, globeGroupRef.current.rotation.x)
        );

        previousMousePositionRef.current = {
          x: event.clientX,
          y: event.clientY,
        };
      };

      const handleMouseUp = (event: MouseEvent) => {
        if (event.button === 0) {
          isDraggingRef.current = false;
          mountElement.style.cursor = "grab";
        }
      };

      const handleMouseEnter = () => {
        if (!isDraggingRef.current) {
          mountElement.style.cursor = "grab";
        }
      };

      const handleMouseLeave = () => {
        isDraggingRef.current = false;
        mountElement.style.cursor = "default";
      };

      mountElement.addEventListener("mousedown", handleMouseDown);
      mountElement.addEventListener("mousemove", handleMouseMove);
      mountElement.addEventListener("mouseup", handleMouseUp);
      mountElement.addEventListener("mouseenter", handleMouseEnter);
      mountElement.addEventListener("mouseleave", handleMouseLeave);
      mountElement.style.cursor = "grab";

      // Animation
      const clock = new THREE.Clock();

      const animate = () => {
        frameRef.current = requestAnimationFrame(animate);

        const delta = clock.getDelta();
        const time = clock.getElapsedTime();

        if (!isDraggingRef.current && globeGroupRef.current) {
          const inertiaFactor = 0.95;

          globeGroupRef.current.rotation.y += rotationSpeedRef.current.y;
          globeGroupRef.current.rotation.x += rotationSpeedRef.current.x;

          rotationSpeedRef.current.x *= inertiaFactor;
          rotationSpeedRef.current.y *= inertiaFactor;

          if (Math.abs(rotationSpeedRef.current.y) < 0.001) {
            globeGroupRef.current.rotation.y += delta * 0.05;
          }
        }

        particles.rotation.y = time * 0.05;

        // Pulsating globe effect
        if (globeGroupRef.current) {
          const scale = 0.8 + Math.sin(time * 1.5) * 0.02;
          globeGroupRef.current.scale.set(scale, scale, scale);
        }

        // Globe rotation speed
        atmosphere.rotation.y = time * 0.05;

        if (renderer && scene && camera) {
          renderer.render(scene, camera);
        }
      };

      animate();

      const handleResize = () => {
        if (!mountElement || !camera || !renderer) return;

        camera.aspect = mountElement.clientWidth / mountElement.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mountElement.clientWidth, mountElement.clientHeight);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);

        if (mountElement) {
          mountElement.removeEventListener("mousedown", handleMouseDown);
          mountElement.removeEventListener("mousemove", handleMouseMove);
          mountElement.removeEventListener("mouseup", handleMouseUp);
          mountElement.removeEventListener("mouseenter", handleMouseEnter);
          mountElement.removeEventListener("mouseleave", handleMouseLeave);
        }

        if (frameRef.current) {
          cancelAnimationFrame(frameRef.current);
        }

        if (renderer) {
          renderer.dispose();
        }
      };
    } catch (error) {
      console.error("Error initializing 3D globe:", error);
      setHasError(true);
    }
  }, []);

  return (
    <div
      ref={mountRef}
      className={`md:w-full w-2/3 h-30 md:h-48 rounded-lg relative overflow-hidden ${
        className || ""
      }`}
    >
      {!isMounted && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="size-8 rounded-full bg-cyan-400/20 animate-pulse" />
            <p className="text-cyan-400/60 text-xs">Loading globe...</p>
          </div>
        </div>
      )}
    </div>
  );
}
