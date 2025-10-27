import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { Button } from "../components/ui/button";
import Footer from "../components/Footer";
import { Wrench, Send, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function AdminDashboard() {
  const { theme } = useTheme();
  const { t } = useTranslation();

  // Mock bookings data
  const [bookings, setBookings] = useState([
    {
      id: 1,
      client: "Athman Ibrahim",
      car: "Toyota Premio 2018",
      service: "Engine Repairs",
      date: "2025-10-15",
      status: "active", // "upcoming" | "active" | "complete"
      repairs: [
        { id: 1, task: "Engine diagnostics", done: true },
        { id: 2, task: "Oil change", done: false },
        { id: 3, task: "Brake replacement", done: false },
        { id: 4, task: "Interior cleaning", done: false },
      ],
    },
  ]);

  const [selectedBooking, setSelectedBooking] = useState(bookings[0]);
  const [newTask, setNewTask] = useState("");

  const total = selectedBooking.repairs.length;
  const completed = selectedBooking.repairs.filter((r) => r.done).length;
  const progress = Math.round((completed / total) * 100);

  const toggleTask = (id) => {
    const updated = bookings.map((booking) =>
      booking.id === selectedBooking.id
        ? {
            ...booking,
            repairs: booking.repairs.map((task) =>
              task.id === id ? { ...task, done: !task.done } : task
            ),
          }
        : booking
    );
    setBookings(updated);
    setSelectedBooking(updated.find((b) => b.id === selectedBooking.id));
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    const updated = bookings.map((booking) =>
      booking.id === selectedBooking.id
        ? {
            ...booking,
            repairs: [
              ...booking.repairs,
              { id: Date.now(), task: newTask, done: false },
            ],
          }
        : booking
    );
    setBookings(updated);
    setSelectedBooking(updated.find((b) => b.id === selectedBooking.id));
    setNewTask("");
  };

  const markComplete = () => {
    const updated = bookings.map((b) =>
      b.id === selectedBooking.id ? { ...b, status: "complete" } : b
    );
    setBookings(updated);
    setSelectedBooking({ ...selectedBooking, status: "complete" });
  };

  const sendNotification = (type) => {
    alert(
      type === "progress"
        ? `${t("progressUpdate")} ${selectedBooking.client}`
        : `${t("completionAlert")} ${selectedBooking.client}`
    );
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        theme === "dark" ? "bg-dark-900 text-gold-300" : "bg-gold-50 text-dark-900"
      }`}
    >
      <div className="px-6 py-12 max-w-6xl mx-auto flex-1 w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold">{t("dashboardTitle")}</h1>
            <p className="opacity-80">{t("dashboardSubtitle")}</p>
          </div>
          <Wrench className="w-10 h-10 text-gold-500" />
        </div>

        {/* Bookings Selector */}
        <div className="mb-8">
          <label className="block mb-2 font-semibold">{t("selectBooking")}</label>
          <select
            value={selectedBooking.id}
            onChange={(e) =>
              setSelectedBooking(
                bookings.find((b) => b.id === parseInt(e.target.value))
              )
            }
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-400"
          >
            {bookings.map((b) => (
              <option key={b.id} value={b.id}>
                {b.client} — {b.service} ({b.status})
              </option>
            ))}
          </select>
        </div>

        {/* Booking Details */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`rounded-2xl p-6 shadow-lg border ${
            theme === "dark" ? "bg-dark-800 border-gold-500" : "bg-white border-gold-400"
          }`}
        >
          <h2 className="text-xl font-semibold mb-4">
            {selectedBooking.client}'s Car — {selectedBooking.car}
          </h2>

          {/* Progress Bar */}
          <div className="w-full bg-gray-300 dark:bg-dark-600 rounded-full h-4 mb-6 overflow-hidden relative">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8 }}
              className="h-4 rounded-full bg-gradient-to-r from-gold-400 to-gold-600"
            />
            <motion.span
              className="absolute right-2 top-[-22px] text-xs font-semibold"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              {progress}%
            </motion.span>
          </div>

          {/* Task List */}
          <ul className="space-y-3">
            {selectedBooking.repairs.map((task) => (
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

          {/* Add New Task */}
          <div className="flex items-center gap-3 mt-6">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder={t("addTask")}
              className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-400"
            />
            <Button
              onClick={addTask}
              className={`rounded-xl px-6 py-2 font-semibold shadow-md ${
                theme === "dark"
                  ? "bg-gold-500 text-dark-900 hover:bg-gold-400"
                  : "bg-dark-900 text-gold-400 hover:bg-dark-700"
              }`}
            >
              Add
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-6 mt-8">
            <Button
              onClick={() => sendNotification("progress")}
              className={`rounded-xl px-6 py-2 font-semibold shadow-md flex items-center gap-2 ${
                theme === "dark"
                  ? "bg-gold-500 text-dark-900 hover:bg-gold-400"
                  : "bg-dark-900 text-gold-400 hover:bg-dark-700"
              }`}
            >
              <Send className="w-5 h-5" /> {t("sendProgress")}
            </Button>
            <Button
              onClick={() => {
                markComplete();
                sendNotification("complete");
              }}
              className={`rounded-xl px-6 py-2 font-semibold shadow-md flex items-center gap-2 ${
                theme === "dark"
                  ? "bg-green-500 text-dark-900 hover:bg-green-400"
                  : "bg-green-700 text-white hover:bg-green-600"
              }`}
            >
              <CheckCircle className="w-5 h-5" /> {t("markComplete")}
            </Button>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
