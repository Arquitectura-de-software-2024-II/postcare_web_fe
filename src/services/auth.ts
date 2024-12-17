import { Credentials, User } from "@/models/user";
import axios from "axios";

const API = axios.create({
  baseURL: "https://example.com/api", // Cambia por tu endpoint
  headers: { "Content-Type": "application/json" },
});


export const loginRequest = async (credentials: Credentials) => {
  const { data } = await API.post("/login", credentials);
  return data; // Retorna token y/o información del usuario
};

export const signupRequest = async (userData: User)  => {
  const { data } = await API.post("/signup", userData);
  return data;
};

export const fetchUser = async (token: string) => {
  const { data } = await API.get("/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};