import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    company: "SoftMark Solutions - Pakistan",
    role: "Web Developer Intern",
    date: "Jun - 2024",
    description:
      "Worked on designing company website - enhancing with animations.",
  },
  {
    company: "GIGHUB - Sri Lanka",
    role: "Software Engineer Intern",
    date: "Feb - 2024",
    description: "Collaborated with a team to develop few client projects",
  },
];

const MyExperience = () => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const timeline = timelineRef.current;

    gsap.fromTo(
      timeline,
      { height: 0, boxShadow: "0px 0px 20px rgba(0, 255, 255, 0.6)" },
      {
        height: "100%",
        ease: "power3.out",
        duration: 2,
        scrollTrigger: {
          trigger: section,
          start: "top center",
          end: "bottom center",
          scrub: 2,
        },
      }
    );

    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 80, scale: 0.9, rotateX: 20 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        stagger: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top center",
          end: "bottom center",
          scrub: 2,
        },
      }
    );
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative bg-black min-h-screen text-white py-16 px-4 md:px-8 flex flex-col items-center"
    >
      {/* Experience Title */}
      <h1 className="absolute top-8 text-4xl md:text-6xl font-bold text-gray-500 uppercase tracking-wide text-center">
        My Experience
      </h1>

      {/* Timeline Container */}
      <div className="relative flex flex-col items-center w-full sm:w-2/3 mt-20 md:mt-32">
        {/* Timeline Line */}
        <div
          ref={timelineRef}
          className="timeline-line absolute left-1/2 transform -translate-x-1/2 w-1 bg-cyan-400 h-full z-0 shadow-lg shadow-cyan-400"
        ></div>

        {experiences.map((exp, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className="experience-card relative flex flex-col sm:flex-row items-center sm:items-start sm:space-x-10 mt-10 sm:mt-20 px-4 py-6 rounded-xl bg-black/40 backdrop-blur-md shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-cyan-400/50 hover:bg-cyan-900/30 w-full sm:w-auto"
          >
            {/* Left Section */}
            <div className="w-full sm:w-1/2 text-center sm:text-right px-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-cyan-400 transition-all">
                {exp.company}
              </h2>
              <p className="text-gray-400 text-sm md:text-base">{exp.date}</p>
            </div>

            {/* Timeline Circle */}
            <div className="relative w-8 h-8 md:w-10 md:h-10 z-40 my-4 sm:my-0">
              <div className="absolute w-5 h-5 md:w-6 md:h-6 bg-white rounded-full border-2 border-cyan-400 animate-pulse left-1/2 transform -translate-x-1/2"></div>
            </div>

            {/* Right Section */}
            <div className="w-full sm:w-1/2 text-center sm:text-left px-4">
              <h3 className="text-2xl md:text-4xl font-bold text-green-400 transition-all">
                {exp.role}
              </h3>
              <p className="text-gray-300 text-sm md:text-base">
                {exp.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyExperience;
