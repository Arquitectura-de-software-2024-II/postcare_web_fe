export interface loginData {
  tipo_documento: string;
  id_documento: string;
  password: string;
}

export interface registerData {
  nombres: string;
  apellidos: string;
  email: string;
  tipo_documento: string;
  id_documento: string;
  password: string;
  re_password: string;
}

export interface tokens {
  refresh: string;
  access: string;
}
