import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
    useGLTF,
    PerspectiveCamera,
    OrbitControls,
    Html,
    useTexture,
    Environment,
    MeshWobbleMaterial,
} from "@react-three/drei";
// import type { GLTF } from "three-stdlib";
import { EffectComposer, SSAO, Bloom } from "@react-three/postprocessing";

function Model() {
    const { scene } = useGLTF("/untitled.glb");

    // Load textures
    const [concreteMap, metalMap, normalMap] = useTexture([
        "/textures/concrete_basecolor.jpg",
        "/textures/metal_plate.jpg",
        "/textures/concrete_normal.jpg",
    ]);

    useEffect(() => {
        // Traverse and modify model materials
        scene.traverse((child) => {
            if (child.isMesh) {
                // Apply custom materials with textures
                child.material = new MeshStandardMaterial({
                    map: concreteMap,
                    normalMap: normalMap,
                    metalnessMap: metalMap,
                    roughness: 0.8,
                    metalness: 0.2,
                    envMapIntensity: 0.5,
                });

                // Add some geometric variation
                child.geometry.computeVertexNormals();
            }
        });
    }, [scene, concreteMap, metalMap, normalMap]);

    return (
        <primitive
            object={scene}
            scale={[0.5, 0.5, 0.5]}
            position={[0, -1, 0]}
            rotation={[0, Math.PI / 4, 0]}
        />
    );
}

export default function ParkingModel() {
    return (
        <div style={{ width: "100vw", height: "100vh", margin: 0 }}>
            <Canvas shadows camera={{ position: [0, 5, 15], fov: 50 }}>
                {/* Environmental Lighting */}
                <Environment preset="apartment" background blur={0.5} />

                {/* Enhanced Lighting */}
                <ambientLight intensity={0.25} />
                <directionalLight
                    position={[10, 15, 10]}
                    intensity={2}
                    castShadow
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                />
                <pointLight
                    position={[-10, 5, -10]}
                    intensity={1}
                    color="#4a90e2"
                />

                {/* Camera Controls */}
                <PerspectiveCamera makeDefault position={[0, 8, 20]} />
                <OrbitControls
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    maxPolarAngle={Math.PI / 2}
                />

                {/* Ground Plane with Texture */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                    <planeGeometry args={[40, 40]} />
                    <MeshWobbleMaterial
                        color="#505050"
                        metalness={0.3}
                        roughness={0.8}
                        factor={0.5} // Wobble intensity
                        speed={1} // Wobble speed
                    />
                </mesh>

                {/* Model Loading */}
                <Suspense
                    fallback={
                        <Html center>
                            <div className="loading-text">Loading Model...</div>
                        </Html>
                    }
                >
                    <Model />
                </Suspense>

                {/* Post-processing Effects */}
                <EffectComposer>
                    <SSAO
                        radius={0.5}
                        intensity={50}
                        luminanceInfluence={0.5}
                        color="red"
                    />
                    <Bloom
                        intensity={0.5}
                        kernelSize={3}
                        luminanceThreshold={0.9}
                        luminanceSmoothing={0.05}
                    />
                </EffectComposer>
            </Canvas>
        </div>
    );
}
