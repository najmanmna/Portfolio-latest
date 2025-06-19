// src/caseStudies/phhwa.jsx
import { motion } from "framer-motion";
import phhss from "../assets/myproject-images/phh.png";
import phh_grp from "../assets/myproject-images/phh_certificate_group_pic.jpg";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const Section = ({ title, children, index }) => (
  <motion.section
    variants={fadeInUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    custom={index}
    className="mb-16"
  >
    <h2 className="text-xl sm:text-3xl font-bold text-white border-l-4 border-blue-500 pl-4 mb-4">
      {title}
    </h2>
    <div className="text-base sm:text-lg text-gray-300 leading-relaxed bg-gradient-to-br from-gray-900 to-gray-800 p-4 rounded-xl shadow-md">
      {children}
    </div>
  </motion.section>
);

const PHHCaseStudy = () => {
  return (
    <div className="min-h-screen px-4 sm:px-8 py-16 text-white bg-gradient-to-b from-black via-gray-900 to-gray-950 max-w-6xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-16 text-center"
      >
        🌟 Patients Helping Hands – Case Study
      </motion.h1>

      <Section title="🏥 About the Client" index={1}>
        Patients Helping Hands (PHH) is a student-led NGO based in Karachi,
        supporting patients at NICH, NICVD, and JPMC. They required a minimal
        yet effective web presence to communicate their mission and attract
        donors.
      </Section>

      <Section title="🌟 Project Goal" index={2}>
        To design and develop a modern, responsive, and minimal website that
        reflected PHH’s vision of compassion, service, and professionalism —
        while maintaining a subtle, non-commercial look that aligned with their
        medical and humanitarian identity.
      </Section>

      <Section title="👨‍💻 My Role" index={3}>
        <ul className="list-disc pl-6 space-y-1">
          <li>Full-Stack Developer (React + CMS)</li>
          <li>Led the end-to-end development process</li>
          <li>Direct communication with PHH’s executive board</li>
          <li>Technical collaboration and feature planning</li>
          <li>Content structuring, CMS design & integration</li>
          <li>Hosting & domain setup with cPanel</li>
        </ul>
      </Section>

      <Section title="🛠️ Tools & Stack" index={4}>
        <ul className="list-disc pl-6 space-y-1">
          <li>React.js & Tailwind CSS for frontend</li>
          {/* <li>GSAP & Framer Motion for animations</li> */}
          <li>Figma for design collaboration</li>
          <li>Sanity CMS for structured content management</li>
          <li>Webhoster.pk for deployment (cPanel)</li>
        </ul>
      </Section>

      <Section title="🧐 UX Highlights" index={5}>
        <ul className="list-disc pl-6 space-y-1">
          <li>Mobile-first design with optimal spacing</li>
          <li>Fully responsive layout for all devices</li>
          <li>Clean UI with minimal distractions, focused on readability</li>
        </ul>
        <p className="mt-3">
          ✨ The animated preloader — inspired by their logo and mission — was a team favorite and added a meaningful touch to their homepage.
        </p>
      </Section>

      <Section title="💬 Client Feedback" index={6}>
        <blockquote className="border-l-4 border-green-500 pl-4 italic text-gray-400">
          “This is truly incredible work Ahamed Najman — you have made our
          vision come to life and we are so so grateful. May this be a source of
          blessings in your life. Team PHH wishes you all the best!”
        </blockquote>
      </Section>

      <Section title="🌟 Outcome" index={7}>
        <p>
          The final site gives PHH a credible and trustworthy online presence to support donations, project visibility, and volunteer outreach. With the CMS in place, their team can now manage updates seamlessly and independently.
        </p>
      </Section>

      <Section title="📌 Key Takeaways" index={8}>
        <ul className="list-disc pl-6 space-y-1">
          <li>Led a solo freelance project with real-world stakeholders</li>
          <li>Strengthened skills in client communication and CMS integration</li>
          <li>Balanced visual identity with performance and accessibility</li>
        </ul>
      </Section>

      <Section title="📸 Project Highlights" index={9}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <img
            src={phh_grp}
            alt="PHH Certificate"
            className="rounded-lg shadow-md"
          />
          <img
            src={phhss}
            alt="PHH Website Screenshot"
            className="rounded-lg shadow-md"
          />
        </div>
      </Section>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="text-center mt-16"
      >
        <a
          href="https://phhwa.org.pk"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-green-600 text-white font-bold px-6 py-3 rounded-full shadow-xl transition-all"
        >
          🔗 View Live Site
        </a>
      </motion.div>
    </div>
  );
};

export default PHHCaseStudy;
