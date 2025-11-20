"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function AuroraBackground() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size, viewport } = useThree();

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2(1, 1) },
      },
      transparent: true,
      vertexShader: `
        precision mediump float;
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision mediump float;

        uniform float iTime;
        uniform vec2 iResolution;

        #define NUM_OCTAVES 1  // sänkt oktaver för enklare fbm

        float rand(vec2 n) {
          return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
        }

        float noise(vec2 p) {
          vec2 ip = floor(p);
          vec2 u = fract(p);
          u = u * u * (3.0 - 2.0 * u);

          float a = rand(ip);
          float b = rand(ip + vec2(1.0, 0.0));
          float c = rand(ip + vec2(0.0, 1.0));
          float d = rand(ip + vec2(1.0, 1.0));

          float res = mix(
            mix(a, b, u.x),
            mix(c, d, u.x),
            u.y
          );
          return res * res;
        }

        float fbm(vec2 x) {
          float v = 0.0;
          float a = 0.4;
          vec2 shift = vec2(100.0);
          float cosRot = cos(0.5);
          float sinRot = sin(0.5);
          mat2 rot = mat2(cosRot, sinRot, -sinRot, cosRot);

          for (int i = 0; i < NUM_OCTAVES; i++) {
            v += a * noise(x);
            x = rot * x * 2.0 + shift;
            a *= 0.5;
          }
          return v;
        }

        void main() {
          vec2 shake = vec2(
            sin(iTime * 1.2) * 0.001,
            cos(iTime * 2.1) * 0.001
          );

          vec2 p = ((gl_FragCoord.xy + shake * iResolution) - iResolution * 0.5)
                   / iResolution.y
                   * mat2(6.0, -4.0, 4.0, 6.0);

          vec4 o = vec4(0.0);

          float f = 2.0 + fbm(p + vec2(iTime * 4.0, 0.0)) * 0.5;

          float iTimeFactor = iTime * 0.4;

          for (float i = 0.0; i < 20.0; i++) {
            vec2 v = p + cos(
              i * i + iTime * 0.025 + i * vec2(13.0, 11.0)
            ) * 3.5;

            float tailNoise = noise(
              v + vec2(iTime * 0.5, i)
            ) * 0.25 * (1.0 - (i / 20.0));

            vec4 auroraColors = vec4(
              0.1 + 0.3 * sin(i * 0.2 + iTimeFactor),
              0.3 + 0.5 * cos(i * 0.3 + iTimeFactor * 1.25),
              0.7 + 0.3 * sin(i * 0.4 + iTimeFactor * 0.75),
              1.0
            );

            vec4 currentContribution = auroraColors
              * exp(sin(i * i + iTime * 0.8))
              / length(max(v, vec2(v.x * f * 0.015, v.y * 1.5)));

            float thinnessFactor = smoothstep(0.0, 1.0, i / 20.0) * 0.6;
            o += currentContribution * (1.0 + tailNoise * 0.8) * thinnessFactor;
          }

          o = tanh(pow(o / 100.0, vec4(1.6)));
          gl_FragColor = o * 1.5;
        }
      `,
    });
  }, []);

  useFrame((state, delta) => {
    if (material.uniforms) {
      material.uniforms.iTime.value += delta;

      const res = material.uniforms.iResolution.value;
      const newX = size.width * viewport.dpr;
      const newY = size.height * viewport.dpr;
      if (res.x !== newX || res.y !== newY) {
        res.set(newX, newY);
      }
    }
  });

  const scale = Math.max(viewport.width, viewport.height) / 2;

  return (
    <mesh ref={meshRef} scale={[scale, scale, 1]}>
      <planeGeometry args={[2, 2]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}
