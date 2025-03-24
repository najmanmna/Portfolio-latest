import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Lottie from "react-lottie";
import animationData from "../assets/lottie-animations/waveemoji.json";
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const textRef = useRef(null);
  const sectionRef = useRef(null);
  const waveRef = useRef(null);

  useEffect(() => {
    const handleScrollAnimation = () => {
      if (!textRef.current) return;
      const splitText = new SplitType(textRef.current, { types: "chars" });

      gsap.fromTo(
        splitText.chars,
        { opacity: 0, y: 50, scale: 0.8, rotationX: -90, color: "#007bff" },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 1.5,
          stagger: 0.05,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        splitText.chars,
        { color: "#007bff", textShadow: "0px 0px 5px rgba(0, 123, 255, 0.5)" },
        {
          color: "#00bfff",
          textShadow:
            "0px 0px 1px rgba(0, 191, 255, 0.8), 0px 0px 10px rgba(0, 191, 255, 0.5)",
          duration: 1.5,
          stagger: 0.1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        }
      );
    };

    handleScrollAnimation();
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
  };

  return (
    <div
      ref={sectionRef}
      className="relative overflow-hidden text-white min-h-screen flex flex-col items-center justify-center px-6 py-16 sm:px-12 md:px-24 lg:px-32 font-robota overflow-x-hidden"
    >
      {/* About Section Content */}
      <div className="text-center md:text-left max-w-4xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl mb-4 font-bold flex flex-wrap items-center gap-2 justify-center md:justify-start">
          Hey, Najman here!
          <span ref={waveRef} className="inline-block" aria-label="wave">
            <Lottie options={defaultOptions} height={40} width={40} />
          </span>
        </h1>

        {/* Enhanced Text Animation */}
        <p className="text-lg sm:text-2xl md:text-3xl leading-relaxed">
          I’m a
          <span
            ref={textRef}
            className="text-[#1E90FF] font-semibold block relative"
          >
            Web Developer and Designer
          </span>
          passionate about turning ideas into engaging digital experiences. I
          create responsive, visually stunning websites that help businesses
          shine and thrive in the digital world with unique, user-centered
          designs.
        </p>
      </div>
    </div>
  );
};

export default About;
