import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({
  baseURL: API,
  headers: { "Content-Type": "application/json" },
});

export const subscribeNewsletter = (email, source = "footer") =>
  api.post("/newsletter", { email, source });

export const createOrder = (payload) => api.post("/orders", payload);

export const sendContact = (payload) => api.post("/contact", payload);

export const getStats = () => api.get("/stats");
