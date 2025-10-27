import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useTranslation } from "react-i18next";



const heroImages = [
  "/hero/car1.jpg",
  "/hero/car2.jpg",
  "/hero/car3.jpg",
  "/hero/car4.jpg",
];

export default function HomePage() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center text-gold-100 bg-dark-900">
      {/* === Hero Section === */}
      <div className="relative w-full h-[80vh] overflow-hidden">
        <AnimatePresence>
          <motion.img
            className={`absolute top-0 left-0 w-full h-full object-cover transition duration-700 ${
              theme === "dark"
                ? "brightness-75 contrast-110"
                : "brightness-105 contrast-95"
            }`}
            key={index + theme}
            src={heroImages[index]}
            alt="HagaGandi hero"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1 }}
          />
        </AnimatePresence>

        <motion.div
          animate={{
            backgroundColor:
              theme === "dark"
                ? "rgba(0,0,0,0.7)"
                : "rgba(255,215,100,0.25)",
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        />

        {/* Hero Text */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className={`text-4xl sm:text-5xl font-bold mb-4 ${
              theme === "dark" ? "text-gold-500" : "text-dark-900"
            }`}
          >
            {t("homeTitle")}
          </motion.h1>

          <p
            className={`max-w-xl text-lg mb-6 ${
              theme === "dark" ? "text-gold-200" : "text-dark-700"
            }`}
          >
            {t("homeSubtitle")}
          </p>

          <Link to="/book">
            <Button
              className={`rounded-2xl px-8 py-2 font-semibold shadow-lg transition-1s ${
                theme === "dark"
                  ? "bg-gold-500 text-dark-900 hover:bg-gold-400"
                  : "bg-dark-900 text-gold-400 hover:bg-dark-700"
              }`}
            >
              {t("bookNow")}
            </Button>
          </Link>
        </div>
      </div>

      {/* === About Section === */}
      <section className="py-16 bg-dark-700 w-full text-center">
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-gold-500 mb-6"
        >
          {t("aboutTitle")}
        </motion.h2>

        <div className="max-w-4xl mx-auto text-gold-200 px-6">
          <p className="text-lg leading-relaxed mb-4">{t("aboutSubtitle")}</p>
        </div>
      </section>

      {/* === Services Section === */}
      <section className="py-16 bg-dark-900 w-full">
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-gold-500 text-center mb-10"
        >
          {t("ourServices")}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">
          {[
            {
              title: t("serviceDiagnostics"),
              text: "High-precision computer diagnostics for quick, accurate fault detection.",
              img: "/services/diagnostics.jpg",
            },
            {
              title: t("serviceRepairs"),
              text: "Mechanical, body, and electrical repairs with authentic parts and skilled hands.",
              img: "/services/repair.jpg",
            },
            {
              title: t("serviceMaintenance"),
              text: "Scheduled maintenance plans to keep your ride smooth and reliable.",
              img: "/services/maintenance.jpg",
            },
          ].map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden shadow-md group"
            >
              <img
                src={service.img}
                alt={service.title}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-center px-4">
                <h3 className="text-2xl font-bold text-gold-500 mb-2">
                  {service.title}
                </h3>
                <p className="text-gold-100 text-sm max-w-xs">
                  {service.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* === Testimonials Section === */}
      <section className="py-16 bg-dark-800 w-full">
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-gold-500 text-center mb-10"
        >
          {t("testimonialsTitle")}
        </motion.h2>

        <p className="text-center text-gold-300 mb-10">
          {t("testimonialsSubtitle")}
        </p>

        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            {
              name: "James M.",
              review:
                "Outstanding service — fast, transparent, and my car feels brand new.",
              rating: 5,
            },
            {
              name: "Linda K.",
              review:
                "HagaGandi handled my SUV’s diagnostics flawlessly. Honest team, great value.",
              rating: 4,
            },
            {
              name: "Kevin T.",
              review:
                "Great communication and updates throughout the repair. Will return for sure!",
              rating: 5,
            },
          ].map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              className="bg-dark-900 border border-gold-700 rounded-2xl shadow-md p-6 text-center"
            >
              <p className="text-gold-100 italic mb-4">
                “{testimonial.review}”
              </p>
              <p className="font-semibold text-gold-500">{testimonial.name}</p>
              <div className="mt-2 flex justify-center text-gold-500">
                {"★".repeat(testimonial.rating)}
                {"☆".repeat(5 - testimonial.rating)}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Rate Our Service */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 10,
            duration: 0.8,
          }}
          className="mt-16 max-w-md mx-auto bg-dark-900 text-gold-500 p-8 rounded-2xl shadow-lg text-center border border-gold-700"
        >
          <h3 className="text-2xl font-bold mb-4">{t("testimonialsTitle")}</h3>
          <p className="mb-6 text-gold-300">
            {t("testimonialsSubtitle")}
          </p>
          <form className="flex flex-col space-y-4">
            <textarea
              placeholder="Write your review..."
              className="p-3 rounded-lg text-dark-900"
              rows="3"
            ></textarea>
            <select className="p-2 rounded-lg text-dark-900">
              <option value="">Select Rating</option>
              <option value="5">★★★★★ - Excellent</option>
              <option value="4">★★★★☆ - Good</option>
              <option value="3">★★★☆☆ - Average</option>
              <option value="2">★★☆☆☆ - Poor</option>
              <option value="1">★☆☆☆☆ - Terrible</option>
            </select>
            <button
              type="submit"
              className="bg-gold-500 text-dark-900 font-semibold py-2 rounded-lg hover:bg-gold-700 transition"
            >
              Submit Feedback
            </button>
          </form>
        </motion.div>
      </section>
    </div>
  );
}
