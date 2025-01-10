import axios from "axios";
import { UserOperation } from "@/logic/models/operationModel";
import { userRecord } from "../models/recordModel";

const API = axios.create({
  baseURL: "http://localhost:8081",
  headers: { 
    "Content-Type": "application/json",
    "apikey": "7B5zIqmRGXmrJTFmKa99vcit",
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
  } catch {
    return [];
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

export const getOperationById = async ({userId, operationId}:{userId:string, operationId:string}) => {
  try {
    const {data} = await API.get(`/api/pacientes/${userId}/cirugias/${operationId}`);
    return data;
  } catch (error) {
    return error;
  } 
};

export const getRecordById = async ({userId, recordId}:{userId:string, recordId:string}) => {
  try {
    const {data} = await API.get(`/api/pacientes/${userId}/registros/${recordId}`);
    return data;
  } catch (error) {
    return error;
  } 
};
export const postUserOperations = async (newOperation: UserOperation) => {
  const response = await API.post(`/api/pacientes/${newOperation.userId}/cirugias`, newOperation);
  console.log(response);
  return response.data; 
}

export const postUserRecords = async (newRecord: userRecord) => {
  const response = await API.post(`/api/pacientes/${newRecord.userId}/registros`, newRecord);
  console.log(response);
  return response.data; 
}

export const updateUserOperation = async (newOperation: UserOperation) => {
  const response = await API.put(`/api/pacientes/${newOperation.userId}/cirugias/${newOperation.id}`, newOperation);
  console.log(response);
  return response.data; 
}

export const updateUserRecord = async (newRecord: userRecord) => {
  const response = await API.post(`/api/pacientes/${newRecord.userId}/registros//${newRecord.id}`, newRecord);
  console.log(response);
  return response.data; 
}

export const deleteUserOperation = async ({userId, operationId}: {userId: string; operationId: string}) => {
  const response = await API.delete(`/api/pacientes/${userId}/cirugias/${operationId}`);
  console.log(response);
  return response.data; 
}

export const deleteUserRecord = async ({userId, recordId}: {userId: string; recordId: string}) => {
  const response = await API.delete(`/api/pacientes/${userId}/registros/${recordId}`);
  console.log(response);
  return response.data; 
}
