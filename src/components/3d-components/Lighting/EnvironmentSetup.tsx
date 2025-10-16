import React, { useRef } from "react";
import { Environment, Lightformer, Stars } from "@react-three/drei";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { HDRLoader } from "three/examples/jsm/Addons.js";

interface EnvironmentSetupProps {
  degraded: boolean;
}

// Sets up the environment lighting and background effects and HDR environment map
export default function EnvironmentSetup({ degraded }: EnvironmentSetupProps) {
  const group = useRef<THREE.Group>(null);
  const positions = [2, 0, 2, 0, 2, 0, 2, 0];
  const { scene, gl } = useThree();
  const hdrTexture = "/3d-assets/rogland_clear_night_1k.hdr";

  React.useEffect(() => {
    if (!scene || !gl) {
      console.log("No scene or gl context available");
      return;
    }
    const loader = new HDRLoader();
    loader.load(
      hdrTexture,
      (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;

        const pmremGenerator = new THREE.PMREMGenerator(gl);
        pmremGenerator.compileEquirectangularShader();
        const envMap = pmremGenerator.fromEquirectangular(texture).texture;
        scene.environment = envMap;
        scene.background = null;

        texture.dispose();
        pmremGenerator.dispose();
        console.log("HDR texture loaded and environment set");
      },
      undefined,
      (error) => {
        console.error("Error loading HDR texture:", error);
      }
    );
  }, [scene, gl, hdrTexture]);

  // Scene background "noise"
  return (
    <>
      <Environment frames={degraded ? 1 : 2} resolution={256} blur={0.8}>
        {/* Top light */}
        <Lightformer
          intensity={0.5}
          rotation-x={Math.PI / 2}
          position={[0, 5, -9]}
          scale={[10, 10, 1]}
        />

        {/* Rotating lights, leaving it out for now but might come back later if it adds to the more finalized scene */}

        <group rotation={[0, 0.5, 0]}>
          <group ref={group}>
            {positions.map((x, i) => (
              <Lightformer
                key={i}
                form="circle"
                intensity={1}
                rotation={[Math.PI / 2, 0, 0]}
                position={[x, 4, i * 4]}
                scale={[3, 1, 1]}
              />
            ))}
          </group>
        </group>

        {/* Fill lights */}
        <Lightformer
          intensity={2}
          rotation-y={Math.PI / 2}
          position={[-5, 1, -1]}
          scale={[20, 0.1, 1]}
          form="ring"
          color={new THREE.Color(0xffff00)}
        />
        <Lightformer
          rotation-y={-Math.PI / 2}
          position={[10, 1, 0]}
          scale={[20, 1, 1]}
          form="ring"
          color={new THREE.Color(0x00ff00)}
        />

        {/* Decorative light rings */}
        <Lightformer
          form="ring"
          color="blue"
          intensity={1}
          scale={10}
          position={[-15, 4, -18]}
          target={[0, 0, 0]}
        />
        <Lightformer
          form="ring"
          color="red"
          intensity={1}
          scale={10}
          position={[15, -4, 18]}
          target={[0, 0, 0]}
        />
      </Environment>
    </>
  );
}
