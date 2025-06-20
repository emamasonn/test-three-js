"use client";

import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function ParticleScene() {
  const torusRef = useRef<THREE.Points>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // Create torus geometry
  const torusGeometry = useMemo(() => {
    return new THREE.TorusGeometry(0.7, 0.2, 16, 100);
  }, []);

  // Create particles geometry
  const particlesGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const particlesCnt = 5000;
    const positions = new Float32Array(particlesCnt * 3);

    for (let i = 0; i < particlesCnt * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 5;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  // Handle mouse movement
  const handleMouseMove = (event: MouseEvent) => {
    setMouse({
      x: event.clientX,
      y: event.clientY,
    });
  };

  // Add mouse event listener
  useMemo(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  // Animation loop
  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime();

    // Rotate torus
    if (torusRef.current) {
      torusRef.current.rotation.y = 0.5 * elapsedTime;
    }

    // Rotate particles
    if (particlesRef.current) {
      particlesRef.current.rotation.y = -0.01 * elapsedTime;

      // Mouse interaction
      if (mouse.x > 0) {
        particlesRef.current.rotation.x = -mouse.y * elapsedTime * 0.00008;
        particlesRef.current.rotation.y = mouse.x * elapsedTime * 0.00008;
      }
    }
  });

  return (
    <>
      {/* Point Light */}
      <pointLight position={[2, 3, 4]} intensity={0.1} color="#ffffff" />

      {/* Torus Points */}
      <points ref={torusRef} geometry={torusGeometry}>
        <pointsMaterial size={0.005} color="#ffffff" />
      </points>

      {/* Particles Points */}
      <points ref={particlesRef} geometry={particlesGeometry}>
        <pointsMaterial size={0.005} color="#ffffff" />
      </points>
    </>
  );
}
