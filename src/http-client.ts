import axios from "axios";

export const httpClient = axios.create({
  baseURL: "//localhost:7128/api/",
  headers: {
    "Content-type": "application/json",
  },
});

export default httpClient;
