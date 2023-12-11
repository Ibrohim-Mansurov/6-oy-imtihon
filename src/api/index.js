import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE__API__URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export { instance };
