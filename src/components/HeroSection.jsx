import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import backgroundImage from "../assets/najman-dp-removebg.png"; // Adjust to your image path

const HeroSection = () => {
  const heroRef = useRef(null);
  const personImageRef = useRef(null);
  const textLayerRef = useRef(null);
  const imageRevealRef = useRef(null);
  const imageLayerRef = useRef(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const heroElement = heroRef.current; // Store the ref value in a variable

    // Step 1: Image Reveal Animation
    gsap.fromTo(
      imageRevealRef.current,
      { y: "0%" },
      {
        y: "-100%",
        duration: 1.5,
        ease: "power2.out",
        delay: 1,
      }
    );

    // Step 2: Staggered Heading Animations
    const headingsLeft = textLayerRef.current.querySelectorAll(".heading-left");
    const headingsRight =
      textLayerRef.current.querySelectorAll(".heading-right");

    gsap.fromTo(
      headingsLeft,
      { x: "-100%", opacity: 0 },
      {
        x: "-30%",
        opacity: 1,
        stagger: 0.3,
        duration: 3,
        ease: "back.out",
        delay: 1,
      }
    );

    gsap.fromTo(
      headingsRight,
      { x: "100%", opacity: 0 },
      {
        x: "30%",
        opacity: 1,
        stagger: 0.3,
        duration: 3,
        ease: "back.out",
        delay: 1,
      }
    );

    // Step 3: Parallax Effect (Mouse for Desktop, Gyro for Mobile)
    const isMobile = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    const updateAnimation = (x, y) => {
      gsap.to(headingsLeft, {
        x: `${-20 + x * -50}%`,
        duration: 2,
        ease: "power3.out",
      });

      gsap.to(headingsRight, {
        x: `${20 + x * 50}%`,
        duration: 2,
        ease: "power3.out",
      });

      gsap.to(personImageRef.current, {
        x: x * 30,
        y: y * 10,
        scale: 1.05,
        duration: 5,
        ease: "power3.out",
      });

      gsap.to(imageLayerRef.current, {
        scale: 1.05,
        duration: 5,
        ease: "power3.out",
      });
      gsap.to(personImageRef.current, {
        y: "-2%",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    };

    if (isMobile) {
      // Gyro-based movement for mobile
      const handleDeviceOrientation = (event) => {
        const { beta, gamma } = event; // Tilt forward/back and left/right
        const x = gamma / 45; // Normalize tilt (-1 to 1)
        const y = beta / 90; // Normalize tilt (-1 to 1)
        updateAnimation(x, y);
      };

      window.addEventListener("deviceorientation", handleDeviceOrientation);
      return () =>
        window.removeEventListener(
          "deviceorientation",
          handleDeviceOrientation
        );
    } else {
      // Mouse movement for desktop
      const handleMouseMove = (event) => {
        const { clientX, clientY } = event;
        const { offsetWidth, offsetHeight } = heroElement;

        const x = (clientX / offsetWidth) * 2 - 1;
        const y = (clientY / offsetHeight) * 2 - 1;

        updateAnimation(x, y);
      };

      heroElement.addEventListener("mousemove", handleMouseMove);
      return () =>
        heroElement.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden bg-black flex flex-col items-center justify-center px-4 sm:px-10"
      style={{ perspective: "1200px" }}
    >
      {/* Image Reveal Block */}
      <div
        ref={imageRevealRef}
        className="absolute top-0 left-0 w-full h-full bg-black z-20"
      ></div>

      {/* Text Layer */}
      <div
        ref={textLayerRef}
        className="absolute text-center text-white"
        style={{
          zIndex: 9,
          fontWeight: "900",
          fontSize: "clamp(1.5rem, 8vw, 6rem)",
          lineHeight: "1.3",
        }}
      >
        <h1 className="heading-left uppercase tracking-widest text-gray-300 drop-shadow-lg">
          Ahamed
        </h1>
        <h1 className="heading-right uppercase font-extralight italic text-gray-100 drop-shadow-xl">
          Najman
        </h1>
        <h1 className="heading-left uppercase tracking-widest text-gray-300 drop-shadow-lg">
          Web Design
        </h1>
        <h1 className="heading-right uppercase font-extralight italic text-gray-100 drop-shadow-xl">
          Expert
        </h1>
      </div>

      {/* Image Layer */}
      <div
        className="absolute w-[60vw] sm:w-[40vw] md:w-[30vw] aspect-[3/3.5] flex items-center justify-center opacity-80"
        ref={imageLayerRef}
        style={{
          maxHeight: "85vh",
          zIndex: 10,
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "1rem",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          boxShadow: "0 8px 32px rgba(255, 255, 255, 0.1)",
          overflow: "hidden",
          // border: "1px solid rgba(255, 255, 255, 0.2)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div className="shine"></div>
        <div className="absolute w-full h-full bg-gradient-radial from-[#ffffff15] to-transparent] z-0"></div>

        <div
          ref={personImageRef}
          className="relative w-full h-full bg-cover bg-center after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[30%] after:bg-gradient-to-t after:from-black after:to-transparent"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "contain",
            backgroundPosition: "center bottom",
            backgroundRepeat: "no-repeat",
            // filter: "drop-shadow(0 10px 20px rgba(0, 0, 0, 0.4))",
            filter: "brightness(0.9) contrast(1.05) saturate(0.9)",
            mixBlendMode: "soft-light", // subtle blend with the background
            opacity: 0.9,
          }}
        ><div className="absolute inset-0 bg-black/0 backdrop-blur-[0.5px] z-10"></div>
</div>
      </div>
    </div>
  );
};

export default HeroSection;
