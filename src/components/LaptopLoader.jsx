// Loader.js
import { useProgress, Html } from "@react-three/drei";
import { motion } from "framer-motion";

const Loader = () => {
  const { progress } = useProgress();

  return (
    <Html center>
      <motion.div
        className="w-14 h-14 border-4 border-t-white border-white/30 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
      <p className="mt-4 text-white text-sm tracking-wide">
        Loading... {Math.floor(progress)}%
      </p>
    </Html>
  );
};

export default Loader;
