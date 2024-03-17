import axios from "axios";

export default axios.create({
  baseURL: "https://nomnomapi2-fuiwzwgkia-uc.a.run.app",
  headers: { "Content-Type": "application/json",
             "accept" : "*/*"},
});

export const axiosPrivate = axios.create({
  baseURL: "https://nomnomapi2-fuiwzwgkia-uc.a.run.app",
  headers: { "Content-Type": "application/json",
              "accept": "*/*"},
});