import * as THREE from "three";
import { Mesh, MeshStandardMaterial, Texture } from "three";

/**
 * Automatically fixes all textures in a GLB/FBX model
 * to the correct color space for PBR (Physically Based Rendering) in Three.js.
 * PBR rendering uses sRGB color space for color-related textures, ensuring realistic lighting interaction with materials.
 * This function ensures that textures have the appropriate color space.
 * Without this fix, textures may appear washed out or overly dark.
 */

export function fixModelTextures(model: THREE.Group) {
  // Traverse through all children of the model (including nested objects)
  model.traverse((child) => {
    if (child instanceof Mesh) {
      // Get the material(s) of the mesh, casting to an array even if it's a single material so we can handle both cases the same.
      const materials = Array.isArray(child.material)
        ? child.material
        : [child.material];

      // Iterate over all materials on this mesh
      materials.forEach((mat) => {
        // Skip materials that are not of type MeshStandardMaterial
        if (!(mat instanceof MeshStandardMaterial)) return;

        // List of Materials that should be in sRGB color space sicne they deal with color information
        const sRGBMaps: (keyof MeshStandardMaterial)[] = ["map", "emissiveMap"];

        // For each sRGBMaps key, check the models Material for that texture and fix it if necessary
        sRGBMaps.forEach((key) => {
          const tex = (mat[key] as Texture) || null;
          if (tex) {
            // If the texture's color space is not sRGB, fix it
            if (tex.colorSpace !== THREE.SRGBColorSpace) {
              tex.colorSpace = THREE.SRGBColorSpace;
              tex.needsUpdate = true;
            }
          }
        });
      });
    }
  });
}
