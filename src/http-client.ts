import axios from "axios";

export const httpClient = axios.create({
  baseURL: "http://localhost:5221/api/",
  headers: {
    "Content-type": "application/json",
  },
});

export default httpClient;
