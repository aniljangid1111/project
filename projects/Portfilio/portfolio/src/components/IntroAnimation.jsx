import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function IntroSplash({ onFinish }) {
  const hellos = ["Hello World", "console.log('Hello')", "<Hello/>", "Welcome"];

  const [index, setIndex] = useState(0);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    if (index < hellos.length - 1) {
      const timer = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 180);
      return () => clearTimeout(timer);
    } else {
      const exitTimer = setTimeout(() => {
        setExit(true);
        setTimeout(onFinish, 600);
      }, 1000);
      return () => clearTimeout(exitTimer);
    }
  }, [index, onFinish]);

  return (
    <motion.div
      className="fixed inset-0 bg-black flex items-center justify-center z-50"
      initial={{ scale: 1, opacity: 1 }}
      animate={
        exit
          ? { scale: 1.1, filter: "blur(20px)" }  // NOT opacity!
          : { scale: 1 }
      }
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <motion.h1
        key={hellos[index]}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="text-white text-5xl md:text-7xl font-bold"
      >
        {hellos[index]}
      </motion.h1>
    </motion.div>
  );
}
