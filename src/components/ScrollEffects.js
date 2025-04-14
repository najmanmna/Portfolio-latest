import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

const ScrollEffects = () => {
  useEffect(() => {
    // ✅ Optimize Lenis Smooth Scroll
    const lenis = new Lenis({
      smooth: true,
      duration: window.innerWidth < 768 ? 1.2 : 1.8, // Faster scroll on mobile
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenis.on("scroll", ScrollTrigger.update);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // ✅ Use GSAP matchMedia for Mobile/Desktop
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Desktop Animations
      gsap.utils.toArray(".section").forEach((section) => {
        const content = section.querySelector(".content");

        // Fade-in & slide-up effect
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
              start: "top 60%",
              end: "top 30%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Magnetic snap effect **only on desktop**
        gsap.to(section, {
          scale: 1.05,
          scrollTrigger: {
            trigger: section,
            start: "top 50%",
            end: "top 10%",
            pin: true,
            scrub: 0.5,
            snap: { snapTo: "labels", duration: 0.6, delay: 0.2, ease: "power2.inOut" },
          },
        });
      });
    });

    mm.add("(max-width: 767px)", () => {
      // Mobile Optimizations
      gsap.utils.toArray(".section").forEach((section) => {
        const content = section.querySelector(".content");

        // Simpler Fade-in animation
        gsap.fromTo(
          content,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 70%", // Triggers later for smoother UX
              end: "top 50%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
};

export default ScrollEffects;
