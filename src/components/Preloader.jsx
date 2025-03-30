import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const Preloader = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [showSignature, setShowSignature] = useState(false);

  useEffect(() => {
    const timeout1 = setTimeout(() => setShowSignature(true), 1200); // Start handwriting effect
    const timeout2 = setTimeout(() => {
      setIsVisible(false);
      onFinish();
    }, 3500); // End animation

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, [onFinish]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 flex flex-col items-center justify-center bg-black text-white z-50"
        >
          {/* "Made by" fades in first */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl font-light"
          >
            Made by
          </motion.span>

          {/* Handwriting effect for "Ahamed Najman" */}
          {showSignature && (
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: "auto" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="text-5xl md:text-4xl sm:text-xl font-signature border-r-4 border-white pr-2 whitespace-nowrap overflow-hidden"
            >
              Ahamed Najman
            </motion.span>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
