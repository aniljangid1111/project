import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import profile from "../assets/profile.png";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });



  return (
    <section
      id="about"
      ref={ref}
      className="w-full min-h-screen bg-black relative overflow-hidden flex items-center py-10"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.5 }}

        className="absolute inset-x-0  h-32
   bg-linear-to-b from-[#302b63] via-[#00bf8f] to-[#1cd8d2]
  opacity-45 blur-[80px]"
      ></motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 z-10 px-6 md:px-16 gap-10 md:gap-0">

        {/* Image Animation */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={isInView ? { opacity: 1.5, x: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex justify-center md:justify-start"
        >
          <img
            src={profile}
            alt="profile"
            className="w-[60%] sm:w-[40%] md:w-[70%] drop-shadow-2xl"
          />


        </motion.div>

        {/* Content Animation */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={isInView ? { opacity: 1.5, x: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="flex items-center text-center md:text-left"
        >
          <div>
            <h3 className="text-2xl my-2 text-shadow-white font-bold text-white">
              About Me
            </h3>

            <h1
              className="text-5xl font-black uppercase text-transparent bg-clip-text 
              bg-linear-to-r from-[#1cd8d2] via-[#00bf8f] to-[#2b6359] drop-shadow-lg"
            >
              Anil Suthar
            </h1>

            <div className="border-b-2 my-2 md:mx-0 mx-auto border-[#00bf8f] w-24"></div>

            <h2
              className="text-xl md:text-2xl mb-6 font-semibold uppercase 
              text-transparent bg-clip-text bg-linear-to-r 
              from-[#1cd8d2] via-[#00bf8f] to-[#2b6359]"
            >
              MERN Stack Developer
            </h2>

            <p className="text-white leading-relaxed text-justify md:pr-6">
              I specialize in building modern, fast, and scalable web applications
              using <span className="text-[#1cd8d2] font-semibold">React, Next.js, Node.js, Express</span> and
              <span className="text-[#00bf8f] font-semibold"> MongoDB</span>. I create responsive and visually clean
              interfaces using <span className="text-[#1cd8d2] font-semibold">Tailwind CSS</span> and
              <span className="text-[#00bf8f] font-semibold"> Bootstrap</span>, and develop powerful, secure,
              and well-structured <span className="text-[#1cd8d2] font-semibold">REST APIs</span> for real-world applications.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
