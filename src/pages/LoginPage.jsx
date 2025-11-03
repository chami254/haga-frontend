import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Invalid credentials");
        setLoading(false);
        return;
      }

      // Save token locally (for future admin-only pages)
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);

      toast.success("✅ Login successful! Redirecting...");
      setTimeout(() => navigate("/admin"), 1500);
    } catch (error) {
      toast.error("Server error, please try again.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-6 ${
        theme === "dark" ? "bg-dark-900" : "bg-gold-100"
      }`}
    >
      <Toaster position="top-center" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`w-full max-w-md p-8 rounded-2xl shadow-2xl ${
          theme === "dark"
            ? "bg-dark-800 text-gold-200 border border-gold-700"
            : "bg-white text-dark-900 border border-dark-200"
        }`}
      >
        <h1
          className={`text-3xl font-bold mb-6 text-center ${
            theme === "dark" ? "text-gold-500" : "text-dark-900"
          }`}
        >
          Admin Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block font-semibold mb-1 text-sm"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg outline-none transition ${
                theme === "dark"
                  ? "bg-dark-700 text-gold-100 border border-gold-600 focus:ring-2 focus:ring-gold-500"
                  : "bg-gold-50 text-dark-900 border border-dark-300 focus:ring-2 focus:ring-dark-700"
              }`}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block font-semibold mb-1 text-sm"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg outline-none transition ${
                theme === "dark"
                  ? "bg-dark-700 text-gold-100 border border-gold-600 focus:ring-2 focus:ring-gold-500"
                  : "bg-gold-50 text-dark-900 border border-dark-300 focus:ring-2 focus:ring-dark-700"
              }`}
            />
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileTap={{ scale: 0.95 }}
            className={`w-full py-3 mt-2 font-semibold rounded-lg shadow-md transition ${
              theme === "dark"
                ? "bg-gold-500 text-dark-900 hover:bg-gold-400"
                : "bg-dark-900 text-gold-500 hover:bg-dark-700"
            } ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loading ? "Signing In..." : "Login"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
