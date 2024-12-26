import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8081/api/pacientes",
  headers: { 
    "Content-Type": "application/json",
  },
  withCredentials: true, 
});

// Función para obtener parámetros
export const getUserRecords = async ({id}: { id: string }) => {
  try {
    const { data } = await API.get("/"+id+"/registros");
    return data;
  } catch (error) {
    console.error("Error al obtener los registros");
    throw error;
  }
};

export const getUserOperations = async ({id}: { id: string }) => {
    try {
      const { data } = await API.get("/"+id+"/cirugias");
      return data;
    } catch (error) {
      console.error("Error al obtener las cirugias");
      throw error;
    }
  };

  export const createUserOperations = async (id: string, payload: any) => {
    try {
      const { data } = await API.post(`/${id}/cirugias`, payload);
      return data;
    } catch (error) {
      console.error("Error al crear una nueva operación", error);
      throw error;
    }
  };