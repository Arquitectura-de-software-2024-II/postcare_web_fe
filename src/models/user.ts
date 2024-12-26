import { ParametrosControl } from "./record";

// Función para iniciar sesión
export interface Credentials {
  id: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface UserRecord{
  id: string;
  fechaRegistro: string;
  parametrosControl: ParametrosControl;
}

export interface UserOperation{
  id: string,
  nombreCirugia: string,
  tipoCirugia: string,
  nombreMedico: string,
  descripcion: string,
  idCirugia: string,
  fechaCirugia: string
}