### HAGAGANDI AUTO REPAIR GARAGE
1. Website Overview

Your site now functions as a service-based platform where:

Visitors can browse services, book appointments, and contact you.

Registered users can log in, book directly, and view personalized content (if implemented later).

Admins can log in, manage services, view users, and track bookings.

It’s built on:

React (frontend)

Node.js / Express (backend)

MySQL or Render-hosted DB (database)

API routes for structured communication between frontend & backend

🧭 2. User Workflow (Client Side)
🏠 HomePage (/)

Goal: Introduce the business and highlight services.
Workflow:

When the user visits the site, React loads the HomePage.

The frontend calls fetchServices() to get featured or popular services.

If the user clicks “Book Now” → redirect to /bookings.

🧰 ServicesPage (/services)

Goal: Display all available services.
Workflow:

React calls fetchServices() to retrieve the list of services from /api/services.

Each service displays its:

Name

Description

Price

“Book Now” button

Clicking “Book Now” → opens booking form prefilled with that service name → /bookings.

🗓️ BookingPage (/bookings)

Goal: Allow users (logged in or not) to make a booking.
Workflow:

If user is not logged in, you can either:

Let them fill in their contact info manually, OR

Redirect to /login

The form calls createBooking(bookingData) with info like:

{
  "service": "Car Wash",
  "date": "2025-11-02",
  "name": "John Doe",
  "email": "john@example.com"
}


The backend validates, saves booking to DB, and returns a success message.

Optionally, the user receives a booking confirmation message.

👤 Auth Pages
Register (/register)

User fills in their name, email, password.

Frontend sends request to backend via registerUser(userData).

Backend creates account, returns success or error.

Redirects to /login.

Login (/login)

User enters credentials.

Frontend calls loginUser(email, password).

Backend returns a JWT token and user info.

Token is stored in localStorage → user session starts.

User is redirected to / or /admin.

💬 ContactPage (/contact)

Goal: Let users send messages.
Workflow:

User fills out name, email, message.

Frontend sends data to backend via submitContactForm(contactData).

Message is saved in DB or emailed to admin.

Frontend shows “Message sent successfully.”

ℹ️ AboutPage (/about)

Goal: Display company info.
Workflow:

Fetches about info (static or from DB) via fetchAboutInfo().

Displays mission, team, etc.

🛠️ 3. Admin Workflow
Admin Login

Admin logs in via the same /login route but with elevated privileges.

The backend checks if user has role: 'admin'.

Admin token is stored in localStorage.

AdminDashboard (/admin)

Goal: Central management console.
Workflow:

On load, the frontend calls:

fetchAdminData() → get dashboard stats

fetchUsers() → view registered users

fetchBookings() → view all bookings

fetchServices() → view or edit services

Admin can:

Add or delete services via createService()

View bookings

Monitor user accounts

Each action uses token-based authentication, so only authorized admins can access these routes.

🔐 4. Authentication & Data Flow
Login Flow

User logs in → loginUser() sends credentials.

Backend verifies → returns:

{
  "token": "JWT_TOKEN",
  "user": { "id": 1, "name": "Admin", "role": "admin" }
}


React stores token:

localStorage.setItem("token", data.token);


For every future API call, the frontend attaches:

headers: { "Authorization": `Bearer ${token}` }


✅ This ensures only logged-in users can perform protected actions (like managing services or viewing admin data).

⚙️ 5. API Integration Summary
Page	API Function	Description
Home	fetchServices()	Show featured services
Services	fetchServices()	List all services
Booking	createBooking()	Book a service
Register	registerUser()	Create a new user
Login	loginUser()	Authenticate user
Contact	submitContactForm()	Send message
AdminDashboard	fetchAdminData(), fetchUsers(), fetchBookings(), createService()