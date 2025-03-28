import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useState, useEffect, Suspense, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ✅ Preload the model
useGLTF.preload("/laptop.glb");

const LaptopModel = ({ projectImage, isVisible }) => {
  const { scene } = useGLTF("/laptop.glb");
  const texture = useTexture(projectImage);
  const groupRef = useRef();

  // ✅ Optimize texture settings
  useMemo(() => {
    if (texture) {
      texture.flipY = true;
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.anisotropy = Math.min(THREE.WebGLRenderer?.capabilities?.maxAnisotropy || 16, 16);
    }
  }, [texture]);

  // ✅ Smooth rotation when visible
  useFrame(({ clock }) => {
    if (groupRef.current && isVisible) {
      groupRef.current.rotation.y = 0.2 * Math.sin(clock.elapsedTime * 0.5);
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={0.5} position={[0, -3.3, 0]} />
      <mesh position={[0, 2.05, -5.3]}>
        <planeGeometry args={[14.66, 8.5]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
    </group>
  );
};

const Laptop3D = ({ projectImage }) => {
  const [showControls, setShowControls] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const laptopRef = useRef(null);

  // ✅ Use IntersectionObserver for better performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowControls(true);
          setShowHint(true);
          setTimeout(() => setShowHint(false), 3000);
        }
      },
      { threshold: 0.5 }
    );

    if (laptopRef.current) observer.observe(laptopRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={laptopRef} className="relative w-full h-full">
      <Canvas camera={{ position: [0, 2, 22], fov: 45 }} style={{ width: "100%", height: "100%" }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 3, 3]} intensity={1} />
          <LaptopModel projectImage={projectImage} isVisible={showControls} />
          {showControls && <OrbitControls enableZoom={false} enablePan={false} />}
        </Suspense>
      </Canvas>

      {/* 🔹 Drag to Rotate Hint */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white px-4 py-2 rounded-lg text-sm opacity-80"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            Drag to Rotate 🔄
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Laptop3D;
