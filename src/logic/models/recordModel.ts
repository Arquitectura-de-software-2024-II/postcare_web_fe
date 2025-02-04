export interface userRecord {
  id?: string;
  fechaRegistro: string;
  userId?: string;
  parametrosControl: {
    signosVitales: VitalSign[];
    sintomas: Symptom[];
    sintomasNoListados: NotListedSymptom[];
  };
}

export interface RecordOptions {
  id: string;
  signosVitales: VitalSign[];
  sintomas: Symptom[];
  sintomasNoListados?: NotListedSymptom[];
}

export interface VitalSign {
  nombre: string;
  unidad: string;
  valor?: number;
  rangoNormal?: {
    min?: 0;
    max?: 0;
  };
}

export interface Symptom {
  nombre: string;
  valor?: number;
  escala?: {
    min?: number;
    max?: number;
  };
  
  tieneEscala?: boolean;
}

export interface NotListedSymptom {
  nombre: string;
  descripcion: string;
}

export interface NewSymptom {
  id: string;
  nombre: string;
  valores?: [string];
  tieneEscala: true;
  escala: {
    min: number;
    max: number;
  };
  esPredeterminado: true;
}

export interface NewVitalSign {
  id: string;
  nombre: string;
  unidad: string;
  rangoNormal: {
    min: number;
    max: number;
  };
  esPredeterminado: true;
}
