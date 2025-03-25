import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";

const FloatingIconsBar = () => {
  const [scrolling, setScrolling] = useState(false);
  const controls = useAnimation();
  const timeoutRef = useRef(null); // Store timeout reference

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(true);
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => setScrolling(false), 50);
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutRef.current); // Cleanup timeout on unmount
    };
  }, []);

  useEffect(() => {
    controls.start(scrolling ? { opacity: 0.3, y: 50 } : { opacity: 1, y: 0 });
  }, [scrolling, controls]);

  return (
    <motion.div
      animate={controls}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed bottom-10 right-5 flex flex-col gap-4 bg-blue-900/50 p-4 rounded-xl shadow-lg border border-blue-500/50 backdrop-blur-lg"
    >
      {[
        { icon: FaGithub, link: "https://github.com/najmanmna" },
        { icon: FaLinkedin, link: "https://www.linkedin.com/in/najman-nizam" },
        { icon: FaInstagram, link: "https://www.instagram.com/najman_mna/" },
        { icon: FaFacebook, link: "https://www.facebook.com/najman.nizam" },
      ].map(({ icon: Icon, link }, index) => (
        <motion.a
          key={index}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white text-2xl hover:text-blue-400 transition duration-300"
          whileHover={{ scale: 1.2, rotate: 10 }}
        >
          <Icon />
        </motion.a>
      ))}
    </motion.div>
  );
};

export default FloatingIconsBar;
