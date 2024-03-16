import axios from "axios";

export default axios.create({
  baseURL: "https://localhost:7046",
});

export const axiosPrivate = axios.create({
  baseURL: "https://localhost:7046",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});