import { useEffect, useState } from "react";
import { TbMenu3 } from "react-icons/tb";
import logo from "../assets/logo.png";
import OverlayMenu from "./OverlayMenu";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [timer, setTimer] = useState(null);

  const isInHomeSection = () => {
    const home = document.querySelector("#home");
    if (!home) return true; // fallback
    const rect = home.getBoundingClientRect();
    return rect.top <= 0 && rect.bottom >= 200; 
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const atHome = isInHomeSection();

      // ⭐ HOME SECTION → Navbar always visible
      if (atHome) {
        setShowNav(true);
        return;
      }

      // ⭐ Non-Home Sections → Hide/Show by scroll direction
      if (currentScroll > lastScroll) {
        // Scroll Down → Hide
        setShowNav(false);
      } else {
        // Scroll Up → Show
        setShowNav(true);
      }

      setLastScroll(currentScroll);

      // ⭐ Auto hide after 3 sec inactivity (not on home)
      if (timer) clearTimeout(timer);
      const newTimer = setTimeout(() => {
        if (!isInHomeSection()) {
          setShowNav(false);
        }
      }, 3000);
      setTimer(newTimer);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll, timer]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full px-6 py-4 flex justify-between items-center z-50 
          transition-transform duration-500 
          ${showNav ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} className="w-12" />
          <div className="text-2xl font-bold text-white ml-2">Anil</div>
        </div>

        {/* MENU BUTTON */}
        <button
          onClick={() => setOpen(true)}
          className="text-white cursor-pointer text-3xl lg:absolute lg:left-1/2 lg:-translate-x-1/2"
        >
          <TbMenu3 />
        </button>

        {/* Reach Out */}
        <div className="hidden lg:block">
          <a
            href="#contact"
            className="bg-linear-to-r from-pink-500 to-blue-500 text-white px-5 py-2 rounded-full shadow-lg"
          >
            Reach Out
          </a>
        </div>
      </nav>

      <OverlayMenu open={open} setOpen={setOpen} />
    </>
  );
}
