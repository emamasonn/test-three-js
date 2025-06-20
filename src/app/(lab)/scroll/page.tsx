"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ScrollControls } from "@react-three/drei";
import "./styles.css";
import { Bottle } from "./Bottle";
import Labels from "./Labels";

export default function Scroll() {
  return (
    <main id="bg_container" className="container">
      <div className="wrapper">
        <div className={"container-3d canvas"}>
          <Labels />

          <Canvas className="canvas" camera={{ fov: 35, position: [0, 2, 10] }}>
            <ambientLight intensity={0.8} color={0xffffff} />
            <ScrollControls pages={8} damping={0.5}>
              <Bottle />
            </ScrollControls>
            <OrbitControls
              target={[0, 2, 0]}
              enableZoom={false}
              enableRotate={false}
            />
            <Environment
              files={"/assets/scroll/snowy_park_01_1k.hdr"}
              blur={0.5}
            />
          </Canvas>
        </div>
      </div>
    </main>
  );
}
