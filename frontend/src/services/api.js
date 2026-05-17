import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" }
});

// Add token to requests automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// AUTH
export const registerUser = (data) => api.post("/auth/register", data);
export const loginUser = (data) => api.post("/auth/login", data);

// EVENTS
export const createEvent = (data) => api.post("/events", data);
export const getMyEvents = () => api.get("/events");
export const getEvent = (id) => api.get(`/events/${id}`);
export const updateEvent = (id, data) => api.put(`/events/${id}`, data);
export const deleteEvent = (id) => api.delete(`/events/${id}`);

// BOOKINGS
export const createBooking = (data) => api.post("/bookings", data);
export const getMyBookings = () => api.get("/bookings");
export const getVendorBookings = () => api.get("/bookings/vendor");
export const updateBookingStatus = (id, status) => api.patch(`/bookings/${id}/status`, { status });

// VENDORS
export const getVendors = () => api.get("/vendors");
export const getVendor = (id) => api.get(`/vendors/${id}`);
export const createVendor = (data) => api.post("/vendors", data);
export const updateVendor = (id, data) => api.put(`/vendors/${id}`, data);
export const deleteVendor = (id) => api.delete(`/vendors/${id}`);

export default api;
