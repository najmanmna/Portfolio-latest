// Laptop3D.js
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import {
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  Suspense,
  useMemo,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "./LaptopLoader"; // <-- Import Loader component

useGLTF.preload("/laptop.glb");

const ProjectScreenMesh = ({ lidRotation, texture }) => {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = lidRotation.current + 3.143; // invert lid angle
    }
  });

  return (
    <mesh
      ref={meshRef}
      name="ProjectScreenMesh"
      position={[0, 2.05, -6.03]}
      scale={[1, 1, 1]}
    >
      <planeGeometry args={[14.66, 8.6]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
};

const LaptopModel = ({ projectImage, isVisible, triggerOpenAnimation }) => {
  const { scene } = useGLTF("/laptop.glb");
  const texture = useTexture(projectImage);
  const screenRef = useRef();
  const frameRef = useRef();
  const groupRef = useRef();

  const [lidOpen, setLidOpen] = useState(false);
  const [lidFullyOpen, setLidFullyOpen] = useState(false);
  const lidRotation = useRef(4.14); // ~ -80 degrees in radians (closed)

  useMemo(() => {
    if (texture) {
      texture.flipY = true;
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.anisotropy = 16;
    }
  }, [texture]);

  useLayoutEffect(() => {
    if (!scene) return;

    scene.traverse((child) => {
      if (child.name === "Screen") {
        screenRef.current = child;
        screenRef.current.rotation.x = lidRotation.current;
      }
      if (child.name === "Frame") {
        frameRef.current = child;
      }
    });
  }, [scene]);

  useFrame(() => {
    if (screenRef.current && lidOpen) {
      lidRotation.current = THREE.MathUtils.lerp(
        lidRotation.current,
        3, // Target open angle
        0.02
      );

      screenRef.current.rotation.x = lidRotation.current;

      if (lidRotation.current <= 3.05 && !lidFullyOpen) {
        setLidFullyOpen(true);
      }
    }
  });

  useEffect(() => {
    if (isVisible || triggerOpenAnimation) {
      setLidOpen(true);
    }
  }, [isVisible, triggerOpenAnimation]);

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={0.5} position={[0, -3.3, 0]} />
      {screenRef.current && texture && lidFullyOpen && (
        <ProjectScreenMesh lidRotation={lidRotation} texture={texture} />
      )}
    </group>
  );
};

const Laptop3D = ({ projectImage, triggerOpen = false }) => {
  const [showControls, setShowControls] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const laptopRef = useRef(null);

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
      <Canvas
        camera={{ position: [0, 2, 22], fov: 45 }}
        style={{ width: "100%", height: "100%" }}
      >
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 3, 3]} intensity={1} />
          <LaptopModel
            projectImage={projectImage}
            isVisible={showControls}
            triggerOpenAnimation={triggerOpen}
          />
          {showControls && (
            <OrbitControls enableZoom={false} enablePan={false} />
          )}
        </Suspense>
      </Canvas>

      {/* Hint */}
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
