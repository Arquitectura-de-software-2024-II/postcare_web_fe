import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8081/api/cirugias",
  headers: { 
    "Content-Type": "application/json",
  },
  // Agregar credenciales si el backend las requiere
  withCredentials: true, 
});

// Función para obtener parámetros
export const getSurgeries = async () => {
  try {
    const { data } = await API.get("");
    return data;
  } catch (error) {
    console.error("Error al obtener las cirugias");
    throw error;
  }
};