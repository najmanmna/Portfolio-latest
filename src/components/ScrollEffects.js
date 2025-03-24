import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

const ScrollEffects = () => {
  useEffect(() => {
    // ✅ Initialize Lenis Smooth Scrolling
    const lenis = new Lenis({
      smooth: true,
      duration: 1.8, // Slightly slower for a smoother effect
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing for a natural feel
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // ✅ Apply animations to all sections
    gsap.utils.toArray(".section").forEach((section) => {
      const content = section.querySelector(".content");

      // ✅ Fade-in & slide-up effect when section is **fully visible**
      gsap.fromTo(
        content,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 60%", // Starts animation when 60% of the section is visible
            end: "top 30%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // ✅ Magnetic "snap-to-viewport" effect when scrolling past 50%
      gsap.to(section, {
        scale: 1.05, // Subtle zoom effect for better visual flow
        scrollTrigger: {
          trigger: section,
          start: "top 50%",
          end: "top 10%",
          pin: true, // Locks section until scrolled past
          scrub: 1.2, // Smooth transition effect
          snap: { snapTo: "labels", duration: 0.6, delay: 0.2, ease: "power2.inOut" }, // Magnetic snap
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null; // This component only applies effects
};

export default ScrollEffects;
