import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { Button } from "../components/ui/button";
import Footer from "../components/Footer";
import { Wrench, Send, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { fetchUsers } from "../services/api"; // ✅ central API fetch file

export default function AdminDashboard() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [newTask, setNewTask] = useState("");

  // ✅ Use environment API base URL for Render
  const API_URL = process.env.REACT_APP_API_URL;

  // ✅ Log backend connection status (optional)
  useEffect(() => {
    fetchUsers()
      .then((data) => console.log("Users fetched:", data))
      .catch((err) => console.error("API fetch error:", err));
  }, []);

  // ✅ Verify token and fetch dashboard data
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in first.");
      navigate("/login");
      return;
    }

    fetch(`${API_URL}/api/admin/dashboard`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Unauthorized");
        const data = await res.json();
        setAdmin(data.user);

        // Mock bookings until DB integration
        const mock = [
          {
            id: 1,
            client: "Athman Ibrahim",
            car: "Toyota Premio 2018",
            service: "Engine Repairs",
            date: "2025-10-15",
            status: "active",
            repairs: [
              { id: 1, task: "Engine diagnostics", done: true },
              { id: 2, task: "Oil change", done: false },
              { id: 3, task: "Brake replacement", done: false },
            ],
          },
        ];
        setBookings(mock);
        setSelectedBooking(mock[0]);
      })
      .catch((err) => {
        console.error("Auth check failed:", err);
        localStorage.clear();
        toast.error("Session expired or invalid. Please log in again.");
        navigate("/login");
      })
      .finally(() => setLoading(false));
  }, [navigate, API_URL]);

  if (loading)
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          theme === "dark"
            ? "bg-dark-900 text-gold-500"
            : "bg-gold-100 text-dark-900"
        }`}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="border-4 border-t-gold-500 border-gray-300 rounded-full w-12 h-12"
        />
      </div>
    );

  if (!admin) return null;

  // === Booking management functions ===
  const toggleTask = (id) => {
    const updated = bookings.map((b) =>
      b.id === selectedBooking.id
        ? {
            ...b,
            repairs: b.repairs.map((r) =>
              r.id === id ? { ...r, done: !r.done } : r
            ),
          }
        : b
    );
    setBookings(updated);
    setSelectedBooking(updated.find((b) => b.id === selectedBooking.id));
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    const updated = bookings.map((b) =>
      b.id === selectedBooking.id
        ? {
            ...b,
            repairs: [
              ...b.repairs,
              { id: Date.now(), task: newTask, done: false },
            ],
          }
        : b
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
    toast.success(
      type === "progress"
        ? `Progress update sent to ${selectedBooking.client}`
        : `Completion alert sent to ${selectedBooking.client}`
    );
  };

  const total = selectedBooking?.repairs.length || 0;
  const completed =
    selectedBooking?.repairs.filter((r) => r.done).length || 0;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  // === Render ===
  return (
    <div
      className={`min-h-screen flex flex-col ${
        theme === "dark"
          ? "bg-dark-900 text-gold-300"
          : "bg-gold-50 text-dark-900"
      }`}
    >
      <Toaster position="top-center" />

      <div className="px-6 py-12 max-w-6xl mx-auto flex-1 w-full">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold">
              {t("dashboardTitle")} — {admin.username}
            </h1>
            <p className="opacity-80">{t("dashboardSubtitle")}</p>
          </div>
          <Wrench className="w-10 h-10 text-gold-500" />
        </div>

        {/* Bookings Selector */}
        <div className="mb-8">
          <label className="block mb-2 font-semibold">
            {t("selectBooking")}
          </label>
          <select
            value={selectedBooking?.id}
            onChange={(e) =>
              setSelectedBooking(
                bookings.find((b) => b.id === +e.target.value)
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

        {/* Progress & tasks */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`rounded-2xl p-6 shadow-lg border ${
            theme === "dark"
              ? "bg-dark-800 border-gold-500"
              : "bg-white border-gold-400"
          }`}
        >
          <h2 className="text-xl font-semibold mb-4">
            {selectedBooking?.client}'s Car — {selectedBooking?.car}
          </h2>

          {/* Progress Bar */}
          <div className="w-full bg-gray-300 dark:bg-dark-600 rounded-full h-4 mb-6 overflow-hidden relative">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8 }}
              className="h-4 rounded-full bg-gradient-to-r from-gold-400 to-gold-600"
            />
          </div>

          {/* Tasks */}
          <ul className="space-y-3">
            {selectedBooking?.repairs.map((task) => (
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

          {/* Add Task */}
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

      
    </div>
  );
}
