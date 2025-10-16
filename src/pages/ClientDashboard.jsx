import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { Button } from "../components/ui/button";
import Footer from "../components/Footer";

export default function Dashboard() {
  const { theme } = useTheme();

  // Mock repair list
  const [repairs, setRepairs] = useState([
    { id: 1, task: "Engine diagnostics", done: true },
    { id: 2, task: "Oil change", done: false },
    { id: 3, task: "Brake replacement", done: false },
    { id: 4, task: "Interior cleaning", done: false },
  ]);

  const total = repairs.length;
  const completed = repairs.filter((r) => r.done).length;
  const progress = Math.round((completed / total) * 100);

  const toggleTask = (id) => {
    setRepairs((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        theme === "dark"
          ? "bg-dark-900 text-gold-300"
          : "bg-gold-50 text-dark-900"
      }`}
    >
      <div className="px-6 py-12 max-w-5xl mx-auto flex-1 w-full">
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
          <p className="opacity-80">Here’s your latest car repair status.</p>
        </motion.div>

        {/* Active Repair Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`rounded-2xl p-6 shadow-lg border ${
            theme === "dark"
              ? "bg-dark-800 border-gold-500"
              : "bg-white border-gold-400"
          }`}
        >
          <h2 className="text-xl font-semibold mb-4">Current Repair Progress</h2>

          {/* Progress Bar */}
          <div className="w-full bg-gray-300 dark:bg-dark-600 rounded-full h-4 mb-6 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8 }}
              className="h-4 rounded-full bg-gradient-to-r from-gold-400 to-gold-600"
            />
          </div>

          {/* Task List */}
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
                    onChange={() => toggleTask(task.id)}
                    className="w-5 h-5 accent-gold-500 cursor-pointer"
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
          <Button
            className={`rounded-xl px-6 py-2 font-semibold shadow-md ${
              theme === "dark"
                ? "bg-gold-500 text-dark-900 hover:bg-gold-400"
                : "bg-dark-900 text-gold-400 hover:bg-dark-700"
            }`}
          >
            Request Progress Update
          </Button>
          <Button
            className={`rounded-xl px-6 py-2 font-semibold shadow-md ${
              theme === "dark"
                ? "bg-green-500 text-dark-900 hover:bg-green-400"
                : "bg-green-700 text-white hover:bg-green-600"
            }`}
          >
            Mark as Complete
          </Button>
        </div>

        {/* Booking Summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className={`mt-12 p-6 rounded-2xl shadow-md ${
            theme === "dark" ? "bg-dark-800" : "bg-white"
          }`}
        >
          <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <p><strong>Date:</strong> 2025-10-14</p>
            <p><strong>Time:</strong> 10:30 AM</p>
            <p><strong>Service Type:</strong> Engine Repairs</p>
            <p><strong>Status:</strong> In Progress</p>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
