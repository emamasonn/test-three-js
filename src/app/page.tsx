"use client";

import { Canvas } from "@react-three/fiber";
import ParticleScene from "../components/particle-scene";
import AnimatedContent from "../components/animated-content";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="w-full h-screen relative">
      {/* Three.js Canvas Background */}
      <Canvas
        camera={{
          position: [0, 0, 2],
          fov: 75,
          near: 0.1,
          far: 100,
        }}
        style={{
          background: "#21282a",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <Suspense fallback={null}>
          <ParticleScene />
        </Suspense>
      </Canvas>

      {/* Animated Content Overlay */}
      <AnimatedContent />
    </div>
  );
}
