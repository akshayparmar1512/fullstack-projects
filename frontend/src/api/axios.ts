
import axios from "axios";

const api = axios.create({
  baseURL: "https://students-crud-app-api.onrender.com",
});

export default api;
