import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { InstagramLogoIcon, TwitterLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import logo from "../assets/logo.jpg";

export default function Footer() {
  return (
    <footer className="bg-dark-900 text-gold-200 border-t border-gold-700 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-3 gap-10">
        
        {/* === Logo + About === */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center sm:items-start text-center sm:text-left"
        >
          <div className="flex items-center space-x-3 mb-3">
            <img src={logo} alt="HagaGandi Logo" className="w-10 h-10 rounded-full" />
            <h2 className="text-2xl font-bold text-gold-500">HagaGandi</h2>
          </div>
          <p className="text-gold-300 text-sm leading-relaxed max-w-sm">
            Precision, performance, and passion — redefining car care with trusted expertise and technology.
          </p>
        </motion.div>

        {/* === Quick Links === */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center sm:text-left"
        >
          <h3 className="text-lg font-semibold text-gold-500 mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-gold-400 transition">Home</Link></li>
            <li><Link to="/book" className="hover:text-gold-400 transition">Book Appointment</Link></li>
            <li><Link to="/dashboard" className="hover:text-gold-400 transition">Dashboard</Link></li>
            <li><Link to="/login" className="hover:text-gold-400 transition">Admin Portal</Link></li>
          </ul>
        </motion.div>

        {/* === Contact Info + Socials === */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center sm:text-left"
        >
          <h3 className="text-lg font-semibold text-gold-500 mb-4">Contact</h3>
          <p className="text-sm text-gold-300 mb-2">📍 Ngong Road, Nairobi, Kenya</p>
          <p className="text-sm text-gold-300 mb-2">📞 +254 712 345 678</p>
          <p className="text-sm text-gold-300 mb-4">✉️ support@hagagandi.com</p>

          <div className="flex justify-center sm:justify-start space-x-4 mt-2">
            <a href="#" className="hover:text-gold-400 transition"><InstagramLogoIcon className="w-5 h-5" /></a>
            <a href="#" className="hover:text-gold-400 transition"><TwitterLogoIcon className="w-5 h-5" /></a>
            <a href="#" className="hover:text-gold-400 transition"><LinkedInLogoIcon className="w-5 h-5" /></a>
          </div>
        </motion.div>
      </div>

      {/* === Footer Bottom Bar === */}
      <div className="border-t border-gold-700 py-4 text-center text-sm text-gold-400 bg-dark-800">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          © {new Date().getFullYear()} HagaGandi. All rights reserved.
        </motion.p>
      </div>
    </footer>
  );
}
