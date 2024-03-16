import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.0.101:7046",
  headers: { "Content-Type": "application/json",
             "accept" : "*/*"},
});

export const axiosPrivate = axios.create({
  baseURL: "http://192.168.0.101:7046",
  headers: { "Content-Type": "application/json",
              "accept": "*/*"},
});