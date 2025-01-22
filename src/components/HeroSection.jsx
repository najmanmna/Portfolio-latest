import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import backgroundImage from "../assets/najman-dp-removebg.png"; // Adjust to your image path

const HeroSection = () => {
  const heroRef = useRef(null); // Reference to the entire hero section
  const personImageRef = useRef(null); // Reference to the image
  const textLayerRef = useRef(null); // Reference to the text layer
  const imageRevealRef = useRef(null); // Reference to the image reveal block
  const imageLayerRef = useRef(null); // Reference to the image reveal block

  useEffect(() => {
    // Step 1: Image Reveal Animation
    gsap.fromTo(
      imageRevealRef.current,
      { y: "0%" }, // Start fully covering the image
      {
        y: "-100%", // Slide up and disappear
        duration: 1.5,
        ease: "power2.out",
        delay: 0.5, // Allow image to load first
      }
    );

    // Step 2: Staggered Heading Animations
    const headingsLeft = textLayerRef.current.querySelectorAll(".heading-left");
    const headingsRight =
      textLayerRef.current.querySelectorAll(".heading-right");

    gsap.fromTo(
      headingsLeft,
      { x: "-100%", opacity: 0 }, // Start from the left
      {
        x: "-30%", // Move into place
        opacity: 1, // Fade in
        stagger: 0.3, // Delay each heading
        duration: 3,
        ease: "back.out",
        delay: 1, // Slight delay after the image reveal
      }
    );

    gsap.fromTo(
      headingsRight,
      { x: "100%", opacity: 0 }, // Start from the right
      {
        x: "30%", // Move into place
        opacity: 1, // Fade in
        stagger: 0.3, // Delay each heading
        duration: 3,
        ease: "back.out",
        delay: 1, // Slight delay after the image reveal
      }
    );

    // Step 3: Mouse Parallax Effect
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const { offsetWidth, offsetHeight } = heroRef.current;

      const x = (clientX / offsetWidth) * 2 - 1; // Normalize mouse X position
      const y = (clientY / offsetHeight) * 2 - 1; // Normalize mouse Y position

      // Move left headings further left with a smooth floating feel
      gsap.to(headingsLeft, {
        x: (index) => `${-20 + x * -50}%`, // Move left dynamically
        // y: y * 10, // Add slight vertical movement
        duration: 2,
        // delay: 2,
        ease: "power3.out",
      });

      // Move right headings further right with a smooth floating feel
      gsap.to(headingsRight, {
        x: (index) => `${20 + x * 50}%`, // Move right dynamically
        // y: y * 10, // Add slight vertical movement
        duration: 2,
        // delay: 2,
        ease: "power3.out",
      });

      // Apply 3D effect to the person image
      gsap.to(personImageRef.current, {
        x: x * 50, // Move horizontally
        y: y * 20, // Move vertically

        scale: 1.05, // Slight zoom
        duration: 5,
        ease: "power3.out",
      });
      // Apply 3D effect to the person image
      gsap.to(imageLayerRef.current, {
        rotateY: x * 10, // Add 3D rotation
        rotateX: y * -5, // Add 3D rotation

        scale: 1.05, // Slight zoom
        duration: 5,
        ease: "power3.out",
      });
    };

    const hero = heroRef.current;
    hero.addEventListener("mousemove", handleMouseMove);

    return () => {
      hero.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center top-20"
      style={{ perspective: "1200px" }} // Set perspective for 3D depth
    >
      {/* Image Reveal Block */}
      <div
        ref={imageRevealRef}
        className="absolute top-10 left-0 w-full h-full bg-black z-20"
      ></div>

      {/* Text Layer */}
      <div
        ref={textLayerRef}
        className="absolute text-center text-white"
        style={{
          zIndex: 9,
          fontWeight: "900",
          fontSize: "clamp(3rem, 12vw, 8rem)",
          lineHeight: "1.2",
          //   mixBlendMode: "overlay",
        }}
      >
        <h1
          className="heading-left uppercase"
          style={{
            zIndex: -1,
          }}
        >
          Darren
        </h1>
        <h1 className="heading-right uppercase">Harroff</h1>
        <h1 className="heading-left uppercase">Webflow</h1>
        <h1 className="heading-right uppercase">Expert</h1>
      </div>

      {/* Image Layer */}
      <div
        className="absolute flex items-center justify-center opacity-80"
        ref={imageLayerRef}
        style={{
          zIndex: 10,
          width: "33rem",
          height: "38rem",
          backgroundImage: "linear-gradient(rgb(108 108 105), #B0BEC5)",
          borderRadius: "0.5rem",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)",
          overflow: "hidden",
        }}
      >
        <div
          ref={personImageRef}
          className="relative w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center bottom",
          }}
        ></div>
      </div>
    </div>
  );
};

export default HeroSection;
