import { motion, useAnimation } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Mail, Send, Loader } from "lucide-react";

const ContactTerminal = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({
    submitted: false,
    error: false,
    loading: false,
  });

  const controls = useAnimation();
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start({ opacity: 1, y: 0 });
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [controls]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitted: false, error: false, loading: true });

    try {
      const response = await fetch("https://formspree.io/f/mnnpvalg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setForm({ name: "", email: "", message: "" });
        setStatus({ submitted: true, error: false, loading: false });
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      setStatus({ submitted: false, error: true, loading: false });
    }
  };

  return (
    <motion.section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white px-6 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-blue-900 opacity-30 blur-3xl"></div>

      <motion.h2
        className="text-5xl font-bold text-white-400 mb-12 tracking-wider uppercase drop-shadow-glow"
        initial={{ opacity: 0, y: -30 }}
        animate={controls}
        transition={{ duration: 1, delay: 0.3 }}
      >
        Get in Touch
      </motion.h2>

      <motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-gray-900/60 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-blue-500/50 relative"
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        transition={{ duration: 0.8 }}
      >
        <div className="relative">
          <div className="mb-6">
            <label className="text-gray-300 text-sm">Name</label>
            <motion.input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800/70 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              whileFocus={{ scale: 1.05 }}
              required
            />
          </div>

          <div className="mb-6">
            <label className="text-gray-300 text-sm">Email</label>
            <motion.input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800/70 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              whileFocus={{ scale: 1.05 }}
              required
            />
          </div>

          <div className="mb-6">
            <label className="text-gray-300 text-sm">Message</label>
            <motion.textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 bg-gray-800/70 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              whileFocus={{ scale: 1.05 }}
              required
            />
          </div>

          <motion.button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 drop-shadow-neon"
            whileTap={{ scale: 0.95 }}
            disabled={status.loading}
          >
            {status.loading ? (
              <Loader className="animate-spin" size={20} />
            ) : status.submitted ? (
              "Sent!"
            ) : (
              "Send Message"
            )}
            {status.submitted ? <Mail size={20} /> : <Send size={20} />}
          </motion.button>
        </div>
      </motion.form>

      {status.submitted && (
        <motion.div
          className="mt-6 text-green-400 text-lg font-semibold drop-shadow-glow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          ✅ Message Sent Successfully!
        </motion.div>
      )}

      {status.error && (
        <motion.div
          className="mt-6 text-red-400 text-lg font-semibold drop-shadow-glow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          ❌ Error Sending Message. Try Again.
        </motion.div>
      )}
    </motion.section>
  );
};

export default ContactTerminal;
