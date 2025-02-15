import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, PerspectiveCamera, OrbitControls, Html } from "@react-three/drei";
import type { GLTF } from "three-stdlib";

function Model() {
  const { scene } = useGLTF("/untitled.glb") as GLTF;

  // Adjust scale and position if necessary
  return (
    <primitive
      object={scene}
      scale={[0.5, 0.5, 0.5]}
      position={[0, 0, 0]}
    />
  );
}

export default function ParkingModel() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        margin: 0,
        background: "gray",
      }}
    >
      <Canvas shadows>
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} castShadow />
        <directionalLight position={[-10, 10, -10]} intensity={0.5} />

        {/* Camera */}
        <PerspectiveCamera makeDefault position={[0, 5, 15]} />

        {/* Helpers */}
        <axesHelper args={[5]} />
        <gridHelper args={[20, 20]} />

        {/* Navigation Controls */}
        <OrbitControls />

        {/* Suspense fallback wrapped in <Html> for proper HTML rendering */}
        <Suspense fallback={<Html center><div>Loading...</div></Html>}>
          <Model />
        </Suspense>
      </Canvas>
    </div>
  );
}
