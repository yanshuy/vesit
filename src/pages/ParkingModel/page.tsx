import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, PerspectiveCamera, OrbitControls } from "@react-three/drei";

function Model() {
    const { scene } = useGLTF("/untitled.glb") as GLTF;

    // Adjusting scale and position if necessary
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
                {/* Add lighting for better visibility */}
                <ambientLight intensity={0.5} />
                <directionalLight
                    position={[10, 10, 10]}
                    intensity={1}
                    castShadow
                />
                <directionalLight position={[-10, 10, -10]} intensity={0.5} />

                {/* Camera setup */}
                <PerspectiveCamera makeDefault position={[0, 5, 15]} />

                {/* Helpers for debugging */}
                <axesHelper args={[5]} />
                <gridHelper args={[20, 20]} />

                {/* Controls for navigation */}
                <OrbitControls />

                <Suspense fallback={<div>Loading...</div>}>
                    <Model />
                </Suspense>
            </Canvas>
        </div>
    );
}
