import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";
import ReactIcon from "../assets/icons/react.svg";
import JavaScriptIcon from "../assets/icons/javascript.svg";
import FigmaIcon from "../assets/icons/figma.svg";
import NodejsIcon from "../assets/icons/nodejs.svg";
import MongodbIcon from "../assets/icons/mongodb.svg";
import CSSIcon from "../assets/icons/css.svg";
import PythonIcon from "../assets/icons/python.svg";
import BlenderIcon from "../assets/icons/blender.svg";
import TailwindIcon from "../assets/icons/tailwind.svg";
import HtmlIcon from "../assets/icons/html.svg";
import GithubIcon from "../assets/icons/github.svg";
import ProfileImage from "../assets/logo-text.png";

const skills = [
  { name: "Figma", icon: FigmaIcon },
  { name: "React", icon: ReactIcon },
  { name: "Python", icon: PythonIcon },
  { name: "Node.js", icon: NodejsIcon },
  { name: "JavaScript", icon: JavaScriptIcon },
  { name: "CSS", icon: CSSIcon },
  { name: "Html", icon: HtmlIcon },
  { name: "Github", icon: GithubIcon },
  { name: "Tailwind", icon: TailwindIcon },
  { name: "Blender", icon: BlenderIcon },
  { name: "MongoDB", icon: MongodbIcon },
];

const SkillsSection = () => {
  const { ref, inView } = useInView({ threshold: 0.3 }); // Trigger only when 30% is in view
  const [isVisible, setIsVisible] = useState(false);
  const prevInView = useRef(false);

  useEffect(() => {
    if (inView && !prevInView.current) {
      setIsVisible(true);
    }
    prevInView.current = inView;
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative flex flex-col items-center justify-center min-h-screen bg-[#1b107d36] text-white px-4 overflow-hidden"
    >
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 1 }}
        className="absolute top-10 md:top-16 text-lg md:text-2xl font-light text-center w-[90%] max-w-2xl"
      >
        I'm currently looking to join a{" "}
        <span className="text-[#4d9df2] font-semibold">cross-functional</span>{" "}
        team that values improving people’s lives through accessible design.
      </motion.h2>

      {/* Center Profile Image with Glow */}
      <motion.div
        animate={isVisible ? { scale: [1, 1.1, 1] } : {}}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute flex items-center mt-24 justify-center w-32 h-32 rounded-full shadow-2xl border-4 border-blue-500"
      >
        <img
          src={ProfileImage}
          alt="Profile"
          className="w-16 h-12 object-cover"
        />
      </motion.div>

      {/* Rotating Skills Icons */}
      <motion.div
        animate={isVisible ? { rotate: 360 } : {}}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        className="absolute mt-24 w-[80vw] h-[80vw] max-w-[350px] max-h-[350px] flex items-center justify-center"
      >
        {skills.map((skill, index) => {
          const angle = (index / skills.length) * (2 * Math.PI);
          const radius = window.innerWidth < 640 ? 100 : 140;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <motion.div
              key={index}
              className="absolute w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-white bg-opacity-20 p-1 md:p-2"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <img
                src={skill.icon}
                alt={skill.name}
                className="w-8 h-8 md:w-10 md:h-10"
              />
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default SkillsSection;
