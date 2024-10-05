import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 4000,
  headers: { "X-Custom-Header": "foobar" },
});
