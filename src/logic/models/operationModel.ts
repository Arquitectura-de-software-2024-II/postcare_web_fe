export interface UserOperation {
    id?: string;
    nombreCirugia?: string;
    tipoCirugia?: string;
    nombreMedico?: string;
    descripcion?: string;
    idCirugia?: string;
    fechaCirugia?: string;
    userId?: string;
}

export interface OperationOption {
    id?: string;
    nombre: string;
    tipo: OperationType[];
}

export interface OperationType {
    id: string;
    nombre: string;
}