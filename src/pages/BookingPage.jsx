import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { Button } from "../components/ui/button";
import Footer from "../components/Footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";

export default function BookingPage() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    carModel: "",
    serviceType: "",
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.carModel ||
      !formData.serviceType ||
      !selectedDate ||
      !selectedTime
    )
      return;

    // Simulate async request
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }, 2500); // 2.5 second loading simulation
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        theme === "dark"
          ? "bg-dark-900 text-gold-300"
          : "bg-gold-50 text-dark-800"
      }`}
    >
      {/* Header */}
      <div className="py-16 text-center">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-4"
        >
          {t("bookingTitle")}
        </motion.h1>
        <p className="text-lg opacity-80">
          {t("bookingSubtitle")}
        </p>
      </div>

      {/* Booking Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto bg-opacity-10 backdrop-blur-md shadow-lg p-8 rounded-2xl border border-gold-400"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={t("bookingName")}
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-400"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t("bookingEmail")}
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-400"
            required
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-400"
            required
          />
          <input
            type="text"
            name="carModel"
            value={formData.carModel}
            onChange={handleChange}
            placeholder={t("bookingCar")}
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-400"
            required
          />

          <select
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-400"
            required
          >
            <option value="">{t("bookingService")}</option>
            <option value="diagnostics">{t("serviceDiagnostics")}</option>
            <option value="repairs">{t("serviceRepairs")}</option>
            <option value="maintenance">{t("serviceMaintenance")}</option>
          </select>

          {/* Date Picker */}
          <div className="col-span-1">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              placeholderText={t("bookingDate")}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-400"
              minDate={new Date()}
              required
            />
          </div>

          {/* Time Picker */}
          <div className="col-span-1">
            <DatePicker
              selected={selectedTime}
              onChange={(time) => setSelectedTime(time)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeCaption="Time"
              dateFormat="h:mm aa"
              placeholderText="Select Time"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-400"
              required
            />
          </div>
        </div>

        <div className="text-center mt-8">
          <Button
            type="submit"
            disabled={loading}
            className={`px-8 py-3 rounded-xl font-semibold shadow-md flex items-center justify-center gap-2 mx-auto ${
              theme === "dark"
                ? "bg-gold-500 text-dark-900 hover:bg-gold-400"
                : "bg-dark-900 text-gold-400 hover:bg-dark-700"
            } ${loading ? "opacity-75 cursor-not-allowed" : ""}`}
          >
            {loading ? (
              <>
                <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                Processing...
              </>
            ) : (
              t("bookingSubmit")
            )}
          </Button>
        </div>
      </motion.form>

      {/* Success Modal */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className={`p-8 rounded-2xl shadow-lg text-center ${
                theme === "dark"
                  ? "bg-dark-800 text-gold-300"
                  : "bg-white text-dark-800"
              }`}
            >
              <h2 className="text-2xl font-bold mb-4">Booking Confirmed 🎉</h2>
              <p>
                Your appointment request has been received. We’ll notify you once it’s confirmed.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
