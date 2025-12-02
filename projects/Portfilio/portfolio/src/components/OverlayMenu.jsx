import { AnimatePresence, motion } from "framer-motion";
import { IoClose } from "react-icons/io5";

const menuItems = [
  { name: "Home", link: "#home" },
  { name: "About", link: "#about" },
  { name: "Skills", link: "#skills" },
  { name: "Projects", link: "#projects" },
  { name: "Experience", link: "#experience" },
  { name: "Contact", link: "#contact" },
];

// Circle animation using clipPath
const circleVariant = {
  hidden: { clipPath: "circle(0% at var(--pos))" },
  visible: {
    clipPath: "circle(150% at var(--pos))",
    transition: { type: "spring", stiffness: 60, damping: 20, duration: 0.6 },
  },
  exit: {
    clipPath: "circle(0% at var(--pos))",
    transition: { duration: 0.5 },
  },
};

export default function OverlayMenu({ open, setOpen }) {
  const circlePos = window.innerWidth > 768 ? "50% 0%" : "90% 0%";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="overlay"
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{ "--pos": circlePos }}
          variants={circleVariant}
          className="fixed inset-0 bg-[#000000e9] z-[999] flex items-center justify-center"
        >
          {/* Close button */}
          <button
            onClick={() => setOpen(false)}
            className="absolute cursor-pointer top-6 right-6 text-white text-4xl"
          >
            <IoClose />
          </button>

          {/* Menu */}
          <ul className="space-y-6 text-center">
            {menuItems.map((item, index) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                exit={{ opacity: 0, y: 20, transition: { duration: 0.25 } }}
                className="text-white text-4xl font-semibold cursor-pointer hover:text-pink-500 transition"
              >
                <a
                  href={item.link}          // simple anchor
                  onClick={() => setOpen(false)} // close overlay
                >
                  {item.name}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
