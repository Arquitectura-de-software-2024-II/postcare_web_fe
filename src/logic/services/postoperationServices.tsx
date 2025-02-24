import axios from "axios";
import { OperationOption, UserOperation } from "@/logic/models/operationModel";
import { NewSymptom, NewVitalSign, RecordOptions, userRecord } from "../models/recordModel";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://34.122.133.171/",
  headers: { 
    "Content-Type": "application/json",
  },
  withCredentials: true, 
});

export const createUserPostoperation = async (idPaciente: string) => {
  try {
    const {data} = await API.post(`/api/pacientes/${idPaciente}`);
    return data;
  } catch (error) {
    console.log(error);
  }
}

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
  } catch {
    return [];
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
  const response = await API.put(`/api/pacientes/${newRecord.userId}/registros/${newRecord.id}`, newRecord);
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

export const getOperationsOptions = async () => {
  try {
    const {data} = await API.get("/api/cirugias");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getOperationOptionById = async (idOperationOption:string) => {
  try {
    const {data} = await API.get(`/api/cirugias/${idOperationOption}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createSurgeryOption = async (newSurgery: OperationOption) => {
  const response = await API.post(`/api/cirugias`, newSurgery);
  console.log(response);
  return response.data; 
}

export const updateOperationOption = async (operationOption: OperationOption) => {
  const response = await API.put(`/api/cirugias/${operationOption.id}`, operationOption);
  console.log(response);
  return response.data; 
}

export const deleteOperationOption = async (operationOptionId: string) => {
  try{
    const response = await API.delete(`/api/cirugias/${operationOptionId}`);
  console.log(response);
  }catch(error){
    console.log(error);
  }

}

export const createRecordOption = async (newRecordOption: RecordOptions) => {
  const response = await API.post(`/api/parametros`, newRecordOption);
  console.log(response);
  return response.data; 
}

export const getRecordOptionById = async (idRecordOption:string) => {
  try {
    const {data} = await API.get(`/api/parametros/${idRecordOption}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateRecordOption = async (operationOption: RecordOptions) => {
  const response = await API.put(`/api/parametros/${operationOption.id}`, operationOption);
  console.log(response);
  return response.data; 
}

export const deleteRecordOption = async (operationOptionId: string) => {
  try{
    const response = await API.delete(`/api/parametros/${operationOptionId}`);
  console.log(response);
  }catch(error){
    console.log(error);
  }
}

export const getRecordOptions = async () => {
  try {
    const {data} = await API.get("/api/parametros/versiones");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getParamsGroups = async () => {
  try {
    const {data} = await API.get("/api/parametros/versiones");
    return data;
  } catch (error) {
    console.log(error);
  }
};

// export const getParamGroupById = async (idParamsGroup:string) => {
//   try {
//     const {data} = await API.get(`/api/parametros/${idParamsGroup}`);
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const createParamsGroup = async (nameGroup: string) => {
//   const response = await API.post(`/api/parametros`,{
//     id: nameGroup,
//     signosVitales: []
//   });
//   console.log(response);
//   return response.data; 
// }

export const createParamsSymptom = async ({idParamsGroup, newSymptom}: {idParamsGroup: string; newSymptom: NewSymptom}) => {
  const response = await API.post(`/api/parametros/${idParamsGroup}/sintomas`,newSymptom);
  console.log(response);
  return response.data; 
}

export const createParamsVitalSign = async ({idParamsGroup, newVitalSign}: {idParamsGroup: string; newVitalSign: NewVitalSign}) => {
  const response = await API.post(`/api/parametros/${idParamsGroup}/sintomas`,newVitalSign);
  console.log(response);
  return response.data; 
}
