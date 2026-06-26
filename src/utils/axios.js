import axios from "axios";

export default axios.create({
  baseURL:import.meta.env.DEV
  ?"":"https://ecommerce-backend-4e2u.onrender.com"
});