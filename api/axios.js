import axios from "axios";

export default axios.create({
  baseURL: process.env.NOMNOM_API_URL,
  headers: { "Content-Type": "application/json",
             "accept" : "*/*"},
});

export const axiosPrivate = axios.create({
  baseURL: process.env.NOMNOM_API_URL,
  headers: { "Content-Type": "application/json",
              "accept": "*/*"},
});