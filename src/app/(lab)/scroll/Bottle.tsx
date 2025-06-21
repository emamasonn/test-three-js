import * as THREE from "three";
import React, { JSX, useLayoutEffect, useMemo } from "react";
import { useGLTF, useScroll } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { GenerateInitMaterials, LoadAnimations, LoadTextures } from "./utils";
import gsap, { Power4 } from "gsap";
import { useFrame, useThree } from "@react-three/fiber";

type GLTFResult = GLTF & {
  nodes: {
    Bottle: THREE.Mesh;
    Soda: THREE.Mesh;
    Brand: THREE.Mesh;
    Cap: THREE.Mesh;
  };
  materials: {
    cristal: THREE.MeshStandardMaterial;
    soda: THREE.MeshStandardMaterial;
    brand: THREE.MeshStandardMaterial;
  };
};

export const Bottle = (props: JSX.IntrinsicElements["group"]) => {
  const colorsMaterial = useMemo(
    () => ({
      cristal: "#8c8c8c",
      soda: "#000",
    }),
    []
  );

  const scene = useThree((state) => state.scene);
  const timeline = gsap.timeline({
    defaults: { duration: 2, ease: Power4.easeInOut },
  });
  const scroll = useScroll();

  const { cristalMaterial, sodaMaterial, brandMaterial } =
    GenerateInitMaterials();

  const { nodes } = useGLTF(
    "/assets/scroll/Bottle.glb"
  ) as unknown as GLTFResult;

  useLayoutEffect(() => {
    const textures = LoadTextures([
      "FalloutBoy",
      "Classic",
      "Quantum",
      "Sunset",
    ]);
    const animations = LoadAnimations(
      scene,
      colorsMaterial,
      cristalMaterial,
      sodaMaterial,
      brandMaterial,
      textures
    );
    console.log("animations", animations);
    animations.map((animation) => {
      if (animation.target) {
        timeline.to(
          animation.target,
          { ...animation.animationsProperties },
          animation.pointTime
        );
      }
    });
  }, [
    brandMaterial,
    colorsMaterial,
    cristalMaterial,
    scene,
    sodaMaterial,
    timeline,
  ]);

  useFrame(() => {
    timeline.seek(scroll.offset * timeline.duration());
  });

  return (
    <group name="BottleGroup" {...props} dispose={null}>
      <mesh
        name="Bottle"
        geometry={nodes.Bottle.geometry}
        material={cristalMaterial}
      />
      <mesh
        name="Soda"
        geometry={nodes.Soda.geometry}
        material={sodaMaterial}
      />
      <mesh
        name="Brand"
        geometry={nodes.Brand.geometry}
        material={brandMaterial}
      />
      <mesh name="Cap" geometry={nodes.Cap.geometry} material={brandMaterial} />
    </group>
  );
};

useGLTF.preload("/assets/scroll/Bottle.glb");
