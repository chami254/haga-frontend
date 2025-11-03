// src/api.js
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// ========================
// AUTHENTICATION ENDPOINTS
// ========================
export const loginUser = async (email, password) => {
  try {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return await res.json();
  } catch (error) {
    console.error("Error logging in:", error);
    return { error: "Network error" };
  }
};

export const registerUser = async (userData) => {
  try {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return await res.json();
  } catch (error) {
    console.error("Error registering user:", error);
    return { error: "Network error" };
  }
};

// ========================
// USERS
// ========================
export const fetchUsers = async () => {
  try {
    const res = await fetch(`${API_URL}/api/users`);
    if (!res.ok) throw new Error("Failed to fetch users");
    return await res.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

// ========================
// SERVICES
// ========================
export const fetchServices = async () => {
  try {
    const res = await fetch(`${API_URL}/api/services`);
    if (!res.ok) throw new Error("Failed to fetch services");
    return await res.json();
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
};

export const createService = async (serviceData) => {
  try {
    const res = await fetch(`${API_URL}/api/services`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(serviceData),
    });
    return await res.json();
  } catch (error) {
    console.error("Error creating service:", error);
    return { error: "Network error" };
  }
};

// ========================
// BOOKINGS
// ========================
export const fetchBookings = async () => {
  try {
    const res = await fetch(`${API_URL}/api/bookings`);
    if (!res.ok) throw new Error("Failed to fetch bookings");
    return await res.json();
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return [];
  }
};

export const createBooking = async (bookingData) => {
  try {
    const res = await fetch(`${API_URL}/api/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
    });
    return await res.json();
  } catch (error) {
    console.error("Error creating booking:", error);
    return { error: "Network error" };
  }
};

// ========================
// CONTACT
// ========================
export const submitContactForm = async (contactData) => {
  try {
    const res = await fetch(`${API_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactData),
    });
    return await res.json();
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return { error: "Network error" };
  }
};

// ========================
// ABOUT (if you’re fetching info from backend)
// ========================
export const fetchAboutInfo = async () => {
  try {
    const res = await fetch(`${API_URL}/api/about`);
    if (!res.ok) throw new Error("Failed to fetch about info");
    return await res.json();
  } catch (error) {
    console.error("Error fetching about info:", error);
    return [];
  }
};

// ========================
// ADMIN
// ========================
export const fetchAdminData = async () => {
  try {
    const res = await fetch(`${API_URL}/api/admin/data`);
    if (!res.ok) throw new Error("Failed to fetch admin data");
    return await res.json();
  } catch (error) {
    console.error("Error fetching admin data:", error);
    return [];
  }
};
