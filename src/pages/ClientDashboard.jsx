import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { Button } from "../components/ui/button";
import Footer from "../components/Footer";
import { Bell, Car } from "lucide-react"; // icons

export default function ClientDashboard() {
  const { theme } = useTheme();

  // Simulated booking data
  const [bookingStatus, setBookingStatus] = useState("upcoming"); // "upcoming" | "active" | "complete"
  const [requestSent, setRequestSent] = useState(false);

  const [repairs] = useState([
    { id: 1, task: "Engine diagnostics", done: true },
    { id: 2, task: "Oil change", done: true },
    { id: 3, task: "Brake replacement", done: false },
    { id: 4, task: "Interior cleaning", done: false },
  ]);

  const total = repairs.length;
  const completed = repairs.filter((r) => r.done).length;
  const progress = Math.round((completed / total) * 100);

  // Simulate appointment reaching active phase (for demo)
  useEffect(() => {
    const timer = setTimeout(() => setBookingStatus("active"), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleRequestUpdate = () => {
    setRequestSent(true);
    setTimeout(() => setRequestSent(false), 2000);
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        theme === "dark" ? "bg-dark-900 text-gold-300" : "bg-gold-50 text-dark-900"
      }`}
    >
      <div className="px-6 py-12 max-w-5xl mx-auto flex-1 w-full relative">
        {/* Notification Bell */}
        <div className="absolute top-6 right-6">
          <motion.div
            animate={
              bookingStatus === "complete"
                ? { scale: [1, 1.1, 1], color: "#FFD700" }
                : { scale: 1 }
            }
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Bell
              className={`w-7 h-7 ${
                theme === "dark" ? "text-gold-400" : "text-dark-700"
              }`}
            />
          </motion.div>
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, <span className="text-gold-500">Athman</span> 👋
          </h1>
        </motion.div>

        {/* Conditional Dashboard */}
        {bookingStatus === "upcoming" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-8 rounded-2xl shadow-md text-center ${
              theme === "dark" ? "bg-dark-800 border border-gold-500" : "bg-white border border-gold-300"
            }`}
          >
            <h2 className="text-2xl font-semibold mb-4">Upcoming Appointment</h2>
            <p className="mb-2">📅 Date: 2025-10-15</p>
            <p className="mb-2">🕙 Time: 10:30 AM</p>
            <p className="mb-4">🛠️ Service Type: Engine Repairs</p>
            <p className="opacity-80">
              Your appointment is scheduled. You’ll receive a notification when it’s time to bring your car in.
            </p>
          </motion.div>
        )}

        {bookingStatus === "active" && (
          <>
            {/* Active Repair Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`rounded-2xl p-6 shadow-lg border ${
                theme === "dark" ? "bg-dark-800 border-gold-500" : "bg-white border-gold-400"
              }`}
            >
              <h2 className="text-xl font-semibold mb-4">Current Repair Progress</h2>

              {/* Progress Bar with Car Icon */}
              <div className="relative w-full bg-gray-300 dark:bg-dark-600 rounded-full h-4 mb-10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8 }}
                  className="h-4 rounded-full bg-gradient-to-r from-gold-400 to-gold-600"
                />
                <motion.div
                  className="absolute top-[-12px]"
                  animate={{ left: `${progress}%` }}
                  transition={{ duration: 0.8 }}
                >
                  <Car className="w-6 h-6 text-gold-500 drop-shadow-lg" />
                </motion.div>
              </div>

              {/* Task List (Read-only) */}
              <ul className="space-y-3">
                {repairs.map((task) => (
                  <li
                    key={task.id}
                    className="flex justify-between items-center bg-opacity-20 p-3 rounded-lg hover:bg-opacity-30 transition"
                  >
                    <span
                      className={`flex items-center gap-3 ${
                        task.done ? "line-through opacity-70" : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={task.done}
                        readOnly
                        className="w-5 h-5 accent-gold-500 cursor-not-allowed"
                      />
                      {task.task}
                    </span>
                    <span
                      className={`text-sm ${
                        task.done ? "text-green-400" : "text-yellow-400"
                      }`}
                    >
                      {task.done ? "Complete" : "Pending"}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Actions */}
            <div className="flex justify-center gap-6 mt-8">
              <motion.div
                animate={
                  requestSent
                    ? { scale: [1, 1.1, 1], boxShadow: ["0 0 10px #FFD700", "0 0 0px #FFD700"] }
                    : {}
                }
                transition={{ duration: 0.6 }}
              >
                <Button
                  onClick={handleRequestUpdate}
                  disabled={requestSent}
                  className={`rounded-xl px-6 py-2 font-semibold shadow-md ${
                    theme === "dark"
                      ? "bg-gold-500 text-dark-900 hover:bg-gold-400"
                      : "bg-dark-900 text-gold-400 hover:bg-dark-700"
                  }`}
                >
                  {requestSent ? "Request Sent..." : "Request Progress Update"}
                </Button>
              </motion.div>
            </div>
          </>
        )}

        {bookingStatus === "complete" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`text-center mt-20 p-8 rounded-2xl shadow-lg ${
              theme === "dark" ? "bg-dark-800" : "bg-white"
            }`}
          >
            <h2 className="text-2xl font-semibold mb-3">Your Car is Ready 🎉</h2>
            <p>All services have been completed. You can now collect your vehicle from HagaGandi Garage.</p>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
}
