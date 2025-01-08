import axios from "axios";
import { UserOperation } from "@/logic/models/operationModel";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_POSTOPERATION_URL,
  headers: { 
    "Content-Type": "application/json",
  },
  withCredentials: true, 
});

export const getOperationsOptions = async () => {
  try {
    const {data} = await API.get("/api/cirugias");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getRecordOptions = async () => {
  try {
    const {data} = await API.get("/api/parametros/versiones");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserOperations = async ({userId}:{userId:string}) => {
  try {
    const {data} = await API.get(`/api/pacientes/${userId}/cirugias`);
    return data;
  } catch (error) {
    return error;
  } 
};

export const getOperationById = async ({userId, operationId}:{userId:string, operationId:string}) => {
  try {
    const {data} = await API.get(`/api/pacientes/${userId}/cirugias/${operationId}`);
    return data;
  } catch (error) {
    return error;
  } 
};

export const getUserRecords = async ({userId}:{userId:string})=> {
  try {
    const {data} = await API.get(`/api/pacientes/${userId}/registros`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const postUserOperation = async (newOperation: UserOperation) => {
  const response = await API.post(`/api/pacientes/${newOperation.userId}/cirugias`, newOperation);
  console.log(response);
  return response.data; 
}

export const postUserRecord = async (newOperation: UserOperation) => {
  const response = await API.post("/api/pacientes/1/cirugias", newOperation);
  console.log(response);
  return response.data; 
}

export const updateUserOperation = async (newOperation: UserOperation) => {
  const response = await API.put(`/api/pacientes/${newOperation.userId}/cirugias/${newOperation.idCirugia}`, newOperation);
  console.log(response);
  return response.data; 
}

export const deleteUserOperation = async ({userId, operationId}: {userId: string; operationId: string}) => {
  const response = await API.delete(`/api/pacientes/${userId}/cirugias/${operationId}`);
  console.log(response);
  return response.data; 
}

export const deleteUserRecord = async ({userId, recordId}: {userId: string; recordId: string}) => {
  const response = await API.post(`/api/pacientes/${userId}/registros/${recordId}`);
  console.log(response);
  return response.data; 
}
