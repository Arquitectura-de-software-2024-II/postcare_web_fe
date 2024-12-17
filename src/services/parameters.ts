import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8081/api/parametros",
  headers: { 
    "Content-Type": "application/json",
  },
  // Agregar credenciales si el backend las requiere
  withCredentials: true, 
});

// Función para obtener parámetros
export const getParameters = async () => {
  try {
    const { data } = await API.get("/versiones");
    return data;
  } catch (error) {
    console.error("Error al obtener los parámetros");
    throw error;
  }
};