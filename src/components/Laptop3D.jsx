import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LaptopModel = ({ projectImage, isVisible }) => {
  const { scene } = useGLTF("/laptop.glb");
  const texture = useTexture(projectImage);
  const groupRef = useRef();

  // ✅ Enhance texture quality
  texture.flipY = true;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.anisotropy = Math.min(THREE.WebGLRenderer?.capabilities?.maxAnisotropy || 16, 16);

  // ✅ Rotate laptop and screen together
  useFrame(({ clock }) => {
    if (groupRef.current && isVisible) {
      groupRef.current.rotation.y = 0.2 * Math.sin(clock.elapsedTime * 0.5);
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={0.5} position={[0, -3.3, 0]} />

      {/* Screen - Nested inside same group to stay aligned */}
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

  // ✅ Show controls & hint when scrolled into view
  useEffect(() => {
    const handleScroll = () => {
      if (!laptopRef.current) return;
      const rect = laptopRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.75) {
        setShowControls(true);
        setShowHint(true);

        // Hide hint after 3 seconds
        setTimeout(() => setShowHint(false), 3000);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={laptopRef} className="relative w-full h-full">
      <Canvas camera={{ position: [0, 2, 22], fov: 45 }} style={{ width: "100%", height: "100%" }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 3, 3]} intensity={1} />

        <LaptopModel projectImage={projectImage} isVisible={showControls} />
        {showControls && <OrbitControls enableZoom={false} enablePan={false} />}
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
