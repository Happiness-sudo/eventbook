import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("eb-token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const registerUser         = (data)       => api.post("/auth/register", data);
export const loginUser            = (data)       => api.post("/auth/login", data);
export const getMyEvents          = ()           => api.get("/events");
export const createEvent          = (data)       => api.post("/events", data);
export const getVendors           = (category)   => api.get("/vendors", { params: category ? { category } : {} });
export const getVendorById        = (id)         => api.get(`/vendors/${id}`);
export const updateVendor         = (id, data)   => api.put(`/vendors/${id}`, data);
export const getMyVendorProfile   = ()           => api.get("/vendors/me");
export const createBooking        = (data)       => api.post("/bookings", data);
export const getMyBookings        = ()           => api.get("/bookings");
export const getVendorBookings    = ()           => api.get("/bookings/vendor");
export const updateBookingStatus  = (id, status) => api.patch(`/bookings/${id}/status`, { status });
export const addService           = (data)       => api.post("/services", data);
export const deleteService        = (id)         => api.delete(`/services/${id}`);
export const uploadPortfolioImage = (formData)   => api.post("/vendors/portfolio", formData, { headers: { "Content-Type": "multipart/form-data" } });
export const getAllUsers           = ()           => api.get("/admin/users");
export const getAllVendors         = ()           => api.get("/admin/vendors");
export const getAllBookings        = ()           => api.get("/admin/bookings");
export const approveVendor        = (id)         => api.patch(`/admin/vendors/${id}/approve`);
export const rejectVendor         = (id)         => api.patch(`/admin/vendors/${id}/reject`);

export default api;