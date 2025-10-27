import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { HamburgerMenuIcon, Cross2Icon, SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import logo from "../assets/logo.jpg";
import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";


export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
 

  const toggleLanguage = () => {
    console.log("i18n object:", i18n);
    console.log("typeof i18n.changeLanguage:", typeof i18n.changeLanguage);
    console.log("i18n.changeLanguage:", i18n.changeLanguage);
    console.log("Current language:", i18n.language);
    const newLang = i18n.language === "en" ? "sw" : "en";
    console.log("Switching to language:", newLang);
    if (typeof i18n.changeLanguage === 'function') {
      i18n.changeLanguage(newLang);
    } else {
      console.error("i18n.changeLanguage is not a function");
    }
  };
  
  
  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 10);
      setVisible(!(currentY > lastScrollY.current && currentY > 80));
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) =>
    location.pathname === path
      ? "text-gold-500 font-semibold"
      : "text-gray-300 hover:text-gold-300";

  return (
    <>
      {/* === NAVBAR === */}
      <motion.nav
        animate={{
          y: visible ? 0 : -90,
          backgroundColor: scrolled ? "rgba(0,0,0,0.95)" : "rgba(0,0,0,0.8)",
          backdropFilter: "blur(10px)",
          boxShadow: scrolled ? "0 2px 10px rgba(0,0,0,0.4)" : "none",
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="sticky top-0 z-50"
      >
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center py-3">
          {/* Logo & Brand */}
          <Link to="/">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="HagaGandi Logo" className="w-10 h-10 rounded-full" />
              <motion.h1
                animate={{ scale: scrolled ? 0.95 : 1 }}
                transition={{ duration: 0.3 }}
                className="text-2xl font-bold text-gold-500"
              >
                HagaGandi
              </motion.h1>
            </div>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8 text-base">
            <li><Link to="/" className={isActive("/")}>{t("navHome")}</Link></li>
            <li><Link to="/book" className={isActive("/book")}>{t("navBook")}</Link></li>
            <li><Link to="/dashboard" className={isActive("/dashboard")}>{t("navDashboard")}</Link></li>
            <li><Link to="/login" className={isActive("/login")}>{t("navAdmin")}</Link></li>
          </ul>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gold-500"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <Cross2Icon className="w-6 h-6" /> : <HamburgerMenuIcon className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-black text-gold-300 border-t border-gold-700"
            >
              <ul className="flex flex-col space-y-3 px-6 py-4">
                <li><Link onClick={() => setMenuOpen(false)} to="/">{t("navHome")}</Link></li>
                <li><Link onClick={() => setMenuOpen(false)} to="/book">{t("navBook")}</Link></li>
                <li><Link onClick={() => setMenuOpen(false)} to="/dashboard">{t("navDashboard")}</Link></li>
                <li><Link onClick={() => setMenuOpen(false)} to="/login">{t("navAdmin")}</Link></li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* === FLOATING THEME TOGGLE BUTTON === */}
      <motion.button
        onClick={toggleTheme}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          rotate: theme === "dark" ? 0 : 180,
          boxShadow: theme === "dark" 
            ? "0 0 20px rgba(255,191,0,0.6)" 
            : "0 0 25px rgba(0,0,0,0.3)" 
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center 
          ${theme === "dark" 
            ? "bg-gold-500 text-black hover:bg-gold-400" 
            : "bg-dark-900 text-gold-500 hover:bg-dark-700"} 
          transition-all shadow-lg`}
      >
        {theme === "dark" ? (
          <SunIcon className="w-6 h-6" />
        ) : (
          <MoonIcon className="w-6 h-6" />
        )}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 rounded-full bg-gold-500/10 blur-md pointer-events-none"
        />
      </motion.button>

      {/* === FLOATING TRANSLATION TOGGLE BUTTON === */}
      <motion.button
        onClick={toggleLanguage}
        whileTap={{ scale: 0.9 }}
        animate={{
          boxShadow: "0 0 20px rgba(255,191,0,0.6)"
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={`fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full flex items-center justify-center
          bg-gold-500 text-black hover:bg-gold-400 transition-all shadow-lg`}
        title="Change Language"
      >
        <Globe className="w-6 h-6" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 rounded-full bg-gold-500/10 blur-md pointer-events-none"
        />
      </motion.button>

    </>
  );
}
